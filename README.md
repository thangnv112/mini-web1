# Tiếng Việt Lớp 5 - GenAI Tutor 📚🤖

> **Đề tài:** Thiết kế hệ thống bài tập tương tác thông minh hỗ trợ học sinh lớp 5 tự học nội dung về câu dưới sự hỗ trợ của trí tuệ nhân tạo (GenAI).

🌐 **Demo Trực Tuyến (Production):** [https://frontend-kappa-eight-4pt9sckxyh.vercel.app](https://frontend-kappa-eight-4pt9sckxyh.vercel.app)

---

## 🌟 Giới thiệu

Hệ thống bài tập trực quan, thân thiện dành cho học sinh tiểu học (10-11 tuổi) học ngữ pháp Tiếng Việt lớp 5 (chuyên đề: **Câu ghép**). Thay vì chấm điểm đúng/sai đơn thuần, hệ thống tích hợp **Gia sư AI** sư phạm với cơ chế **3 mức Scaffolding**:
1. **Mức 1 (Gợi ý định hướng):** Đặt câu hỏi gợi mở để học sinh tự tư duy.
2. **Mức 2 (Ôn tập kiến thức):** Nhắc lại quy tắc ngữ pháp liên quan.
3. **Mức 3 (Hướng dẫn chi tiết):** Đưa ra các phương án lựa chọn và phân tích chuyên sâu.

Đồng thời, học sinh có thể **trò chuyện, hỏi đáp 2 chiều với trợ lý AI** (hỗ trợ Google Gemini API) về mọi khái niệm ngữ pháp trong lúc làm bài.

---

## 🚀 Tính năng nổi bật

- 🎮 **12 Bài tập tương tác:** Phân tích cấu tạo vế câu ghép (Chủ ngữ, Vị ngữ vế 1 & 2, Cách nối/Quan hệ từ).
- 🤖 **Mascot AI hoạt hình sinh động:** Robot Mascot biểu cảm đa trạng thái (Vui mừng, Suy nghĩ, Gợi ý, Ăn mừng).
- 💬 **Hỏi đáp trực tiếp với AI (Q&A):** Chat thời gian thực với AI sư phạm, hỗ trợ nút gợi ý câu hỏi nhanh (Quick Chips) và tùy chọn cấu hình Gemini API Key.
- 🏆 **Gamification (Game hóa học tập):** Tích lũy sao ⭐ (3/2/1 sao tùy số lần thử), huy hiệu khen thưởng, chuỗi ngày học (Streak), pháo hoa chúc mừng (Confetti).
- 🔊 **Hiệu ứng âm thanh sinh động:** Tích hợp bộ phát âm thanh Web Audio API (pop, chime, bell) không cần phụ thuộc thư viện ngoài.
- 📱 **Giao diện chuẩn EdTech:** Màu sắc tươi sáng, font chữ to rõ, responsive tối ưu trên cả máy tính và máy tính bảng.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + Custom Design System
- **Animation:** Framer Motion, canvas-confetti
- **Audio:** Web Audio API Native Synth
- **Deployment:** Vercel

### Backend
- **Framework:** Express.js + TypeScript
- **ORM / Database:** Prisma ORM + SQLite
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Security:** Helmet, CORS, Rate Limiting

---

## 💻 Hướng dẫn chạy cục bộ (Local Development)

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
# Mở trình duyệt tại http://localhost:3000
```

### 2. Backend (Tùy chọn)
```bash
cd backend
npm install
npx prisma db push
npm run seed
npm run dev
# Server API chạy tại http://localhost:3001
```

---

## 📄 Bản quyền & Tác giả
Dự án được xây dựng phục vụ nghiên cứu ứng dụng GenAI trong giáo dục tiểu học.
