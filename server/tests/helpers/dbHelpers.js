import { runQuery } from "../../database/helpers/database.js";

export async function resetDatabase() {
  try {
    const query = `
      TRUNCATE TABLE
        profile,
        projects,
        cases,
        skills,
        project_skills,
        education,
        experiences
      RESTART IDENTITY CASCADE;
    `;

    await runQuery(query);
    console.log("Database successfully reset.");
  } catch (error) {
    console.error("Failed to reset database:", error);
    throw error;
  }
}

export async function seedProfile() {
  await runQuery(`
    INSERT INTO profile ( name, role, location, status, email, github_url, linkedin_url)
    VALUES ( 'John Doe', 'Full Stack Developer', 'London, United Kingdom', 'not available', 'john@example.com', 'https://github.com/johndoe', 'https://www.linkedin.com/in/johndoe');
  `);
}

export async function seedEducations() {
  await runQuery(`
    INSERT INTO education (
      start_date,
      end_date,
      title,
      company,
      location,
      description
    ) VALUES
    (
      '2018-09-01',
      '2021-06-30',
      'BSc Computer Science',
      'Example University',
      'London, United Kingdom',
      'Studied software engineering, algorithms, databases, and networking.'
    ),
    (
      '2016-09-01',
      '2018-06-30',
      'Level 3 Diploma in Information Technology',
      'Example College',
      'Manchester, United Kingdom',
      'Completed coursework in programming, web development, and IT systems.'
    ),
    (
      '2011-09-01',
      '2016-06-30',
      'GCSEs',
      'Example High School',
      'Bristol, United Kingdom',
      'Completed secondary education including Mathematics, English, and Computer Science.'
    );
  `);
}

export async function seedEducation() {
  await runQuery(`
    INSERT INTO education (
      start_date,
      end_date,
      title,
      company,
      location,
      description
    ) VALUES (
      '2018-09-01',
      '2021-06-30',
      'BSc Computer Science',
      'Example University',
      'London, United Kingdom',
      'Studied software engineering, algorithms, databases, and networking.'
    );
  `);
}

export async function seedExperiences() {
  await runQuery(`
    INSERT INTO experiences (
      start_date,
      end_date,
      title,
      company,
      employment_type,
      location,
      description
    ) VALUES
    (
      '2023-01-01',
      NULL,
      'Software Developer',
      'Example Technologies Ltd',
      'full-time',
      'London, United Kingdom',
      'Developing and maintaining web applications and REST APIs.'
    ),
    (
      '2022-06-01',
      '2022-12-31',
      'Junior Developer',
      'Acme Software',
      'contract',
      'Manchester, United Kingdom',
      'Implemented frontend features and assisted with backend development.'
    ),
    (
      '2021-07-01',
      '2022-05-31',
      'IT Support Technician',
      'Example Services',
      'part-time',
      'Birmingham, United Kingdom',
      'Provided technical support, hardware troubleshooting, and system maintenance.'
    );
  `);
}

export async function seedExperience() {
  await runQuery(`
    INSERT INTO experiences (
      start_date,
      end_date,
      title,
      company,
      employment_type,
      location,
      description
    ) VALUES (
      '2023-01-01',
      NULL,
      'Software Developer',
      'Example Technologies Ltd',
      'part-time',
      'London, United Kingdom',
      'Developing and maintaining web applications and REST APIs.'
    );
  `);
}

export async function seedSkill() {
  await runQuery("INSERT INTO skills (name, year) VALUES ('React', 2025);")
}

export async function seedSkills() {
  await runQuery("INSERT INTO skills (name, year) VALUES ('React', 2025), ('Typescript', 2024), ('C++', 2023);")
}
