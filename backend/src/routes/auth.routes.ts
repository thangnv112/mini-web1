import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, name, role = 'student' } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ error: 'Email và tên là bắt buộc' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email đã được đăng ký' });
    }

    const user = await prisma.user.create({
      data: { email, name, role }
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email là bắt buộc' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy tài khoản' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

export { router as authRoutes };
