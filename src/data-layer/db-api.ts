import db from "./db";
import { Shelter } from "../models/shelter-factory";

const withLeadingZero = (num: number): string => {
  const numStr = `0${ String(num) }`;
  return numStr.slice(-2);
}

const getNowString = ()=>  `${ new Date().getFullYear() }-${ withLeadingZero(new Date().getMonth() + 1) }-${ withLeadingZero(new Date().getDate()) } ${withLeadingZero(new Date().getHours())}:${withLeadingZero(new Date().getMinutes())}:${withLeadingZero(new Date().getSeconds())}`;


const readShelters = () => {
  try {
    const query = `SELECT * FROM shelters`;
    const readQuery = db.prepare(query);
    return readQuery.all();
  } catch (err) {
    console.error(err);
    throw err
  }
}

const insertShelter = (shelter: Shelter) => {
  try {
    const now = getNowString();
    const insertQuery = db.prepare(
      `INSERT INTO shelters (name,start_year, end_year,description,slug,longitude,latitude,altitude, default_photo_id, is_gmc,architecture,built_by, notes, created, updated ) VALUES ('${shelter.name}' , ${shelter.startYear} , ${shelter.endYear} , '${shelter.description}' , '${shelter.slug}' , ${shelter.longitude} , ${shelter.latitude} , ${shelter.altitude} , ${shelter.defaultPhotoId} , ${shelter.isGMC? 1 : 0} , '${shelter.architecture}' , '${shelter.builtBy}' , '${shelter.notes}' , '${now}' , '${now}')`
    )

    const transaction = db.transaction(() => {
      const info = insertQuery.run()
      console.log(
        `Inserted ${ info.changes } rows with last ID
                 ${ info.lastInsertRowid } into person`
      )
    })
    transaction()
  } catch (err) {
    console.error(err)
    throw err
  }
}
const dbAPI = { readShelters, insertShelter };
export default dbAPI
