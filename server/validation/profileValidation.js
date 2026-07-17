import makeKoaValidator from "../middleware/validation.js";
import profileJson from "../schemas/profile.json" with { type: "json" };

const getProfileSchema = profileJson.definitions.getProfile
const putProfileSchema = profileJson.definitions.putProfile

export const getProfileValidation = makeKoaValidator(getProfileSchema, "getProfile")
export const putProfileValidation = makeKoaValidator(putProfileSchema, "putProfile")
