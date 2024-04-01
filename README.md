## Installation

```bash
# install package
$ pnpm install

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

- domain-0001: schematic
- domain-0002: one-to-many (cascade)
- domain-0003: many-to-one (cascade)
- domain-0004: one-to-many (without cascade)
- domain-0005: many-to-one (without cascade)
- domain-0006: multiple column type
