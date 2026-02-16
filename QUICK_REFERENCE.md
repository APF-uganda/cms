# Quick Reference Guide

## 🚀 Quick Start Commands

### Start Development
```bash
# Terminal 1: Start Strapi CMS
cd CMS
yarn develop

# Terminal 2: Start React Frontend
cd portal
npm run dev

# Terminal 3: Start Django Backend (if needed)
cd Backend/api
python manage.py runserver
```

### Access Points
- **Strapi Admin:** http://localhost:1337/admin
- **Frontend:** http://localhost:5173
- **Test CMS:** http://localhost:5173/test-cms
- **Django API:** http://localhost:8000

---

## 📝 Common Tasks

### Add New Event
1. Strapi Admin → Content Manager → Event → Create new entry
2. Fill: Title, Description, Date, Time, Location
3. Upload Image
4. Toggle "Is Featured" if needed
5. Click **Publish**

### Add News Article
1. Strapi Admin → Content Manager → News Article → Create new entry
2. Fill: Title, Summary, Content, Publish Date
3. Upload Featured Image
4. Toggle "Is Featured" and/or "Is Top Pick"
5. Click **Publish**

### Update Homepage
1. Strapi Admin → Content Manager → Homepage (Single Type)
2. Edit Hero, Stats, Chair Message sections
3. Click **Publish**

---

## 🔧 Troubleshooting

### Events Not Showing
```bash
# Check Strapi is running
curl http://localhost:1337/_health

# Check API endpoint
curl http://localhost:1337/api/events?populate=*

# Check public permissions
# Strapi Admin → Settings → Roles → Public → Enable find/findOne for Event
```

### Images Not Loading
```bash
# Check .env file
cat portal/.env
# Should have: VITE_CMS_URL=http://localhost:1337

# Check image URL in response
curl http://localhost:1337/api/events?populate=* | grep "url"
```

### CORS Errors
```javascript
// Check CMS/config/middlewares.ts
// Ensure frontend URL is in allowed origins
```

---

## 📚 File Locations

### Content Types
```
CMS/src/api/
├── event/
├── news-article/
├── leadership/
├── benefit/
├── faq/
├── partner/
├── timeline-event/
├── homepage/
├── about-page/
├── membership-page/
├── contact-info/
└── site-setting/
```

### Frontend Integration
```
portal/src/
├── hooks/useCMS.ts          # Custom hooks
├── services/
│   ├── cmsApi.ts            # API functions
│   └── strapiAdapter.ts     # Data transformation
└── components/
    ├── EventComponents/     # Event components
    └── NewsComponents/      # News components
```

---

## 🔑 Environment Variables

### CMS/.env
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_HOST=<neon-host>
DATABASE_NAME=strapi_cms
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
DATABASE_SSL=true
ADMIN_JWT_SECRET=<generate>
API_TOKEN_SALT=<generate>
APP_KEYS=<generate-4-keys>
JWT_SECRET=<generate>
TRANSFER_TOKEN_SALT=<generate>
```

### portal/.env
```env
VITE_API_URL=http://localhost:8000
VITE_CMS_URL=http://localhost:1337
```

### Generate Secrets
```bash
openssl rand -base64 32
```

---

## 🎯 API Endpoints

### Strapi CMS
```
GET /api/events?populate=*
GET /api/events/:id?populate=*
GET /api/news-articles?populate=*
GET /api/leaderships?populate=*
GET /api/benefits?populate=*
GET /api/faqs
GET /api/partners?populate=*
GET /api/homepage?populate[hero][populate]=*
GET /api/about-page?populate[hero][populate]=*
GET /api/membership-page?populate[hero][populate]=*
```

### Django Backend (Unchanged)
```
POST /api/auth/login
POST /api/auth/register
GET /api/applications
POST /api/applications
GET /api/payments
POST /api/payments
```

---

## 💾 Backup Commands

### Export All Content
```bash
cd CMS
yarn strapi export --file backup-$(date +%Y%m%d).tar.gz
```

### Export Specific Content
```bash
yarn strapi export --file events-backup.tar.gz --only events
```

### Import Content
```bash
yarn strapi import --file backup-20260216.tar.gz
```

### Backup Media Files
```bash
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz CMS/public/uploads
```

---

## 🧪 Testing

### Test CMS Connection
```bash
# Visit test page
open http://localhost:5173/test-cms

# Or curl API directly
curl http://localhost:1337/api/events?populate=*
```

### Test Event Components
```bash
# Visit events page
open http://localhost:5173/events

# Check:
# - EventCalendar shows events
# - UpcomingEvents section works
# - PreviousEvents section works
```

### Test Landing Page
```bash
# Visit landing page
open http://localhost:5173/

# Check:
# - FeaturedEvents section shows featured events only
```

---

## 📦 Deployment

### Deploy Strapi to Heroku
```bash
heroku create apf-cms
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
heroku config:set ADMIN_JWT_SECRET=$(openssl rand -base64 32)
# ... set other env vars
git subtree push --prefix CMS heroku main
```

### Deploy Frontend to Vercel
```bash
cd portal
vercel
# Set environment variables in Vercel dashboard
```

---

## 🔍 Useful Commands

### Check Strapi Version
```bash
cd CMS
yarn strapi version
```

### Update Strapi
```bash
yarn upgrade @strapi/strapi@latest
```

### Clear Strapi Cache
```bash
yarn strapi build --clean
```

### Generate New Content Type
```bash
yarn strapi generate content-type
```

### Create Admin User (CLI)
```bash
yarn strapi admin:create-user
```

---

## 📊 Migration Status

### ✅ Completed
- [x] Strapi CMS setup
- [x] All content types created
- [x] API adapter layer
- [x] Custom React hooks
- [x] Events migration (4 components)
- [x] Loading states
- [x] Empty states
- [x] Error handling
- [x] Documentation

### ⏳ Pending
- [ ] News components migration
- [ ] Leadership component migration
- [ ] Benefits component migration
- [ ] FAQ component migration
- [ ] Partners component migration
- [ ] Homepage content migration
- [ ] About page migration
- [ ] Membership page migration

---

## 🆘 Getting Help

### Check Logs
```bash
# Strapi logs
cd CMS && yarn develop

# Frontend logs
cd portal && npm run dev

# Check browser console
# Open DevTools → Console tab
```

### Common Error Messages

**"Failed to fetch events"**
- Check Strapi is running
- Check public permissions enabled
- Check network tab in DevTools

**"CORS policy error"**
- Check CMS/config/middlewares.ts
- Add frontend URL to allowed origins

**"403 Forbidden"**
- Enable public permissions in Strapi
- Settings → Roles → Public

**"Images not loading"**
- Check VITE_CMS_URL in .env
- Verify images uploaded in Strapi
- Check image URL format

---

## 📖 Documentation Links

- **Full Documentation:** `CMS/STEP5_DOCUMENTATION.md`
- **Add Sample Data:** `CMS/ADD_SAMPLE_DATA_GUIDE.md`
- **Quick Test:** `CMS/QUICK_TEST_EVENT.md`
- **Events Migration:** `EVENTS_MIGRATION_COMPLETE.md`
- **Step 3 Complete:** `CMS/STEP3_IMPLEMENTATION_COMPLETE.md`

---

## 🎉 Success Checklist

- [ ] Strapi running on port 1337
- [ ] Frontend running on port 5173
- [ ] Public permissions enabled
- [ ] Sample events added
- [ ] Test page shows data
- [ ] Event calendar works
- [ ] Featured events show on landing page
- [ ] Images loading correctly
- [ ] No console errors

---

**Quick Tip:** Bookmark this page for easy reference! 🔖
