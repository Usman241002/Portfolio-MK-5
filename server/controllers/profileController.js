import { profileModel } from "../models/profileModel";

export async function getProfile(ctx) {
  try {
    const profile = await profileModel.getProfile()
    console.log(profile)

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

export async function patchProfile(ctx) {
  try {
    const updates = ctx.request.body

    const updatedProfile = await profileModel.patchProfile(updates)

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
