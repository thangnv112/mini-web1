import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AiService } from '../services/ai.service';
import { getScaffoldingPrompt } from '../services/prompt.service';

const router = Router();
const prisma = new PrismaClient();
const aiService = new AiService();

// POST /api/ai/evaluate - AI evaluate answer with scaffolding
router.post('/evaluate', async (req, res) => {
  try {
    const { exerciseId, studentAnswer, attemptNumber, userId } = req.body;

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId }
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Không tìm thấy bài tập' });
    }

    const level = attemptNumber <= 1 ? 1 : attemptNumber <= 2 ? 2 : 3;
    
    // Get AI feedback
    const feedback = await aiService.evaluateAnswerWithScaffolding(
      exercise,
      studentAnswer,
      level
    );

    // Save chat history
    if (userId) {
      await prisma.aiChatHistory.create({
        data: {
          userId,
          exerciseId,
          sender: 'ai',
          message: feedback,
          scaffoldingLevel: level,
        }
      });
    }

    res.json({ 
      feedback,
      scaffoldingLevel: level,
    });
  } catch (error) {
    console.error('AI evaluate error:', error);
    // Fallback to a generic message if AI fails
    res.json({
      feedback: 'Rất tiếc, trợ lý AI đang bận. Em hãy thử lại sau nhé! 🤖',
      scaffoldingLevel: 1,
      error: true
    });
  }
});

// POST /api/ai/chat - Free-form chat with AI
router.post('/chat', async (req, res) => {
  try {
    const { message, exerciseId, userId } = req.body;

    // Save student message
    if (userId && exerciseId) {
      await prisma.aiChatHistory.create({
        data: {
          userId,
          exerciseId,
          sender: 'student',
          message,
          scaffoldingLevel: 0,
        }
      });
    }

    // For MVP, return a helpful generic response
    const response = `Câu hỏi hay lắm! 😊 Em hãy thử đọc lại câu văn thật kỹ nhé. Nhớ rằng:
- **Chủ ngữ** trả lời câu hỏi "Ai/Cái gì?"
- **Vị ngữ** trả lời câu hỏi "Làm gì/Như thế nào?"
- Hai vế câu ghép thường được nối bằng **quan hệ từ** hoặc **dấu phẩy**`;

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export { router as aiRoutes };
