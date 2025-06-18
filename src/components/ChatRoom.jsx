import React, { useEffect, useRef } from 'react';

const formatTime = (ms) => {
  const date = new Date(ms);
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
};

function ChatRoom({ messages, typingUser }) {
  const chatRef = useRef(null);
  const myNickname = localStorage.getItem('nickname') || '';

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    console.log(typingUser, messages);
  }, [messages, typingUser]);

  return (
    <div
      ref={chatRef}
      className="h-[350px] relative max-md:h-[60vh] w-full md:min-w-xl overflow-y-auto flex flex-col border border-gray-300 rounded p-4 shadow-sm"
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet</p>
      ) : (
        messages.map((m, idx) => {
          const isSystem = m.isSystemMessage;
          const isMe = m.userNickname === myNickname;

          if (isSystem) {
            return (
              <p
                key={idx}
                className="text-center italic text-sm text-gray-600 my-3"
              >
                <span className="font-semibold not-italic">{m.userNickname}</span>{' '}
                {m.body}
              </p>
            );
          }

          return (
            <div
              key={idx}
              className={`mb-3  flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm break-words ${isMe ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-800'
                  }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {m.userNickname}{' '}
                  <span className="font-normal text-[10px] text-gray-500">
                    {formatTime(m.timestamp)}
                  </span>
                </div>
                {m.body}
              </div>
            </div>
          );
        })
      )}
      {typingUser && (
        <div className="text-xs font-semibold italic text-gray-700">
          <span className='absolute bottom-2 left-2'>Someone is typing ..<span className='animate-bounce absolute'>.</span></span>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
