# Real-Time Chat Application (WebSocket)

A simple, real-time chat application built using **React**, **Tailwind CSS**, and the official **Teleparty WebSocket SDK**. Users can create or join rooms, exchange messages live, and view typing indicators across devices or browser tabs.

---

## Features

- Real-time messaging via WebSocket
- Create or join chat rooms using Room ID
- Typing indicator for other users
- Session persistence using localStorage
- Responsive and mobile-friendly UI
- Graceful reconnect with full-screen loader
- Copy Room ID with a single click

---

## Tech Stack

- **Frontend**: React (with Vite)
- **Styling**: Tailwind CSS
- **WebSocket**: [teleparty-websocket-lib](https://github.com/watchparty-org/teleparty-websocket-lib)
- **State Management**: React Hooks (useState, useEffect)

---

## Getting Started

### Clone and Run

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

npm install
npm run dev

Visit http://localhost:5173 in your browser.
