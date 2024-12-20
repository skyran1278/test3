## Getting Started

```bash
# Install dependencies
pnpm install

# Start Docker
docker-compose down --remove-orphans && docker-compose up -d

# Run migrations
pnpm run migration:run

# Development mode
pnpm run start:dev
```

## Testing

```bash
# Unit tests
pnpm run test:watch

# E2E tests
pnpm run test:e2e --watch
```

## Migration Commands

```bash
# Generate migration
pnpm run migration:generate <path>

# Run migration
pnpm run migration:run

# Revert migration
pnpm run migration:revert

# Run migration in production (Cloud Shell)
aws ecs execute-command --cluster <ARN> --task <ARN> --interactive --command "/bin/sh"
pnpm migration:prod:drop
```

## Folder Structure

- **cdk**: Infrastructure deployment.
- **src**: Application logic
  - **als**: Async local storage.
  - **audit-log**: Audit logging.
  - **common**: Shared utilities.
  - **configuration**: Env config.
  - **migration**: DB migrations.
  - **security, user, permission, role**: Access control.
  - **domain-01**: Schematic.
  - **domain-03**: Handles multiple column types.
  - **domain-08**: One-to-many (cascade).
  - **domain-09**: One-to-many (cascade).
  - **domain-10**: One-to-many (cascade).
  - **domain-15**: Queue management with BullMQ and Redis.
  - **domain-21**: Materialized Path (aka Path Enumeration) Tree entity.
  - **domain-22**: Closure table Tree entity.
  - **domain-24**: Many-to-many.
  - **domain-25**: Many-to-many.
- **test**: E2E testing.

## IaC (Infrastructure as Code) Setup & Common Commands

1. Login to AWS SSO and deploy infrastructure.

   ```bash
   aws sso login --profile ran
   cdk deploy --profile ran
   ```

2. Configure DNS on [Squarespace](https://account.squarespace.com).
3. Receive AWS SNS Topic email (one-time setup).
4. Set up ELB DNS in Squarespace.

```bash
# Common commands
aws sso login --profile ran

# Cd to the cdk folder
cdk diff --profile ran
cdk deploy --profile ran
cdk destroy --profile ran
```

- Check deploy status
  - Go to ECS -> Clusters -> Tasks -> Task ID -> Logs
  - Go to CloudFormation -> Stacks -> Stack ID -> Events

## Issues

- [Prettier v3 not supported by Jest](https://jestjs.io/docs/configuration/#prettierpath-string)

## Decision Records

- Migration Folder Placement

Due to "SyntaxError: Cannot use import statement outside a module," place the migration folder inside `src`.

- Soft Remove Caution

Avoid using `softRemove` to prevent relationship issues. Use status control for data preservation.

- Second Database Complexity

Using a second database adds complexity. Consider its necessity before proceeding. See branch `feat/second-database` for reference.
