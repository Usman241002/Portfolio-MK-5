import { experienceModel } from "../models/experienceModel.js";
import { formatDateFields } from "./helpers.js";

export async function getExperiences(ctx) {
  try {
    const experience = await experienceModel.getAllExperiences()

    if (experience.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "No experience found" };
      return
    }

    ctx.status = 200;
    ctx.body = {
      message: "Experience fetched successfully",
      experiences: experience.map(formatDateFields)
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch experience" };
  }
}

export async function createExperience(ctx) {
  try {
    const experienceId = await experienceModel.createExperience(ctx.request.body)

    ctx.status = 201;
    ctx.body = {
      message: "Experience created successfully",
      experienceId
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to create experience" };
  }
}

export async function putExperience(ctx) {
  try {
    const experienceId = ctx.params.id
    const experience = await experienceModel.putExperienceById(experienceId, ctx.request.body)

    if (!experience) {
      ctx.status = 404
      ctx.body = {
        message: "Experience not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Experience updated successfully",
      experience: formatDateFields(experience)
    }

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to update experience" };
  }
}

export async function deleteExperience(ctx) {
  try {
    const experienceId = ctx.params.id

    const result = await experienceModel.deleteExperienceById(experienceId)

    if (!result) {
      ctx.status = 404
      ctx.body = {
        message: "Experience not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Experience deleted successfully"
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to delete experience" };
  }
}
