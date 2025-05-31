# Moder Panel

Модераторская панель для управления контентом и пользователями.

## Структура проекта

Проект состоит из двух основных частей:
- `frontend/` - Vue.js клиентская часть
- `backend/` - Node.js серверная часть

## Требования

- Node.js (версия 14 или выше)
- npm или yarn
- MongoDB

## Установка и запуск

### Backend

1. Перейдите в директорию backend:
```bash
cd backend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env в корне backend директории и добавьте необходимые переменные окружения:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/moder-panel
JWT_SECRET=your_jwt_secret
```

4. Запустите сервер:
```bash
npm start
```

Сервер будет доступен по адресу: http://localhost:3000

### Frontend

1. Перейдите в директорию frontend:
```bash
cd frontend
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл .env в корне frontend директории:
```env
VUE_APP_API_URL=http://localhost:3000
```

4. Запустите клиентскую часть:
```bash
npm run serve
```

Приложение будет доступно по адресу: http://localhost:8080

## Основные функции

- Управление пользователями
- Модерация контента
- Система уведомлений
- Статистика и аналитика

## Технологии

### Frontend
- Vue.js
- Vuex
- Vue Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Socket.io

## Разработка

### Структура кода

#### Frontend
```
frontend/
├── src/
│   ├── components/    # Vue компоненты
│   ├── views/        # Страницы приложения
│   ├── store/        # Vuex хранилище
│   ├── router/       # Маршрутизация
│   └── assets/       # Статические ресурсы
```

#### Backend
```
backend/
├── controllers/      # Контроллеры
├── models/          # Mongoose модели
├── routes/          # API маршруты
├── middleware/      # Промежуточное ПО
└── utils/           # Вспомогательные функции
```

## Лицензия

MIT
