// src/Components/ChatWidget.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { FaRobot, FaTimes, FaPaperPlane, FaComments, FaUtensils, FaMapMarkerAlt, FaClock, FaUserTie } from 'react-icons/fa';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Welcome to Lightning Ristorané! I am your AI dining assistant. How may I assist you with our menu, opening hours, or restaurant policies today?"
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    // Add user message to UI
    const newMessages = [...messages, { role: 'user', content: messageText.trim() }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Prepare history (exclude initial greeting to keep payload clean)
      const historyPayload = newMessages.slice(1, -1).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await axios.post(`${backendURL}/api/chat`, {
        message: messageText.trim(),
        history: historyPayload
      });

      if (response.data.success && response.data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I couldn't process your request right now. Please try again shortly." }]);
      }
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Our AI assistant is temporarily offline. Please check back soon or contact us by phone!" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionChips = [
    { label: "🌱 Vegetarian", text: "Can you recommend a delicious vegetarian dish from your live menu?" },
    { label: "🔥 Spicy Dishes", text: "What are your best spicy recommendations?" },
    { label: "💪 High Protein", text: "What high protein meals do you currently offer?" },
    { label: "💰 Under ₹300", text: "Can you recommend a great dinner option under ₹300?" },
    { label: "🕒 Opening Hours", text: "What are your opening hours throughout the week?" },
    { label: "📍 Location", text: "Where is the restaurant located?" }
  ];

  // Helper to format raw markdown bullets (*) and bold (**text**) cleanly
  const formatBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g);
    return parts.map((part, i) => {
      if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
        return (
          <strong key={i} className="font-semibold text-amber-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedMessage = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Detect bullet points starting with * or -
      const bulletMatch = line.match(/^(\s*)[*-]\s+(.*)/);
      if (bulletMatch) {
        const [, , text] = bulletMatch;
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-amber-400 font-bold mt-0.5 select-none">•</span>
            <span className="flex-1 leading-snug">{formatBoldText(text)}</span>
          </div>
        );
      }
      // Regular line or paragraph
      return (
        <p key={idx} className={line.trim() ? "my-1 leading-snug" : "h-1.5"}>
          {formatBoldText(line)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Closed State Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border-2 border-amber-300/40"
          title="Ask AI Waiter"
        >
          <FaRobot className="text-2xl animate-bounce" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-semibold text-sm pr-1">
            Ask AI Waiter
          </span>
        </button>
      )}

      {/* Opened State Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[520px] bg-gray-900/95 backdrop-blur-md border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-amber-500/30 px-4 py-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                <FaRobot className="text-lg" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Lightning AI Waiter
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Online"></span>
                </h3>
                <p className="text-[11px] text-gray-400 leading-none">Official Dining Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-amber-500 transition-colors p-1.5 rounded-lg hover:bg-gray-800"
              title="Close Chat"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} text-sm`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mr-2 mt-1 flex-shrink-0 text-xs">
                    <FaRobot />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-medium rounded-br-none whitespace-pre-wrap'
                      : 'bg-gray-800/90 text-gray-100 border border-gray-700/80 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'assistant' ? renderFormattedMessage(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center text-sm">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mr-2 flex-shrink-0 text-xs">
                  <FaRobot />
                </div>
                <div className="bg-gray-800/90 text-gray-400 border border-gray-700/80 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-2">
                  <span className="text-xs italic">AI Waiter is thinking</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {messages.length <= 2 && !loading && (
            <div className="px-3 py-2 bg-gray-900/60 border-t border-gray-800/80 flex flex-wrap gap-1.5">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(chip.text)}
                  className="text-[11px] bg-gray-800 hover:bg-amber-500/20 hover:border-amber-500/50 text-gray-300 hover:text-amber-400 border border-gray-700 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-gray-900 border-t border-gray-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about our menu or hours..."
              disabled={loading}
              className="flex-1 bg-gray-800/90 text-white placeholder-gray-400 text-sm px-3.5 py-2.5 rounded-xl border border-gray-700/80 focus:outline-none focus:border-amber-500/60 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-bold p-2.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center"
              title="Send Message"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
