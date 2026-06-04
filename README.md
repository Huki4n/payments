# Payments

Веб-приложение для управления личными финансами: транзакции, аналитика, накопления, цели и настройки профиля. Данные загружаются с backend API; суммы в интерфейсе приводятся к валюте, выбранной в настройках.

## Стек

| Категория         | Технологии                                                        |
| ----------------- | ----------------------------------------------------------------- |
| UI                | React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| Сборка            | Vite 8, Rolldown, React Compiler                                  |
| Маршрутизация     | React Router 7                                                    |
| Состояние и API   | Redux Toolkit, RTK Query                                          |
| Формы             | React Hook Form                                                   |
| Графики           | Recharts                                                          |
| i18n              | i18next, react-i18next (ru / en)                                  |
| Качество кода     | ESLint 10, Prettier, Husky, Commitlint                            |
| CI                | GitHub Actions                                                    |
| Пакетный менеджер | Yarn 4 (Berry)                                                    |

## Архитектура

Проект построен по методологии [Feature-Sliced Design (FSD)](https://feature-sliced.design/).

```
src/
├── app/         # Точка входа, роутер, Redux store, layouts, провайдеры
├── pages/       # Страницы (композиция widgets/features)
├── widgets/     # Крупные UI-блоки (дашборды, навигация, графики)
├── features/    # Пользовательские сценарии (создание цели, фильтры и т.д.)
├── entities/    # Бизнес-сущности (goal, transaction, session, …)
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

### Entities

| Слайс              | Назначение                                                                 |
| ------------------ | -------------------------------------------------------------------------- |
| `goal`             | Цели накопления, взносы, слайды для карусели savings                       |
| `transaction`      | Транзакции, выписка, конвертация сумм в валюту отображения                 |
| `profile`          | Профиль пользователя, синхронизация с настройками                          |
| `session`          | Авторизация по телефону/PIN, токены, refresh                               |
| `settings`         | Валюта, язык, тема, имя; персистентность в localStorage                    |
| `onboarding-status`| Статус прохождения онбординга                                              |

### Features

| Слайс                      | Назначение                                      |
| -------------------------- | ----------------------------------------------- |
| `transactions-action`      | Ручной ввод и загрузка CSV-выписок              |
| `transactions-filter`    | Фильтрация списка транзакций на странице        |
| `create-goal` / `edit-goal`| Создание и редактирование целей, пополнение     |
| `auth-phone` / `auth-pin`  | Вход по телефону и PIN                          |
| `require-settings-currency` | Блокировка UI до выбора валюты в настройках |

### Widgets

| Слайс                    | Назначение                                                |
| ------------------------ | --------------------------------------------------------- |
| `account-balance`        | Приветствие и баланс на главной                           |
| `finance-chart`          | График доходов/расходов за текущий месяц                  |
| `spends-chart`           | Круговая диаграмма расходов по категориям                 |
| `dashboard-transactions` | Список последних операций, плитки итогов за месяц         |
| `dashboard-savings`      | Карусель целей накопления                                 |
| `analytics-dashboard`    | Период, графики, сравнение средних, категории расходов    |
| `home-navigation`        | Навигация по разделам                                     |

### Pages

| Маршрут                         | Страница              |
| ------------------------------- | --------------------- |
| `/`                             | Главная (дашборд)      |
| `/transactions`                 | Транзакции            |
| `/analytics`                    | Аналитика             |
| `/saves`                        | Накопления            |
| `/profile`, `/settings`         | Профиль и настройки   |
| `/auth`, `/auth/pin`, …         | Авторизация           |
| `/onboarding/*`                 | Онбординг             |

## Ключевые решения

### Маршрутизация и доступ

- `ProtectedRoute` — требует авторизацию и завершённый онбординг
- `RequireAuth` / `RequireOnboarding` — промежуточные guard-компоненты
- Роутер: `src/app/router/index.tsx`
- Профиль подгружается при старте (`profile-bootstrap`) и синхронизируется с Redux `settings`

### Состояние и API

- Единый `baseApi` (RTK Query) с `Authorization` и обновлением refresh-токена
- Endpoints инжектируются из `entities/*/api`
- Настройки — slice `settings` + listener middleware → `localStorage`
- Транзакции запрашиваются с аргументом `{ displayCurrency, params? }` и приводятся к валюте отображения на уровне API-слоя

### Конвертация валют

Валюта отображения: **USD**, **EUR**, **RUB** (`shared/config/currencies.ts`). Пользователь выбирает её в настройках; без выбора основные виджеты не запрашивают данные.

| Область              | Где реализовано                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| Накопления (savings) | `getSavingsSlides` → `mapGoalToSavingsSlide` + курсы Frankfurter               |
| Транзакции, баланс, графики, аналитика | `getTransactions` → `convertBankStatementToDisplayCurrency` |
| Курсы                | `shared/lib/currency-exchange` (`fetchExchangeRates`, `convertCurrency`)       |

Курсы кэшируются в памяти; в dev прокси `/exchange-rates` → [Frankfurter API v2](https://frankfurter.dev/) (см. `vite.config.ts`).

### Категории транзакций

- Id категорий и иконки (Lucide): `shared/config/spend-categories.ts`, `income-categories.ts`
- Подписи: i18n `home.dashboard.categories.*`
- API может отдавать id (`catSubscriptions`) или русские названия (`Подписки`) — резолв через `resolveSpendCategoryId`

### UI

- Компоненты shadcn/ui в `src/shared/ui/`
- Алиас `@/` → `src/`
- Тема (light/dark) и язык сохраняются локально

### i18n

- Языки: `ru` (по умолчанию), `en`
- Файлы: `src/shared/i18n/locales/`

## Быстрый старт

### Требования

- Node.js 22+
- Corepack (входит в Node.js)

```bash
corepack enable
yarn install
cp .env.example .env   # при необходимости настроить URL API и курсы
yarn dev
```

Приложение: [http://localhost:5173](http://localhost:5173)

### Переменные окружения

| Переменная                      | Описание                                      | По умолчанию (dev)   |
| ------------------------------- | --------------------------------------------- | -------------------- |
| `VITE_API_BASE_URL`             | Базовый URL backend API (без завершающего `/`) | `/api/v1`            |
| `VITE_EXCHANGE_RATES_BASE_URL`  | Базовый URL сервиса курсов (Frankfurter v2)   | `/exchange-rates`    |

Примеры в `.env.example`.

## Скрипты

| Команда              | Описание                      |
| -------------------- | ----------------------------- |
| `yarn dev`           | Dev-сервер с HMR              |
| `yarn build`         | Typecheck + production-сборка |
| `yarn preview`       | Просмотр production-сборки    |
| `yarn lint`          | ESLint с автофиксом           |
| `yarn lint:check`    | ESLint без автофикса          |
| `yarn format`        | Prettier — форматирование     |
| `yarn format:check`  | Prettier — проверка           |
| `yarn test`          | Vitest в watch-режиме         |
| `yarn test:run`      | Unit-тесты (CI)               |
| `yarn test:coverage` | Покрытие тестами              |

### Генератор FSD-слайсов

```bash
node .cursor/fsd-generator.js features <имя-слайса>
```

## Тестирование

- **Vitest** + **Testing Library**
- Setup: `src/shared/test/`
- Тесты рядом с модулем: `__tests__/*.test.ts`

Примеры: `currency-exchange`, `date-utils`, `spend-categories`, виджеты аналитики.

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

Типы: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Пример: `feat: convert transactions to display currency`

## CI

GitHub Actions (`.github/workflows/ci.yml`) на push/PR в `main`/`master`:

1. `yarn install --immutable`
2. `yarn lint:check`
3. `yarn test:run`
4. `yarn build`

## Качество кода

- **ESLint** — flat config (`eslint.config.mjs`)
- **Prettier** — single quotes, без semicolons, `printWidth` 100
- Для `src/shared/ui/` отключено `react-refresh/only-export-components` (variants и хуки в UI-kit)
