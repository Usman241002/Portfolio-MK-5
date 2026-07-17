import makeKoaValidator from "../middleware/validation.js";
import experienceJson from "../schemas/experience.json" with { type: "json" };

const getAllExperiencesSchema = experienceJson.definitions.getAllExperiences
const createExperienceSchema = experienceJson.definitions.createExperience
const putExperienceSchema = experienceJson.definitions.putExperience
const deleteExperienceSchema = experienceJson.definitions.deleteExperience

export const getAllExperiencesValidation = makeKoaValidator(getAllExperiencesSchema, "getAllExperiences")
export const createExperienceValidation = makeKoaValidator(createExperienceSchema, "createExperience")
export const putExperienceValidation = makeKoaValidator(putExperienceSchema, "putExperience")
export const deleteExperienceValidation = makeKoaValidator(deleteExperienceSchema, "deleteExperience")
