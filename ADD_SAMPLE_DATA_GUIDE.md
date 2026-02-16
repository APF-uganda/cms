# Quick Guide: Adding Sample Data to Strapi

## Step 1: Start Strapi

```bash
cd CMS
yarn develop
```

Wait for: `Server started on http://localhost:1337`

## Step 2: Access Admin Panel

Open browser: **http://localhost:1337/admin**

Login with your credentials.

---

## Step 3: Add Sample Events

### Navigate to Events:
1. Click **Content Manager** (left sidebar)
2. Click **Event** under Collection Types
3. Click **Create new entry** button

### Add Event 1 (Featured Upcoming):
```
Title: Annual APF Conference 2026
Slug: annual-apf-conference-2026 (auto-generated)
Description: Join us for our flagship annual event featuring keynote speakers, panel discussions, and networking opportunities with accounting professionals.
Date: 2026-10-15 (select future date)
Time: 9:00 AM – 5:00 PM
Location: Sheraton Kampala Hotel, Kampala
Category: Conference
Is Featured: ✓ (toggle ON)
State: upcoming
CPD Points: 8
```

**Upload Image:**
- Click on Image field
- Upload or select an image
- Click **Save**

**Publish:**
- Click **Publish** button (top right)

### Add Event 2 (Regular Upcoming):
```
Title: Tax Updates Workshop 2026
Description: Stay ahead with the latest tax regulations and compliance requirements.
Date: 2026-03-20
Time: 2:00 PM – 5:00 PM
Location: APF Training Center, Kampala
Category: Workshop
Is Featured: ✗ (toggle OFF)
State: upcoming
CPD Points: 4
```
- Upload image
- Click **Publish**

### Add Event 3 (Past Event):
```
Title: Digital Transformation Forum 2025
Description: Discover how technology is reshaping accounting and finance.
Date: 2025-10-16 (past date)
Time: 9:00 AM – 4:00 PM
Location: Serena Hotel, Kampala
Category: Forum
Is Featured: ✗
State: completed
CPD Points: 5
```
- Upload image
- Click **Publish**

---

## Step 4: Add Sample News Articles

### Navigate to News Articles:
1. Content Manager → **News Article**
2. Click **Create new entry**

### Add Article 1:
```
Title: New Accounting Standards Released for 2026
Slug: new-accounting-standards-2026
Summary: The International Accounting Standards Board has released updated standards that will affect financial reporting in 2026.
Publish Date: 2026-02-10
Read Time: 5
Is Top Pick: ✓
Is Featured: ✓
Author: APF Editorial Team
```
- Upload Featured Image
- Click **Publish**

### Add Article 2:
```
Title: APF Welcomes 500 New Members
Summary: The Association of Professional Accountants has reached a milestone with 500 new members joining this quarter.
Publish Date: 2026-02-05
Read Time: 3
Is Top Pick: ✗
Is Featured: ✓
```
- Upload Featured Image
- Click **Publish**

---

## Step 5: Add Leadership

### Navigate to Leadership:
1. Content Manager → **Leadership**
2. Click **Create new entry**

### Add Leader 1:
```
Name: Dr. Sarah Nakato
Role: Chairperson
Bio: Dr. Nakato has over 20 years of experience in accounting and finance...
Email: chair@apf.org
Order: 1
Is Active: ✓
```
- Upload Photo
- Click **Publish**

### Add Leader 2:
```
Name: John Okello
Role: Vice Chairperson
Bio: John brings extensive expertise in audit and assurance...
Order: 2
Is Active: ✓
```
- Upload Photo
- Click **Publish**

---

## Step 6: Add Benefits

### Navigate to Benefits:
1. Content Manager → **Benefit**
2. Click **Create new entry**

### Add Benefit 1:
```
Title: Professional Development
Description: Access to continuous professional development programs and CPD points.
Order: 1
Is Active: ✓
```
- Upload Image
- Click **Publish**

### Add Benefit 2:
```
Title: Networking Opportunities
Description: Connect with fellow professionals at exclusive events and forums.
Order: 2
Is Active: ✓
```
- Upload Image
- Click **Publish**

---

## Step 7: Add FAQs

### Navigate to FAQs:
1. Content Manager → **FAQ**
2. Click **Create new entry**

### Add FAQ 1:
```
Question: How do I become a member?
Answer: To become a member, visit our membership page and complete the online application form. You'll need to provide your professional credentials and pay the membership fee.
Category: Membership
Order: 1
Is Active: ✓
```
- Click **Publish**

### Add FAQ 2:
```
Question: What are CPD points?
Answer: CPD (Continuing Professional Development) points are credits earned by attending professional development events and training programs.
Category: CPD
Order: 2
Is Active: ✓
```
- Click **Publish**

---

## Step 8: Add Partners

### Navigate to Partners:
1. Content Manager → **Partner**
2. Click **Create new entry**

### Add Partner 1:
```
Name: ACCA
Description: Association of Chartered Certified Accountants
Website: https://www.accaglobal.com
Order: 1
Is Active: ✓
```
- Upload Logo
- Click **Publish**

---

## Step 9: Test the Frontend

### Test CMS Connection:
1. Open: **http://localhost:5173/test-cms**
2. You should now see data in all sections
3. Each section should show the count (e.g., "Events (3)")
4. Click "View Data" to see the JSON response

### Test Event Components:
1. Open: **http://localhost:5173/events**
2. Check EventCalendar shows events on correct dates
3. Scroll to UpcomingEvents section
4. Scroll to PreviousEvents section

### Test Landing Page:
1. Open: **http://localhost:5173/**
2. Scroll to FeaturedEvents section
3. Should show only events with "Is Featured" enabled

---

## Quick Checklist

- [ ] Strapi running on port 1337
- [ ] Added at least 3 events (1 featured, 1 past)
- [ ] Added at least 2 news articles
- [ ] Added at least 2 leadership members
- [ ] Added at least 2 benefits
- [ ] Added at least 2 FAQs
- [ ] Added at least 1 partner
- [ ] All content published (not draft)
- [ ] Public permissions enabled
- [ ] Test page shows data
- [ ] Event pages work correctly

---

## Troubleshooting

### "No data found" on test page?
- Check content is **Published** (not draft)
- Verify public permissions enabled
- Check Strapi is running
- Check browser console for errors

### Images not showing?
- Ensure images uploaded in Strapi
- Check `VITE_CMS_URL` in `portal/.env`
- Verify uploads folder has public access

### Events not in calendar?
- Check date format is correct
- Ensure event is published
- Verify date is valid

---

## Sample Images

You can use placeholder images from:
- **Unsplash**: https://unsplash.com/s/photos/conference
- **Pexels**: https://www.pexels.com/search/business/
- **Placeholder**: https://via.placeholder.com/800x400

Or use any images you have available.

---

## Next Steps

Once you have sample data:
1. Test all event components work
2. Test filtering (upcoming vs previous)
3. Test featured events on landing page
4. Add more content as needed
5. Start migrating other components (news, leadership, etc.)

---

**Note:** The TestCMS page is designed to show "No data found" when there's no content. This is expected behavior and means the connection is working correctly!
