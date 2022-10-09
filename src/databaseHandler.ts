import { openDB} from 'idb';
import { Trips } from "./models/TripDB";

const database_name = "TripDB";

export async function insertTrip(trips:Trips){
    const db = await openDB(database_name, 1)
    const id = await db.put("tripsDB", trips)
    return id;
}

export async function getAllTrip(){
    const dbGetAll = await openDB(database_name, 1)
    return await dbGetAll.getAll("tripsDB")
}

export async function getOneTrip(id:number){
    const dbGetOne = await openDB(database_name, 1)
    return dbGetOne.get("tripsDB",id)
}


export async function deleteOneTrip(id:number){
    const dbRemovedOne = await openDB(database_name, 1)
    await dbRemovedOne.delete("tripsDB",id);
}

export async function deleteAllTripInfo(){
    const dbRemoved = await openDB(database_name, 1)
    return await dbRemoved.clear("tripsDB")
}



initDatabase().then(()=>{
    console.log("database" + database_name + " was created!")
})

async function initDatabase() {
    const db = await openDB(database_name, 1, {
        upgrade(db) {
            const store = db.createObjectStore('tripsDB', {
                keyPath: 'id', 
                autoIncrement: true, 
            });           
        },
    });
}
















