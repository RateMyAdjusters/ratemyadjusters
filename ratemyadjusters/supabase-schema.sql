-- ============================================
-- RATEMYADJUSTERS.COM DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- COMPANIES (Insurance Carriers)
-- ============================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    website TEXT,
    headquarters_state VARCHAR(2),
    
    -- Computed stats (updated by triggers)
    total_adjusters INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed major insurance companies
INSERT INTO companies (name, slug, headquarters_state) VALUES
('State Farm', 'state-farm', 'IL'),
('Allstate', 'allstate', 'IL'),
('USAA', 'usaa', 'TX'),
('Liberty Mutual', 'liberty-mutual', 'MA'),
('Farmers Insurance', 'farmers', 'CA'),
('Nationwide', 'nationwide', 'OH'),
('Progressive', 'progressive', 'OH'),
('Travelers', 'travelers', 'NY'),
('American Family', 'american-family', 'WI'),
('Auto-Owners', 'auto-owners', 'MI'),
('Erie Insurance', 'erie', 'PA'),
('The Hartford', 'hartford', 'CT'),
('AAA', 'aaa', 'FL'),
('Farm Bureau', 'farm-bureau', 'TN'),
('GEICO', 'geico', 'MD'),
('MetLife', 'metlife', 'NY'),
('Chubb', 'chubb', 'NJ'),
('Citizens', 'citizens', 'FL'),
('Safeco', 'safeco', 'WA'),
('Mercury Insurance', 'mercury', 'CA');

CREATE INDEX idx_companies_slug ON companies(slug);

-- ============================================
-- ADJUSTERS
-- ============================================
CREATE TABLE adjusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Identity
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(200) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Professional Info
    company_id UUID REFERENCES companies(id),
    title VARCHAR(100), -- Field Adjuster, Desk Adjuster, Senior Adjuster, etc.
    region VARCHAR(100), -- Michigan, Midwest, Southeast, etc.
    state VARCHAR(2),
    
    -- Optional contact (if known)
    email VARCHAR(255),
    linkedin_url TEXT,
    
    -- Computed Stats (updated by triggers)
    total_reviews INTEGER DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0,
    
    -- Breakdown scores
    communication_score DECIMAL(3,2),
    fairness_score DECIMAL(3,2),
    timeliness_score DECIMAL(3,2),
    professionalism_score DECIMAL(3,2),
    
    -- Claim outcomes (from reviews)
    approval_rate DECIMAL(5,2),
    
    -- Profile management
    profile_claimed BOOLEAN DEFAULT FALSE,
    claimed_by_user_id UUID,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    
    -- SEO
    meta_title VARCHAR(70),
    meta_description VARCHAR(160)
);

CREATE INDEX idx_adjusters_slug ON adjusters(slug);
CREATE INDEX idx_adjusters_company ON adjusters(company_id);
CREATE INDEX idx_adjusters_state ON adjusters(state);
CREATE INDEX idx_adjusters_rating ON adjusters(avg_rating DESC);
CREATE INDEX idx_adjusters_search ON adjusters 
    USING GIN (to_tsvector('english', first_name || ' ' || last_name));

-- ============================================
-- USERS
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Auth (links to Supabase Auth)
    auth_id UUID UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    
    -- Profile
    display_name VARCHAR(100),
    user_type VARCHAR(30) NOT NULL, -- homeowner, contractor, public_adjuster, restoration_company, other
    
    -- For contractors/companies
    company_name VARCHAR(200),
    company_website TEXT,
    
    -- Stats
    reviews_count INTEGER DEFAULT 0,
    helpful_votes_received INTEGER DEFAULT 0,
    
    -- Settings
    email_notifications BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_id ON users(auth_id);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    adjuster_id UUID NOT NULL REFERENCES adjusters(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    
    -- Ratings (1-5 scale)
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    fairness_rating INTEGER CHECK (fairness_rating BETWEEN 1 AND 5),
    timeliness_rating INTEGER CHECK (timeliness_rating BETWEEN 1 AND 5),
    professionalism_rating INTEGER CHECK (professionalism_rating BETWEEN 1 AND 5),
    
    -- Claim Details
    claim_type VARCHAR(50), -- property, auto, water_damage, fire, wind, hail, theft, liability, other
    claim_outcome VARCHAR(30), -- approved, partial, denied, pending, withdrawn
    claim_year INTEGER,
    
    -- Review Content
    title VARCHAR(200),
    review_text TEXT NOT NULL,
    would_recommend BOOLEAN,
    
    -- Reviewer Info
    reviewer_type VARCHAR(30) NOT NULL, -- homeowner, contractor, public_adjuster, restoration_company, other
    reviewer_display_name VARCHAR(100),
    reviewer_verified BOOLEAN DEFAULT FALSE,
    
    -- Moderation
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, flagged
    flagged_reason TEXT,
    moderated_at TIMESTAMP WITH TIME ZONE,
    
    -- Engagement
    helpful_count INTEGER DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_adjuster ON reviews(adjuster_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);

-- ============================================
-- ADJUSTER RESPONSES
-- ============================================
CREATE TABLE adjuster_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    adjuster_id UUID NOT NULL REFERENCES adjusters(id),
    user_id UUID NOT NULL REFERENCES users(id),
    
    response_text TEXT NOT NULL,
    
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_responses_review ON adjuster_responses(review_id);

-- ============================================
-- HELPFUL VOTES
-- ============================================
CREATE TABLE review_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    ip_hash VARCHAR(64),
    vote_type VARCHAR(10) NOT NULL, -- helpful, not_helpful
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(review_id, COALESCE(user_id::text, ip_hash))
);

-- ============================================
-- TRIGGERS: Update adjuster stats when reviews change
-- ============================================
CREATE OR REPLACE FUNCTION update_adjuster_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE adjusters SET
        total_reviews = (
            SELECT COUNT(*) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved'
        ),
        avg_rating = (
            SELECT ROUND(AVG(overall_rating)::numeric, 2) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved'
        ),
        communication_score = (
            SELECT ROUND(AVG(communication_rating)::numeric, 2) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved' AND communication_rating IS NOT NULL
        ),
        fairness_score = (
            SELECT ROUND(AVG(fairness_rating)::numeric, 2) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved' AND fairness_rating IS NOT NULL
        ),
        timeliness_score = (
            SELECT ROUND(AVG(timeliness_rating)::numeric, 2) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved' AND timeliness_rating IS NOT NULL
        ),
        professionalism_score = (
            SELECT ROUND(AVG(professionalism_rating)::numeric, 2) FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved' AND professionalism_rating IS NOT NULL
        ),
        approval_rate = (
            SELECT ROUND(
                (COUNT(*) FILTER (WHERE claim_outcome IN ('approved', 'partial'))::numeric / 
                NULLIF(COUNT(*) FILTER (WHERE claim_outcome IS NOT NULL), 0) * 100), 2
            )
            FROM reviews 
            WHERE adjuster_id = COALESCE(NEW.adjuster_id, OLD.adjuster_id) 
            AND status = 'approved'
        ),
        updated_at = NOW()
    WHERE id = COALESCE(NEW.adjuster_id, OLD.adjuster_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_adjuster_stats
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_adjuster_stats();

-- ============================================
-- TRIGGERS: Update company stats
-- ============================================
CREATE OR REPLACE FUNCTION update_company_stats()
RETURNS TRIGGER AS $$
DECLARE
    company UUID;
BEGIN
    -- Get the company_id from the adjuster
    SELECT company_id INTO company FROM adjusters 
    WHERE id = COALESCE(NEW.adjuster_id, OLD.adjuster_id);
    
    IF company IS NOT NULL THEN
        UPDATE companies SET
            total_reviews = (
                SELECT COUNT(*) FROM reviews r
                JOIN adjusters a ON r.adjuster_id = a.id
                WHERE a.company_id = company AND r.status = 'approved'
            ),
            avg_rating = (
                SELECT ROUND(AVG(r.overall_rating)::numeric, 2) FROM reviews r
                JOIN adjusters a ON r.adjuster_id = a.id
                WHERE a.company_id = company AND r.status = 'approved'
            ),
            total_adjusters = (
                SELECT COUNT(*) FROM adjusters WHERE company_id = company
            ),
            updated_at = NOW()
        WHERE id = company;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_company_stats
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_company_stats();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE adjusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read adjusters" ON adjusters FOR SELECT USING (true);
CREATE POLICY "Public can read approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can read companies" ON companies FOR SELECT USING (true);

-- Authenticated users can insert
CREATE POLICY "Authenticated users can insert reviews" ON reviews 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert adjusters" ON adjusters 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users 
    FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own data" ON users 
    FOR UPDATE USING (auth.uid() = auth_id);
