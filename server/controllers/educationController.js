import { educationModel } from "../models/educationModel";
import { formatDateFields } from "./helpers";

export async function getAllEducation(ctx) {
  try {
    const education = await educationModel.getAllEducation()

    if (education.length === 0) {
      ctx.status = 404;
      ctx.body = { message: "No education found" };
      return
    }

    ctx.status = 200;
    ctx.body = {
      message: "Education fetched successfully",
      education: education.map(formatDateFields)
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch education" };
  }
}

export async function createEducation(ctx) {
  try {
    const educationId = await educationModel.createEducation(ctx.request.body)

    ctx.status = 201;
    ctx.body = {
      message: "Education created successfully",
      educationId
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to create education" };
  }
}

export async function patchEducation(ctx) {
  try {
    const educationId = ctx.params.id
    const updates = ctx.request.body

    const education = await educationModel.patchEducationById(educationId, updates)

    if (!education) {
      ctx.status = 404
      ctx.body = {
        message: "Education not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Education updated successfully",
      education: formatDateFields(education)
    }

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to update education" };
  }
}

export async function deleteEducation(ctx) {
  try {
    const educationId = ctx.params.id

    const result = await educationModel.deleteEducationById(educationId)

    if (!result) {
      ctx.status = 404
      ctx.body = {
        message: "Education not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Education deleted successfully"
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to delete education" };
  }
}
