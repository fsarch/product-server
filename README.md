# Product Server

A modern, scalable product catalog management server built with [NestJS](https://nestjs.com/). This server provides a RESTful API for managing product catalogs, items, attributes, and localizations with support for multiple database backends and OpenID-based authentication.

## Project Purpose

Product Server is designed to manage product catalogs with flexible attribute systems and multi-language support. It provides:

- **Catalog Management**: Create and manage product catalogs with customizable item types
- **Flexible Attributes**: Support for various attribute types (text, number, boolean, list, JSON, image, link)
- **Localization**: Built-in support for multi-language content
- **Type Safety**: Full TypeScript implementation with strict typing
- **RESTful API**: Versioned REST API with automatic OpenAPI/Swagger documentation
- **Database Flexibility**: Support for PostgreSQL, CockroachDB, and SQLite
- **Secure Authentication**: OpenID Connect integration with JWT token validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher)
- **npm** (v9.x or higher)
- **Database**: One of the following:
  - PostgreSQL (v12 or higher)
  - CockroachDB (v21 or higher)
  - SQLite (v3 or higher)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fsarch/product-server.git
cd product-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a configuration file:
```bash
cp config/config.template.yml config/config.yml
```

4. Edit `config/config.yml` to match your environment (see [Configuration](#configuration) section below)

### Running the Application

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
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
        - read_catalogs
        # Add other permissions as needed
```

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

## Databases

Product Server supports multiple database systems. Choose the one that best fits your infrastructure.

### Supported Databases

- **PostgreSQL** (recommended for production and development)
- **SQLite** (suitable for testing and simple deployments)
- **CockroachDB** (legacy support - not recommended for new deployments)

### PostgreSQL Setup

PostgreSQL is the recommended database for both development and production use.

#### Using Docker (Recommended)

The easiest way to get started with PostgreSQL is using Docker:

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

#### Manual Installation (Alternative)

If you prefer to install PostgreSQL directly:

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

Then create the database and user:

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE product_db;
CREATE USER product_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE product_db TO product_user;
\q
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

### CockroachDB Setup (Legacy)

**Note**: CockroachDB support is maintained for backward compatibility but is not recommended for new deployments. Please use PostgreSQL instead.

<details>
<summary>Click to expand CockroachDB setup instructions</summary>

#### Configuration

Add to `config/config.yml`:

```yaml
database:
  type: cockroachdb
  host: localhost
  port: 26257
  username: product_user
  password: secure_password
  database: product_db
  ssl:
    rejectUnauthorized: false
```

#### Secure Cluster Setup

For production CockroachDB clusters with certificates:

```yaml
database:
  type: cockroachdb
  host: your-cockroach-cluster.com
  port: 26257
  username: product_user
  password: secure_password
  database: product_db
  ssl:
    rejectUnauthorized: true
    ca:
      path: ./config/certs/ca.crt
    cert:
      path: ./config/certs/client.product_user.crt
    key:
      path: ./config/certs/client.product_user.key
```

</details>

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
npm run migration:generate -- ./src/database/migrations/YourMigrationName

# Create an empty migration file
npm run migration:create -- MigrationName

# Manually run pending migrations (optional - runs automatically on startup)
npm run migration:run

# Revert the last migration
npm run migration:revert
```

## Authorization

Product Server supports two authentication methods:

1. **JWT with JWK (JSON Web Key)** - OpenID Connect integration (recommended for production)
2. **Static Authentication** - Simple token-based auth (suitable for development)

### OpenID Connect with Keycloak

The recommended authentication method uses OpenID Connect with JWT tokens validated against a JWK endpoint.

#### Keycloak Setup

##### 1. Install and Start Keycloak

```bash
# Using Docker
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

Access Keycloak admin console at: http://localhost:8080

##### 2. Create a Realm

1. Log in to Keycloak admin console
2. Click **Create Realm**
3. Set realm name (e.g., `product-server`)
4. Click **Create**

##### 3. Create a Client

1. Navigate to **Clients** → **Create client**
2. Configure the client:
   - **Client ID**: `product-server-api`
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Valid redirect URIs**: `http://localhost:3000/*`
   - **Web origins**: `http://localhost:3000`
3. Save the client

##### 4. Get Client Credentials

1. Go to the **Credentials** tab
2. Copy the **Client Secret** (you'll need this for API calls)

##### 5. Create Users

1. Navigate to **Users** → **Add user**
2. Set username and other details
3. Save and go to **Credentials** tab
4. Set a password (disable "Temporary" if needed)

#### Configuration

Add to `config/config.yml`:

```yaml
auth:
  type: 'jwt-jwk'
  jwkUrl: 'http://localhost:8080/realms/product-server/protocol/openid-connect/certs'
```

**Important**: The JWK URL follows this pattern:
```
{keycloak-base-url}/realms/{realm-name}/protocol/openid-connect/certs
```

#### User Permissions

Map Keycloak users to permissions in the UAC section:

```yaml
uac:
  type: 'static'
  users:
    - user_id: 'keycloak-user-uuid'  # Get this from Keycloak user details
      permissions:
        - manage_claims
        - read_catalogs
        - write_catalogs
```

#### Testing the Setup

##### 1. Get an Access Token from Keycloak

```bash
curl -X POST 'http://localhost:8080/realms/product-server/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=product-server-api' \
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'username=your-username' \
  -d 'password=your-password' \
  -d 'grant_type=password'
```

This returns a JSON response with an `access_token`.

##### 2. Make an API Request

```bash
curl -X GET 'http://localhost:3000/v1/catalogs' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

##### 3. Test with Swagger UI

1. Open http://localhost:3000/docs
2. Click **Authorize**
3. Enter: `Bearer YOUR_ACCESS_TOKEN`
4. Click **Authorize**
5. Try any API endpoint

#### Troubleshooting

**Issue**: "Unauthorized" error

- **Solution**: Verify the JWK URL is correct and accessible
- Check that the token is valid and not expired
- Ensure the user_id in UAC matches the Keycloak user's UUID

**Issue**: "Invalid token signature"

- **Solution**: Ensure the JWK URL points to the correct realm
- Verify network connectivity to Keycloak server

**Issue**: Token expires too quickly

- **Solution**: In Keycloak, go to **Realm Settings** → **Tokens** and increase the access token lifespan

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

### Project Structure

```
product-server/
├── config/                 # Configuration files
│   ├── config.template.yml # Configuration template
│   └── config.yml         # Your configuration (gitignored)
├── src/
│   ├── controllers/       # API controllers
│   ├── database/          # Database entities and migrations
│   │   ├── entities/      # TypeORM entities
│   │   └── migrations/    # Database migrations
│   ├── fsarch/           # Framework modules
│   │   ├── auth/         # Authentication
│   │   ├── database/     # Database module
│   │   └── uac/          # User access control
│   ├── models/           # DTOs and models
│   ├── repositories/     # Data access layer
│   └── main.ts          # Application entry point
└── test/                # Tests

```

### Development Commands

```bash
# Install dependencies
npm install

# Run in development mode with hot-reload
npm run start:dev

# Build the project
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

### Creating New Migrations

When you modify database entities:

```bash
# Generate migration based on entity changes
npm run migration:generate -- ./src/database/migrations/YourMigrationName
```

Note: Migrations are applied automatically on application startup.

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
- Run `npm run lint` before committing
- Write tests for new features
- Update documentation as needed

## License

This project is licensed under UNLICENSED - see the package.json for details.

## Support

For issues and questions:

- Open an issue on GitHub
- Check existing documentation in the `/docs` folder (if available)
- Review the Swagger API documentation at http://localhost:3000/docs

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database Support**: PostgreSQL, CockroachDB, SQLite
- **Authentication**: OpenID Connect (JWT/JWK)
- **API Documentation**: Swagger/OpenAPI
- **Logging**: Pino
- **Validation**: class-validator, Joi
