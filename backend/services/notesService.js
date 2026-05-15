import DataAccess from "../db.js";

const dataAccess = new DataAccess();
await dataAccess.connect(); // DB.js has it async to it will wait for the connection 


async function findAll(collection) {
    return await dataAccess.findAll(collection)
}

async function insertOne() {
    const data = {
        Nota: "This is a test"
    }
    await dataAccess.insertOne("notas",data)
}

export default dataAccess