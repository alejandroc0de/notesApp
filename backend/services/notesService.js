import DataAccess from "../db.js";

const dataAccess = new DataAccess();
await dataAccess.connect();
console.log(await dataAccess.findAll("notas"))