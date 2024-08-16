## Getting Started

```bash
# Install package
pnpm install

# Start Docker
docker-compose down --remove-orphans
docker-compose up -d

# Run migration
pnpm run migration:run

# Watch mode
pnpm run start:dev
```

### IaC (Infrastructure as Code) Initialization

1. Login to AWS SSO and deploy the infrastructure.

```bash
aws sso login --profile ran

# In the cdk folder
cdk deploy --profile ran
```

2. Set Up DNS in [squarespace](https://account.squarespace.com/domains/managed/u-ran.com/dns/dns-settings). (first time only)
3. Receive Email from AWS SNS Topic. (first time only)
4. Set Up ELB DNS in [squarespace](https://account.squarespace.com/domains/managed/u-ran.com/dns/dns-settings).

## Running the App

```bash
# Watch mode
pnpm run start:dev

# Production mode
pnpm run start:prod
```

## Testing

```bash
# Unit tests
pnpm run test:watch

# E2E tests
pnpm run test:e2e --watch
```

## Migration

```bash
# Generate migration
pnpm run migration:generate <migration-path>

# Run migration
pnpm run migration:run

# Revert migration
pnpm run migration:revert

# Run migration in production (Cloud Shell)
aws ecs execute-command \
  --cluster arn:aws:ecs:ap-northeast-1:637423394100:cluster/Test3Stack-ClusterConstructCluster9DBF4A34-wzgWSzN6qjJu \
  --task arn:aws:ecs:ap-northeast-1:637423394100:task/Test3Stack-ClusterConstructCluster9DBF4A34-wzgWSzN6qjJu/9cf2c6c136744ef1bfa211120c8a51bf \
  --interactive \
  --command "/bin/sh"
```

## Folder Structure

- **migration**: Config for database migration, managing schema changes.
- **cdk**: Cloud Development Kit (CDK) for deploying infrastructure.
- **src**
  - **als**: Manages asynchronous local storage by request.
  - **audit-log**: Logs database actions for auditing.
  - **common**: Shared utilities, helpers, and constants.
  - **configuration**: Manages environment variables and settings.
  - **error**: Error management, including custom classes and exception filters.
  - **health**: Health check endpoints.
  - **permission**: Manages user permissions and access policies.
  - **role**: Manages role-based access control.
  - **security**: Authentication & authorization.
  - **user**: Manages user-related functionality.
  - **domain-0001**: Schematic.
  - **domain-0003**: Handles multiple column types.
  - **domain-0008**: One-to-many (cascade).
  - **domain-0009**: One-to-many (cascade).
  - **domain-0010**: One-to-many (cascade).
  - **domain-0015**: Queue management with BullMQ and Redis.
  - **domain-0021**: Tree entity.
- **test**: End-to-end tests for full workflow validation.

## IaC (Infrastructure as Code) Common Commands

```bash
aws sso login --profile ran

# In the cdk folder
cdk diff --profile ran
cdk deploy --profile ran
cdk destroy --profile ran
```

## Issues

- [Prettier version 3 is not supported in Jest!](https://jestjs.io/docs/configuration/#prettierpath-string)

## Decision Record

### Remove without Cascade Example

We encountered difficulties updating a 3-layer structure without using cascade.

- When storing a 3-layer structure, start by saving the top layer first, as the lower layers require the upper layer's ID. However, saving the top layer triggers the deletion of the middle-layer entity, while the lowest layer still depends on the middle layer's ID, leading to errors.
- **domain-0005**: One-to-many (without cascade).
- **domain-0006**: One-to-many (without cascade).
- **domain-0007**: One-to-many (without cascade).
  - **Note**: Avoid saving a 3-layer structure; deleting domain-0006 causes errors in domain-0007.
  - If necessary, use `cascade: true`.

### Placement of Migration Folder

When deciding where to place the migration folder in your project structure, consider the following:

1. **Inside the `src` Folder**:

   - **Pros**:
     - Keeps all source code-related files together, making it easier to manage.
     - Ideal for smaller projects where the project structure is less complex.
   - **Cons**:
     - Can make the `src` folder cluttered if there are many migration files.

2. **Next to the `src` Folder**:
   - **Pros**:
     - Separates migrations from the source code, keeping the `src` folder clean and focused on the application's core logic.
     - Easier to manage and find migration files in larger projects.
   - **Cons**:
     - Might slightly complicate the project structure if not well-documented or if there are many other folders at the same level.

#### Recommendation

For most projects, especially larger ones, placing the migration folder next to the `src` folder is usually the better choice. It helps maintain a clear separation of concerns and keeps the source code directory less cluttered. However, for smaller projects, placing it inside the `src` folder might be more convenient.

### Do not recommend using softRemove

Do not recommend using softRemove because if one item is soft-removed, the other still maintains the relationship but cannot access the data.
Therefore, if you want to preserve data, use status control instead.
