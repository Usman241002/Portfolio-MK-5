import { skillModel } from "../models/skillModel.js";

export async function getSkills(ctx) {
  try {
    const skills = await skillModel.getAllSkills()

    if (skills.length === 0) {
      ctx.status = 404
      ctx.body = {
        message: "No skills found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Skills fetched successfully",
      skills
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch skills" };
  }
}

export async function createSkill(ctx) {
  try {
    const skillId = await skillModel.createSkill(ctx.request.body);

    ctx.status = 201;
    ctx.body = {
      message: "Skill created successfully",
      skillId
    }

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to create skill" };
  }
}

export async function patchSkill(ctx) {
  try {
    const skillId = ctx.params.id
    const updates = ctx.request.body

    const skill = await skillModel.patchSkillById(skillId, updates)

    if (!skill) {
      ctx.status = 404
      ctx.body = {
        message: "Skill not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Skill updated successfully",
        skill
    }

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to update skill" };
  }
}

export async function deleteSkill(ctx) {
  try {
    const skillId = ctx.params.id

    const result = await skillModel.deleteSkillById(skillId)

    if (!result) {
      ctx.status = 404
      ctx.body = {
        message: "Skill not found"
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Skill deleted successfully"
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to delete skill" };
  }
}
