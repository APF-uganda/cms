# Strapi Content Structure

This document outlines all the content types and components created for the APF Uganda CMS.

## Collection Types

### 1. Event
**Location:** `src/api/event/content-types/event/schema.json`

Powers: Events page, Featured Events on landing page

**Fields:**
- title (string, required)
- slug (UID, auto-generated)
- description (text, required)
- content (richtext)
- date (datetime, required)
- time (string)
- location (string, required)
- image (media, single image, required)
- registrationLink (string)
- cpdPoints (number)
- category (enum: Conference, Workshop, Seminar, Forum, Networking)
- isFeatured (boolean)
- status (enum: upcoming, ongoing, completed, cancelled)

---

### 2. News Article
**Location:** `src/api/news-article/content-types/news-article/schema.json`

Powers: News page, Latest News on landing page

**Fields:**
- title (string, required)
- slug (UID, auto-generated)
- summary (text, required, max 200 chars)
- content (richtext)
- featuredImage (media, single image, required)
- category (relation to News Category)
- author (string)
- publishDate (date, required)
- readTime (number)
- isTopPick (boolean)
- isFeatured (boolean)
- tags (component, repeatable)
- seo (component, single)

---

### 3. News Category
**Location:** `src/api/news-category/content-types/news-category/schema.json`

Powers: News filtering

**Fields:**
- name (string, required, unique)
- slug (UID, auto-generated)
- description (text)
- color (string, hex color)

---

### 4. Leadership
**Location:** `src/api/leadership/content-types/leadership/schema.json`

Powers: About page governance section

**Fields:**
- name (string, required)
- role (string, required)
- photo (media, single image, required)
- bio (richtext)
- email (email)
- linkedIn (string)
- order (number)
- isActive (boolean)

---

### 5. Benefit
**Location:** `src/api/benefit/content-types/benefit/schema.json`

Powers: Membership page benefits carousel

**Fields:**
- title (string, required)
- description (text)
- image (media, single image, required)
- icon (string, lucide icon name)
- order (number)
- isActive (boolean)

---

### 6. FAQ
**Location:** `src/api/faq/content-types/faq/schema.json`

Powers: Membership page FAQ section

**Fields:**
- question (string, required)
- answer (richtext, required)
- category (enum: Membership, Events, General, Technical)
- order (number)
- isActive (boolean)

---

### 7. Partner
**Location:** `src/api/partner/content-types/partner/schema.json`

Powers: Landing page partners section

**Fields:**
- name (string, required)
- logo (media, single image, required)
- website (string)
- description (text)
- order (number)
- isActive (boolean)

---

### 8. Timeline Event
**Location:** `src/api/timeline-event/content-types/timeline-event/schema.json`

Powers: About page timeline

**Fields:**
- year (string, required)
- title (string, required)
- description (text, required)
- image (media, single image)
- order (number)

---

## Single Types

### 1. Homepage
**Location:** `src/api/homepage/content-types/homepage/schema.json`

Powers: Landing page dynamic content

**Fields:**
- hero (component, single - Hero)
- stats (component, repeatable - Stat)
- chairMessage (component, single - Chair Message)
- connectingProfessionals (component, single - Content Block)
- seo (component, single - SEO)

---

### 2. About Page
**Location:** `src/api/about-page/content-types/about-page/schema.json`

Powers: About page content

**Fields:**
- hero (component, single - Hero)
- history (richtext)
- vision (text, required)
- mission (text, required)
- objectives (component, repeatable - Objective)
- seo (component, single - SEO)

---

### 3. Membership Page
**Location:** `src/api/membership-page/content-types/membership-page/schema.json`

Powers: Membership page content

**Fields:**
- hero (component, single - Hero)
- introText (richtext)
- processSteps (component, repeatable - Process Step)
- requirements (richtext)
- callToAction (component, single - CTA)
- seo (component, single - SEO)

---

### 4. Contact Info
**Location:** `src/api/contact-info/content-types/contact-info/schema.json`

Powers: Contact page and footer

**Fields:**
- phone (string, required)
- email (email, required)
- address (text, required)
- mapEmbedUrl (string)
- officeHours (text)
- socialMedia (component, repeatable - Social Link)

---

### 5. Site Settings
**Location:** `src/api/site-setting/content-types/site-setting/schema.json`

Powers: Global site configuration

**Fields:**
- siteName (string, required)
- tagline (string)
- logo (media, single image)
- favicon (media, single image)
- footerText (richtext)
- copyrightText (string)
- socialMedia (component, repeatable - Social Link)
- maintenanceMode (boolean)
- maintenanceMessage (text)

---

## Components

### Shared Components

#### 1. Hero
**Location:** `src/components/shared/hero.json`

**Fields:**
- title (string, required)
- subtitle (text)
- backgroundImage (media, single image)
- ctaText (string)
- ctaLink (string)
- overlayOpacity (number, 0-100, default: 40)

---

#### 2. Stat
**Location:** `src/components/shared/stat.json`

**Fields:**
- label (string, required)
- value (string, required)
- icon (string, lucide icon name)

---

#### 3. Chair Message
**Location:** `src/components/shared/chair-message.json`

**Fields:**
- name (string, required)
- role (string, required)
- photo (media, single image, required)
- message (richtext, required)
- fullMessage (richtext)

---

#### 4. Content Block
**Location:** `src/components/shared/content-block.json`

**Fields:**
- title (string)
- content (richtext, required)
- image (media, single image)
- imagePosition (enum: left, right, top, bottom)

---

#### 5. Objective
**Location:** `src/components/shared/objective.json`

**Fields:**
- text (string, required)
- icon (string, lucide icon name)

---

#### 6. Process Step
**Location:** `src/components/shared/process-step.json`

**Fields:**
- stepNumber (number)
- title (string, required)
- description (text, required)
- icon (string, lucide icon name)

---

#### 7. CTA (Call-to-Action)
**Location:** `src/components/shared/cta.json`

**Fields:**
- title (string, required)
- description (text)
- buttonText (string, required)
- buttonLink (string, required)
- backgroundImage (media, single image)

---

#### 8. Social Link
**Location:** `src/components/shared/social-link.json`

**Fields:**
- platform (enum: Facebook, Twitter, LinkedIn, Instagram, YouTube, required)
- url (string, required)
- icon (string, lucide icon name)

---

### SEO Component

#### SEO
**Location:** `src/components/seo/seo.json`

**Fields:**
- metaTitle (string, max 60 chars)
- metaDescription (text, max 160 chars)
- keywords (text)
- ogImage (media, single image)
- canonicalUrl (string)

---

### Repeatable Components

#### Tag
**Location:** `src/components/repeatable/tags.json`

**Fields:**
- name (string, required)

---

## Usage Guide

### Starting Strapi

```bash
cd CMS
yarn develop
```

### Accessing Admin Panel

1. Navigate to `http://localhost:1337/admin`
2. Create your admin account on first run
3. Start creating content!

### Content Creation Order

1. **Site Settings** - Set up global site configuration
2. **Contact Info** - Add contact details
3. **News Categories** - Create news categories
4. **Partners** - Add partner logos
5. **Leadership** - Add team members
6. **Benefits** - Add membership benefits
7. **FAQs** - Add frequently asked questions
8. **Timeline Events** - Add historical timeline
9. **Events** - Create events
10. **News Articles** - Create news articles
11. **Homepage** - Configure landing page
12. **About Page** - Configure about page
13. **Membership Page** - Configure membership page

### API Endpoints

All content will be available at:

**Collection Types:**
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get single event
- `GET /api/news-articles` - List all news articles
- `GET /api/news-articles/:id` - Get single news article
- `GET /api/news-categories` - List all categories
- `GET /api/leaderships` - List all leadership members
- `GET /api/benefits` - List all benefits
- `GET /api/faqs` - List all FAQs
- `GET /api/partners` - List all partners
- `GET /api/timeline-events` - List all timeline events

**Single Types:**
- `GET /api/homepage` - Get homepage content
- `GET /api/about-page` - Get about page content
- `GET /api/membership-page` - Get membership page content
- `GET /api/contact-info` - Get contact information
- `GET /api/site-setting` - Get site settings

### Filtering & Sorting

Examples:
```
GET /api/events?filters[isFeatured][$eq]=true
GET /api/events?sort=date:desc
GET /api/news-articles?filters[category][slug][$eq]=policy-update
GET /api/benefits?sort=order:asc&filters[isActive][$eq]=true
```

### Population

To include relations and media:
```
GET /api/news-articles?populate=*
GET /api/homepage?populate[hero][populate]=*&populate[stats][populate]=*
```

---

## Next Steps

1. ✅ Content types created
2. ✅ Components created
3. ⏳ Start Strapi server
4. ⏳ Configure API permissions
5. ⏳ Create sample content
6. ⏳ Test API endpoints
7. ⏳ Integrate with React frontend

---

**Last Updated:** February 2026
