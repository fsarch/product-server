# Advanced Configuration

This document contains advanced configuration options and legacy database support.

## Table of Contents

- [Keycloak OpenID Connect Setup](#keycloak-openid-connect-setup)
- [CockroachDB Configuration (Legacy)](#cockroachdb-configuration-legacy)

## Keycloak OpenID Connect Setup

This section provides detailed instructions for setting up Keycloak as an OpenID Connect identity provider.

### Install and Start Keycloak

Using Docker (recommended):

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

Access Keycloak admin console at: http://localhost:8080

### Create a Realm

1. Log in to Keycloak admin console
2. Click **Create Realm**
3. Set realm name (e.g., `product-server`)
4. Click **Create**

### Create a Client

1. Navigate to **Clients** → **Create client**
2. Configure the client:
   - **Client ID**: `product-server-api`
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Valid redirect URIs**: `http://localhost:3000/*`
   - **Web origins**: `http://localhost:3000`
3. Save the client

### Get Client Credentials

1. Go to the **Credentials** tab
2. Copy the **Client Secret** (you'll need this for API calls)

### Create Users

1. Navigate to **Users** → **Add user**
2. Set username and other details
3. Save and go to **Credentials** tab
4. Set a password (disable "Temporary" if needed)

### Configuration

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

### User Permissions

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

### Testing the Setup

#### 1. Get an Access Token from Keycloak

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

#### 2. Make an API Request

```bash
curl -X GET 'http://localhost:3000/v1/catalogs' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### 3. Test with Swagger UI

1. Open http://localhost:3000/docs
2. Click **Authorize**
3. Enter: `Bearer YOUR_ACCESS_TOKEN`
4. Click **Authorize**
5. Try any API endpoint

### Troubleshooting

**Issue**: "Unauthorized" error

- **Solution**: Verify the JWK URL is correct and accessible
- Check that the token is valid and not expired
- Ensure the user_id in UAC matches the Keycloak user's UUID

**Issue**: "Invalid token signature"

- **Solution**: Ensure the JWK URL points to the correct realm
- Verify network connectivity to Keycloak server

**Issue**: Token expires too quickly

- **Solution**: In Keycloak, go to **Realm Settings** → **Tokens** and increase the access token lifespan

## CockroachDB Configuration (Legacy)

**Note**: CockroachDB support is maintained for backward compatibility but is not recommended for new deployments. Please use PostgreSQL instead.

### Basic Configuration

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

### Connection Notes

- Default port for CockroachDB is 26257
- SSL configuration is required for most production deployments
- Certificate paths should be relative to the project root or absolute
