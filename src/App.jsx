import React, { useEffect, useState } from 'react';
import { getClient } from './client';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import ChatInput from './components/ChatInput';
import ChatRoomHeader from './components/ChatRoomHeader';
import { SocketMessageTypes } from 'teleparty-websocket-lib';

function App() {
  const [client, setClient] = useState(null);
  const [nickname, setNickname] = useState('');
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connectIsReady, setConnectIsReady] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [typingUser, setTypingUser] = useState(''); // ✅ NEW

  useEffect(() => {
    if (!client) return;

    client._socketEventHandler.onMessage = (msg) => {
      console.log(msg);

      if (msg.type === "sendMessage") {
        console.log("📩 Incoming:", msg.data);
        setMessages((prev) => [...prev, msg.data]);
      }

      if (msg.type === 'setTypingPresence') {
        const { anyoneTyping, usersTyping } = msg.data;
        const myId = nickname;

        if (anyoneTyping) {
          const typingOtherUsers = usersTyping.filter((id) => id !== myId);
          setTypingUser(typingOtherUsers.length > 0 ? typingOtherUsers[0] : '');
        } else {
          setTypingUser('');
        }
      }
    };
  }, [client, nickname]);

  useEffect(() => {
    console.log("📬 Updated message list:", messages);
  }, [messages]);

  useEffect(() => {
    const c = getClient();
    setClient(c);

    const savedNickname = localStorage.getItem('nickname');
    const savedRoomId = localStorage.getItem('roomId');

    if (savedNickname && savedRoomId) {
      setActiveSession(true);
    } else {
      setActiveSession(false);
    }

    c._socketEventHandler.onConnectionReady = async () => {
      console.log('✅ WebSocket is ready');
      setConnectIsReady(true);

      if (savedNickname && savedRoomId) {
        try {
          const result = await c.joinChatRoom(savedNickname, savedRoomId);
          setMessages(prev => [...prev, ...(result.messages || [])]);
          setNickname(savedNickname);
          setRoomId(savedRoomId);
          setConnected(true);
        } catch {
          window.location.reload();
          localStorage.clear();
        }
      }
    };
  }, []);

  return (
    <div className="md:h-screen h-full flex justify-center items-center bg-gray-100">
      {!connected && !activeSession ? (
        <Home
          connectIsReady={connectIsReady}
          client={client}
          nickname={nickname}
          setNickname={setNickname}
          roomId={roomId}
          setRoomId={setRoomId}
          setMessages={setMessages}
          setConnected={setConnected}
        />
      ) : !connected && activeSession ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-gray-600">Reconnecting to chat...</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto max-md:flex flex-col justify-between">
          <ChatRoomHeader
            client={client}
            setNickname={setNickname}
            setRoomId={setRoomId}
            setConnected={setConnected}
            roomId={roomId}
          />
          <ChatRoom messages={messages} typingUser={typingUser} />
          <ChatInput client={client} setMessages={setMessages} nickname={nickname} />
        </div>
      )}
    </div>
  );
}

export default App;
