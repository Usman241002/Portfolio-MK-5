import { projectModel } from "../models/projectModel.js";
import { projectSkillModel } from "../models/projectSkillModel.js";
import { caseModel } from "../models/caseModel.js";

export const getProjects = async (ctx) => {
  try {
    const projects = await projectModel.getAllProjects()

    if (projects.length === 0) {
      ctx.status = 404
      ctx.body = { message: "No projects found" }
      return
    }

    const populatedProjects = await Promise.all(
      projects.map(async (project) => {
        const skills = await projectSkillModel.getProjectSkillsByProjectId(project.id);
        const cases = await caseModel.getCasesByProjectId(project.id);
        return { ...project, skills, cases };
      })
    );

    ctx.status = 200
    ctx.body = {
      message: "Projects fetched successfully",
      projects: populatedProjects
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch projects" };
  }
};

export const getFeaturedProjects = async (ctx) => {
  try {
    const projects = await projectModel.getFeaturedProjects()

    if (projects.length === 0) {
      ctx.status = 404
      ctx.body = { message: "No projects found" }
      return
    }

    const populatedProjects = await Promise.all(
      projects.map(async (project) => {
        const skills = await projectSkillModel.getProjectSkillsByProjectId(project.id);
        const cases = await caseModel.getCasesByProjectId(project.id);
        return { ...project, skills, cases };
      })
    );

    ctx.status = 200
    ctx.body = {
      message: "Projects fetched successfully",
      projects: populatedProjects
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch projects" };
  }
};

export const createProject = async (ctx) => {
  try {
    const { skills, cases, ...projectData } = ctx.request.body;

    const projectId = await projectModel.createProject(projectData);

    if (skills && skills.length > 0) {
      // FIX 1: Extract skill.id safely for new projects!
      const skillPromises = skills.map(skill =>
        projectSkillModel.createProjectSkill(projectId, skill.id || skill)
      );
      await Promise.all(skillPromises);
    }

    if (cases && cases.length > 0) {
      const casePromises = cases.map(caseItem =>
        caseModel.createCaseByProjectId(projectId, caseItem)
      );
      await Promise.all(casePromises);
    }

    ctx.status = 201;
    ctx.body = {
      message: "Project created successfully",
      projectId
    };

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to create project" };
  }
};

export const getProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;
    const project = await projectModel.getProjectById(projectId);

    if (!project) {
      ctx.status = 404;
      ctx.body = { message: "Project not found" };
      return;
    }

    const skills = await projectSkillModel.getProjectSkillsByProjectId(project.id);
    const cases = await caseModel.getCasesByProjectId(project.id);

    const populatedProject = {
      ...project,
      skills,
      cases
    };

    ctx.status = 200;
    ctx.body = {
      message: "Project fetched successfully",
      project: populatedProject
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch project" };
  }
};

export const putProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;
    const { skills, cases, ...projectData } = ctx.request.body;

    const existingProject = await projectModel.getProjectById(projectId);
    if (!existingProject) {
      ctx.status = 404;
      ctx.body = { message: "Project not found" };
      return;
    }

    // FIX 2: Merge the existing data with the incoming data so we don't erase text!
    const mergedProjectData = { ...existingProject, ...projectData };

    if (Object.keys(projectData).length > 0) {
      await projectModel.putProjectById(projectId, mergedProjectData);
    }

    if (skills) {
      await projectSkillModel.deleteProjectSkillsByProjectId(projectId);

      if (skills.length > 0) {
        const skillPromises = skills.map(skill =>
          projectSkillModel.createProjectSkill(projectId, skill.id || skill)
        );
        await Promise.all(skillPromises);
      }
    } // FIX 3: This bracket was missing!

    if (cases) {
      await caseModel.deleteCasesByProjectId(projectId);

      if (cases.length > 0) {
        const casePromises = cases.map(caseItem =>
          caseModel.createCaseByProjectId(projectId, caseItem)
        );
        await Promise.all(casePromises);
      }
    }

    ctx.status = 200;
    ctx.body = {
      message: "Project updated successfully"
    };

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to update project" };
  }
};

export const deleteProject = async (ctx) => {
  try {
    const projectId = ctx.params.id

    const result = await projectModel.deleteProjectById(projectId)

    if (!result) {
      ctx.status = 404
      ctx.body = { message: "Project not found" }
      return
    }

    ctx.status = 200
    ctx.body = { message: "Project deleted successfully" }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to delete project" };
  }
};

export const uploadThumbnail = async (ctx) => {
  try {
    const projectId = ctx.params.id;

    const uploadedFile = ctx.request.files ? ctx.request.files.thumbnail : null;

    if (!uploadedFile) {
      ctx.status = 400;
      ctx.body = { message: "No image file provided" };
      return;
    }

    const thumbnailUrl = `/${uploadedFile.newFilename}`;

    await projectModel.updateThumbnail(projectId, thumbnailUrl);

    ctx.status = 200;
    ctx.body = {
      message: "Thumbnail uploaded successfully",
      thumbnail: thumbnailUrl
    };

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to upload thumbnail" };
  }
};
