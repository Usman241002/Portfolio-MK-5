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

export async function seedProjects() {
  await runQuery(`
    INSERT INTO projects (
      title,
      subtitle,
      client,
      role,
      year,
      description,
      status,
      repository_url,
      live_demo_url,
      thumbnail_url,
      featured
    ) VALUES
    (
      'Inventory Management System',
      'Warehouse stock tracking platform',
      'Acme Logistics',
      'Full Stack Developer',
      2025,
      'A web application for managing warehouse inventory, stock levels, suppliers, and purchase orders.',
      'completed',
      'https://github.com/example/inventory-system',
      'https://inventory.example.com',
      'https://picsum.photos/600/400?1',
      TRUE
    ),
    (
      'Restaurant Booking Platform',
      'Online reservation management',
      'City Dining Group',
      'Backend Developer',
      2024,
      'REST API and dashboard for restaurant reservations, customer management, and booking analytics.',
      'completed',
      'https://github.com/example/restaurant-booking',
      'https://restaurant.example.com',
      'https://picsum.photos/600/400?2',
      FALSE
    ),
    (
      'Property Management Portal',
      'Tenant and property administration',
      'Urban Estates',
      'Software Engineer',
      2023,
      'Portal for landlords to manage properties, tenants, maintenance requests, and rental payments.',
      'ongoing',
      'https://github.com/example/property-management',
      NULL,
      'https://picsum.photos/600/400?3',
      FALSE
    );
  `);

  await runQuery(`
    INSERT INTO cases (
      project_id,
      heading,
      subheading,
      description,
      stat,
      stat_description,
      image_url
    ) VALUES
    (1, 'Problem', 'Manual inventory tracking', 'Warehouse staff relied on spreadsheets which frequently became outdated.', '70%', 'Reduction in stock errors', 'https://picsum.photos/800/500?11'),
    (1, 'Solution', 'Centralised platform', 'Built a responsive inventory dashboard with role-based authentication.', '5k+', 'Products managed', 'https://picsum.photos/800/500?12'),

    (2, 'Challenge', 'Phone bookings only', 'Restaurants had no online booking capability.', '60%', 'Less booking administration', 'https://picsum.photos/800/500?21'),
    (2, 'Outcome', 'Reservation dashboard', 'Implemented booking calendar, customer history and reporting.', '12k+', 'Bookings processed', 'https://picsum.photos/800/500?22'),

    (3, 'Problem', 'Scattered property records', 'Landlords stored tenant information across multiple systems.', '150+', 'Properties managed', 'https://picsum.photos/800/500?31'),
    (3, 'Solution', 'Unified management portal', 'Created maintenance tracking, rental history and tenant management.', '40%', 'Faster maintenance response', 'https://picsum.photos/800/500?32');
  `);

  await runQuery(`
    INSERT INTO project_skills (project_id, skill_id) VALUES
      (1,1),
      (1,2),
      (1,3),

      (2,1),
      (2,2),

      (3,2),
      (3,3);
  `);
}

export async function seedProject() {
  await runQuery(`
    INSERT INTO projects (
      title,
      subtitle,
      client,
      role,
      year,
      description,
      status,
      repository_url,
      live_demo_url,
      thumbnail_url,
      featured
    ) VALUES (
      'Task Management Dashboard',
      'Team productivity application',
      'Example Corporation',
      'Full Stack Developer',
      2025,
      'A Kanban-style task management platform with authentication, project tracking, notifications and reporting.',
      'completed',
      'https://github.com/example/task-dashboard',
      'https://tasks.example.com',
      'https://picsum.photos/600/400?100',
      TRUE
    );
  `);

  await runQuery(`
    INSERT INTO cases (
      project_id,
      heading,
      subheading,
      description,
      stat,
      stat_description,
      image_url
    ) VALUES
    (
      1,
      'Challenge',
      'Managing distributed teams',
      'Teams required a centralised workspace to organise tasks and monitor project progress.',
      '35%',
      'Increase in productivity',
      'https://picsum.photos/800/500?101'
    ),
    (
      1,
      'Result',
      'Improved collaboration',
      'Delivered task boards, deadlines, file sharing and progress reporting.',
      '2k+',
      'Tasks completed',
      'https://picsum.photos/800/500?102'
    );
  `);

  await runQuery(`
    INSERT INTO project_skills (project_id, skill_id)
    VALUES
      (1,1),
      (1,2),
      (1,3);
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
