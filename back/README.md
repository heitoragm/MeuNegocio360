# MeuNegocio360 — API

Node.js + TypeScript + Express 5 + Drizzle (PostgreSQL) + tsyringe (DI).

## Getting started

```bash
cp .env.example .env
docker compose up -d     # PostgreSQL
pnpm install
pnpm db:push             # sync schema to the database (or db:generate + db:migrate)
pnpm dev
```

## Architecture

```
src/
├── config/env.ts                    # validated env vars (zod)
├── modules/<domain>/                # one folder per domain (bounded context)
│   ├── domain/
│   │   ├── entities/                # pure domain types
│   │   └── repositories/            # repository contracts (interfaces)
│   ├── dtos/
│   ├── services/                    # use cases — depend only on interfaces
│   ├── infra/
│   │   ├── drizzle/                 # table schema + repository implementations
│   │   └── http/                    # controllers + routes
│   └── container.ts                 # DI bindings for this domain
└── shared/
    ├── container/                   # DI composition root
    ├── errors/AppError.ts
    ├── providers/                   # cross-cutting adapters (hash, mail, storage…)
    │   └── <Provider>/{models,implementations}
    └── infra/
        ├── database/drizzle/        # db client + aggregated schema
        └── http/                    # app, server, root routes, middlewares
```

**Flow:** route → controller (validates input) → service (business rules) → repository interface → Drizzle implementation.

### Adding a new domain

1. Create `src/modules/<domain>/` following the `users` module.
2. Export its Drizzle schema in `src/shared/infra/database/drizzle/schema.ts`.
3. Import its `container.ts` in `src/shared/container/index.ts`.
4. Mount its router in `src/shared/infra/http/routes/index.ts`.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | dev server with watch (tsx) |
| `pnpm build` / `pnpm start` | compile to `dist/` and run |
| `pnpm typecheck` | type-check only |
| `pnpm db:generate` / `db:migrate` / `db:push` / `db:studio` | drizzle-kit |
