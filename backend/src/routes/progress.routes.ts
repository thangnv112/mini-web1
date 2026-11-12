import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/progress/:userId - Get student progress
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all attempts by user
    const attempts = await prisma.exerciseAttempt.findMany({
      where: { userId },
      include: { exercise: true },
      orderBy: { submittedAt: 'desc' }
    });

    // Calculate statistics
    const completedExerciseIds = new Set(
      attempts.filter(a => a.isCorrect).map(a => a.exerciseId)
    );

    const totalStars = attempts
      .filter(a => a.isCorrect)
      .reduce((sum, a) => sum + a.starsEarned, 0);

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const accuracyRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    // Get progress by topic
    const progressByTopic = await prisma.studentProgress.findMany({
      where: { userId }
    });

    res.json({
      userId,
      totalStars,
      completedExercises: completedExerciseIds.size,
      totalAttempts,
      accuracyRate: Math.round(accuracyRate),
      recentAttempts: attempts.slice(0, 10),
      progressByTopic
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/teacher/dashboard - Teacher dashboard stats
router.get('/teacher/dashboard', async (req, res) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: 'student' } });
    const totalExercises = await prisma.exercise.count();
    const totalAttempts = await prisma.exerciseAttempt.count();
    const correctAttempts = await prisma.exerciseAttempt.count({ where: { isCorrect: true } });

    res.json({
      totalStudents,
      totalExercises,
      totalAttempts,
      correctAttempts,
      averageAccuracy: totalAttempts > 0 
        ? Math.round((correctAttempts / totalAttempts) * 100) 
        : 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export { router as progressRoutes };
