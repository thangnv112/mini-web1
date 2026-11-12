"use client"

import React, { useState, useRef, useEffect } from "react";
import { AIMascot, MascotMood } from "./AIMascot";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { Send, Sparkles, Settings2, Key, HelpCircle, CornerDownLeft, Loader2, Bot } from "lucide-react";
import { sound } from "@/lib/sound";

interface AIChatPanelProps {
  messages: ChatMessage[];
  onSendMessage?: (text: string) => Promise<void>;
  isLoading?: boolean;
  exerciseSentence?: string;
  exerciseTitle?: string;
  mascotMood?: MascotMood;
}

export function AIChatPanel({
  messages,
  onSendMessage,
  isLoading = false,
  exerciseSentence = "",
  exerciseTitle = "",
  mascotMood = "idle",
}: AIChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem("GEMINI_API_KEY");
      if (storedKey) {
        setApiKeyInput(storedKey);
        setApiKeySaved(true);
      }
    }
  }, []);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    chatScrollRef.current?.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    sound.playPop();
    setInputText("");

    if (onSendMessage) {
      await onSendMessage(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveApiKey = () => {
    sound.playPop();
    if (typeof window !== "undefined") {
      if (apiKeyInput.trim()) {
        localStorage.setItem("GEMINI_API_KEY", apiKeyInput.trim());
        setApiKeySaved(true);
      } else {
        localStorage.removeItem("GEMINI_API_KEY");
        setApiKeySaved(false);
      }
    }
    setShowSettings(false);
  };

  // Quick prompt chips suitable for 5th graders
  const quickSuggestions = [
    { label: "💡 Câu ghép là gì?", query: "Câu ghép là gì hả thầy cô?" },
    { label: "🔍 Cách tìm chủ ngữ", query: "Làm sao để tìm chủ ngữ trong vế câu?" },
    { label: "📝 Cách tìm vị ngữ", query: "Vị ngữ trong câu có đặc điểm gì?" },
    { label: "🔗 Quan hệ từ câu này", query: "Cặp quan hệ từ trong câu này biểu thị điều gì?" },
    { label: "❓ Gợi ý thêm cho em", query: "Thầy cô gợi ý thêm cách làm câu này cho em với!" },
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-50 via-indigo-50/80 to-purple-50/60 border-b border-indigo-100/80">
        <div className="flex items-center gap-3">
          <AIMascot mood={isLoading ? "thinking" : mascotMood} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-800 text-sm">Gia Sư AI Tiếng Việt 5</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] font-semibold text-indigo-600">
              {isLoading ? "Đang suy nghĩ câu trả lời..." : "Hỏi đáp ngữ pháp & hướng dẫn sư phạm"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playPop();
            setShowSettings(!showSettings);
          }}
          title="Cài đặt kết nối AI"
          className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Modal (Drawer) */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-indigo-50/90 border-b border-indigo-100 px-5 py-3 text-xs overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  Cấu hình Gemini API Key (Tùy chọn)
                </span>
                <span className="text-[11px] text-slate-500">
                  {apiKeySaved ? "🟢 Đã lưu Key cá nhân" : "🟡 Đang dùng Smart Engine tích hợp"}
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Hệ thống mặc định có sẵn trí tuệ sư phạm Tiếng Việt 5. Nếu bạn muốn kết nối trực tiếp Gemini AI cá nhân, hãy dán API key vào đây:
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="Dán Gemini API Key (AIzaSy...)"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-indigo-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all"
                >
                  Lưu Key
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages Box */}
      <div
        ref={chatScrollRef}
        className="p-5 space-y-4 h-80 overflow-y-auto bg-slate-50/40 divide-y divide-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "ai" && (
                <div className="shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-base shadow-xs">
                    🤖
                  </div>
                </div>
              )}

              <div
                className={`p-4 rounded-3xl max-w-[85%] text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-sm"
                    : "bg-white border-2 border-indigo-100/70 text-slate-800 rounded-bl-sm"
                }`}
              >
                {formatMessage(msg.text)}
              </div>

              {msg.sender === "user" && (
                <div className="shrink-0 mt-0.5 w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-white text-sm font-bold shadow-xs">
                  👦
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm">
                🤖
              </div>
              <div className="bg-white border border-indigo-100 rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-2 text-xs font-semibold text-indigo-600">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Gia sư AI đang viết câu trả lời...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions Chips */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Gợi ý hỏi:
        </span>
        {quickSuggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.query)}
            disabled={isLoading}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 border border-slate-200/80 hover:border-indigo-200 transition-all shrink-0 whitespace-nowrap shadow-2xs active:scale-95 disabled:opacity-50"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Em muốn hỏi gì về câu ghép này? Hãy nhập câu hỏi nhé..."
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all disabled:opacity-50"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
          className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-transform active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
        </button>
      </div>
    </div>
  );
}

/**
 * Enhanced markdown formatting with bold, list items, and highlights
 */
function formatMessage(text: string): React.ReactNode {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Format bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formattedLine = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className="font-bold text-indigo-700">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={partIdx}>{part}</span>;
    });

    return (
      <React.Fragment key={lineIdx}>
        {formattedLine}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}
