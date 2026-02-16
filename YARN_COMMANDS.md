# Yarn Commands for Strapi CMS

Quick reference for managing your Strapi CMS using Yarn.

## Development

### Start Development Server
```bash
yarn develop
```
Starts Strapi in development mode with auto-reload.
Access admin panel at: `http://localhost:1337/admin`

### Start Production Server
```bash
yarn start
```
Starts Strapi in production mode (after building).

### Build Admin Panel
```bash
yarn build
```
Builds the admin panel for production deployment.

---

## Content Type Management

### Generate New Content Type
```bash
yarn strapi generate
```
Interactive CLI to generate:
- API (with content type)
- Controller
- Service
- Policy
- Middleware
- Migration

### Generate Specific Content Type
```bash
yarn strapi generate content-type
```
Creates a new content type with interactive prompts.

### Generate Component
```bash
yarn strapi generate component
```
Creates a new component with interactive prompts.

---

## Database Management

### Run Migrations
```bash
yarn strapi migrations:run
```

### Create Migration
```bash
yarn strapi migrations:create
```

---

## Plugin Management

### Install Plugin
```bash
yarn add @strapi/plugin-[plugin-name]
```

### Common Plugins
```bash
# SEO Plugin
yarn add @strapi/plugin-seo

# Sitemap Plugin
yarn add strapi-plugin-sitemap

# Slugify Plugin
yarn add strapi-plugin-slugify

# Transformer Plugin (for response formatting)
yarn add strapi-plugin-transformer

# Import/Export Content
yarn add strapi-plugin-import-export-entries
```

---

## User Management

### Create Admin User (CLI)
```bash
yarn strapi admin:create-user
```

### Reset Admin Password
```bash
yarn strapi admin:reset-user-password
```

---

## Configuration

### Display Configuration
```bash
yarn strapi configuration:dump
```

### Restore Configuration
```bash
yarn strapi configuration:restore
```

---

## TypeScript

### Generate TypeScript Definitions
```bash
yarn strapi ts:generate-types
```

---

## Testing

### Run Tests
```bash
yarn test
```

---

## Utilities

### Display Strapi Version
```bash
yarn strapi version
```

### Display Help
```bash
yarn strapi help
```

### Console (REPL)
```bash
yarn strapi console
```
Opens an interactive console to interact with Strapi.

---

## Custom Scripts

You can add custom scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "strapi develop",
    "prod": "strapi start",
    "build": "strapi build",
    "seed": "node scripts/seed.js",
    "export": "strapi export",
    "import": "strapi import"
  }
}
```

Then run with:
```bash
yarn dev
yarn prod
yarn seed
```

---

## Environment-Specific Commands

### Development
```bash
NODE_ENV=development yarn develop
```

### Production
```bash
NODE_ENV=production yarn build
NODE_ENV=production yarn start
```

---

## Troubleshooting

### Clear Cache
```bash
yarn strapi build --clean
```

### Rebuild Admin
```bash
rm -rf .cache build
yarn build
```

### Reset Database (Development Only!)
```bash
# Delete database file (SQLite)
rm .tmp/data.db

# Or drop PostgreSQL database
# Then restart Strapi
yarn develop
```

---

## Useful Yarn Commands

### Check Outdated Packages
```bash
yarn outdated
```

### Update Packages
```bash
yarn upgrade
```

### Update Strapi
```bash
yarn upgrade @strapi/strapi @strapi/plugin-users-permissions @strapi/plugin-i18n
```

### Clean Install
```bash
rm -rf node_modules yarn.lock
yarn install
```

---

## Quick Start Workflow

1. **Initial Setup**
   ```bash
   cd CMS
   yarn install
   yarn develop
   ```

2. **Create Admin Account**
   - Navigate to `http://localhost:1337/admin`
   - Fill in admin details
   - Click "Let's start"

3. **Configure Permissions**
   - Settings → Roles → Public
   - Enable `find` and `findOne` for all content types
   - Save

4. **Create Content**
   - Content Manager → Create entries
   - Publish when ready

5. **Test API**
   ```bash
   curl http://localhost:1337/api/events
   ```

---

## Production Deployment

### Build for Production
```bash
yarn build
```

### Start Production Server
```bash
NODE_ENV=production yarn start
```

### Using PM2 (Process Manager)
```bash
# Install PM2
yarn global add pm2

# Start with PM2
pm2 start yarn --name "strapi-cms" -- start

# View logs
pm2 logs strapi-cms

# Restart
pm2 restart strapi-cms

# Stop
pm2 stop strapi-cms
```

---

## Environment Variables

Create `.env` file in CMS root:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi_cms
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
```

---

**Pro Tip:** Use `yarn develop --watch-admin` to enable hot reload for admin panel customizations!
