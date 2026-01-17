-- ============================================
-- MIGRATION: Add extended review fields
-- Run this in Supabase SQL Editor
-- ============================================

-- Add new columns to reviews table
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS carrier_name VARCHAR(100);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS carrier_other VARCHAR(100);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS zip_code VARCHAR(10);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS property_type VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS claim_amount VARCHAR(20);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS loss_date VARCHAR(10); -- YYYY-MM format
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS report_timing VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS payout_comparison VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS escalation VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS decision_time VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS frustrations TEXT[]; -- Array of frustration codes
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS frustration_other TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS premium_impact VARCHAR(30);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS what_went_well_poorly TEXT;

-- Reviewer contact info (optional)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_email VARCHAR(255);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_first_name VARCHAR(100);
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_opt_in BOOLEAN DEFAULT FALSE;

-- Index for carrier analysis
CREATE INDEX IF NOT EXISTS idx_reviews_carrier ON reviews(carrier_name);
CREATE INDEX IF NOT EXISTS idx_reviews_property_type ON reviews(property_type);
CREATE INDEX IF NOT EXISTS idx_reviews_escalation ON reviews(escalation);
CREATE INDEX IF NOT EXISTS idx_reviews_payout ON reviews(payout_comparison);
