import { GoogleGenerativeAI } from '@google/generative-ai';
import { getScaffoldingPrompt } from './prompt.service';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class AiService {
  async evaluateAnswerWithScaffolding(exercise: any, studentAnswer: any, level: number) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const promptData = getScaffoldingPrompt(level, exercise, studentAnswer);
    
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: promptData.system }],
        },
        {
          role: "model",
          parts: [{ text: "Tôi hiểu. Tôi sẽ đóng vai gia sư tiếng Việt thân thiện cho học sinh lớp 5 và dẫn dắt học sinh mà không đưa đáp án trực tiếp." }],
        }
      ]
    });

    const result = await chat.sendMessage(promptData.user);
    return result.response.text();
  }
}
