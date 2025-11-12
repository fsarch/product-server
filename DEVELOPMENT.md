# Development Guide

This document provides detailed information for developers working on Product Server.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Development Commands](#development-commands)
- [Database Migrations](#database-migrations)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [API Development](#api-development)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)

## Project Structure

```
product-server/
├── config/                   # Configuration files
│   ├── config.template.yml  # Configuration template
│   └── config.yml           # Your configuration (gitignored)
├── src/
│   ├── app.module.ts        # Root application module
│   ├── main.ts              # Application entry point
│   ├── controllers/         # API controllers
│   │   ├── catalogs/        # Catalog-related endpoints
│   │   └── localizations/   # Localization endpoints
│   ├── database/            # Database layer
│   │   ├── entities/        # TypeORM entity definitions
│   │   └── migrations/      # Database migration files
│   ├── fsarch/              # Framework modules
│   │   ├── auth/            # Authentication module
│   │   ├── database/        # Database configuration module
│   │   ├── configuration/   # Configuration management
│   │   └── uac/             # User access control
│   ├── models/              # DTOs and model definitions
│   ├── repositories/        # Data access layer (services)
│   ├── constants/           # Application constants
│   └── utils/               # Utility functions
├── test/                    # Test files
├── ADVANCED.md              # Advanced configuration (deprecated)
├── KEYCLOAK_SETUP.md        # Keycloak setup guide
├── COCKROACHDB_SETUP.md     # CockroachDB setup guide (legacy)
└── README.md                # Main documentation
```

## Development Setup

### Prerequisites

- Node.js v20.x or higher
- npm v9.x or higher
- Docker (for PostgreSQL and Keycloak)
- Git

### Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/fsarch/product-server.git
   cd product-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up configuration**:
   ```bash
   cp config/config.template.yml config/config.yml
   ```

4. **Configure database**:
   - For development, use Docker to run PostgreSQL (see [README.md](README.md#postgresql-setup))
   - Update `config/config.yml` with your database settings

5. **Start dependencies**:
   ```bash
   # Start PostgreSQL
   docker run -d \
     --name product-server-postgres \
     -e POSTGRES_DB=product_db \
     -e POSTGRES_USER=product_user \
     -e POSTGRES_PASSWORD=secure_password \
     -p 5432:5432 \
     postgres:15
   ```

6. **Start the application**:
   ```bash
   npm run start:dev
   ```

The application will start on port 3000 and automatically apply database migrations.

## Development Commands

### Running the Application

```bash
# Development mode with hot-reload
npm run start:dev

# Production build and run
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

### Building

```bash
# Build TypeScript to JavaScript
npm run build

# Watch mode (rebuilds on file changes)
npm run build -- --watch
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Format code with Prettier
npm run format
```

## Database Migrations

Product Server uses TypeORM for database management. Migrations are automatically applied when the application starts.

### Creating Migrations

When you modify entity definitions, generate a migration:

```bash
# Generate migration based on entity changes
npm run migration:generate -- ./src/database/migrations/YourMigrationName
```

This compares your entity definitions with the current database schema and creates a migration file.

### Migration Commands

```bash
# Generate migration (detects changes automatically)
npm run migration:generate -- ./src/database/migrations/MigrationName

# Create empty migration file (for manual SQL)
npm run migration:create -- MigrationName

# Run pending migrations manually (usually automatic)
npm run migration:run

# Revert the last migration
npm run migration:revert
```

### Migration Best Practices

1. **Always review generated migrations** before committing
2. **Test migrations** on a development database first
3. **Make migrations reversible** when possible (implement `down` method)
4. **Keep migrations small** and focused on a single change
5. **Don't modify existing migrations** that have been deployed to production

### Entity Development

Entities are defined in `src/database/entities/`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('my_table')
export class MyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
```

After creating or modifying entities:
1. Register the entity in `src/app.module.ts`
2. Generate a migration
3. Test the migration

## Testing

### Running Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e

# Run specific test file
npm run test -- path/to/test.spec.ts
```

### Test Structure

- **Unit tests**: `*.spec.ts` files alongside source files
- **E2E tests**: `test/*.e2e-spec.ts` files

### Writing Tests

Example unit test:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyService],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

## Code Quality

### Linting

The project uses ESLint with TypeScript support:

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### Formatting

Code formatting is handled by Prettier:

```bash
# Format all files
npm run format
```

Configuration is in `.prettierrc` and `.eslintrc.js`.

### Pre-commit Hooks

Consider setting up pre-commit hooks to automatically run linting and formatting:

```bash
# Install husky (not included by default)
npm install --save-dev husky lint-staged
npx husky install
```

## API Development

### Creating a New Controller

1. **Generate controller**:
   ```bash
   nest generate controller my-feature
   ```

2. **Implement endpoints**:
   ```typescript
   import { Controller, Get, Post, Body } from '@nestjs/common';
   import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

   @ApiTags('my-feature')
   @Controller({
     path: 'my-feature',
     version: '1',
   })
   @ApiBearerAuth()
   export class MyFeatureController {
     @Get()
     findAll() {
       return [];
     }

     @Post()
     create(@Body() dto: CreateDto) {
       return {};
     }
   }
   ```

3. **Add DTOs** (Data Transfer Objects):
   ```typescript
   import { IsString, IsNotEmpty } from 'class-validator';
   import { ApiProperty } from '@nestjs/swagger';

   export class CreateDto {
     @ApiProperty()
     @IsString()
     @IsNotEmpty()
     name: string;
   }
   ```

### API Documentation

Swagger documentation is automatically generated from decorators:

- **@ApiTags**: Group endpoints
- **@ApiProperty**: Document DTO properties
- **@ApiBearerAuth**: Mark endpoints as requiring authentication

Access Swagger UI at: http://localhost:3000/docs

### API Versioning

All endpoints use URI versioning (e.g., `/v1/catalogs`). Set the version in the controller:

```typescript
@Controller({
  path: 'my-feature',
  version: '1',
})
```

## Architecture Overview

### Layers

1. **Controllers**: Handle HTTP requests/responses
2. **Services (Repositories)**: Business logic and data access
3. **Entities**: Database table definitions
4. **DTOs**: Data validation and transformation

### Module Structure

Product Server uses NestJS modules for organization:

- **AppModule**: Root module
- **FsarchModule**: Core framework functionality (auth, database, config)
- **ControllersModule**: API endpoint controllers
- **RepositoriesModule**: Data access services

### Authentication Flow

1. Client obtains JWT token from Keycloak
2. Client includes token in Authorization header
3. AuthGuard validates token against Keycloak's JWK endpoint
4. UAC checks user permissions
5. Request proceeds to controller

### Database Access

Use repositories (services) for all database operations:

```typescript
@Injectable()
export class MyRepository {
  constructor(
    @InjectRepository(MyEntity)
    private readonly repository: Repository<MyEntity>,
  ) {}

  async findAll(): Promise<MyEntity[]> {
    return this.repository.find();
  }
}
```

## Debugging

### Debug Mode

Start the application in debug mode:

```bash
npm run start:debug
```

Then attach a debugger (VS Code configuration):

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach to NestJS",
  "port": 9229,
  "restart": true
}
```

### Logging

Product Server uses Pino for logging. Logs are output to stdout.

Access logger in your code:

```typescript
import { Logger } from '@nestjs/common';

export class MyService {
  private readonly logger = new Logger(MyService.name);

  doSomething() {
    this.logger.log('Doing something...');
    this.logger.error('Error occurred', error.stack);
  }
}
```

## Environment-Specific Configuration

Create environment-specific configuration files:

- `config/config.yml` - Local development (gitignored)
- `config/config.production.yml` - Production settings
- `config/config.test.yml` - Test environment

Load configuration based on NODE_ENV:

```bash
NODE_ENV=production npm run start:prod
```

## Contributing

### Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** and commit:
   ```bash
   git add .
   git commit -m "Add my feature"
   ```

3. **Run tests and linting**:
   ```bash
   npm run lint
   npm run test
   ```

4. **Push and create pull request**:
   ```bash
   git push origin feature/my-feature
   ```

### Code Standards

- Follow existing code style
- Write tests for new features
- Update documentation
- Keep commits atomic and well-described
- Ensure all tests pass before submitting PR

### Pull Request Checklist

- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation updated
- [ ] Migrations created if needed
- [ ] API documentation (Swagger) updated

## Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Database connection fails**:
- Verify PostgreSQL is running
- Check connection parameters in `config/config.yml`
- Ensure database exists

**TypeScript compilation errors**:
```bash
# Clean build artifacts
rm -rf dist
npm run build
```

**Module not found**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Getting Help

- Check existing issues on GitHub
- Review the main [README.md](README.md)
- See [KEYCLOAK_SETUP.md](KEYCLOAK_SETUP.md) for authentication setup
- Open a new issue for bugs or feature requests
