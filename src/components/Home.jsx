import React, { useState } from 'react';

function Home({
  client,
  nickname,
  setNickname,
  roomId,
  setRoomId,
  setMessages,
  setConnected,
  connectIsReady,
}) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('create');

  const handleCreateRoom = async () => {
    if (!connectIsReady) return alert("Socket not ready");
    if (!nickname) return alert("Please enter your nickname");

    setLoading(true);
    try {
      const newRoomId = await client.createChatRoom(nickname);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roomId", newRoomId);
      setRoomId(newRoomId);
      setConnected(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleJoinRoom = async () => {
    if (!connectIsReady) return alert("Socket not ready");
    if (!nickname || !roomId) return alert("Enter both nickname and room ID");

    setLoading(true);
    try {
      const result = await client.joinChatRoom(nickname, roomId);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roomId", roomId);
      setMessages(prev => [...prev, ...(result.messages || [])]);
      setConnected(true);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      handleCreateRoom();
    } else {
      handleJoinRoom();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-start bg-gray-100 px-4">
      <div className="w-full md:min-w-md bg-white shadow-md rounded-lg p-4 space-y-4 transition-all duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800">Chat App</h2>
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 rounded-l ${mode === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('create')}
          >
            Create
          </button>
          <button
            className={`flex-1 py-2 rounded-r ${mode === 'join' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode('join')}
          >
            Join
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter your nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value.charAt(0).toUpperCase().concat(e.target.value.substring(1)))}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="transition-all duration-300">
          {mode === 'join' && (
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !connectIsReady}
          className={`w-full py-2 rounded text-white transition ${mode === 'create'
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-green-600 hover:bg-green-700'} disabled:opacity-50`}
        >
          {mode === 'create' ? 'Create Room' : 'Join Room'}
        </button>
      </div>
    </div>
  );
}

export default Home;
