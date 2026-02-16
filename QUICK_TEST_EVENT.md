# Quick Test: Add Your First Event (2 Minutes)

## 1. Start Strapi
```bash
cd CMS
yarn develop
```

## 2. Login to Admin
Open: **http://localhost:1337/admin**

## 3. Add One Event

**Content Manager** → **Event** → **Create new entry**

### Fill in these fields:
```
Title: Annual Conference 2026
Description: Join us for our flagship annual event
Date: 2026-10-15 (pick any future date)
Time: 9:00 AM – 5:00 PM
Location: Kampala
Category: Conference
Is Featured: ✓ (toggle ON)
State: upcoming
```

### Upload Image:
- Click Image field
- Upload any image (or skip for now)

### Publish:
- Click **Publish** button (top right)

## 4. Test Frontend

Open: **http://localhost:5173/test-cms**

You should see:
- **Events (1)** instead of **Events (0)**
- Click "View Data" to see your event

## 5. Test Event Calendar

Open: **http://localhost:5173/events**

You should see:
- Your event appears on the calendar date
- Event shows in "Upcoming Events" section
- Event shows in "Featured Events" on landing page

---

## That's it! 🎉

The "update required" message will disappear once you add content.

**Next:** Add more events, news articles, etc. using the full guide in `ADD_SAMPLE_DATA_GUIDE.md`
