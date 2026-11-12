/**
 * Mock AI scaffolding feedback system
 * Simulates 3 levels of pedagogical scaffolding for Vietnamese grammar exercises
 */

type FieldKey = 'subject1' | 'predicate1' | 'subject2' | 'predicate2' | 'connector';

interface FieldResult {
  key: FieldKey;
  label: string;
  isCorrect: boolean;
  studentValue: string;
  correctValue: string;
}

// Track attempt count per exercise for escalating scaffolding
const attemptTracker: Record<string, number> = {};

export function getAttemptCount(exerciseId: string): number {
  return attemptTracker[exerciseId] || 0;
}

export function incrementAttempt(exerciseId: string): number {
  attemptTracker[exerciseId] = (attemptTracker[exerciseId] || 0) + 1;
  return attemptTracker[exerciseId];
}

/**
 * Generate scaffolding feedback based on student's wrong answers
 * Level is determined by number of attempts
 */
export function generateScaffoldingFeedback(
  sentence: string,
  incorrectFields: FieldResult[],
  correctFields: FieldResult[],
  attemptNumber: number,
  exerciseHints: string[]
): string {
  // Determine scaffolding level based on attempts
  const level = attemptNumber <= 1 ? 1 : attemptNumber <= 2 ? 2 : 3;

  // Build praise for correct parts
  const praiseSection = buildPraise(correctFields);
  
  // Build guidance for incorrect parts  
  const guidanceSection = buildGuidance(incorrectFields, level, sentence, exerciseHints);

  return `${praiseSection}\n\n${guidanceSection}`;
}

function buildPraise(correctFields: FieldResult[]): string {
  if (correctFields.length === 0) {
    return "Cùng cố gắng thêm nhé! 💪";
  }
  
  const fieldNames = correctFields.map(f => f.label).join(", ");
  
  const praises = [
    `Tốt lắm! Em đã tìm đúng ${fieldNames} rồi đấy! 👏`,
    `Giỏi quá! Phần ${fieldNames} em làm chính xác! 🌟`,
    `Em rất giỏi! ${fieldNames} đúng rồi nè! ⭐`,
  ];
  
  return praises[Math.floor(Math.random() * praises.length)];
}

function buildGuidance(
  incorrectFields: FieldResult[],
  level: number,
  sentence: string,
  hints: string[]
): string {
  const firstWrong = incorrectFields[0];
  if (!firstWrong) return "";

  switch (level) {
    case 1:
      return buildLevel1Guidance(firstWrong, sentence);
    case 2:
      return buildLevel2Guidance(firstWrong, sentence, hints);
    case 3:
      return buildLevel3Guidance(firstWrong, sentence, incorrectFields);
    default:
      return buildLevel1Guidance(firstWrong, sentence);
  }
}

// ========== MỨC 1: Gợi ý nhẹ nhàng ==========
function buildLevel1Guidance(field: FieldResult, sentence: string): string {
  const { key, studentValue, label } = field;
  
  if (studentValue === "") {
    return `Bạn hãy thử điền phần **${label}** nhé! Em đọc kỹ lại câu "${sentence}" và tìm xem nào. Mình tin em làm được! 🤖`;
  }

  if (key.includes("subject")) {
    return `Hmm, phần ${label} chưa chính xác lắm. 🤔 Chủ ngữ thường là **người, sự vật, hiện tượng** thực hiện hành động. Em thử đọc lại vế câu này xem **ai/cái gì** đang được nhắc đến nhé!`;
  }
  
  if (key.includes("predicate")) {
    return `Phần ${label} gần đúng rồi! 😊 Vị ngữ thường cho biết **hoạt động, trạng thái, đặc điểm** của chủ ngữ. Em thử xem chủ ngữ ở vế này **làm gì/như thế nào** nhé!`;
  }
  
  // connector
  return `Phần cách nối chưa chính xác rồi. 🧐 Em thử tìm xem hai vế câu được nối bằng **từ nào** hoặc **dấu câu nào** nhé!`;
}

// ========== MỨC 2: Gợi ý cụ thể hơn ==========
function buildLevel2Guidance(field: FieldResult, sentence: string, hints: string[]): string {
  const { key, correctValue, label, studentValue } = field;
  
  // Use exercise-specific hints if available
  const hintText = hints.length > 0 ? `\n\n💡 **Gợi ý**: ${hints[0]}` : "";

  if (key.includes("subject")) {
    return `Cùng ôn lại kiến thức nhé! 📖\n\n**Chủ ngữ** là bộ phận trả lời cho câu hỏi **"Ai?"**, **"Con gì?"** hoặc **"Cái gì?"**.\n\nTrong vế này, em thử hỏi: **"Ai/Cái gì ${correctValue.includes(' ') ? '...' : ''}?"** để tìm chủ ngữ nha!${hintText}`;
  }
  
  if (key.includes("predicate")) {
    const relatedSubject = key === "predicate1" ? "subject1" : "subject2";
    return `Cùng ôn lại nhé! 📖\n\n**Vị ngữ** là bộ phận trả lời cho câu hỏi **"Làm gì?"**, **"Như thế nào?"** hoặc **"Là gì?"**.\n\nEm đã viết "${studentValue}" nhưng hãy xem lại: vị ngữ có đầy đủ chưa? Đôi khi vị ngữ gồm **nhiều từ** đấy!${hintText}`;
  }
  
  // connector
  const connectorExamples = "Ví dụ: **Vì... nên...**, **Tuy... nhưng...**, **Nếu... thì...**, hoặc các từ **và, còn, rồi**, hay dấu phẩy (,).";
  return `Hai vế câu ghép thường được nối bằng **quan hệ từ** hoặc **dấu câu**.\n\n${connectorExamples}\n\nEm đọc lại câu "${sentence}" và tìm xem hai vế nối bằng gì nhé!${hintText}`;
}

// ========== MỨC 3: Dẫn dắt sát, cho lựa chọn ==========
function buildLevel3Guidance(field: FieldResult, sentence: string, allIncorrect: FieldResult[]): string {
  const { key, correctValue, label, studentValue } = field;

  if (key.includes("subject")) {
    // Give multiple choices
    const fakeOptions = generateFakeOptions(correctValue, sentence);
    return `Mình sẽ giúp em từng bước nhé! 🤗\n\nTrong vế này, chủ ngữ là một trong các đáp án sau:\n\n**A.** ${fakeOptions[0]}\n**B.** ${fakeOptions[1]}\n**C.** ${fakeOptions[2]}\n\nEm chọn đáp án nào? Nhớ rằng chủ ngữ trả lời câu hỏi **"Ai/Cái gì?"** nhé!`;
  }
  
  if (key.includes("predicate")) {
    return `Để mình hướng dẫn em nhé! 📝\n\nSau khi tìm được chủ ngữ, phần còn lại trong vế câu chính là **vị ngữ**.\n\nĐáp án đúng cho ${label} là: **"${correctValue}"**\n\n📌 Ghi nhớ: Vị ngữ bao gồm **tất cả các từ** mô tả hành động hoặc trạng thái của chủ ngữ, kể cả các từ bổ sung ý nghĩa!`;
  }
  
  // connector - give answer directly at level 3
  return `Mình sẽ giải thích cho em nhé! 📚\n\nĐáp án đúng cho cách nối là: **"${correctValue}"**\n\n📌 Đây là cặp quan hệ từ thể hiện mối quan hệ giữa hai vế câu. Em hãy ghi nhớ nhé!`;
}

function generateFakeOptions(correct: string, sentence: string): string[] {
  // Create 3 options including the correct one at random position
  const words = sentence.replace(/[.,!?]/g, '').split(' ').filter(w => w.length > 1);
  const options: string[] = [correct];
  
  // Add some plausible wrong answers
  const fakeAnswers = words.filter(w => w.toLowerCase() !== correct.toLowerCase());
  while (options.length < 3 && fakeAnswers.length > 0) {
    const randomIdx = Math.floor(Math.random() * fakeAnswers.length);
    const candidate = fakeAnswers.splice(randomIdx, 1)[0];
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
  }
  
  // Fill remaining with generic options if needed
  while (options.length < 3) {
    options.push("(bỏ trống)");
  }
  
  // Shuffle
  return options.sort(() => Math.random() - 0.5);
}

/**
 * Check all fields and return detailed results
 */
export function evaluateAnswers(
  studentAnswers: Record<FieldKey, string>,
  correctAnswers: Record<FieldKey, string>
): { correct: FieldResult[]; incorrect: FieldResult[]; allCorrect: boolean } {
  const fieldLabels: Record<FieldKey, string> = {
    subject1: "Vế 1 - Chủ ngữ",
    predicate1: "Vế 1 - Vị ngữ",
    subject2: "Vế 2 - Chủ ngữ",
    predicate2: "Vế 2 - Vị ngữ",
    connector: "Cách nối"
  };

  const correct: FieldResult[] = [];
  const incorrect: FieldResult[] = [];

  for (const key of Object.keys(fieldLabels) as FieldKey[]) {
    const studentVal = studentAnswers[key]?.trim() || "";
    const correctVal = correctAnswers[key];
    
    const result: FieldResult = {
      key,
      label: fieldLabels[key],
      isCorrect: normalizeAnswer(studentVal) === normalizeAnswer(correctVal),
      studentValue: studentVal,
      correctValue: correctVal
    };

    if (result.isCorrect) {
      correct.push(result);
    } else {
      incorrect.push(result);
    }
  }

  return { correct, incorrect, allCorrect: incorrect.length === 0 };
}

/**
 * Normalize answer for comparison (case insensitive, trim whitespace, normalize connectors)
 */
function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\.\.\./g, '…')
    .replace(/,\s*/g, ',');
}
