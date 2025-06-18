import React, { useState } from 'react';

function ChatRoomHeader({ setNickname, setRoomId, roomId, setConnected }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const handleLeaveChat = () => {
    localStorage.clear();
    setNickname('');
    setRoomId('');
    setConnected(false);

    window.location.reload();
  };


  return (
    <div className="flex items-center justify-between gap-2 py-3">
      <button
        onClick={handleLeaveChat}
        className="bg-red-500 text-white px-3 py-2 text-xs rounded hover:bg-red-600"
      >
        Leave Chat
      </button>

      <div className='flex justify-between items-center'>
        <span className="text-xs font-medium text-gray-700">Room ID:</span>
        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{roomId}</span>
        <button
          onClick={handleCopy}
          className="text-sm bg-blue-500 text-white w-20 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

export default ChatRoomHeader;
