# nest-base

A NestJS 11 REST API starter with PostgreSQL, JWT access and refresh tokens, user profiles, and per-user event management.

The project includes Swagger documentation, DTO validation, English and Vietnamese error messages, CQRS handlers, database-backed auth sessions, and transactional TypeORM operations.

## Prerequisites

- Node.js 26.x
- pnpm 11.x (`npm install --global pnpm@11` if needed)
- Docker with Docker Compose

PostgreSQL 18 is used because the database migrations rely on `uuidv7()`.

## Getting started

```bash
cp .env.example .env
pnpm install --frozen-lockfile
docker compose up -d
pnpm start:dev
```

Docker Compose starts PostgreSQL only; the API runs locally with hot reload. Pending TypeORM migrations run automatically when the application starts.

Once the server is ready:

- API: <http://localhost:3000>
- Swagger UI: <http://localhost:3000/docs>

To stop PostgreSQL, run `docker compose down`.

## Configuration

The application reads its configuration from `.env` in the project root. The example file contains development-friendly defaults:

| Variable | Purpose | Example |
| --- | --- | --- |
| `PORT` | HTTP server port | `3000` |
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port | `5432` |
| `DATABASE_USER` | PostgreSQL user | `postgres` |
| `DATABASE_PASSWORD` | PostgreSQL password | `postgres` |
| `DATABASE_NAME` | PostgreSQL database | `todo` |
| `JWT_ACCESS_TOKEN_SECRET` | Access-token signing secret | `access-secret` |
| `JWT_ACCESS_TOKEN_EXPIRES` | Access-token lifetime | `7d` |
| `JWT_REFRESH_TOKEN_SECRET` | Refresh-token signing secret | `refresh-secret` |
| `JWT_REFRESH_TOKEN_EXPIRES` | Refresh-token lifetime | `30d` |

Replace the example JWT secrets before deploying the application.

## Commands

| Command | Description |
| --- | --- |
| `pnpm start` | Start the application once in development mode |
| `pnpm start:dev` | Start in watch mode with hot reload |
| `pnpm start:debug` | Start in debug and watch mode |
| `pnpm build` | Compile the application into `dist/` |
| `pnpm start:prod` | Run the compiled application |
| `pnpm lint` | Run ESLint and apply automatic fixes |
| `pnpm test` | Run unit tests |
| `pnpm test:cov` | Run unit tests and collect coverage |
| `pnpm test:e2e` | Run the end-to-end test suite |

`pnpm start:prod` requires `pnpm build` first. End-to-end tests require PostgreSQL to be running and `.env` to exist.

## Project structure

```text
src/
├── common/       # Shared DTOs, repositories, interceptors, and utilities
├── i18n/         # English and Vietnamese translations
├── modules/
│   ├── auth/     # JWT authentication and session management
│   ├── events/   # User-owned event CRUD
│   └── users/    # User profile and persistence
├── settings/     # Database, JWT, i18n, and CLS configuration
└── main.ts       # Application bootstrap and Swagger setup
tests/            # End-to-end tests
```
