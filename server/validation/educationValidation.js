import makeKoaValidator from "../middleware/validation.js";
import educationJson from "../schemas/education.json" with { type: "json" };

const getAllEducationSchema = educationJson.definitions.getAllEducation
const createEducationSchema = educationJson.definitions.createEducation
const putEducationSchema = educationJson.definitions.putEducation
const deleteEducationSchema = educationJson.definitions.deleteEducation

export const getAllEducationValidation = makeKoaValidator(getAllEducationSchema, "getAllEducation")
export const createEducationValidation = makeKoaValidator(createEducationSchema, "createEducation")
export const putEducationValidation = makeKoaValidator(putEducationSchema, "putEducation")
export const deleteEducationValidation = makeKoaValidator(deleteEducationSchema, "deleteEducation")
