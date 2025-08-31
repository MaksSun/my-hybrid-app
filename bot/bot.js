import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⚠️ Замени на свой токен от BotFather
const token = "8285867267:AAGZwZX7cdrQBhB6V3wA1CB05SKlAJOrqJs";
const bot = new TelegramBot(token, { polling: true });

// Папка для файлов
const WORKDIR = path.join(__dirname, "../files");
if (!fs.existsSync(WORKDIR)) fs.mkdirSync(WORKDIR);

// Папка проекта для git pull
const PROJECT_DIR = path.join(__dirname, "..");

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Привет! Я бот 🚀\nКоманды:\n/list\n/read <файл>\n/update");
});

// список файлов
bot.onText(/\/list/, (msg) => {
    const files = fs.readdirSync(WORKDIR);
    bot.sendMessage(msg.chat.id, "📂 Файлы:\n" + (files.join("\n") || "Пусто"));
});

// чтение файла
bot.onText(/\/read (.+)/, (msg, match) => {
    const filePath = path.join(WORKDIR, match[1]);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        bot.sendMessage(msg.chat.id, `📄 ${match[1]}:\n\n${content}`);
    } else {
        bot.sendMessage(msg.chat.id, "❌ Файл не найден.");
    }
});

// git pull
bot.onText(/\/update/, (msg) => {
    bot.sendMessage(msg.chat.id, "🚀 Обновляюсь с GitHub...");
    exec(`cd ${PROJECT_DIR} && git pull`, (error, stdout, stderr) => {
        if (error) {
            bot.sendMessage(msg.chat.id, `❌ Ошибка: ${error.message}`);
            return;
        }
        if (stderr) {
            bot.sendMessage(msg.chat.id, `⚠️ Предупреждение: ${stderr}`);
        }
        bot.sendMessage(msg.chat.id, `✅ Готово:\n${stdout}`);
    });
});
