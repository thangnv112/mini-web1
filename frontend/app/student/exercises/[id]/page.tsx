"use client"

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { exercises } from "@/lib/data";
import { 
  evaluateAnswers, 
  generateScaffoldingFeedback, 
  incrementAttempt, 
  getAttemptCount 
} from "@/lib/mock-ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FillInBlank } from "@/components/exercise/FillInBlank";
import { AIChatPanel } from "@/components/ai/AIChatPanel";
import { AIMascot, MascotMood } from "@/components/ai/AIMascot";
import { Confetti } from "@/components/gamification/Confetti";
import { StarCounter } from "@/components/gamification/StarCounter";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import { sound } from "@/lib/sound";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX, Lightbulb, Sparkles, HelpCircle } from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

type FieldKey = 'subject1' | 'predicate1' | 'subject2' | 'predicate2' | 'connector';

export default function ExerciseSolvePage() {
  const params = useParams();
  const id = params.id as string;
  const exerciseIndex = exercises.findIndex(e => e.id === id);
  const exercise = exercises[exerciseIndex];
  
  const [answers, setAnswers] = useState<Record<FieldKey, string>>({
    subject1: "",
    predicate1: "",
    subject2: "",
    predicate2: "",
    connector: ""
  });
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      text: `Chào em! 👋 Hôm nay chúng ta cùng phân tích câu ghép này nhé!\n\n📌 **Hướng dẫn**: ${exercise?.instruction || 'Hãy đọc kỹ câu văn rồi điền vào các ô trống.'}\n\nKhi làm xong, em bấm nút **Kiểm tra** để mình xem nhé!`, 
      sender: "ai" 
    }
  ]);
  
  const [isCorrect, setIsCorrect] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [activeHintTab, setActiveHintTab] = useState(false);

  const [fieldStatuses, setFieldStatuses] = useState<Record<FieldKey, "default" | "correct" | "error">>({
    subject1: "default",
    predicate1: "default",
    subject2: "default",
    predicate2: "default",
    connector: "default"
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiLoading]);

  const handleSendMessage = async (text: string) => {
    setIsAiLoading(true);
    setMascotMood("thinking");

    // Add user message to UI immediately
    const userMsg: ChatMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const customApiKey = typeof window !== "undefined" ? localStorage.getItem("GEMINI_API_KEY") || undefined : undefined;

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          exerciseSentence: exercise.sentence,
          exerciseTitle: exercise.title,
          history: [...messages, userMsg],
          customApiKey,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        sound.playHint();
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        setMascotMood("happy");
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Gia sư AI đang suy nghĩ một chút, em hãy thử hỏi lại nhé! 🤖" },
        ]);
        setMascotMood("idle");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Đã có gián đoạn kết nối một chút. Em hãy thử lại nhé! 🤖" },
      ]);
      setMascotMood("idle");
    } finally {
      setIsAiLoading(false);
    }
  };

  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) sound.playPop();
  };

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-2xl font-bold text-slate-700">Không tìm thấy bài tập!</h2>
        <Link href="/student/exercises">
          <Button className="rounded-full">Quay lại danh sách</Button>
        </Link>
      </div>
    );
  }

  const handleCheck = () => {
    sound.playPop();
    setIsChecking(true);
    setMascotMood("thinking");
    
    // Simulate smart AI analysis
    setTimeout(() => {
      const attemptNum = incrementAttempt(exercise.id);
      const level = attemptNum <= 1 ? 1 : attemptNum <= 2 ? 2 : 3;
      setCurrentLevel(level);

      const { correct, incorrect, allCorrect } = evaluateAnswers(answers, exercise.correctAnswers);
      
      const newStatuses: Record<FieldKey, "default" | "correct" | "error"> = { ...fieldStatuses };
      correct.forEach(f => { newStatuses[f.key] = "correct"; });
      incorrect.forEach(f => { newStatuses[f.key] = "error"; });
      setFieldStatuses(newStatuses);

      const newMessages: ChatMessage[] = [];

      if (allCorrect) {
        sound.playSuccess();
        const stars = attemptNum === 1 ? 3 : attemptNum === 2 ? 2 : 1;
        setStarsEarned(stars);
        setIsCorrect(true);
        setMascotMood("celebrate");
        
        const starEmoji = "⭐".repeat(stars);
        newMessages.push({ 
          text: `🎉 **CHÍNH XÁC HOÀN TOÀN! Em rất xuất sắc!** ${starEmoji}\n\nEm nhận được **${stars} sao**! ${attemptNum === 1 ? "Đúng ngay lần đầu tiên — thật đáng khen! 🏆" : "Sau khi suy nghĩ lại em đã làm rất chuẩn! 👏"}\n\nHãy bấm sang câu tiếp theo để tiếp tục chinh phục nhé! 🚀`, 
          sender: "ai" 
        });
      } else {
        sound.playHint();
        setMascotMood("hint");

        const feedback = generateScaffoldingFeedback(
          exercise.sentence,
          incorrect,
          correct,
          attemptNum,
          exercise.hints
        );
        newMessages.push({ text: feedback, sender: "ai" });
      }

      setMessages(prev => [...prev, ...newMessages]);
      setIsChecking(false);
    }, 750);
  };

  const handleReset = () => {
    sound.playPop();
    setAnswers({ subject1: "", predicate1: "", subject2: "", predicate2: "", connector: "" });
    setFieldStatuses({ subject1: "default", predicate1: "default", subject2: "default", predicate2: "default", connector: "default" });
    setIsCorrect(false);
    setStarsEarned(0);
    setMascotMood("idle");
    setCurrentLevel(1);
    setMessages([
      { text: `Đã làm mới lại bài! Cùng cố gắng nhé 💪\n\n📌 ${exercise.instruction}`, sender: "ai" }
    ]);
  };

  const nextExercise = exerciseIndex < exercises.length - 1 ? exercises[exerciseIndex + 1] : null;

  const difficultyColors = {
    easy: "bg-emerald-100 text-emerald-700 border-emerald-300",
    medium: "bg-amber-100 text-amber-700 border-amber-300",
    hard: "bg-rose-100 text-rose-700 border-rose-300"
  };
  const difficultyLabels = { easy: "🌱 Dễ", medium: "🌟 Trung bình", hard: "🔥 Khó" };

  return (
    <div className="space-y-6 pb-12">
      <Confetti trigger={isCorrect} />
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
        <Link 
          href="/student/exercises" 
          onClick={() => sound.playPop()}
          className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Danh sách bài tập
        </Link>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColors[exercise.difficulty]}`}>
            {difficultyLabels[exercise.difficulty]}
          </span>

          <button
            onClick={toggleSound}
            title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <div className="w-36">
            <ProgressBar current={exerciseIndex + 1} total={exercises.length} />
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden rounded-3xl bg-white">
          {/* Card Header with Question Prompt */}
          <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-purple-50/50 border-b border-indigo-100/70 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📖</span>
                <CardTitle className="text-xl sm:text-2xl font-black text-slate-800">
                  {exercise.title}
                </CardTitle>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-white text-indigo-700 rounded-full border border-indigo-200 shadow-sm">
                Bài {exerciseIndex + 1} / {exercises.length}
              </span>
            </div>

            <p className="text-sm text-slate-600 font-medium mb-4">
              {exercise.instruction}
            </p>
            
            {/* The Target Sentence Banner */}
            <div className="relative p-6 sm:p-7 bg-white rounded-2xl border-2 border-indigo-200/80 shadow-md text-center">
              <span className="absolute -top-3 left-6 text-[11px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white px-3 py-0.5 rounded-full shadow-sm">
                Câu văn cần phân tích
              </span>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-relaxed tracking-wide">
                &ldquo;{exercise.sentence}&rdquo;
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* 2-Column Clauses Analysis Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clause 1 */}
              <motion.div 
                className="space-y-4 p-5 sm:p-6 bg-gradient-to-b from-orange-50/80 to-amber-50/40 rounded-2xl border-2 border-orange-200/80 shadow-sm"
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between border-b border-orange-200/60 pb-3">
                  <h4 className="font-extrabold text-orange-600 text-lg flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-black shadow-sm">
                      1
                    </span>
                    Vế Câu 1
                  </h4>
                  <span className="text-xs font-semibold text-orange-500 bg-orange-100/80 px-2 py-0.5 rounded-md">
                    Cụm C-V thứ nhất
                  </span>
                </div>

                <FillInBlank 
                  label="Chủ ngữ vế 1" 
                  value={answers.subject1} 
                  onChange={(v) => setAnswers({...answers, subject1: v})}
                  status={fieldStatuses.subject1}
                  disabled={isCorrect}
                />
                <FillInBlank 
                  label="Vị ngữ vế 1" 
                  value={answers.predicate1} 
                  onChange={(v) => setAnswers({...answers, predicate1: v})}
                  status={fieldStatuses.predicate1}
                  disabled={isCorrect}
                />
              </motion.div>
              
              {/* Clause 2 */}
              <motion.div 
                className="space-y-4 p-5 sm:p-6 bg-gradient-to-b from-emerald-50/80 to-teal-50/40 rounded-2xl border-2 border-emerald-200/80 shadow-sm"
                initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              >
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
                  <h4 className="font-extrabold text-emerald-600 text-lg flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm font-black shadow-sm">
                      2
                    </span>
                    Vế Câu 2
                  </h4>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    Cụm C-V thứ hai
                  </span>
                </div>

                <FillInBlank 
                  label="Chủ ngữ vế 2" 
                  value={answers.subject2} 
                  onChange={(v) => setAnswers({...answers, subject2: v})}
                  status={fieldStatuses.subject2}
                  disabled={isCorrect}
                />
                <FillInBlank 
                  label="Vị ngữ vế 2" 
                  value={answers.predicate2} 
                  onChange={(v) => setAnswers({...answers, predicate2: v})}
                  status={fieldStatuses.predicate2}
                  disabled={isCorrect}
                />
              </motion.div>
            </div>
            
            {/* Connector Field */}
            <motion.div 
              className="max-w-xl mx-auto p-5 sm:p-6 bg-gradient-to-b from-indigo-50/80 to-blue-50/40 rounded-2xl border-2 border-indigo-200/80 shadow-sm"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3 mb-4">
                <h4 className="font-extrabold text-indigo-700 text-base flex items-center gap-2">
                  <span className="text-xl">🔗</span> Cách Nối Các Vế Câu
                </h4>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-100/80 px-2.5 py-0.5 rounded-md">
                  Quan hệ từ / Dấu câu
                </span>
              </div>

              <FillInBlank 
                label="Cặp quan hệ từ hoặc từ/dấu nối" 
                value={answers.connector} 
                onChange={(v) => setAnswers({...answers, connector: v})}
                status={fieldStatuses.connector}
                disabled={isCorrect}
              />
            </motion.div>

            {/* Scaffolding Level Indicator Badge */}
            {!isCorrect && getAttemptCount(exercise.id) > 0 && (
              <div className="flex justify-center items-center gap-2 text-xs font-bold">
                <span className="text-slate-500">Mức trợ giúp AI:</span>
                <span className={`px-3 py-1 rounded-full ${
                  currentLevel === 1 ? 'bg-blue-100 text-blue-700' :
                  currentLevel === 2 ? 'bg-amber-100 text-amber-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {currentLevel === 1 ? '💡 Mức 1: Gợi ý định hướng' :
                   currentLevel === 2 ? '📖 Mức 2: Ôn tập kiến thức' :
                   '🎯 Mức 3: Hướng dẫn chi tiết'}
                </span>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {!isCorrect ? (
                <Button 
                  size="lg" 
                  onClick={handleCheck} 
                  disabled={isChecking}
                  className="rounded-full px-14 py-6 text-lg font-black shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all transform active:scale-95"
                >
                  {isChecking ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin text-xl">🤖</span> AI đang phân tích...
                    </span>
                  ) : (
                    "🔍 Kiểm Tra Bài Làm"
                  )}
                </Button>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleReset} 
                    className="rounded-full px-6 py-5 font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Làm lại bài này
                  </Button>

                  {nextExercise ? (
                    <Link href={`/student/exercises/${nextExercise.id}`}>
                      <Button 
                        size="lg" 
                        onClick={() => sound.playPop()}
                        className="rounded-full px-10 py-5 text-base font-black shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-2"
                      >
                        <span>Sang Câu {exerciseIndex + 2}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/student/progress">
                      <Button size="lg" className="rounded-full px-8 py-5 text-base font-bold bg-amber-500 hover:bg-amber-600 text-white">
                        🏆 Xem Tổng Kết Thành Tích
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Stars Earned Celebration */}
            {isCorrect && (
              <motion.div 
                className="flex justify-center pt-2"
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", bounce: 0.6 }}
              >
                <div className="flex items-center gap-3 bg-amber-50 px-8 py-4 rounded-3xl border-2 border-amber-300 shadow-md">
                  <StarCounter count={starsEarned} />
                  <span className="text-amber-800 font-extrabold text-base">
                    +{starsEarned} sao tích lũy!
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Pedagogical Tutor Panel with Mood Mascot */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.25 }}
        className="relative"
      >
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Trợ Lý Sư Phạm GenAI
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {messages.length - 1 > 0 ? `${messages.length - 1} phản hồi` : 'Sẵn sàng trợ giúp'}
          </span>
        </div>

        <div className="relative">
          <AIChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isAiLoading}
            exerciseSentence={exercise.sentence}
            exerciseTitle={exercise.title}
            mascotMood={mascotMood}
          />
        </div>
        <div ref={chatEndRef} />
      </motion.div>
    </div>
  );
}
