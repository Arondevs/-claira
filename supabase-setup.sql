-- Supabase Database Setup for Claira Waitlist
-- Run this in your Supabase SQL Editor

-- Create the waitlist_signups table
CREATE TABLE waitlist_signups (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  challenge TEXT,
  signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(100) DEFAULT 'website'
);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON waitlist_signups
FOR INSERT TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to read data (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON waitlist_signups
FOR SELECT TO authenticated
USING (true);

-- Create policy to allow service role to read all data (for admin functions)
CREATE POLICY "Allow service role reads" ON waitlist_signups
FOR SELECT TO service_role
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_signups_email ON waitlist_signups(email);

-- Create index on signup_date for sorting
CREATE INDEX idx_waitlist_signups_date ON waitlist_signups(signup_date DESC);

-- Optional: Create a function to get signup statistics
CREATE OR REPLACE FUNCTION get_waitlist_stats()
RETURNS TABLE(
  total_signups BIGINT,
  today_signups BIGINT,
  this_week_signups BIGINT,
  this_month_signups BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_signups,
    COUNT(*) FILTER (WHERE DATE(signup_date) = CURRENT_DATE) as today_signups,
    COUNT(*) FILTER (WHERE signup_date >= CURRENT_DATE - INTERVAL '7 days') as this_week_signups,
    COUNT(*) FILTER (WHERE signup_date >= CURRENT_DATE - INTERVAL '30 days') as this_month_signups
  FROM waitlist_signups;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON waitlist_signups TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE waitlist_signups_id_seq TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_waitlist_stats() TO authenticated;

-- Optional: Create a view for challenge analytics
CREATE VIEW challenge_analytics AS
SELECT 
  challenge,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM waitlist_signups), 2) as percentage
FROM waitlist_signups 
WHERE challenge IS NOT NULL AND challenge != ''
GROUP BY challenge
ORDER BY count DESC;

-- Grant access to the view
GRANT SELECT ON challenge_analytics TO authenticated; 