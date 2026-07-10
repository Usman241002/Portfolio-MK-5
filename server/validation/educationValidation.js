import makeKoaValidator from "../middleware/validation.js";
import educationJson from "../schemas/education.json" with { type: "json" };

const getAllEducationSchema = educationJson.definitions.getAllEducation
const createEducationSchema = educationJson.definitions.createEducation
const patchEducationSchema = educationJson.definitions.patchEducation
const deleteEducationSchema = educationJson.definitions.deleteEducation

export const getAllEducationValidation = makeKoaValidator(getAllEducationSchema, "getAllEducation")
export const createEducationValidation = makeKoaValidator(createEducationSchema, "createEducation")
export const patchEducationValidation = makeKoaValidator(patchEducationSchema, "patchEducation")
export const deleteEducationValidation = makeKoaValidator(deleteEducationSchema, "deleteEducation")
