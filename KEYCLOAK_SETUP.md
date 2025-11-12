# Keycloak OpenID Connect Setup

This document provides detailed instructions for setting up Keycloak as an OpenID Connect identity provider for Product Server.

## Overview

Keycloak is an open-source identity and access management solution that provides OpenID Connect, OAuth 2.0, and SAML support. Product Server uses Keycloak for JWT token-based authentication.

## Prerequisites

- Docker installed on your system
- Product Server configured and running (see main [README.md](README.md))

## Install and Start Keycloak

### Using Docker (Recommended)

Start Keycloak in development mode:

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

Access Keycloak admin console at: http://localhost:8080

Default credentials:
- Username: `admin`
- Password: `admin`

### Using Docker Compose

For a complete development stack including Product Server, PostgreSQL, and Keycloak, see the Docker Compose example in the main [README.md](README.md#using-docker-compose-recommended).

## Setup Steps

### 1. Create a Realm

A realm manages a set of users, credentials, roles, and groups.

1. Log in to Keycloak admin console at http://localhost:8080
2. Click **Create Realm** (or select the dropdown in the top-left)
3. Set realm name (e.g., `product-server`)
4. Click **Create**

### 2. Create a Client

A client represents an application that can request authentication.

1. Navigate to **Clients** → **Create client**
2. Configure the client:
   - **Client ID**: `product-server-api`
   - **Client Type**: `OpenID Connect`
   - Click **Next**
3. Configure capability settings:
   - **Client authentication**: ON
   - **Authorization**: OFF
   - **Authentication flow**: Check "Standard flow" and "Direct access grants"
   - Click **Next**
4. Configure login settings:
   - **Valid redirect URIs**: `http://localhost:3000/*`
   - **Web origins**: `http://localhost:3000`
5. Click **Save**

### 3. Get Client Credentials

1. Go to the **Clients** list and select your client (`product-server-api`)
2. Click the **Credentials** tab
3. Copy the **Client Secret** (you'll need this for API calls)

### 4. Create Users

1. Navigate to **Users** → **Add user**
2. Fill in user details:
   - **Username**: (e.g., `testuser`)
   - **Email**: (optional)
   - **First name**: (optional)
   - **Last name**: (optional)
3. Click **Create**
4. Go to the **Credentials** tab
5. Click **Set password**
6. Enter a password
7. Set **Temporary** to OFF (so user doesn't need to change password on first login)
8. Click **Save**

### 5. Get User UUID

To configure permissions in Product Server, you need the user's UUID:

1. Navigate to **Users** and select the user
2. Copy the **ID** field from the user details (this is the UUID)

## Product Server Configuration

### Configure Authentication

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

For production deployments, replace `http://localhost:8080` with your Keycloak server URL.

### Configure User Permissions

Map Keycloak users to permissions in the UAC section:

```yaml
uac:
  type: 'static'
  users:
    - user_id: 'keycloak-user-uuid'  # Replace with actual UUID from Keycloak
      permissions:
        - manage_claims
        - read_catalogs
        - write_catalogs
```

## Testing the Setup

### 1. Get an Access Token from Keycloak

Use the Resource Owner Password Credentials flow to get a token:

```bash
curl -X POST 'http://localhost:8080/realms/product-server/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=product-server-api' \
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'username=testuser' \
  -d 'password=your-password' \
  -d 'grant_type=password'
```

This returns a JSON response like:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "token_type": "Bearer"
}
```

Copy the `access_token` value.

### 2. Make an API Request

Use the access token to authenticate API requests:

```bash
curl -X GET 'http://localhost:3000/v1/catalogs' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Replace `YOUR_ACCESS_TOKEN` with the actual token from step 1.

### 3. Test with Swagger UI

Product Server includes Swagger UI for interactive API testing:

1. Open http://localhost:3000/docs
2. Click the **Authorize** button (lock icon)
3. Enter: `Bearer YOUR_ACCESS_TOKEN`
4. Click **Authorize**
5. Try any API endpoint - they should now work with your authentication

## Troubleshooting

### Issue: "Unauthorized" error

**Symptoms**: API requests return 401 Unauthorized

**Solutions**:
- Verify the JWK URL in `config/config.yml` is correct and accessible from Product Server
- Check that the token is valid and not expired (tokens typically expire after 5 minutes)
- Ensure the `user_id` in UAC configuration matches the Keycloak user's UUID exactly
- Verify the Authorization header includes "Bearer " prefix: `Authorization: Bearer <token>`

### Issue: "Invalid token signature"

**Symptoms**: Token validation fails with signature error

**Solutions**:
- Ensure the JWK URL points to the correct realm
- Verify network connectivity from Product Server to Keycloak
- Check that Keycloak is running and accessible
- Confirm the token was issued by the same Keycloak instance configured in Product Server

### Issue: Token expires too quickly

**Symptoms**: Need to re-authenticate frequently

**Solutions**:
- In Keycloak admin console, go to **Realm Settings** → **Tokens**
- Increase **Access Token Lifespan** (default is 5 minutes)
- Increase **Refresh Token Lifespan** if using refresh tokens
- Click **Save**

### Issue: CORS errors in browser

**Symptoms**: Browser blocks requests with CORS error

**Solutions**:
- Ensure **Web origins** is set correctly in the Keycloak client configuration
- Add `http://localhost:3000` to Web origins
- Product Server has CORS enabled by default - verify it's not disabled in your configuration

### Issue: Cannot get user UUID

**Solutions**:
- In Keycloak admin console, navigate to **Users**
- Click on the user
- The **ID** field at the top contains the UUID
- Alternatively, you can see it in the URL: `/admin/master/console/#/product-server/users/{UUID}`

## Production Considerations

### Secure Keycloak

For production deployments:

1. **Use HTTPS**: Configure Keycloak with proper SSL/TLS certificates
2. **Strong Passwords**: Use strong admin passwords and enforce password policies
3. **Database**: Use a production database (PostgreSQL recommended) instead of the embedded H2 database
4. **Clustering**: Consider running multiple Keycloak instances for high availability

### Update JWK URL

Change the JWK URL to use HTTPS and your production domain:

```yaml
auth:
  type: 'jwt-jwk'
  jwkUrl: 'https://keycloak.yourdomain.com/realms/product-server/protocol/openid-connect/certs'
```

### User Management

- Integrate with LDAP/Active Directory for enterprise user management
- Configure user federation for existing identity sources
- Set up proper role-based access control (RBAC)
- Enable account security features (2FA, password policies)

## Additional Resources

- [Keycloak Official Documentation](https://www.keycloak.org/documentation)
- [OpenID Connect Specification](https://openid.net/connect/)
- [Keycloak Docker Images](https://quay.io/repository/keycloak/keycloak)
