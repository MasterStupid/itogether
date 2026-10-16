# Áo đồng phục Khoa CNTT — Trường Đại học Hải Phòng (FIT-HPUni)

Design concepts (polo + T-shirt) for the Faculty of IT's shirts, presented as boards on the Design canvas (mockup sandbox).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Shirt boards: `artifacts/mockup-sandbox/src/components/mockups/fit-hpuni/` (one file per canvas frame)
- Shared brand facts + colour system: `fit-hpuni/_shared/brand.ts`; common board header/footer: `_shared/BoardShell.tsx`
- Scale-accurate polo/tee SVG flats (1 unit = 1 mm, size L) + placement anchors: `_shared/garments.tsx`
- Logo: `artifacts/mockup-sandbox/public/images/fit-logo.png` (transparent corners) and `fit-logo-original.webp` (untouched upload)

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Overview brief + 3 concepts (A "Dấu Ấn", B "do IT", C "Phượng Số"), each with a polo board and a T-shirt board.
- Slogan must be verbatim: "You can do IT, we are ready to accompany". Board copy in Vietnamese with full diacritics.

## User preferences

- User writes in Vietnamese; reply in Vietnamese.

## Gotchas

- The supplied logo is a 474 px raster: fine for mockups, but production needs the faculty's vector file.
- Vietnamese text: use Be Vietnam Pro / Montserrat / Inter etc.; Poppins, Outfit, DM Sans, Geist, Oxanium, Fira Code lack Vietnamese glyphs.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
