# Strapi CMS Setup Checklist

Use this checklist to ensure your Strapi CMS is properly configured.

## ✅ Phase 1: Installation & Setup

- [x] Strapi installed via `npx create-strapi@latest`
- [x] PostgreSQL database configured
- [x] Environment variables set in `.env`
- [x] Dependencies installed with `yarn install`
- [ ] Strapi server starts successfully with `yarn develop`
- [ ] Admin panel accessible at `http://localhost:1337/admin`
- [ ] Admin account created

---

## ✅ Phase 2: Content Types Created

### Collection Types
- [x] Event
- [x] News Article
- [x] News Category
- [x] Leadership
- [x] Benefit
- [x] FAQ
- [x] Partner
- [x] Timeline Event

### Single Types
- [x] Homepage
- [x] About Page
- [x] Membership Page
- [x] Contact Info
- [x] Site Settings

---

## ✅ Phase 3: Components Created

### Shared Components
- [x] Hero
- [x] Stat
- [x] Chair Message
- [x] Content Block
- [x] Objective
- [x] Process Step
- [x] CTA
- [x] Social Link

### Other Components
- [x] SEO
- [x] Tag

---

## ⏳ Phase 4: Configuration

### API Permissions
- [ ] Settings → Roles → Public
  - [ ] Enable `find` for all collection types
  - [ ] Enable `findOne` for all collection types
  - [ ] Enable `find` for all single types
  - [ ] Save changes

### Media Library
- [ ] Settings → Media Library
  - [ ] Configure responsive image sizes
  - [ ] Set image optimization settings

### Plugins (Optional)
- [ ] Install SEO plugin: `yarn add @strapi/plugin-seo`
- [ ] Install Sitemap plugin: `yarn add strapi-plugin-sitemap`
- [ ] Configure installed plugins

---

## ⏳ Phase 5: Sample Content Creation

### Site Settings (Do First!)
- [ ] Site name: "APF Uganda"
- [ ] Tagline
- [ ] Logo uploaded
- [ ] Favicon uploaded
- [ ] Footer text
- [ ] Copyright text
- [ ] Social media links added
- [ ] Published

### Contact Info
- [ ] Phone number
- [ ] Email address
- [ ] Office address
- [ ] Map embed URL
- [ ] Office hours
- [ ] Social media links
- [ ] Published

### News Categories
- [ ] "Thought Leadership"
- [ ] "Ethics & Governance"
- [ ] "Announcements"
- [ ] "SME Support"
- [ ] "Policy Update"
- [ ] "Member Spotlight"
- [ ] All published

### Partners
- [ ] ICPAU (logo uploaded)
- [ ] ACCA (logo uploaded)
- [ ] UBA (logo uploaded)
- [ ] Order numbers set
- [ ] All published

### Leadership Team
- [ ] CPA Ronald Katumba (photo, role, bio)
- [ ] CPA Sarah Nejesa (photo, role, bio)
- [ ] CPA Michael Tugyetwena (photo, role, bio)
- [ ] CPA John Kato (photo, role, bio)
- [ ] CPA Arinda Jolus (photo, role, bio)
- [ ] CPA Patience Atuhaire (photo, role, bio)
- [ ] Order numbers set
- [ ] All published

### Benefits
- [ ] Specialized Training
- [ ] Practice Enablers
- [ ] Mentorship & Peer Review
- [ ] Direct Advocacy
- [ ] Collective Voice
- [ ] Exclusive Forums
- [ ] Sector Bridges
- [ ] Leadership Track
- [ ] Professional Endorsement
- [ ] Awards & Spotlights
- [ ] Order numbers set
- [ ] All published

### FAQs
- [ ] Eligibility criteria question
- [ ] Application process question
- [ ] Membership fees question
- [ ] CPD requirements question
- [ ] Order numbers set
- [ ] All published

### Timeline Events
- [ ] Add 3-5 historical milestones
- [ ] Order numbers set
- [ ] All published

### Events
- [ ] Create 2-3 upcoming events
- [ ] Create 2-3 past events
- [ ] Mark 1-2 as featured
- [ ] All published

### News Articles
- [ ] Create 5-6 news articles
- [ ] Assign categories
- [ ] Mark 1 as "Top Pick"
- [ ] Mark 2-3 as "Featured"
- [ ] Add tags
- [ ] All published

### Homepage
- [ ] Hero section configured
- [ ] Stats added (3-4 stats)
- [ ] Chair message added
- [ ] Connecting Professionals section
- [ ] SEO metadata
- [ ] Published

### About Page
- [ ] Hero section configured
- [ ] History text added
- [ ] Vision statement
- [ ] Mission statement
- [ ] Objectives added (9 items)
- [ ] SEO metadata
- [ ] Published

### Membership Page
- [ ] Hero section configured
- [ ] Intro text added
- [ ] Process steps added
- [ ] Requirements text added
- [ ] Call-to-action configured
- [ ] SEO metadata
- [ ] Published

---

## ⏳ Phase 6: API Testing

### Test Endpoints
```bash
# Collection Types
curl http://localhost:1337/api/events
curl http://localhost:1337/api/news-articles
curl http://localhost:1337/api/news-categories
curl http://localhost:1337/api/leaderships
curl http://localhost:1337/api/benefits
curl http://localhost:1337/api/faqs
curl http://localhost:1337/api/partners
curl http://localhost:1337/api/timeline-events

# Single Types
curl http://localhost:1337/api/homepage
curl http://localhost:1337/api/about-page
curl http://localhost:1337/api/membership-page
curl http://localhost:1337/api/contact-info
curl http://localhost:1337/api/site-setting
```

### Verify Response Structure
- [ ] All endpoints return 200 status
- [ ] Data structure matches expected format
- [ ] Images have proper URLs
- [ ] Relations are populated correctly
- [ ] Published content only is returned

### Test Filtering
```bash
# Featured events
curl "http://localhost:1337/api/events?filters[isFeatured][\$eq]=true"

# Active benefits
curl "http://localhost:1337/api/benefits?filters[isActive][\$eq]=true&sort=order:asc"

# News by category
curl "http://localhost:1337/api/news-articles?filters[category][slug][\$eq]=policy-update"
```

- [ ] Filtering works correctly
- [ ] Sorting works correctly
- [ ] Pagination works correctly

### Test Population
```bash
# Populate all relations
curl "http://localhost:1337/api/news-articles?populate=*"

# Populate nested components
curl "http://localhost:1337/api/homepage?populate[hero][populate]=*&populate[stats][populate]=*"
```

- [ ] Relations populate correctly
- [ ] Media URLs are accessible
- [ ] Components populate correctly

---

## ⏳ Phase 7: Frontend Integration Prep

### API Documentation
- [ ] Document all endpoint URLs
- [ ] Document response structures
- [ ] Document filter/sort options
- [ ] Create TypeScript interfaces

### CORS Configuration
- [ ] Update `config/middlewares.ts` with frontend URL
- [ ] Test CORS from React app
- [ ] Verify credentials are allowed

### Environment Variables
- [ ] Add Strapi URL to React `.env`
- [ ] Configure API base URL in React
- [ ] Test connection from React app

---

## ⏳ Phase 8: Production Preparation

### Security
- [ ] Change default admin credentials
- [ ] Set strong JWT secrets
- [ ] Configure rate limiting
- [ ] Enable HTTPS
- [ ] Set secure CORS origins

### Performance
- [ ] Enable response caching
- [ ] Configure CDN for media
- [ ] Optimize database queries
- [ ] Enable gzip compression

### Backup
- [ ] Set up database backups
- [ ] Set up media backups
- [ ] Document restore procedure

### Monitoring
- [ ] Set up error logging
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring

---

## 🎯 Success Criteria

Your Strapi CMS is ready when:

1. ✅ All content types and components are created
2. ✅ API permissions are configured correctly
3. ✅ Sample content is created and published
4. ✅ All API endpoints return expected data
5. ✅ Images are accessible via URLs
6. ✅ Filtering and sorting work correctly
7. ✅ CORS is configured for frontend
8. ✅ Frontend can fetch data successfully

---

## 📝 Notes

### Common Issues

**Issue:** Content not appearing in API
**Solution:** Check if content is published (not draft)

**Issue:** Images not loading
**Solution:** Check media library permissions and URL configuration

**Issue:** CORS errors
**Solution:** Update `config/middlewares.ts` with correct origin

**Issue:** Relations not populating
**Solution:** Add `?populate=*` to API request

---

## 🚀 Next Steps

Once this checklist is complete:

1. Proceed to **STEP 3: API Compatibility Plan**
2. Create API service layer in React
3. Replace hardcoded data with API calls
4. Test all pages with CMS data
5. Deploy to production

---

**Last Updated:** February 2026
