# 🚀 Backend Moder Panel

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.x-green.svg)](https://www.mongodb.com)

## 📝 Описание
Backend часть проекта Moder Panel — это серверное приложение на Node.js, реализующее API для управления и модерации данных. Использует Express и MongoDB.

## ✨ Основные возможности
- 🔄 REST API для управления сущностями
- 💾 Подключение к базе данных MongoDB
- ⚡ Логика модерации и обработки данных
- ⏰ Cron-задачи и сервисные функции

## 🛠 Установка
```bash
# Клонируйте репозиторий
$ git clone <repo_url>
$ cd backend

# Установите зависимости
$ npm install
```

## 🚀 Запуск
```bash
# Запуск в режиме разработки
$ npm run dev

# Запуск в production
$ npm start
```

## 📁 Структура проекта
```
backend/
├── ModerController.js      # Контроллеры API
├── ModerService.js         # Бизнес-логика
├── connectDataBase.js      # Подключение к MongoDB
├── cron/                   # Cron-задачи
├── flags/                  # Флаги и вспомогательные данные
├── index.js                # Точка входа
├── package.json            # Зависимости и скрипты
├── router.js               # Маршрутизация
```

## ⚙️ Переменные окружения
Создайте файл `.env` и укажите следующие параметры:
```env
MONGODB_URI=your_mongodb_uri
PORT=3000
NODE_ENV=development
```

## 📞 Контакты
👤 **Автор:** krasivyys

---
© 2024 Moder Panel Backend 