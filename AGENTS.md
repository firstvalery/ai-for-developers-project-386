# AGENTS.md

## Назначение проекта

Учебный проект Хекслета (RU): сервис бронирования календаря звонков. Спека: https://files.hexlet.app/a/2ipc5m

## Документы перед планированием изменений

- `README.md` — назначение, стек, требования курса.
- `.github/workflows/README.md` — правила работы CI-файлов.
- Спека проекта (ссылка выше) — продуктовое поведение сервиса.
- `backend/build.gradle`, `backend/src/main/resources/application.yml` — версии и конфигурация backend.
- `frontend/vite.config.js`, `frontend/package.json` — прокси API и зависимости frontend.

## Ответственность частей проекта

- `backend/` — Spring Boot **3.5.5 WebFlux** (реактивный), Java-тулчейн **17**, Gradle 9.7.1 (wrapper). Точка входа: `src/main/java/com/example/backend/BackendApplication.java`; REST-контроллеры лежат в `api/`, например `HelloController.java`. Порт 8080.
- `frontend/` — Vite **7** + React **19** + Mantine **8**. Точка входа: `src/main.jsx` (оборачивает `App.jsx` в `MantineProvider`); запросы к backend — через `fetch('/api/...')` в компонентах.
- Dev-сервер Vite проксирует только `/api` → `http://localhost:8080` (`frontend/vite.config.js`). **Все эндпоинты backend обязаны быть под `/api`**, иначе `fetch()` во frontend будет получать 404 в dev-режиме.

## Постоянные ограничения

- WebFlux: контроллеры возвращают `Mono`/`Flux` (не готовые объекты); тесты контроллеров — через `@WebFluxTest` + `WebTestClient` (не MockMvc), см. `backend/src/test/java/com/example/backend/HelloControllerTest.java`.
- README и пользовательские тексты на русском (требование курса Хекслета); новые документы держите в едином стиле.
- У frontend нет скриптов lint / typecheck / test — не выдумывайте их; добавляйте инструменты только по прямой просьбе.

## Как проверять изменения

Backend (из `backend/`): все тесты — `./gradlew test`, один тест — `./gradlew test --tests 'HelloControllerTest'` (JUnit 5), сервер — `./gradlew bootRun` → http://localhost:8080/api/hello.

Frontend (из `frontend/`): dev-сервер — `npm run dev` → http://localhost:5173, сборка — `npm run build`, просмотр сборки — `npm run preview`.

Полная проверка перед завершением: в `backend/` — `./gradlew test`, в `frontend/` — `npm run build`. CI (`hexlet-check.yml`) **не** собирает и не тестирует код — проверяйте локально.

## Действия под отдельный запрос

- `.github/workflows/hexlet-check.yml` автоматически сгенерирован Хекслетом и запускает проверки курса на каждый коммит: не удалять, не редактировать и не переименовывать его (и сам репозиторий)
- Не коммитить артефакты сборки и IDE: `backend/build/`, `backend/.gradle/`, `frontend/dist/`, `frontend/node_modules/` 
- Не менять требования курса и структуру README без запроса.
- Использовать формат сообщений коммитов по спецификации Conventional Commits

