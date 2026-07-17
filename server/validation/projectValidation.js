import makeKoaValidator from "../middleware/validation.js";
import projectJson from "../schemas/project.json" with { type: "json" };

const getProjectsSchema = projectJson.definitions.getProjects
const getProjectSchema = projectJson.definitions.getProject
const createProjectSchema = projectJson.definitions.createProject
const putProjectSchema = projectJson.definitions.putProject
const deleteProjectSchema = projectJson.definitions.deleteProject

export const getProjectsValidation = makeKoaValidator(getProjectsSchema, "getProjects")
export const getProjectValidation = makeKoaValidator(getProjectSchema, "getProject")
export const createProjectValidation = makeKoaValidator(createProjectSchema, "createProject")
export const putProjectValidation = makeKoaValidator(putProjectSchema, "putProject")
export const deleteProjectValidation = makeKoaValidator(deleteProjectSchema, "deleteProject")
