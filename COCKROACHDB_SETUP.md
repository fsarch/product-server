# CockroachDB Setup (Legacy)

**⚠️ Important Notice**: CockroachDB support is maintained for backward compatibility but is **not recommended for new deployments**. Please use PostgreSQL instead for new projects.

## Overview

CockroachDB is a distributed SQL database. Product Server includes legacy support for CockroachDB for existing deployments, but PostgreSQL is now the recommended database for all use cases.

## Why PostgreSQL is Recommended

- Active development and support
- Better performance for typical Product Server workloads
- Simpler deployment and maintenance
- Wider ecosystem and tooling support
- More straightforward configuration

## Migration Path

If you're currently using CockroachDB, we recommend migrating to PostgreSQL. See the [PostgreSQL setup instructions](README.md#postgresql-setup) in the main README.

## CockroachDB Configuration (For Existing Deployments)

This section is provided for users who have existing CockroachDB deployments and need to maintain them.

### Prerequisites

- Existing CockroachDB cluster (v21 or higher)
- Network connectivity from Product Server to CockroachDB cluster
- Database credentials

### Basic Configuration

For a basic CockroachDB setup (development/testing only):

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

### Secure Cluster Setup

For production CockroachDB clusters with certificate-based authentication:

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

### Configuration Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `type` | Yes | - | Must be `cockroachdb` |
| `host` | Yes | - | CockroachDB server hostname or IP |
| `port` | No | 26257 | CockroachDB port (default is 26257) |
| `username` | Yes | - | Database user |
| `password` | No | - | Database password (required for most deployments) |
| `database` | Yes | - | Database name |
| `ssl.rejectUnauthorized` | No | true | Whether to reject unauthorized SSL certificates |
| `ssl.ca` | No | - | Certificate Authority certificate (string or path object) |
| `ssl.cert` | No | - | Client certificate (string or path object) |
| `ssl.key` | No | - | Client private key (string or path object) |

### SSL Certificate Paths

Certificates can be specified as:

1. **File path** (recommended):
   ```yaml
   ssl:
     ca:
       path: ./config/certs/ca.crt
   ```

2. **Inline certificate string**:
   ```yaml
   ssl:
     ca: |
       -----BEGIN CERTIFICATE-----
       MIIDXTCCAkWgAwIBAgIJAKL...
       -----END CERTIFICATE-----
   ```

### Connection Notes

- **Default Port**: CockroachDB default port is 26257 (different from PostgreSQL's 5432)
- **SSL**: Most production deployments require SSL/TLS encryption
- **Certificate Authentication**: Secure clusters typically use certificate-based authentication
- **Connection Pooling**: TypeORM handles connection pooling automatically
- **Migrations**: Database migrations run automatically on application startup

### Database Setup

If you need to set up a new CockroachDB database:

```sql
-- Connect to CockroachDB
cockroach sql --url "postgresql://root@localhost:26257?sslmode=disable"

-- Create database and user
CREATE DATABASE product_db;
CREATE USER product_user WITH PASSWORD 'secure_password';
GRANT ALL ON DATABASE product_db TO product_user;
```

### Troubleshooting

#### Connection Issues

**Problem**: Cannot connect to CockroachDB

**Solutions**:
- Verify CockroachDB is running: `cockroach node status --url <connection-string>`
- Check network connectivity and firewall rules
- Ensure port 26257 is accessible
- Verify connection parameters in `config/config.yml`

#### SSL/TLS Issues

**Problem**: SSL certificate validation errors

**Solutions**:
- For development: Set `ssl.rejectUnauthorized: false` (not recommended for production)
- For production: Ensure all certificate paths are correct
- Verify certificates are valid and not expired
- Check that certificate files are readable by the application

#### Permission Issues

**Problem**: "permission denied" errors

**Solutions**:
- Grant appropriate permissions: `GRANT ALL ON DATABASE product_db TO product_user;`
- Verify user has access to required tables
- Check that database initialization migrations completed successfully

## Migration to PostgreSQL

We strongly recommend migrating to PostgreSQL for better long-term support and performance.

### Migration Steps

1. **Set up PostgreSQL**: Follow the [PostgreSQL setup guide](README.md#postgresql-setup)

2. **Export data from CockroachDB**:
   ```bash
   cockroach dump product_db --url <connection-string> > dump.sql
   ```

3. **Import to PostgreSQL**:
   ```bash
   psql -U product_user -d product_db -f dump.sql
   ```

4. **Update configuration**:
   Change `database.type` from `cockroachdb` to `postgres` in `config/config.yml`

5. **Test thoroughly**: Verify all functionality works with PostgreSQL

### Compatibility Notes

- Most SQL features are compatible between CockroachDB and PostgreSQL
- Product Server uses TypeORM which abstracts most database differences
- Database migrations will run automatically when switching to PostgreSQL
- Test your specific use case thoroughly before production migration

## When to Continue Using CockroachDB

Continue using CockroachDB only if:

- You have an existing production deployment that's working well
- You require specific CockroachDB features (distributed SQL, geo-partitioning)
- You have specialized operational requirements that CockroachDB addresses
- Migration costs outweigh the benefits of switching to PostgreSQL

In all other cases, especially for new deployments, **use PostgreSQL**.

## Support and Resources

- **CockroachDB Documentation**: https://www.cockroachlabs.com/docs/
- **PostgreSQL Migration Guide**: See main [README.md](README.md)
- **Issues**: For Product Server-specific issues, open an issue on GitHub

## Deprecation Timeline

- **Current Status**: Supported for backward compatibility
- **Future**: Support may be removed in a future major version
- **Recommendation**: Plan migration to PostgreSQL for long-term maintainability
