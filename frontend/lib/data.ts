import { Exercise } from './types';

export const exercises: Exercise[] = [
  // === DỄ (Easy) - Câu ghép đơn giản, quan hệ từ rõ ràng ===
  {
    id: "ex-1",
    title: "Câu ghép với dấu phẩy",
    sentence: "Mặt trời mọc, sương tan dần.",
    type: "fill_blank",
    difficulty: "easy",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cách nối.",
    correctAnswers: {
      subject1: "Mặt trời",
      predicate1: "mọc",
      subject2: "sương",
      predicate2: "tan dần",
      connector: ","
    },
    hints: [
      "Câu này có hai sự việc xảy ra cùng lúc: mặt trời và sương.",
      "Vế 1 nói về mặt trời, vế 2 nói về sương. Mỗi vế đều có chủ ngữ riêng."
    ]
  },
  {
    id: "ex-2",
    title: "Câu ghép với từ 'và'",
    sentence: "Gió thổi mạnh và cây cối nghiêng ngả.",
    type: "fill_blank",
    difficulty: "easy",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cách nối.",
    correctAnswers: {
      subject1: "Gió",
      predicate1: "thổi mạnh",
      subject2: "cây cối",
      predicate2: "nghiêng ngả",
      connector: "và"
    },
    hints: [
      "Từ 'và' nối hai vế câu lại. Vế 1 nói về gió, vế 2 nói về cây cối.",
      "Chủ ngữ trả lời câu hỏi 'Cái gì?'. Cái gì thổi mạnh? Cái gì nghiêng ngả?"
    ]
  },
  {
    id: "ex-3",
    title: "Câu ghép với từ 'còn'",
    sentence: "Mẹ đi chợ còn bố ở nhà.",
    type: "fill_blank",
    difficulty: "easy",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cách nối.",
    correctAnswers: {
      subject1: "Mẹ",
      predicate1: "đi chợ",
      subject2: "bố",
      predicate2: "ở nhà",
      connector: "còn"
    },
    hints: [
      "Từ 'còn' dùng để so sánh hoặc đối chiếu hai sự việc.",
      "Ai đi chợ? Ai ở nhà? Đó chính là chủ ngữ của từng vế."
    ]
  },
  {
    id: "ex-4",
    title: "Câu ghép với dấu phẩy (2)",
    sentence: "Chim hót líu lo, bướm bay lượn khắp vườn.",
    type: "fill_blank",
    difficulty: "easy",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cách nối.",
    correctAnswers: {
      subject1: "Chim",
      predicate1: "hót líu lo",
      subject2: "bướm",
      predicate2: "bay lượn khắp vườn",
      connector: ","
    },
    hints: [
      "Hai vế câu được ngăn cách bằng dấu phẩy. Mỗi vế nói về một con vật.",
      "Con gì hót líu lo? Con gì bay lượn?"
    ]
  },

  // === TRUNG BÌNH (Medium) - Câu ghép có quan hệ từ phức tạp hơn ===
  {
    id: "ex-5",
    title: "Câu ghép chỉ nguyên nhân - kết quả",
    sentence: "Vì trời mưa to nên đường rất trơn.",
    type: "fill_blank",
    difficulty: "medium",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "trời",
      predicate1: "mưa to",
      subject2: "đường",
      predicate2: "rất trơn",
      connector: "Vì... nên..."
    },
    hints: [
      "Cặp quan hệ từ 'Vì... nên...' cho biết mối quan hệ nguyên nhân - kết quả.",
      "Vế 1 (sau từ 'Vì') nêu nguyên nhân. Vế 2 (sau từ 'nên') nêu kết quả."
    ]
  },
  {
    id: "ex-6",
    title: "Câu ghép chỉ tương phản",
    sentence: "Tuy trời mưa rất lớn nhưng các bạn học sinh vẫn đến lớp đúng giờ.",
    type: "fill_blank",
    difficulty: "medium",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "trời",
      predicate1: "mưa rất lớn",
      subject2: "các bạn học sinh",
      predicate2: "vẫn đến lớp đúng giờ",
      connector: "Tuy... nhưng..."
    },
    hints: [
      "Cặp 'Tuy... nhưng...' thể hiện sự tương phản: mặc dù có trở ngại nhưng vẫn làm được.",
      "Ai/Cái gì mưa rất lớn? Ai vẫn đến lớp đúng giờ?"
    ]
  },
  {
    id: "ex-7",
    title: "Câu ghép chỉ điều kiện - kết quả",
    sentence: "Nếu em chăm học thì em sẽ đạt kết quả tốt.",
    type: "fill_blank",
    difficulty: "medium",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "em",
      predicate1: "chăm học",
      subject2: "em",
      predicate2: "sẽ đạt kết quả tốt",
      connector: "Nếu... thì..."
    },
    hints: [
      "Cặp 'Nếu... thì...' cho biết mối quan hệ điều kiện - kết quả.",
      "Hai vế câu có cùng chủ ngữ. Ai chăm học? Ai sẽ đạt kết quả tốt?"
    ]
  },
  {
    id: "ex-8",
    title: "Câu ghép chỉ mục đích",
    sentence: "Chúng em chăm chỉ học tập để cha mẹ vui lòng.",
    type: "fill_blank",
    difficulty: "medium",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và từ nối.",
    correctAnswers: {
      subject1: "Chúng em",
      predicate1: "chăm chỉ học tập",
      subject2: "cha mẹ",
      predicate2: "vui lòng",
      connector: "để"
    },
    hints: [
      "Từ 'để' nối hai vế câu, thể hiện mục đích. Vế 1 là hành động, vế 2 là mục đích.",
      "Ai chăm chỉ học tập? Ai vui lòng?"
    ]
  },

  // === KHÓ (Hard) - Câu ghép phức tạp, nhiều thành phần ===
  {
    id: "ex-9",
    title: "Câu ghép chỉ tăng tiến",
    sentence: "Bạn Lan không chỉ học giỏi mà bạn ấy còn hát rất hay.",
    type: "fill_blank",
    difficulty: "hard",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "Bạn Lan",
      predicate1: "không chỉ học giỏi",
      subject2: "bạn ấy",
      predicate2: "còn hát rất hay",
      connector: "không chỉ... mà... còn..."
    },
    hints: [
      "Cặp 'không chỉ... mà... còn...' thể hiện quan hệ tăng tiến: vế sau bổ sung thêm cho vế trước.",
      "Vế 1 nói về việc học giỏi. Vế 2 nói thêm về tài năng khác. Chủ ngữ 'bạn ấy' thay thế cho 'Bạn Lan'."
    ]
  },
  {
    id: "ex-10",
    title: "Câu ghép chỉ sự lựa chọn",
    sentence: "Hoặc bạn đi bằng xe buýt hoặc bạn đi bộ đến trường.",
    type: "fill_blank",
    difficulty: "hard",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "bạn",
      predicate1: "đi bằng xe buýt",
      subject2: "bạn",
      predicate2: "đi bộ đến trường",
      connector: "Hoặc... hoặc..."
    },
    hints: [
      "Cặp 'Hoặc... hoặc...' cho thấy đây là câu ghép chỉ sự lựa chọn giữa hai việc.",
      "Cả hai vế đều có cùng chủ ngữ là 'bạn'. Vế 1 nêu lựa chọn thứ nhất, vế 2 nêu lựa chọn thứ hai."
    ]
  },
  {
    id: "ex-11",
    title: "Câu ghép chỉ nhượng bộ",
    sentence: "Mặc dù nhà ở xa nhưng Hoa không bao giờ đi học muộn.",
    type: "fill_blank",
    difficulty: "hard",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "nhà",
      predicate1: "ở xa",
      subject2: "Hoa",
      predicate2: "không bao giờ đi học muộn",
      connector: "Mặc dù... nhưng..."
    },
    hints: [
      "Cặp 'Mặc dù... nhưng...' giống 'Tuy... nhưng...', thể hiện sự nhượng bộ/tương phản.",
      "Vế 1: Cái gì ở xa? Vế 2: Ai không bao giờ đi học muộn?"
    ]
  },
  {
    id: "ex-12",
    title: "Câu ghép chỉ nguyên nhân (2)",
    sentence: "Do thời tiết quá nóng nên mọi người đều mệt mỏi.",
    type: "fill_blank",
    difficulty: "hard",
    instruction: "Phân tích cấu tạo câu ghép sau. Tìm chủ ngữ, vị ngữ của từng vế câu và cặp quan hệ từ.",
    correctAnswers: {
      subject1: "thời tiết",
      predicate1: "quá nóng",
      subject2: "mọi người",
      predicate2: "đều mệt mỏi",
      connector: "Do... nên..."
    },
    hints: [
      "Cặp 'Do... nên...' giống 'Vì... nên...', thể hiện quan hệ nguyên nhân - kết quả.",
      "Cái gì quá nóng? Ai đều mệt mỏi?"
    ]
  },
];

// Nhóm bài tập theo độ khó
export const exercisesByDifficulty = {
  easy: exercises.filter(e => e.difficulty === "easy"),
  medium: exercises.filter(e => e.difficulty === "medium"),
  hard: exercises.filter(e => e.difficulty === "hard"),
};
