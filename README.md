# Payments

Веб-приложение для управления личными финансами: транзакции, аналитика, накопления, цели и настройки профиля.

## Стек

| Категория         | Технологии                                                        |
| ----------------- | ----------------------------------------------------------------- |
| UI                | React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| Сборка            | Vite 8, Rolldown, React Compiler                                  |
| Маршрутизация     | React Router 7                                                    |
| Состояние и API   | Redux Toolkit, RTK Query                                          |
| Формы             | React Hook Form                                                   |
| Графики           | Recharts                                                          |
| i18n              | i18next, react-i18next                                            |
| Качество кода     | ESLint 10, Prettier, Husky, Commitlint                            |
| CI                | GitHub Actions                                                    |
| Пакетный менеджер | Yarn 4 (Berry)                                                    |

## Архитектура

Проект построен по методологии [Feature-Sliced Design (FSD)](https://feature-sliced.design/).

```
src/
├── app/         # Точка входа, роутер, Redux store, layouts
├── pages/       # Страницы (композиция widgets/features)
├── widgets/     # Крупные UI-блоки (дашборды, навигация, графики)
├── features/    # Пользовательские сценарии (создание цели, фильтры и т.д.)
├── entities/    # Бизнес-сущности (goal, session, settings)
└── shared/      # UI-kit, API, конфиги, утилиты, i18n
```

### Правила импортов

Слой может импортировать только из слоёв ниже:

```
app → pages → widgets → features → entities → shared
```

### Сегменты внутри слайса

| Сегмент   | Назначение                            |
| --------- | ------------------------------------- |
| `ui/`     | React-компоненты                      |
| `model/`  | Store, типы, селекторы, бизнес-логика |
| `api/`    | RTK Query endpoints                   |
| `lib/`    | Вспомогательные функции               |
| `config/` | Константы и конфигурация              |

### Слои проекта

**Entities**

- `goal` — цели накопления
- `session` — авторизация, токены
- `settings` — настройки приложения
- `onboarding-status` — статус прохождения онбординга

**Features**

- `add-data-action` — загрузка выписок / ручной ввод данных
- `create-goal` — создание цели
- `edit-goal` — редактирование и пополнение/снятие с цели
- `transactions-filter` — фильтрация транзакций

**Widgets**

- `account-balance`, `finance-chart`, `spends-chart`, `yearly-finance`, `monthly-spends`
- `dashboard-savings`, `dashboard-transactions`, `analytics-dashboard`
- `home-navigation`

**Pages**

- `/` — главная
- `/transactions`, `/analytics`, `/saves`, `/profile`, `/settings`
- `/auth`, `/auth/pin`, `/auth/pin/confirm`, `/auth/congratulations`
- `/onboarding/*` — welcome, trading, savings, protection

## Ключевые решения

### Маршрутизация и доступ

- `ProtectedRoute` — требует авторизацию и завершённый онбординг
- `RequireAuth` / `RequireOnboarding` — промежуточные guard-компоненты
- Роутер: `src/app/router/index.tsx`

### Состояние и API

- Единый `baseApi` (RTK Query) с автоматической подстановкой `Authorization` и refresh-токеном
- Endpoints инжектируются из `entities/*/api` и `features/*/api`
- Локальное состояние настроек — Redux slice `settings` + listener middleware для персистентности

### UI

- Компоненты shadcn/ui в `src/shared/ui/`
- Алиас `@/` → `src/`
- Тема (light/dark) и язык сохраняются в localStorage

### i18n

- Языки: `ru` (по умолчанию), `en`
- Файлы переводов: `src/shared/i18n/locales/`

## Быстрый старт

### Требования

- Node.js 22+
- Corepack (входит в Node.js)

```bash
corepack enable
yarn install
cp .env.example .env   # при необходимости настроить API
yarn dev
```

Приложение: [http://localhost:5173](http://localhost:5173)

### Переменные окружения

| Переменная          | Описание        | По умолчанию |
| ------------------- | --------------- | ------------ |
| `VITE_API_BASE_URL` | Базовый URL API | `/api/v1`    |

## Скрипты

| Команда             | Описание                      |
| ------------------- | ----------------------------- |
| `yarn dev`          | Dev-сервер с HMR              |
| `yarn build`        | Typecheck + production-сборка |
| `yarn preview`      | Просмотр production-сборки    |
| `yarn lint`         | ESLint с автофиксом           |
| `yarn lint:check`   | ESLint без автофикса          |
| `yarn format`       | Prettier — форматирование     |
| `yarn format:check` | Prettier — проверка           |

## Git hooks (Husky)

| Hook         | Действие                          |
| ------------ | --------------------------------- |
| `pre-commit` | `yarn lint:check`                 |
| `commit-msg` | Commitlint (Conventional Commits) |
| `pre-push`   | `yarn build`                      |

### Формат коммитов

```
<type>: <subject>
```

Допустимые типы: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Пример: `feat: add savings goal filter`

## CI

GitHub Actions (`.github/workflows/ci.yml`) на push/PR в `main`/`master`:

1. `yarn install --immutable`
2. `yarn lint:check`
3. `yarn build`

## Качество кода

- **ESLint** — flat config (`eslint.config.mjs`), `defineConfig` из ESLint core
- **Prettier** — `.prettierrc` (single quotes, без semicolons, printWidth 100)
- Для `src/shared/ui/` отключено правило `react-refresh/only-export-components` (экспорт хуков и variants — норма для UI-kit)
