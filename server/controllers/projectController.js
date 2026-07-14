import { projectModel } from "../models/projectModel.js";
import { projectSkillModel } from "../models/projectSkillModel.js";
import { caseModel } from "../models/caseModel.js";

export const getProjects = async (ctx) => {
  try {
    const projects = await projectModel.getAllProjects()

    if (projects.length === 0) {
      ctx.status = 404
      ctx.body = {
        message: "No projects found"
      }
      return
    }

    const populatedProjects = await Promise.all(
      projects.map(async (project) => {
        const skills = await projectSkillModel.getProjectSkillsByProjectId(project.id);
        const cases = await caseModel.getCasesByProjectId(project.id);

        return {
          ...project,
          skills,
          cases
        };
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

};

export const getProject = async (ctx) => {
  try {
    const projectId = ctx.params.id;
    const project = await projectModel.getProjectById(projectId);

    if (!project) {
      ctx.status = 404;
      ctx.body = {
        message: "Project not found"
      };
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
      project: populatedProject // Return the newly constructed object
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch project" };
  }
};

export const patchProject = async (ctx) => {

};

export const deleteProject = async (ctx) => {
  try {
    const projectId = ctx.params.id

    const result = await projectModel.deleteProjectById(projectId)

    if (!result) {
      ctx.status = 404
      ctx.body = {
        message: "Project not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Project deleted successfully"
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to delete project" };
  }
};
