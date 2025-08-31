import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Electron + Vite + Telegram Bot</h1>
            <p>Управляй приложением через Telegram 🚀</p>
            <p>Команды бота: /list, /read filename, /update</p>
            <p>Команды бота: /list, /read filename, /update1</p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
