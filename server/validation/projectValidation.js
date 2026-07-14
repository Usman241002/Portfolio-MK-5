import makeKoaValidator from "../middleware/validation.js";
import projectJson from "../schemas/project.json" with { type: "json" };

const getProjectsSchema = projectJson.definitions.getProjects
const getProjectSchema = projectJson.definitions.getProject
// const createProjectSchema = projectJson.definitions.createProject
// const patchProjectSchema = projectJson.definitions.patchProject
const deleteProjectsSchema = projectJson.definitions.deleteProjects

export const getProjectsValidation = makeKoaValidator(getProjectsSchema, "getProjects")
export const getProjectValidation = makeKoaValidator(getProjectSchema, "getProject")
// export const createProjectValidation = makeKoaValidator(createProjectSchema, "createProject")
// export const patchProjectValidation = makeKoaValidator(patchProjectSchema, "patchProject")
export const deleteProjectsValidation = makeKoaValidator(deleteProjectsSchema, "deleteProjects")
