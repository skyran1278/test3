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

- domain-1: schematic
- domain-2: one-to-many (cascade)
- domain-3: many-to-one (cascade)
- domain-4: one-to-many (without cascade)
- domain-5: many-to-one (without cascade)
- domain-6: multiple column type
