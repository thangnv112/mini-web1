import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatPayload {
  message: string;
  exerciseSentence?: string;
  exerciseTitle?: string;
  history?: Array<{ sender: "ai" | "user"; text: string }>;
  customApiKey?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatPayload = await req.json();
    const { message, exerciseSentence = "", exerciseTitle = "", history = [], customApiKey } = body;

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "Tin nhắn không được để trống" }, { status: 400 });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    // If API key is available, call Gemini API
    if (apiKey && apiKey.trim() !== "" && apiKey !== "your_api_key_here") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemInstruction = `Bạn là "Gia Sư Trợ Lý AI" dạy môn Tiếng Việt Lớp 5 cho học sinh tiểu học (10-11 tuổi).
Phong cách: Vui vẻ, thân thiện, kiên nhẫn, khích lệ, dùng nhiều emoji phù hợp 🤖✨📚.
Xưng hô: Thầy/Cô hoặc "Mình" và gọi học sinh là "Em".

BỐI CẢNH HIỆN TẠI:
- Học sinh đang làm bài tập: "${exerciseTitle}"
- Đề bài câu văn đang phân tích: "${exerciseSentence}"

NGUYÊN TẮC SƯ PHẠM BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG ĐƯỢC đưa ra đáp án trực tiếp cho bài tập trên nếu học sinh xin đáp án.
   Ví dụ nếu học sinh hỏi: "Chủ ngữ là gì?", "Đáp án câu này là gì?", hãy trả lời định hướng:
   - "Thầy/Cô không thể nói thẳng đáp án được đâu nè, vì như vậy em sẽ không rèn luyện được trí nhớ! Nhưng thầy/cô gợi ý em nhé: Để tìm chủ ngữ, em hãy tự đặt câu hỏi 'Ai?' hoặc 'Cái gì?'..."
2. Nếu học sinh hỏi kiến thức ngữ pháp chung (ví dụ: câu ghép là gì, từ nối là gì, chủ ngữ là gì, quan hệ từ biểu thị điều gì...):
   - Giải thích thật ngắn gọn, dễ hiểu, dùng ngôn từ trẻ thơ.
   - Luôn cho 1 ví dụ minh họa ĐƠN GIẢN KHÁC (không lấy ví dụ của bài đang làm).
3. Luôn giữ độ dài phản hồi vừa phải (tối đa 3-4 câu hoặc gạch đầu dòng ngắn) để học sinh tiểu học không bị ngợp chữ.`;

        // Format previous history for Gemini
        const chatHistory = history.slice(-6).map((h) => ({
          role: h.sender === "ai" ? "model" : "user",
          parts: [{ text: h.text }],
        }));

        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: systemInstruction }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Chào em! Mình là Gia sư AI Tiếng Việt Lớp 5 đây. Mình đã sẵn sàng cùng em chinh phục các bài tập câu ghép rồi! Em có câu hỏi gì cần mình giải đáp không nào? 🤖✨",
                },
              ],
            },
            ...chatHistory,
          ],
        });

        const result = await chat.sendMessage(message);
        const aiResponseText = result.response.text();

        return NextResponse.json({
          reply: aiResponseText,
          source: "gemini",
        });
      } catch (geminiError: unknown) {
        console.warn("Gemini API call failed, falling back to smart pedagogical rule engine:", geminiError);
        // Fall through to smart rule engine
      }
    }

    // Smart Rule-Based Pedagogical Engine (Fallback)
    const fallbackReply = generatePedagogicalFallback(message, exerciseSentence);
    return NextResponse.json({
      reply: fallbackReply,
      source: "rule-engine",
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi xử lý câu hỏi của em. Thử lại nhé!" },
      { status: 500 }
    );
  }
}

/**
 * Smart pedagogical rule engine for 5th grade Vietnamese grammar
 */
function generatePedagogicalFallback(userMessage: string, sentence: string): string {
  const q = userMessage.toLowerCase().trim();

  // Ask for direct answer
  if (
    q.includes("đáp án") ||
    q.includes("kết quả") ||
    q.includes("cho em xin") ||
    q.includes("giải giúp") ||
    q.includes("làm hộ") ||
    q.includes("chỉ em đáp án")
  ) {
    return `Ui, mình không thể bật mí đáp án ngay được đâu nè! 🤫 Vì nếu mình làm hộ thì em sẽ không nhớ được bài đâu.\n\nNhưng mình có mẹo nhỏ cho em nè:\n- Đọc to câu văn lên: "${sentence}"\n- Chia câu thành 2 vế trước và sau từ nối.\n- Mỗi vế em tự hỏi: **"Ai/Cái gì?"** để tìm Chủ ngữ, và **"Làm gì/Như thế nào?"** để tìm Vị ngữ nhé! Em làm được mà! 💪`;
  }

  // Definition: Câu ghép là gì?
  if (q.includes("câu ghép là gì") || q.includes("thế nào là câu ghép")) {
    return `📖 **Câu ghép là gì nhỉ?**\n\nCâu ghép là câu do **nhiều vế câu** ghép lại với nhau. Mỗi vế câu ghép thường có cấu tạo giống một câu đơn (tức là có đủ cả **Chủ ngữ** và **Vị ngữ**) và thể hiện một ý trọn vẹn.\n\n*Ví dụ*: "Trời mưa *(vế 1)*, đường trơn *(vế 2)*."`;
  }

  // Definition: Chủ ngữ là gì?
  if (q.includes("chủ ngữ") && (q.includes("là gì") || q.includes("cách tìm") || q.includes("nhận biết"))) {
    return `🔍 **Bí kíp tìm Chủ ngữ cực dễ:**\n\nChủ ngữ là bộ phận nêu người, sự vật, con vật... được nói đến trong câu. Em chỉ cần đặt câu hỏi:\n- **"Ai?"** (nếu là người)\n- **"Con gì?"** (nếu là con vật)\n- **"Cái gì/Hiện tượng gì?"** (nếu là đồ vật hoặc thời tiết, thiên nhiên)\n\n*Ví dụ*: Trong câu "Mặt trời mọc" ➔ Cái gì mọc? ➔ Trả lời: **Mặt trời** là Chủ ngữ!`;
  }

  // Definition: Vị ngữ là gì?
  if (q.includes("vị ngữ") && (q.includes("là gì") || q.includes("cách tìm") || q.includes("nhận biết"))) {
    return `📝 **Bí kíp tìm Vị ngữ:**\n\nVị ngữ là bộ phận nêu hoạt động, trạng thái hoặc đặc điểm của chủ ngữ. Em hãy đặt câu hỏi:\n- **"Làm gì?"** (hoạt động)\n- **"Như thế nào?"** (đặc điểm, tính chất)\n- **"Là gì?"** (định nghĩa)\n\n*Ví dụ*: Trong câu "Gió thổi mạnh" ➔ Gió làm gì/như thế nào? ➔ Trả lời: **thổi mạnh** chính là Vị ngữ!`;
  }

  // Definition: Quan hệ từ / Cặp quan hệ từ
  if (
    q.includes("quan hệ từ") ||
    q.includes("cặp từ") ||
    q.includes("từ nối") ||
    q.includes("cách nối")
  ) {
    return `🔗 **Các cách nối vế câu ghép lớp 5:**\n\n1. **Nối trực tiếp**: Bằng dấu phẩy (,), dấu chấm phẩy (;), hoặc dấu hai chấm (:).\n2. **Nối bằng một quan hệ từ**: và, rồi, nhưng, thì, nên, hoặc...\n3. **Nối bằng cặp quan hệ từ**:\n- Nguyên nhân - kết quả: *Vì... nên...*, *Do... nên...*\n- Điều kiện - kết quả: *Nếu... thì...*, *Hễ... thì...*\n- Tương phản: *Tuy... nhưng...*, *Mặc dù... nhưng...*\n- Tăng tiến: *Không những... mà còn...*`;
  }

  // Ask about current sentence hints
  if (q.includes("gợi ý") || q.includes("giúp em") || q.includes("chỉ em") || q.includes("hướng dẫn")) {
    return `💡 **Gợi ý cho câu văn này nè:**\n\nCâu của em là: *"${sentence}"*\n\n1. Em hãy tìm xem hai vế câu này được ngăn cách bởi từ ngữ nào hoặc dấu câu nào nhé?\n2. Ở vế thứ nhất: Ai hoặc Cái gì đang được nhắc tới? Hành động hay trạng thái của nó là gì?\n3. Thử gõ câu trả lời vào ô rồi bấm **Kiểm tra**, mình sẽ chỉ dẫn cụ thể hơn cho em nhé! 🤖`;
  }

  // Tuy... nhưng
  if (q.includes("tuy") || q.includes("nhưng")) {
    return `✨ Cặp từ **"Tuy... nhưng..."** là cặp quan hệ từ biểu thị mối quan hệ **tương phản (nhượng bộ)**.\n\nNghĩa là dù có một khó khăn, trở ngại ở vế 1, nhưng hành động ở vế 2 vẫn diễn ra thành công! Em hãy chú ý nhé!`;
  }

  // Default encouraging reply
  return `Chào em! Câu hỏi của em rất thú vị. 😊\n\nĐể làm tốt câu: *"${sentence}"*, em hãy đọc kỹ từng vế một, xác định xem mỗi vế có **Chủ ngữ** (trả lời Ai/Cái gì) và **Vị ngữ** (trả lời Làm gì/Như thế nào) là những từ ngữ nào nhé.\n\nNếu có chỗ nào chưa hiểu rõ, em cứ hỏi cụ thể mình sẽ giải thích thêm! 🤖✨`;
}
