# Strapi API Permissions Setup Guide

## Issue
The admin CMS page at `portal/src/pages/admin/cmsPage.tsx` is not pulling data from Strapi because API permissions are not configured.

## Solution

### Step 1: Start Strapi CMS

```bash
cd CMS
yarn develop
```

This will start Strapi at `http://localhost:1337`

### Step 2: Access Admin Panel

1. Open your browser and go to: `http://localhost:1337/admin`
2. If this is your first time, create an admin account
3. If you already have an account, log in

### Step 3: Configure Public API Permissions

To allow the frontend to fetch data from Strapi, you need to enable public access to the API endpoints.

1. In the Strapi admin panel, click **Settings** (gear icon in the left sidebar)
2. Under "Users & Permissions Plugin", click **Roles**
3. Click on **Public** role
4. Scroll down to the **Permissions** section

### Step 4: Enable Permissions for Collection Types

For each of the following collection types, check the boxes for `find` and `findOne`:

- ✅ **Event** → find, findOne
- ✅ **News-article** → find, findOne
- ✅ **News-category** → find, findOne
- ✅ **Leadership** → find, findOne
- ✅ **Benefit** → find, findOne
- ✅ **Faq** → find, findOne
- ✅ **Partner** → find, findOne
- ✅ **Timeline-event** → find, findOne

### Step 5: Enable Permissions for Single Types

For each of the following single types, check the box for `find`:

- ✅ **Homepage** → find
- ✅ **About-page** → find
- ✅ **Membership-page** → find
- ✅ **Contact-info** → find
- ✅ **Site-setting** → find

### Step 6: Save Changes

Click the **Save** button at the top right corner.

### Step 7: Test API Access

Open a new browser tab and test these URLs:

```
http://localhost:1337/api/events
http://localhost:1337/api/news-articles
http://localhost:1337/api/homepage
```

You should see JSON data returned (even if empty arrays for now).

### Step 8: Add Sample Content (Optional)

If you want to see data in the admin CMS page:

1. Go to **Content Manager** in the left sidebar
2. Create a few sample events and news articles
3. Make sure to click **Publish** (not just Save as Draft)

### Step 9: Verify Frontend Connection

1. Make sure Strapi is running: `cd CMS && yarn develop`
2. Start the portal: `cd portal && npm run dev`
3. Navigate to the admin CMS page: `http://localhost:5173/admin/cmsPage`
4. You should now see real data from Strapi!

## What Was Fixed

The `portal/src/pages/admin/cmsPage.tsx` file has been updated to:

1. ✅ Import CMS API functions from `services/cmsApi.ts`
2. ✅ Fetch events and news articles from Strapi on page load
3. ✅ Display real metrics (upcoming events count, active news count)
4. ✅ Show recent events and news articles
5. ✅ Display connection status and error messages
6. ✅ Show helpful error message if Strapi is not running

## Environment Configuration

The portal is configured to connect to Strapi via:

- **Development**: `http://localhost:1337` (from `portal/.env`)
- **Production**: Set `VITE_CMS_URL` in production environment

## Troubleshooting

### Error: "Failed to connect to Strapi CMS"

**Cause**: Strapi is not running

**Solution**: 
```bash
cd CMS
yarn develop
```

### Error: "403 Forbidden" or empty data

**Cause**: API permissions not configured

**Solution**: Follow Steps 3-6 above to enable public API access

### Error: "Content not found"

**Cause**: No content has been created or published

**Solution**: 
1. Go to Strapi admin panel
2. Create content in Content Manager
3. Click **Publish** (not just Save)

## Next Steps

1. Configure API permissions (Steps 3-6)
2. Create sample content in Strapi
3. Verify the admin CMS page displays real data
4. Integrate other pages (Events, News, About, etc.) with Strapi

## Reference

- Strapi Documentation: https://docs.strapi.io
- Content Structure: See `CMS/STRAPI_CONTENT_STRUCTURE.md`
- Setup Checklist: See `CMS/SETUP_CHECKLIST.md`
