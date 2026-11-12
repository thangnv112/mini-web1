import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu seed dữ liệu...');

  // Create a teacher user
  const teacher = await prisma.user.upsert({
    where: { email: 'giaovien@example.com' },
    update: {},
    create: {
      email: 'giaovien@example.com',
      name: 'Cô Nguyễn Thị Hiền',
      role: 'teacher',
    },
  });

  // Create a demo student
  const student = await prisma.user.upsert({
    where: { email: 'hocsinh@example.com' },
    update: {},
    create: {
      email: 'hocsinh@example.com',
      name: 'Nguyễn Văn An',
      role: 'student',
    },
  });

  console.log('👤 Tạo users thành công');

  // Create 12 exercises
  const exercisesData = [
    // === DỄ ===
    {
      title: 'Câu ghép với dấu phẩy',
      description: 'Phân tích câu ghép đơn giản nối bằng dấu phẩy',
      sentence: 'Mặt trời mọc, sương tan dần.',
      correctAnswer: JSON.stringify({
        subject1: 'Mặt trời',
        predicate1: 'mọc',
        subject2: 'sương',
        predicate2: 'tan dần',
        connector: ','
      }),
      type: 'fill_blank',
      difficulty: 'easy',
      topic: 'cau_ghep',
      orderIndex: 1,
    },
    {
      title: 'Câu ghép với từ "và"',
      description: 'Phân tích câu ghép nối bằng từ "và"',
      sentence: 'Gió thổi mạnh và cây cối nghiêng ngả.',
      correctAnswer: JSON.stringify({
        subject1: 'Gió',
        predicate1: 'thổi mạnh',
        subject2: 'cây cối',
        predicate2: 'nghiêng ngả',
        connector: 'và'
      }),
      type: 'fill_blank',
      difficulty: 'easy',
      topic: 'cau_ghep',
      orderIndex: 2,
    },
    {
      title: 'Câu ghép với từ "còn"',
      description: 'Phân tích câu ghép nối bằng từ "còn"',
      sentence: 'Mẹ đi chợ còn bố ở nhà.',
      correctAnswer: JSON.stringify({
        subject1: 'Mẹ',
        predicate1: 'đi chợ',
        subject2: 'bố',
        predicate2: 'ở nhà',
        connector: 'còn'
      }),
      type: 'fill_blank',
      difficulty: 'easy',
      topic: 'cau_ghep',
      orderIndex: 3,
    },
    {
      title: 'Câu ghép với dấu phẩy (2)',
      description: 'Phân tích câu ghép đơn giản nối bằng dấu phẩy',
      sentence: 'Chim hót líu lo, bướm bay lượn khắp vườn.',
      correctAnswer: JSON.stringify({
        subject1: 'Chim',
        predicate1: 'hót líu lo',
        subject2: 'bướm',
        predicate2: 'bay lượn khắp vườn',
        connector: ','
      }),
      type: 'fill_blank',
      difficulty: 'easy',
      topic: 'cau_ghep',
      orderIndex: 4,
    },

    // === TRUNG BÌNH ===
    {
      title: 'Câu ghép chỉ nguyên nhân - kết quả',
      description: 'Phân tích câu ghép với cặp quan hệ từ Vì... nên...',
      sentence: 'Vì trời mưa to nên đường rất trơn.',
      correctAnswer: JSON.stringify({
        subject1: 'trời',
        predicate1: 'mưa to',
        subject2: 'đường',
        predicate2: 'rất trơn',
        connector: 'Vì... nên...'
      }),
      type: 'fill_blank',
      difficulty: 'medium',
      topic: 'cau_ghep',
      orderIndex: 5,
    },
    {
      title: 'Câu ghép chỉ tương phản',
      description: 'Phân tích câu ghép với cặp quan hệ từ Tuy... nhưng...',
      sentence: 'Tuy trời mưa rất lớn nhưng các bạn học sinh vẫn đến lớp đúng giờ.',
      correctAnswer: JSON.stringify({
        subject1: 'trời',
        predicate1: 'mưa rất lớn',
        subject2: 'các bạn học sinh',
        predicate2: 'vẫn đến lớp đúng giờ',
        connector: 'Tuy... nhưng...'
      }),
      type: 'fill_blank',
      difficulty: 'medium',
      topic: 'cau_ghep',
      orderIndex: 6,
    },
    {
      title: 'Câu ghép chỉ điều kiện - kết quả',
      description: 'Phân tích câu ghép với cặp quan hệ từ Nếu... thì...',
      sentence: 'Nếu em chăm học thì em sẽ đạt kết quả tốt.',
      correctAnswer: JSON.stringify({
        subject1: 'em',
        predicate1: 'chăm học',
        subject2: 'em',
        predicate2: 'sẽ đạt kết quả tốt',
        connector: 'Nếu... thì...'
      }),
      type: 'fill_blank',
      difficulty: 'medium',
      topic: 'cau_ghep',
      orderIndex: 7,
    },
    {
      title: 'Câu ghép chỉ mục đích',
      description: 'Phân tích câu ghép nối bằng từ "để"',
      sentence: 'Chúng em chăm chỉ học tập để cha mẹ vui lòng.',
      correctAnswer: JSON.stringify({
        subject1: 'Chúng em',
        predicate1: 'chăm chỉ học tập',
        subject2: 'cha mẹ',
        predicate2: 'vui lòng',
        connector: 'để'
      }),
      type: 'fill_blank',
      difficulty: 'medium',
      topic: 'cau_ghep',
      orderIndex: 8,
    },

    // === KHÓ ===
    {
      title: 'Câu ghép chỉ tăng tiến',
      description: 'Phân tích câu ghép với cặp quan hệ từ không chỉ... mà... còn...',
      sentence: 'Bạn Lan không chỉ học giỏi mà bạn ấy còn hát rất hay.',
      correctAnswer: JSON.stringify({
        subject1: 'Bạn Lan',
        predicate1: 'không chỉ học giỏi',
        subject2: 'bạn ấy',
        predicate2: 'còn hát rất hay',
        connector: 'không chỉ... mà... còn...'
      }),
      type: 'fill_blank',
      difficulty: 'hard',
      topic: 'cau_ghep',
      orderIndex: 9,
    },
    {
      title: 'Câu ghép chỉ sự lựa chọn',
      description: 'Phân tích câu ghép với cặp quan hệ từ Hoặc... hoặc...',
      sentence: 'Hoặc bạn đi bằng xe buýt hoặc bạn đi bộ đến trường.',
      correctAnswer: JSON.stringify({
        subject1: 'bạn',
        predicate1: 'đi bằng xe buýt',
        subject2: 'bạn',
        predicate2: 'đi bộ đến trường',
        connector: 'Hoặc... hoặc...'
      }),
      type: 'fill_blank',
      difficulty: 'hard',
      topic: 'cau_ghep',
      orderIndex: 10,
    },
    {
      title: 'Câu ghép chỉ nhượng bộ',
      description: 'Phân tích câu ghép với cặp quan hệ từ Mặc dù... nhưng...',
      sentence: 'Mặc dù nhà ở xa nhưng Hoa không bao giờ đi học muộn.',
      correctAnswer: JSON.stringify({
        subject1: 'nhà',
        predicate1: 'ở xa',
        subject2: 'Hoa',
        predicate2: 'không bao giờ đi học muộn',
        connector: 'Mặc dù... nhưng...'
      }),
      type: 'fill_blank',
      difficulty: 'hard',
      topic: 'cau_ghep',
      orderIndex: 11,
    },
    {
      title: 'Câu ghép chỉ nguyên nhân (2)',
      description: 'Phân tích câu ghép với cặp quan hệ từ Do... nên...',
      sentence: 'Do thời tiết quá nóng nên mọi người đều mệt mỏi.',
      correctAnswer: JSON.stringify({
        subject1: 'thời tiết',
        predicate1: 'quá nóng',
        subject2: 'mọi người',
        predicate2: 'đều mệt mỏi',
        connector: 'Do... nên...'
      }),
      type: 'fill_blank',
      difficulty: 'hard',
      topic: 'cau_ghep',
      orderIndex: 12,
    },
  ];

  // Delete existing exercises and recreate
  await prisma.aiChatHistory.deleteMany();
  await prisma.exerciseAttempt.deleteMany();
  await prisma.exercise.deleteMany();

  for (const exerciseData of exercisesData) {
    await prisma.exercise.create({
      data: {
        ...exerciseData,
        createdById: teacher.id,
      }
    });
  }

  console.log(`📝 Tạo ${exercisesData.length} bài tập thành công`);

  // Create initial progress for student
  await prisma.studentProgress.upsert({
    where: { id: 'demo-progress' },
    update: {},
    create: {
      id: 'demo-progress',
      userId: student.id,
      topic: 'cau_ghep',
      totalExercises: exercisesData.length,
      completedExercises: 0,
      totalStars: 0,
      accuracyRate: 0,
    }
  });

  console.log('📊 Tạo progress thành công');
  console.log('✅ Seed hoàn tất!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
