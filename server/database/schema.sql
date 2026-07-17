DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS cases CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS project_skills CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;

DROP TYPE IF EXISTS profile_status CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS employment_type_enum CASCADE;

CREATE TYPE profile_status AS ENUM ('open to work', 'selective projects', 'not available');
CREATE TYPE project_status AS ENUM ('ongoing', 'completed', 'archived');
CREATE TYPE employment_type_enum AS ENUM ('full-time', 'part-time', 'internship', 'contract', 'freelance');

-- PROFILE
CREATE TABLE profile (
    name VARCHAR(255) DEFAULT '',
    role VARCHAR(255) DEFAULT '',
    location VARCHAR(255) DEFAULT '',
    status profile_status NOT NULL DEFAULT 'open to work',
    email VARCHAR(255) DEFAULT '',
    github_url VARCHAR(2048) DEFAULT '',
    linkedin_url VARCHAR(2048) DEFAULT ''
);

-- PROJECTS
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    client TEXT NOT NULL,
    role TEXT NOT NULL,
    year SMALLINT NOT NULL, -- Changed from YEAR
    description TEXT NOT NULL,
    status project_status NOT NULL DEFAULT 'ongoing',
    repository_url VARCHAR(2048),
    live_demo_url VARCHAR(2048),
    thumbnail_url  VARCHAR(256),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    featured BOOLEAN NOT NULL DEFAULT FALSE
);

-- PROJECT CASES
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    heading VARCHAR(256),
    subheading VARCHAR(256),
    description TEXT,
    stat VARCHAR(256),
    stat_description VARCHAR(256),
    image_url VARCHAR(256),

    CONSTRAINT fk_projectcases_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

-- SKILLS
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    year SMALLINT NOT NULL
);

-- PROJECT SKILLS
CREATE TABLE project_skills (
    project_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (project_id, skill_id),

    CONSTRAINT fk_projectskills_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_projectskills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE CASCADE
);

-- EDUCATION
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT
);

-- EXPERIENCEs
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    employment_type employment_type_enum NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT
);

-- --------------------------------------------------------
-- 1. PROFILE
-- --------------------------------------------------------
INSERT INTO profile (name, role, location, status, email, github_url, linkedin_url)
VALUES
('Usman Khalid', 'Software Engineer', 'Birmingham, UK', 'open to work', 'contact@ukhalid.dev', 'https://github.com/Usman241002', 'https://www.linkedin.com/in/usman-khalid-dev/');

-- --------------------------------------------------------
-- 2. PROJECTS
-- --------------------------------------------------------
INSERT INTO projects (title, subtitle, client, role, year, description, status, repository_url, live_demo_url, thumbnail_url, deleted, featured)
VALUES
('E-commerce Platform', 'Next-gen shopping experience', 'RetailCorp', 'Lead Developer', 2024, 'A high-performance e-commerce platform built with modern web technologies.', 'completed', 'https://github.com/janedoe/ecommerce', 'https://shop.example.com', '/images/ecommerce.jpg', FALSE, TRUE),
('AI Customer Support', 'Automated ticketing system', 'TechStart Inc.', 'Backend Engineer', 2025, 'Integrating LLMs to automate tier-1 customer support requests.', 'ongoing', 'https://github.com/johnsmith/ai-support', NULL, '/images/ai-support.jpg', FALSE, TRUE),
('Legacy Migration', 'Monolith to Microservices', 'Global Bank', 'Systems Architect', 2022, 'Migrated a 10-year-old monolithic application into scalable microservices.', 'archived', NULL, NULL, '/images/bank-migration.jpg', FALSE, FALSE);

-- --------------------------------------------------------
-- 3. PROJECT CASES
-- --------------------------------------------------------
-- Note: Assuming project IDs 1, 2, and 3 were generated above.
INSERT INTO cases (project_id, heading, subheading, description, stat, stat_description, image_url)
VALUES
(1, 'Performance Overhaul', 'Slow load times', 'Rebuilt the frontend rendering strategy using SSR and aggressive caching.', '300%', 'Increase in page load speed', '/images/ecommerce-chart.png'),
(2, 'Model Accuracy', 'Reducing hallucinations', 'Fine-tuned the model on company-specific documentation and support history.', '94%', 'Response accuracy rate', '/images/ai-accuracy.png'),
(3, 'System Uptime', 'Frequent legacy crashes', 'Containerized the application and deployed via Kubernetes for high availability.', '99.99%', 'Uptime achieved post-migration', '/images/uptime-graph.png');

-- --------------------------------------------------------
-- 4. SKILLS
-- --------------------------------------------------------
INSERT INTO skills (name, year)
VALUES
('React', 2018),
('Node.js', 2019),
('PostgreSQL', 2020);

-- --------------------------------------------------------
-- 5. PROJECT SKILLS
-- --------------------------------------------------------
-- Note: Linking the 3 projects to the 3 skills.
INSERT INTO project_skills (project_id, skill_id)
VALUES
(1, 1), -- E-commerce Platform uses React
(1, 2), -- E-commerce Platform uses Node.js
(2, 2), -- AI Customer Support uses Node.js
(3, 3); -- Legacy Migration uses PostgreSQL

-- --------------------------------------------------------
-- 6. EDUCATION
-- --------------------------------------------------------
INSERT INTO education (start_date, end_date, title, company, location, description)
VALUES
('2014-09-01', '2018-05-30', 'B.S. Computer Science', 'State University', 'New York, NY', 'Graduated with honors. Minor in Mathematics.'),
('2018-09-01', '2020-05-30', 'M.S. Data Science', 'Tech Institute', 'San Francisco, CA', 'Focused on machine learning and large-scale data systems.'),
('2021-01-15', '2021-04-15', 'Full Stack Web Development', 'Code Bootcamp', 'Remote', 'Intensive 12-week immersive web development program.');

-- --------------------------------------------------------
-- 7. EXPERIENCES
-- --------------------------------------------------------
INSERT INTO experiences (start_date, end_date, title, company, employment_type, location, description)
VALUES
('2022-06-01', NULL, 'Senior Software Engineer', 'Big Tech Innovations', 'full-time', 'San Francisco, CA', 'Leading a team of 5 engineers to build scalable web applications.'),
('2020-06-01', '2022-05-30', 'Backend Developer', 'Startup Co.', 'full-time', 'Remote', 'Designed and implemented RESTful APIs and maintained database schemas.'),
('2019-05-01', '2019-08-30', 'Software Engineering Intern', 'Global Corp', 'internship', 'Seattle, WA', 'Assisted in migrating legacy code to modern frameworks during the summer.');
