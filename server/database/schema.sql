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
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
        ON DELETE RESTRICT
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
