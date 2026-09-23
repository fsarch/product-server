# Product Server

A modern, scalable product catalog management server built with [NestJS](https://nestjs.com/). This server provides a RESTful API for managing product catalogs, items, attributes, and localizations with support for multiple database backends and OpenID-based authentication.

## Project Purpose

Product Server is designed to manage product catalogs with flexible attribute systems and multi-language support. It provides:

- **Catalog Management**: Create and manage product catalogs with customizable item types
- **Flexible Attributes**: Support for various attribute types (text, number, boolean, list, JSON, image, link)
- **Localization**: Built-in support for multi-language content
- **Type Safety**: Full TypeScript implementation with strict typing
- **RESTful API**: Versioned REST API with automatic OpenAPI/Swagger documentation
- **Database Flexibility**: Support for PostgreSQL and SQLite
- **Secure Authentication**: OpenID Connect integration with JWT token validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher)
- **npm** (v9.x or higher)
- **Docker** (recommended for running PostgreSQL and Keycloak)
- **Database**: PostgreSQL (v12 or higher) or SQLite (v3 or higher)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fsarch/product-server.git
cd product-server
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a configuration file:
```bash
cp config/config.template.yml config/config.yml
```

4. Edit `config/config.yml` to match your environment (see [Configuration](#configuration) section below)

### Running the Application

```bash
# Development mode (with hot-reload)
pnpm run start:dev

# Production mode
pnpm run build
pnpm run start:prod

# Debug mode
pnpm run start:debug
```

The server will:
1. Start on the configured port (default: 3000)
2. Automatically apply any pending database migrations
3. Be ready to accept requests

Access the API documentation at:
- **Swagger UI**: http://localhost:3000/docs

## Configuration

The application is configured via a YAML file located at `config/config.yml`. A template is provided at `config/config.template.yml`.

### Configuration Structure

The configuration file consists of three main sections:

#### 1. Database Configuration

See the [Databases](#databases) section for detailed setup instructions.

#### 2. Authentication Configuration

See the [Authorization](#authorization) section for detailed setup instructions.

#### 3. User Access Control (UAC)

Define user permissions:

```yaml
uac:
  type: 'static'
  users:
    - user_id: 'user-unique-id'
      permissions:
        - manage_claims
        - read_catalog
        # Add other permissions as needed
```

See [Roles](#roles) below for the full list of available permissions.

### Environment Variables

The following environment variables can be used to override default settings:

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (`development`, `production`, `test`)

### Configuration File Example

```yaml
# Database configuration
database:
  type: postgres
  host: localhost
  port: 5432
  username: product_user
  password: secure_password
  database: product_db

# Authentication configuration
auth:
  type: 'jwt-jwk'
  jwkUrl: 'https://your-keycloak-server/auth/realms/your-realm/protocol/openid-connect/certs'

# User access control
uac:
  type: 'static'
  users:
    - user_id: 'admin-user-id'
      permissions:
        - manage_claims
```

## Roles

Product Server uses role-based access control (UAC). A user is granted access by listing one or more of the following role names under `uac.users[].permissions` in `config/config.yml` (see [Configuration](#configuration)).

| Role | Grants |
|------|--------|
| `manage_claims` | Framework-level role (provided by `@fsarch/server`) for managing user/claim assignments. Not specific to this service. |
| `read_catalog` | Read access to catalogs (e.g. list/get catalogs). |
| `read_item_type` | Read access to item types defined within a catalog. |
| `read_attribute` | Read access to attribute definitions defined within a catalog. |
| `read_item` | Read access to items (products/groups) and their attribute values. |

These roles currently gate the [MCP](https://modelcontextprotocol.io/) tool endpoints (`src/controllers/mcp/mcp-tools.controller.ts`) — `list_catalogs`/`get_catalog` require `read_catalog`, `list_item_types` requires `read_item_type`, `list_attributes` requires `read_attribute`, and `list_items`/`get_item` require `read_item`.

Roles are defined in [`src/constants/role.enum.ts`](src/constants/role.enum.ts) and follow this naming convention (matching other fsarch services):

- `read_<resource>` — reading `<resource>`
- `write_<resource>` — creating/updating `<resource>`
- `delete_<resource>` — deleting `<resource>`

The main REST API (`/v1/...`) currently only requires a valid authenticated user (see [Authorization](#authorization)) and does not yet enforce per-role checks beyond authentication.

## Databases

Product Server supports multiple database systems. Choose the one that best fits your infrastructure.

### Supported Databases

- **PostgreSQL** (recommended for production and development)
- **SQLite** (suitable for testing and simple deployments)
- **CockroachDB** (legacy support - see [COCKROACHDB_SETUP.md](COCKROACHDB_SETUP.md))

### PostgreSQL Setup

PostgreSQL is the recommended database for both development and production use.

#### Using Docker

Start PostgreSQL using Docker:

```bash
# Start PostgreSQL container
docker run -d \
  --name product-server-postgres \
  -e POSTGRES_DB=product_db \
  -e POSTGRES_USER=product_user \
  -e POSTGRES_PASSWORD=secure_password \
  -p 5432:5432 \
  postgres:15
```

Or use Docker Compose (see [Deployment](#deployment) section for complete example).

#### Configuration

Add to `config/config.yml`:

```yaml
database:
  type: postgres
  host: localhost
  port: 5432
  username: product_user
  password: secure_password
  database: product_db
```

#### Production Setup with SSL

For production deployments with SSL/TLS:

```yaml
database:
  type: postgres
  host: your-postgres-server.com
  port: 5432
  username: product_user
  password: secure_password
  database: product_db
  ssl:
    rejectUnauthorized: true
    ca:
      path: ./config/certs/ca.crt
    cert:
      path: ./config/certs/client-cert.crt
    key:
      path: ./config/certs/client-key.key
```

### SQLite Setup

SQLite requires no additional installation and is ideal for development.

#### Configuration

Add to `config/config.yml`:

```yaml
database:
  type: sqlite
  database: ./example-data/database.sqlite3
```

The database file will be created automatically if it doesn't exist.

### Database Migrations

**Database migrations are applied automatically** when the application starts. You don't need to run migrations manually.

The application will:
1. Check for pending migrations on startup
2. Apply them automatically to your configured database
3. Log the migration status

#### Advanced Migration Commands

For development purposes, the following commands are available:

```bash
# Generate a new migration based on entity changes
pnpm run migration:generate -- ./src/database/migrations/YourMigrationName

# Create an empty migration file
pnpm run migration:create -- MigrationName

# Manually run pending migrations (optional - runs automatically on startup)
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert
```

## Authorization

Product Server supports two authentication methods:

1. **JWT with JWK (JSON Web Key)** - OpenID Connect integration (recommended for production)
2. **Static Authentication** - Simple token-based auth (suitable for development)

### OpenID Connect with Keycloak

The recommended authentication method uses OpenID Connect with JWT tokens validated against a JWK endpoint.

For complete Keycloak setup instructions, see [KEYCLOAK_SETUP.md](KEYCLOAK_SETUP.md).

#### Configuration

After setting up Keycloak, add to `config/config.yml`:

```yaml
auth:
  type: 'jwt-jwk'
  jwkUrl: 'http://localhost:8080/realms/product-server/protocol/openid-connect/certs'

uac:
  type: 'static'
  users:
    - user_id: 'keycloak-user-uuid'
      permissions:
        - manage_claims
        - read_catalogs
```

**Note**: The JWK URL pattern is `{keycloak-base-url}/realms/{realm-name}/protocol/openid-connect/certs`

For detailed Keycloak setup instructions including realm creation, client configuration, user management, testing, and troubleshooting, see [KEYCLOAK_SETUP.md](KEYCLOAK_SETUP.md).

### Static Authentication (Development Only)

For development and testing, you can use static authentication:

```yaml
auth:
  type: 'static'
  secret: 'your-secret-key-min-32-chars'
  users:
    - id: 'user1'
      username: 'admin'
      password: 'admin123'
```

**Warning**: Do not use static authentication in production environments.

## API Documentation

The Product Server provides a comprehensive REST API with automatic OpenAPI/Swagger documentation.

### Accessing API Documentation

Once the server is running, access the interactive API documentation at:

**Swagger UI**: http://localhost:3000/docs

The Swagger interface provides:
- Interactive API explorer
- Request/response schemas
- Try-it-out functionality
- Authentication support

### API Versioning

The API uses URI versioning. All endpoints are prefixed with `/v1/`:

- `GET /v1/catalogs` - List catalogs
- `POST /v1/catalogs` - Create catalog
- `GET /v1/catalogs/{id}/items` - List items in catalog
- And more...

### Authentication Headers

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Development

For detailed development information, see [DEVELOPMENT.md](DEVELOPMENT.md).

### Quick Start

```bash
# Install dependencies
pnpm install

# Run in development mode with hot-reload
pnpm run start:dev

# Run tests
pnpm run test

# Run linter
pnpm run lint
```

### Key Development Resources

- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Complete developer guide including:
  - Project structure and architecture
  - Development commands and workflows
  - Database migrations
  - Testing and debugging
  - API development guidelines
  - Contributing guidelines

## Deployment

### Docker Deployment

A Dockerfile is provided for containerized deployments.

#### Build the Docker Image

```bash
docker build -t product-server:latest .
```

#### Run the Container

```bash
docker run -d \
  -p 8080:8080 \
  -v $(pwd)/config:/usr/src/app/config:ro \
  --name product-server \
  product-server:latest
```

#### Using Docker Compose (Recommended)

The recommended way to run the complete stack with all dependencies:

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  product-server:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./config:/usr/src/app/config:ro
    environment:
      - NODE_ENV=production
      - PORT=3000
    depends_on:
      - postgres
      - keycloak

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: product_db
      POSTGRES_USER: product_user
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  keycloak:
    image: quay.io/keycloak/keycloak:latest
    command: start-dev
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    ports:
      - "8080:8080"
    volumes:
      - keycloak_data:/opt/keycloak/data

volumes:
  postgres_data:
  keycloak_data:
```

Run with:

```bash
docker-compose up -d
```

This will start:
- Product Server on port 3000
- PostgreSQL on port 5432
- Keycloak on port 8080

After starting, configure Keycloak as described in the [Authorization](#authorization) section.

### Production Considerations

1. **Environment Variables**: Use environment variables for sensitive configuration
2. **SSL/TLS**: Enable HTTPS using a reverse proxy (nginx, Caddy)
3. **Database**: Use a managed database service or properly configured database cluster
4. **Monitoring**: Implement logging and monitoring solutions
5. **Backups**: Regular database backups
6. **Security**: Keep dependencies updated, use security scanning tools

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Run `pnpm run lint` before committing
- Write tests for new features
- Update documentation as needed

## License

This project is licensed under UNLICENSED - see the package.json for details.

## Support

For issues and questions:

- Open an issue on GitHub
- Review the Swagger API documentation at http://localhost:3000/docs

### Documentation

- **[KEYCLOAK_SETUP.md](KEYCLOAK_SETUP.md)** - Keycloak setup and troubleshooting
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Developer guide and best practices
- **[COCKROACHDB_SETUP.md](COCKROACHDB_SETUP.md)** - Legacy CockroachDB configuration

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database Support**: PostgreSQL, SQLite
- **Authentication**: OpenID Connect (JWT/JWK)
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Pino
- **Validation**: class-validator, Joi
