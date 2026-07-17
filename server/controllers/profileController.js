import { profileModel } from "../models/profileModel.js";

export async function getProfile(ctx) {
  try {
    const profile = await profileModel.getProfile()

    if (!profile) {
      ctx.status = 404
      ctx.body = { message: "Profile not found" }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Profile fetched successfully",
      profile
    }

  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to fetch profile" };
  }
}

export async function putProfile(ctx) {
  try {
    const updatedProfile = await profileModel.putProfile(ctx.request.body)

    if (!updatedProfile) {
      ctx.status = 404
      ctx.body = { message: "Profile not found" }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: "Profile updated successfully",
      profile: updatedProfile
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to update profile" };
  }
}
