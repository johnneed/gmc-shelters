import db from "./db";

const withLeadingZero = (num: number): string => {
    const numStr = `0${String(num)}`;
    return numStr.slice(-2);
}

const getNowString = () => `${new Date().getFullYear()}-${withLeadingZero(new Date().getMonth() + 1)}-${withLeadingZero(new Date().getDate())} ${withLeadingZero(new Date().getHours())}:${withLeadingZero(new Date().getMinutes())}:${withLeadingZero(new Date().getSeconds())}`;

const bool2Int = (bool?: boolean): number | string =>{
    if (bool === undefined) {
        return "null";
    }
    return bool ? 1 : 0;
}

const readShelters = () => {
    try {
        const query = "SELECT * FROM shelters";
        const readQuery = db.prepare(query);
        console.log(readQuery.all());
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
            `INSERT INTO shelters (name,start_year, end_year,description,slug,longitude,latitude,altitude, default_photo_id, is_gmc,architecture,built_by, notes, is_extant, created, updated ) VALUES ('${shelter.name}' , ${shelter.startYear} , ${shelter.endYear} , '${shelter.description}' , '${shelter.slug}' , ${shelter.longitude} , ${shelter.latitude} , ${shelter.altitude} , ${shelter.defaultPhotoId} , ${bool2Int(shelter.isGMC)} , '${shelter.architecture}' , '${shelter.builtBy}' , '${shelter.notes}' ,${bool2Int(shelter.isExtant)}, '${now}' , '${now}')`
        )

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
            console.log(
                `Inserted ${info.changes} rows with last ID
                 ${info.lastInsertRowid} into person`
            )
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}


const updateShelter = (shelter: Shelter) => {
    try {
        const now = getNowString();
        const insertQuery = db.prepare(
            `UPDATE SHELTERS SET name = '${shelter.name}', ` +
                    `start_year = ${shelter.startYear}, ` +
                    `end_year = ${shelter.endYear},` +
                    `description = '${shelter.description}', ` +
                    `slug = '${shelter.description}', ` +
                    `longitude = '${shelter.longitude}', ` +
                    `latitude = '${shelter.latitude}', ` +
                    `altitude = '${shelter.altitude}', ` +
                    `default_photo_id = '${shelter.defaultPhotoId}', ` +
                    `is_gmc = '${shelter.isGMC}', ` +
                    `architecture = '${shelter.architecture}', ` +
                    `built_by = '${shelter.builtBy}', ` +
                    `notes = '${shelter.notes}', ` +
                    `updated = '${now}' ` +
                    `WHERE id = ${shelter.id}`
        );

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
            console.log(
                `Inserted ${info.changes} rows with last ID
                 ${info.lastInsertRowid} into person`
            )
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}


const deleteShelter = (shelter: Shelter) => {
    try {

        if (!shelter.id) {
            return;
        }

        const deleteQuery = db.prepare(
            `DELETE FROM shelters WHERE id = ${shelter.id}`
        )

        const transaction = db.transaction(() => {
            const info = deleteQuery.run()
            console.log(
                `Inserted ${info.changes} rows with last ID
                 ${info.lastInsertRowid} into person`
            )
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}

const dbAPI = {readShelters, insertShelter, deleteShelter, updateShelter};
export default dbAPI
