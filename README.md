## Installation

```bash
# install package
$ pnpm install

# start docker
docker-compose down --remove-orphans
docker-compose up -d

# run migration
$ pnpm run migration:run

# watch mode
$ pnpm run start:dev
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Migration

```bash
# generate migration
$ pnpm run migration:generate <migration-path>

# run migration
$ pnpm run migration:run

# revert migration
$ pnpm run migration:revert
```

## Folder Structure

- migration: Config for database migration, managing schema changes.
- src
  - als: Manages asynchronous local storage by request.
  - audit-log: Logs database actions for auditing.
  - common: Shared utilities, helpers, and constants.
  - configuration: Manages environment variables and settings.
  - error: Error management, including custom classes and exception filters.
  - health: Health check endpoints.
  - permission: Manages user permissions and access policies.
  - role: Manages role-based access control.
  - security: Authentication & authorization.
  - user: Manages user-related functionality.
  - domain-0001: Schematic.
  - domain-0003:Handles multiple column types.
  - domain-0005: one-to-many (without cascade)
  - domain-0006: one-to-many (without cascade)
  - domain-0007: one-to-many (without cascade)
    - Note: Avoid 3-layer save; deleting domain-0006 causes domain-0007 error.
    - If necessary, use `cascade: true`.
  - domain-0008: one-to-many (cascade)
  - domain-0009: one-to-many (cascade)
  - domain-0010: one-to-many (cascade)
  - domain-0015: Queue management with BullMQ and Redis.
- test: End-to-end tests for full workflow validation.


## Issue

- [Prettier version 3 is not supported!](https://jestjs.io/docs/configuration/#prettierpath-string)
