import makeKoaValidator from "../middleware/validation.js";
import profileJson from "../schemas/profile.json"

const getProfileSchema = profileJson.definitions.getProfile
const patchProfileSchema = profileJson.definitions.patchProfile

export const getProfileValidation = makeKoaValidator(getProfileSchema, "getProfile")
export const patchProfileValidation = makeKoaValidator(patchProfileSchema, "patchProfile")
