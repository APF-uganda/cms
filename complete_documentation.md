# STEP 5 - Complete Documentation

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Environment Variables](#environment-variables)
3. [How Frontend Connects to CMS](#how-frontend-connects-to-cms)
4. [Content Editor Guide](#content-editor-guide)
5. [Developer Guide](#developer-guide)
6. [Deployment Steps](#deployment-steps)
7. [Backup Strategy](#backup-strategy)

---

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (Neon or local)
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd APF-ORG
```

### 2. Install Strapi CMS
```bash
cd CMS
yarn install
```

### 3. Configure Database
Create `.env` file in `CMS/` directory:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Database (Neon PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=<your-neon-host>
DATABASE_PORT=5432
DATABASE_NAME=strapi_cms
DATABASE_USERNAME=<your-username>
DATABASE_PASSWORD=<your-password>
DATABASE_SSL=true

# Admin JWT Secret (generate with: openssl rand -base64 32)
ADMIN_JWT_SECRET=<your-admin-jwt-secret>

# API Token Salt (generate with: openssl rand -base64 32)
API_TOKEN_SALT=<your-api-token-salt>

# App Keys (generate with: openssl rand -base64 32)
APP_KEYS=<key1>,<key2>,<key3>,<key4>

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=<your-jwt-secret>

# Transfer Token Salt (generate with: openssl rand -base64 32)
TRANSFER_TOKEN_SALT=<your-transfer-token-salt>
```

### 4. Start Strapi Development Server
```bash
yarn develop
```

First time setup:
1. Visit `http://localhost:1337/admin`
2. Create admin account
3. Login to admin panel

### 5. Configure Public Permissions
1. Go to **Settings** → **Roles** → **Public**
2. Enable `find` and `findOne` for all content types:
   - Event
   - News Article
   - News Category
   - Leadership
   - Benefit
   - FAQ
   - Partner
   - Timeline Event
   - Homepage
   - About Page
   - Membership Page
   - Contact Info
   - Site Settings
3. Click **Save**

### 6. Install Frontend Dependencies
```bash
cd ../portal
npm install
```

### 7. Configure Frontend Environment
Create `.env` file in `portal/` directory:

```env
# Django Backend API (Authentication, Applications, Payments)
VITE_API_URL=http://localhost:8000

# Strapi CMS API (Public Content)
VITE_CMS_URL=http://localhost:1337
```

### 8. Start Frontend Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## Environment Variables

### Strapi CMS (`CMS/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `1337` |
| `DATABASE_CLIENT` | Database type | `postgres` |
| `DATABASE_HOST` | Database host | `ep-xxx.neon.tech` |
| `DATABASE_PORT` | Database port | `5432` |
| `DATABASE_NAME` | Database name | `strapi_cms` |
| `DATABASE_USERNAME` | Database user | `neondb_owner` |
| `DATABASE_PASSWORD` | Database password | `npg_xxx` |
| `DATABASE_SSL` | Use SSL | `true` |
| `ADMIN_JWT_SECRET` | Admin JWT secret | Generate with openssl |
| `API_TOKEN_SALT` | API token salt | Generate with openssl |
| `APP_KEYS` | App keys (4) | Generate 4 keys |
| `JWT_SECRET` | JWT secret | Generate with openssl |
| `TRANSFER_TOKEN_SALT` | Transfer token salt | Generate with openssl |

### Frontend (`portal/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Django backend URL | `http://localhost:8000` |
| `VITE_CMS_URL` | Strapi CMS URL | `http://localhost:1337` |

### Generate Secrets
```bash
# Generate a random secret
openssl rand -base64 32
```

---

## How Frontend Connects to CMS

### Architecture Overview

```
┌─────────────────┐
│  React Frontend │
│  (port 5173)    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐  ┌──────────────┐
│  Django API     │  │  Strapi CMS  │
│  (port 8000)    │  │  (port 1337) │
│                 │  │              │
│ • Auth          │  │ • Events     │
│ • Applications  │  │ • News       │
│ • Payments      │  │ • Leadership │
│ • Members       │  │ • Benefits   │
└─────────────────┘  │ • FAQs       │
                     │ • Partners   │
                     └──────────────┘
```

### Data Flow

1. **User visits page** → React component loads
2. **Component uses hook** → `useEvents()`, `useNewsArticles()`, etc.
3. **Hook calls API service** → `cmsApi.getEvents()`
4. **API service fetches from Strapi** → `GET /api/events?populate=*`
5. **Strapi returns data** → Nested JSON structure
6. **Adapter transforms data** → Flat, frontend-friendly structure
7. **Component receives data** → Renders UI

### Code Example

```typescript
// 1. Component uses hook
import { useEvents } from '../hooks/useCMS';

function EventsPage() {
  // 2. Hook manages state and fetching
  const { events, loading, error } = useEvents();
  
  // 3. Component renders data
  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
```

### API Endpoints

**Strapi CMS Endpoints:**
```
GET /api/events?populate=*
GET /api/events/:id?populate=*
GET /api/news-articles?populate=*
GET /api/leaderships?populate=*
GET /api/benefits?populate=*
GET /api/faqs
GET /api/partners?populate=*
GET /api/timeline-events?populate=*
GET /api/homepage?populate[hero][populate]=*
GET /api/about-page?populate[hero][populate]=*
GET /api/membership-page?populate[hero][populate]=*
GET /api/contact-info?populate=*
GET /api/site-setting?populate=*
```

**Django Backend Endpoints (unchanged):**
```
POST /api/auth/login
POST /api/auth/register
GET /api/applications
POST /api/applications
GET /api/payments
POST /api/payments
```

---

## Content Editor Guide

### Accessing Strapi Admin

1. Open browser: `http://localhost:1337/admin`
2. Login with your credentials
3. Click **Content Manager** in left sidebar

### Managing Events

#### Create New Event
1. Click **Event** under Collection Types
2. Click **Create new entry**
3. Fill in required fields:
   - **Title:** Event name
   - **Description:** Short description
   - **Date:** Event date and time
   - **Time:** Display time (e.g., "9:00 AM – 5:00 PM")
   - **Location:** Event location
   - **Image:** Upload event image
4. Optional fields:
   - **Slug:** Auto-generated, can edit
   - **Content:** Full event details (rich text)
   - **Registration Link:** External registration URL
   - **CPD Points:** Professional development credits
   - **Category:** Conference, Workshop, Seminar, etc.
   - **Is Featured:** Show on landing page
   - **State:** upcoming, ongoing, completed, cancelled
5. Click **Publish** (top right)

#### Edit Existing Event
1. Click **Event** → Find event in list
2. Click event to edit
3. Make changes
4. Click **Publish** to save

#### Delete Event
1. Click **Event** → Find event
2. Click event
3. Click **Delete** button (top right)
4. Confirm deletion

### Managing News Articles

#### Create News Article
1. Click **News Article** under Collection Types
2. Click **Create new entry**
3. Fill in fields:
   - **Title:** Article title
   - **Summary:** Short summary
   - **Content:** Full article (rich text)
   - **Featured Image:** Upload image
   - **Publish Date:** Publication date
   - **Read Time:** Minutes to read
   - **Author:** Author name
   - **Is Top Pick:** Feature as top article
   - **Is Featured:** Show on landing page
4. Click **Publish**

### Managing Leadership

#### Add Leadership Member
1. Click **Leadership** under Collection Types
2. Click **Create new entry**
3. Fill in:
   - **Name:** Full name
   - **Role:** Position/title
   - **Photo:** Upload photo
   - **Bio:** Biography (optional)
   - **Email:** Contact email (optional)
   - **LinkedIn:** LinkedIn URL (optional)
   - **Order:** Display order (1, 2, 3...)
   - **Is Active:** Toggle ON
4. Click **Publish**

### Managing Benefits

#### Add Benefit
1. Click **Benefit** under Collection Types
2. Click **Create new entry**
3. Fill in:
   - **Title:** Benefit title
   - **Description:** Benefit description
   - **Image:** Upload image
   - **Icon:** Icon name (optional)
   - **Order:** Display order
   - **Is Active:** Toggle ON
4. Click **Publish**

### Managing FAQs

#### Add FAQ
1. Click **FAQ** under Collection Types
2. Click **Create new entry**
3. Fill in:
   - **Question:** The question
   - **Answer:** The answer
   - **Category:** FAQ category
   - **Order:** Display order
   - **Is Active:** Toggle ON
4. Click **Publish**

### Managing Partners

#### Add Partner
1. Click **Partner** under Collection Types
2. Click **Create new entry**
3. Fill in:
   - **Name:** Partner name
   - **Logo:** Upload logo
   - **Website:** Partner website URL
   - **Description:** Partner description
   - **Order:** Display order
   - **Is Active:** Toggle ON
4. Click **Publish**

### Managing Page Content

#### Update Homepage
1. Click **Homepage** under Single Types
2. Edit sections:
   - **Hero:** Title, subtitle, background image, CTA
   - **Stats:** Add/edit statistics
   - **Chair Message:** Name, role, photo, message
   - **Connecting Professionals:** Content block
3. Click **Publish**

#### Update About Page
1. Click **About Page** under Single Types
2. Edit:
   - **Hero:** Title, subtitle, background
   - **History:** Organization history
   - **Vision:** Vision statement
   - **Mission:** Mission statement
   - **Objectives:** Add/edit objectives
3. Click **Publish**

#### Update Membership Page
1. Click **Membership Page** under Single Types
2. Edit:
   - **Hero:** Title, subtitle, background
   - **Intro Text:** Introduction
   - **Process Steps:** Membership process
   - **Requirements:** Membership requirements
   - **Call to Action:** CTA section
3. Click **Publish**

### Tips for Content Editors

✅ **Always click Publish** - Saved drafts won't appear on website  
✅ **Use descriptive titles** - Helps with SEO and navigation  
✅ **Optimize images** - Compress before uploading (< 500KB)  
✅ **Fill in alt text** - Important for accessibility  
✅ **Preview before publishing** - Check how it looks  
✅ **Use consistent formatting** - Maintain brand style  
✅ **Set correct dates** - Especially for events and news  
✅ **Order matters** - Use Order field to control display sequence  

---

## Developer Guide

### Project Structure

```
APF-ORG/
├── CMS/                          # Strapi CMS
│   ├── src/
│   │   ├── api/                  # Content types
│   │   │   ├── event/
│   │   │   ├── news-article/
│   │   │   ├── leadership/
│   │   │   └── ...
│   │   ├── components/           # Reusable components
│   │   │   └── shared/
│   │   └── index.ts
│   ├── config/                   # Configuration
│   ├── database/                 # Database files
│   ├── public/                   # Static files
│   └── .env                      # Environment variables
│
├── portal/                       # React Frontend
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── EventComponents/
│   │   │   ├── NewsComponents/
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   └── useCMS.ts        # CMS hooks
│   │   ├── services/
│   │   │   ├── cmsApi.ts        # CMS API service
│   │   │   └── strapiAdapter.ts # Strapi adapter
│   │   ├── pages/               # Page components
│   │   └── config/
│   │       └── api.ts           # API configuration
│   └── .env                      # Environment variables
│
└── Backend/                      # Django API (unchanged)
    └── api/
```

### Adding New Content Type

#### 1. Create in Strapi
```bash
cd CMS
yarn strapi generate content-type
```

#### 2. Define Schema
Edit `CMS/src/api/<content-type>/content-types/<content-type>/schema.json`

#### 3. Add TypeScript Interface
In `portal/src/services/cmsApi.ts`:
```typescript
export interface MyContentType {
  id: number;
  title: string;
  // ... other fields
}
```

#### 4. Add Transform Function
```typescript
const transformMyContentType = (item: any): MyContentType => {
  return {
    id: item.id,
    title: item.title,
    // ... transform other fields
  };
};
```

#### 5. Add API Function
```typescript
export const getMyContentTypes = async (): Promise<MyContentType[]> => {
  try {
    const query = buildStrapiQuery({
      populate: '*',
      sort: 'order:asc',
    });

    const response = await fetch(`${CMS_API_URL}/my-content-types${query}`);
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    const items = adaptStrapiCollection(data);
    return items.map(transformMyContentType);
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
```

#### 6. Add Custom Hook
In `portal/src/hooks/useCMS.ts`:
```typescript
export const useMyContentTypes = () => {
  const [items, setItems] = useState<cmsApi.MyContentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cmsApi.getMyContentTypes();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};
```

#### 7. Use in Component
```typescript
import { useMyContentTypes } from '../hooks/useCMS';

function MyComponent() {
  const { items, loading, error } = useMyContentTypes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### Migrating Existing Component

#### Step 1: Identify Data Source
Find where component gets data (e.g., `eventsData.ts`)

#### Step 2: Replace with CMS Hook
```typescript
// Before
import { events } from './eventsData';

// After
import { useEvents } from '../../hooks/useCMS';

function MyComponent() {
  const { events, loading } = useEvents();
  
  // ... rest of component
}
```

#### Step 3: Add Loading State
```typescript
if (loading) {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="mt-2">Loading...</p>
    </div>
  );
}
```

#### Step 4: Add Empty State
```typescript
if (events.length === 0) {
  return (
    <div className="text-center py-8">
      <p>No events available.</p>
    </div>
  );
}
```

#### Step 5: Test Component
1. Add sample data in Strapi
2. Verify component loads correctly
3. Test loading states
4. Test empty states
5. Test error handling

### API Query Examples

#### Filter by Field
```typescript
const { events } = useEvents({ isFeatured: true });
```

#### Filter by Status
```typescript
const { events } = useEvents({ status: 'upcoming' });
```

#### Multiple Filters
```typescript
const query = buildStrapiQuery({
  filters: {
    'isFeatured[$eq]': true,
    'status[$eq]': 'upcoming',
    'date[$gte]': new Date().toISOString(),
  },
  sort: 'date:asc',
});
```

#### Pagination
```typescript
const query = buildStrapiQuery({
  pagination: {
    page: 1,
    pageSize: 10,
  },
});
```

### Debugging Tips

#### Check API Response
```typescript
const response = await fetch(`${CMS_API_URL}/events?populate=*`);
const data = await response.json();
console.log('Raw Strapi response:', data);
```

#### Check Transformed Data
```typescript
const { events } = useEvents();
console.log('Transformed events:', events);
```

#### Check Network Tab
1. Open browser DevTools
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Look for Strapi API calls
5. Check request/response

#### Common Issues

**403 Forbidden:**
- Check public permissions in Strapi
- Settings → Roles → Public → Enable find/findOne

**Images not loading:**
- Check `VITE_CMS_URL` in `.env`
- Verify image uploaded in Strapi
- Check image URL in response

**Empty data:**
- Ensure content is published (not draft)
- Check filters aren't too restrictive
- Verify Strapi is running

**CORS errors:**
- Check `CMS/config/middlewares.ts`
- Add frontend URL to allowed origins

---

## Deployment Steps


### Production Checklist

- [ ] Update `VITE_CMS_URL` to production URL
- [ ] Update `VITE_API_URL` to production URL
- [ ] Set all environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS for production domains
- [ ] Set up database backups
- [ ] Configure CDN for media files
- [ ] Set up monitoring and logging
- [ ] Test all API endpoints
- [ ] Test all frontend pages
- [ ] Verify image uploads work
- [ ] Check mobile responsiveness

---

## Backup Strategy

### Database Backups

#### Automated Backups (Recommended)

**Neon PostgreSQL:**
- Automatic daily backups
- Point-in-time recovery
- Retention: 7 days (free tier)



#### Manual Backups

**Export Database:**
```bash
# From Strapi directory
yarn strapi export --file backup-$(date +%Y%m%d).tar.gz
```

**Import Database:**
```bash
yarn strapi import --file backup-20260216.tar.gz
```

### Media Files Backup

#### Option 1: Cloud Storage (Recommended)

Configure Strapi to use cloud storage:

**AWS S3:**
```bash
yarn add @strapi/provider-upload-aws-s3
```

**Cloudinary:**
```bash
yarn add @strapi/provider-upload-cloudinary
```

#### Option 2: Manual Backup

**Backup uploads folder:**
```bash
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz CMS/public/uploads
```

**Restore uploads:**
```bash
tar -xzf uploads-backup-20260216.tar.gz -C CMS/public/
```

### Content Backups

#### Export All Content
```bash
cd CMS
yarn strapi export --file full-backup-$(date +%Y%m%d).tar.gz --exclude media
```

#### Export Specific Content Types
```bash
yarn strapi export --file events-backup.tar.gz --only events
```

### Backup Schedule

**Daily:**
- Database backup (automated)
- Media files sync to cloud storage

**Weekly:**
- Full content export
- Test restore procedure

**Monthly:**
- Archive old backups
- Verify backup integrity
- Update backup documentation

### Disaster Recovery

#### Recovery Steps

1. **Restore Database**
```bash
yarn strapi import --file backup-latest.tar.gz
```

2. **Restore Media Files**
```bash
tar -xzf uploads-backup-latest.tar.gz -C CMS/public/
```

3. **Verify Data**
- Check admin panel
- Test API endpoints
- Verify frontend displays correctly

4. **Test Functionality**
- Create new content
- Upload images
- Publish content
- Check frontend updates

#### Recovery Time Objective (RTO)
- Target: < 1 hour
- Database restore: ~10 minutes
- Media restore: ~20 minutes
- Verification: ~30 minutes

#### Recovery Point Objective (RPO)
- Target: < 24 hours
- Daily backups ensure max 24h data loss

---

## Support & Maintenance

### Updating Strapi

```bash
cd CMS
yarn upgrade @strapi/strapi@latest
yarn upgrade @strapi/plugin-users-permissions@latest
yarn develop
```

### Updating Frontend Dependencies

```bash
cd portal
npm update
npm audit fix
```

### Monitoring

**Check Strapi Health:**
```bash
curl http://localhost:1337/_health
```

**Check API Response Time:**
```bash
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:1337/api/events
```

### Logs

**Strapi Logs:**
```bash
cd CMS
yarn develop
# Logs appear in terminal
```

**Production Logs:**
- DigitalOcean: Check app logs

---

## Conclusion

This documentation covers:
- ✅ Installation and setup
- ✅ Environment configuration
- ✅ Frontend-CMS connection
- ✅ Content editor guide
- ✅ Developer guide
- ✅ Deployment procedures
- ✅ Backup and recovery strategy

For additional help:
- Strapi Documentation: https://docs.strapi.io
- React Documentation: https://react.dev


---

**Last Updated:** February 16, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
