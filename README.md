# APF Organization - Strapi CMS

Content Management System for APF Organization public website content.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Yarn
- PostgreSQL database (Neon or local)

### Installation

1. **Install dependencies**
```bash
yarn install
```

2. **Configure environment**
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your database credentials
# Generate secrets with: openssl rand -base64 32
```

3. **Start development server**
```bash
yarn develop
```

4. **Access admin panel**
- URL: http://localhost:1337/admin
- Create admin account on first visit

5. **Enable public permissions**
- Go to Settings → Roles → Public
- Enable `find` and `findOne` for all content types
- Click Save

## 📚 Documentation

- **[Complete Documentation](STEP5_DOCUMENTATION.md)** - Installation, configuration, deployment
- **[Quick Reference](QUICK_REFERENCE.md)** - Commands and troubleshooting
- **[Add Sample Data](ADD_SAMPLE_DATA_GUIDE.md)** - Content editor guide
- **[Quick Test](QUICK_TEST_EVENT.md)** - Add your first event in 2 minutes
- **[Content Structure](STRAPI_CONTENT_STRUCTURE.md)** - All content types and schemas

## 📦 Content Types

### Collection Types
- **Event** - Events and conferences
- **News Article** - News and updates
- **News Category** - News categories
- **Leadership** - Leadership team members
- **Benefit** - Membership benefits
- **FAQ** - Frequently asked questions
- **Partner** - Partner organizations
- **Timeline Event** - Organization timeline

### Single Types
- **Homepage** - Homepage content
- **About Page** - About page content
- **Membership Page** - Membership page content
- **Contact Info** - Contact information
- **Site Settings** - Global site settings

## 🔧 Available Commands

```bash
# Development
yarn develop          # Start dev server with admin panel
yarn start           # Start production server
yarn build           # Build admin panel

# Content Management
yarn strapi export   # Export all content
yarn strapi import   # Import content

# Generate
yarn strapi generate content-type  # Generate new content type
yarn strapi generate component     # Generate new component

# Database
yarn strapi migration:create       # Create migration
yarn strapi migration:run          # Run migrations
```

## 🌐 API Endpoints

All endpoints are available at `http://localhost:1337/api`

### Collection Types
```
GET /api/events?populate=*
GET /api/events/:id?populate=*
GET /api/news-articles?populate=*
GET /api/leaderships?populate=*
GET /api/benefits?populate=*
GET /api/faqs
GET /api/partners?populate=*
GET /api/timeline-events?populate=*
```

### Single Types
```
GET /api/homepage?populate[hero][populate]=*
GET /api/about-page?populate[hero][populate]=*
GET /api/membership-page?populate[hero][populate]=*
GET /api/contact-info?populate=*
GET /api/site-setting?populate=*
```

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-host
DATABASE_NAME=strapi_cms
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true

# Secrets (generate with: openssl rand -base64 32)
ADMIN_JWT_SECRET=...
API_TOKEN_SALT=...
JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
APP_KEYS=key1,key2,key3,key4
```

## 🚢 Deployment

### Heroku
```bash
heroku create apf-cms
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
# Set other environment variables
git subtree push --prefix CMS heroku main
```

### Railway
1. Create new project
2. Add PostgreSQL database
3. Connect GitHub repository
4. Set environment variables
5. Deploy automatically

### DigitalOcean App Platform
1. Create app from GitHub
2. Select CMS folder
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

See [Deployment Guide](STEP5_DOCUMENTATION.md#deployment-steps) for details.

## 💾 Backup

### Export all content
```bash
yarn strapi export --file backup-$(date +%Y%m%d).tar.gz
```

### Import content
```bash
yarn strapi import --file backup-20260216.tar.gz
```

### Backup media files
```bash
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads
```

See [Backup Strategy](STEP5_DOCUMENTATION.md#backup-strategy) for details.

## 🔍 Troubleshooting

### Strapi won't start
- Check database connection
- Verify environment variables
- Check port 1337 is available

### 403 Forbidden errors
- Enable public permissions in Strapi admin
- Settings → Roles → Public → Enable find/findOne

### Images not loading
- Check images are uploaded
- Verify public access to uploads folder
- Check CORS configuration

See [Troubleshooting Guide](QUICK_REFERENCE.md#-troubleshooting) for more.

## 📖 Learn More

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Guides](https://strapi.io/resource-center)
- [Strapi Community](https://discord.strapi.io)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

Private - APF Organization

## 🆘 Support

For issues and questions:
1. Check [Documentation](STEP5_DOCUMENTATION.md)
2. Review [Quick Reference](QUICK_REFERENCE.md)
3. Check Strapi logs
4. Contact development team

---

**Version:** 1.0.0  
**Last Updated:** February 16, 2026  
**Status:** Production Ready ✅
