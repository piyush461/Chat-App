import React, { useState, useEffect, useRef } from 'react';
import { SocketMessageTypes } from 'teleparty-websocket-lib';

function ChatInput({ client, nickname }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    if (isTyping) {
      client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
        typing: false,
        userNickname: nickname,
      });
      setIsTyping(false);
    }

    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message,
      userNickname: nickname,
    });

    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else {
      if (!isTyping) {
        setIsTyping(true);
        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
          typing: true
        });
      }

      clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
          typing: false
        });
        setIsTyping(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(typingTimeoutRef.current);
  }, []);

  return (
    <div className="mt-4 flex gap-2">
      <textarea
        rows="1"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
