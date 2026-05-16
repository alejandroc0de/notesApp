import dotenv from 'dotenv'
dotenv.config();
import { MongoClient, ObjectId } from 'mongodb';

class DataAccess{
  constructor(){
    this.MONGO_URI = process.env.MONGO_URL
    this.client = new MongoClient(this.MONGO_URI)
  }

  // Connection Function --------------------------
  async connect(){
    try {
      await this.client.connect();
      console.log("Connected succesfully to db")
    } catch (error) {
      console.log(error)
    }
  }
  // ----------------------------------------------

  // We send the collection to make it a reusable function
  async findAll(collection){
    try {
      return await this.client.db("notas").collection(collection).find().toArray()
    } catch (error) {
      console.log(error)
    }
  }
  //-------------------------------------------------

  async insertOne (collection,data) {
    try {
      return await this.client.db("notas").collection(collection).insertOne(data)
    } catch (error) {
      console.log(error)
    }
  }

  // Delete items from db -----------------------------
  
  async deleteOne(collection,id){
    const queryId = {_id : new ObjectId(id)}
    try {
      return await this.client.db("notas").collection(collection).deleteOne(queryId)
    } catch (error) {
      console.log(error)
    }
  }



  close(){
    return this.client.close()
  }
}

export default DataAccess