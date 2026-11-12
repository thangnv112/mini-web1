import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/exercises - List all exercises
router.get('/', async (req, res) => {
  try {
    const { topic, difficulty } = req.query;
    
    const where: any = {};
    if (topic) where.topic = topic;
    if (difficulty) where.difficulty = difficulty;

    const exercises = await prisma.exercise.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        sentence: true,
        type: true,
        difficulty: true,
        topic: true,
        orderIndex: true,
      }
    });

    res.json({ exercises });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/exercises/:id - Get exercise detail
router.get('/:id', async (req, res) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: req.params.id }
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Không tìm thấy bài tập' });
    }

    // Parse correctAnswer but don't send it to client directly
    // Only send metadata for the exercise
    const { correctAnswer, ...exerciseData } = exercise;

    res.json({ exercise: exerciseData });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/exercises/:id/submit - Submit answer and get evaluation
router.post('/:id/submit', async (req, res) => {
  try {
    const { userId, studentAnswer, attemptNumber } = req.body;
    const exerciseId = req.params.id;

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId }
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Không tìm thấy bài tập' });
    }

    const correctAnswer = JSON.parse(exercise.correctAnswer);
    const parsedStudentAnswer = typeof studentAnswer === 'string' 
      ? JSON.parse(studentAnswer) 
      : studentAnswer;

    // Evaluate each field
    const results: Record<string, { isCorrect: boolean; studentValue: string; correctValue: string }> = {};
    let allCorrect = true;

    for (const key of Object.keys(correctAnswer)) {
      const studentVal = (parsedStudentAnswer[key] || '').trim().toLowerCase();
      const correctVal = correctAnswer[key].trim().toLowerCase();
      const isCorrect = studentVal === correctVal;
      
      results[key] = {
        isCorrect,
        studentValue: parsedStudentAnswer[key] || '',
        correctValue: correctAnswer[key]
      };
      
      if (!isCorrect) allCorrect = false;
    }

    // Calculate stars
    const stars = allCorrect ? (attemptNumber <= 1 ? 3 : attemptNumber <= 2 ? 2 : 1) : 0;
    
    // Determine scaffolding level
    const scaffoldingLevel = attemptNumber <= 1 ? 1 : attemptNumber <= 2 ? 2 : 3;

    // Save attempt
    if (userId) {
      await prisma.exerciseAttempt.create({
        data: {
          userId,
          exerciseId,
          studentAnswer: JSON.stringify(parsedStudentAnswer),
          attemptNumber: attemptNumber || 1,
          isCorrect: allCorrect,
          scaffoldingLevel,
          starsEarned: stars,
        }
      });
    }

    res.json({
      allCorrect,
      results,
      starsEarned: stars,
      scaffoldingLevel,
      attemptNumber
    });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export { router as exerciseRoutes };
