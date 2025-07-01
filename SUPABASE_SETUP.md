# Supabase Setup Guide for Claira Waitlist

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `claira-waitlist`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
6. Click "Create new project"
7. Wait for project to be ready (2-3 minutes)

## 2. Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Update Environment Variables

1. Open your `.env.local` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Create Database Table

1. In Supabase dashboard, go to **Table Editor**
2. Click **New Table**
3. Or use the SQL Editor with this command:

```sql
CREATE TABLE waitlist_signups (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  challenge TEXT,
  signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(100) DEFAULT 'website'
);
```

## 5. Set Up Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. Find your `waitlist_signups` table
3. Click **New Policy**
4. Add these policies:

### Allow Public Inserts
```sql
CREATE POLICY "Allow public inserts" ON waitlist_signups
FOR INSERT TO anon
WITH CHECK (true);
```

### Allow Authenticated Users to Read (Optional)
```sql
CREATE POLICY "Users can read own data" ON waitlist_signups
FOR SELECT TO authenticated
USING (true);
```

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/early-access`
3. Fill out the form with test data
4. Submit the form
5. Check Supabase dashboard → **Table Editor** → **waitlist_signups**
6. Verify your test data appears

## 7. Admin Dashboard (Optional)

1. Visit `/admin` in your browser
2. You should see a table with all signups
3. The admin page shows:
   - Email addresses
   - Names (if provided)
   - Period challenges
   - Signup dates
   - Source (defaults to 'website')

## 8. Security Considerations

### For Production:
1. **Protect Admin Route**: Add authentication to `/admin`
2. **Rate Limiting**: Implement rate limiting on form submissions
3. **Email Validation**: Consider email verification
4. **Data Export**: Set up regular data exports
5. **Backup**: Enable automatic backups in Supabase

### Environment Variables:
- Never commit `.env.local` to version control
- Use different Supabase projects for development/staging/production
- Rotate API keys regularly

## 9. Troubleshooting

### Common Issues:

**"Missing Supabase environment variables"**
- Check your `.env.local` file exists
- Verify variable names are correct
- Restart your development server

**"Invalid API key"**
- Double-check your anon key from Supabase dashboard
- Ensure no extra spaces or characters

**"Table doesn't exist"**
- Verify table name is exactly `waitlist_signups`
- Check you're in the correct Supabase project

**"Permission denied"**
- Check RLS policies are set up correctly
- Verify you're using the anon key, not service role key

## 10. Analytics Integration (Optional)

To track conversions with Google Analytics:

1. Add your Google Analytics tracking code to your app
2. Update the conversion ID in `/app/early-access/page.tsx`:

```javascript
'send_to': 'AW-CONVERSION_ID', // Replace with your actual conversion ID
```

## 11. Data Management

### Viewing Data:
- Supabase Dashboard → Table Editor → waitlist_signups
- Your app's `/admin` page

### Exporting Data:
- Supabase Dashboard → Table Editor → Export CSV
- Or use Supabase API for programmatic access

### Backup:
- Supabase automatically backs up your database
- You can also set up manual exports

## 12. Next Steps

1. **Customize Form**: Add more fields as needed
2. **Email Integration**: Set up email notifications for new signups
3. **Analytics**: Add more tracking events
4. **A/B Testing**: Test different form variations
5. **CRM Integration**: Connect to your CRM system

---

Your Supabase integration is now complete! The waitlist form will collect all submissions and store them securely in your Supabase database. 