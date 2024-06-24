import db from "./db";

const withLeadingZero = (num: number): string => {
    const numStr = `0${String(num)}`;
    return numStr.slice(-2);
}

const getNowString = () => `${new Date().getFullYear()}-${withLeadingZero(new Date().getMonth() + 1)}-${withLeadingZero(new Date().getDate())} ${withLeadingZero(new Date().getHours())}:${withLeadingZero(new Date().getMinutes())}:${withLeadingZero(new Date().getSeconds())}`;

const bool2Int = (bool?: boolean): number | string => {
    if (bool === undefined) {
        return "null";
    }
    return bool ? 1 : 0;
}

const stringOrNull = (str?: string): string | null => {
    return str && str.trim() !== "" ? `'${str}'` : null;
}

const numberOrNull = (num?: number): number | null => {
    return typeof num === "number" ? num : null;
}

const readShelters = () => {
    try {
        const query = "SELECT * FROM view_shelters_akas";
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
        // Sanity Check
        if (!shelter.id) {
            return;
        }
        const now = getNowString();

        const queryString = `UPDATE SHELTERS SET name = ${stringOrNull(shelter.name)}, ` +
            `start_year =  ${numberOrNull(shelter.startYear)}, ` +
            `end_year = ${numberOrNull(shelter.endYear)},` +
            `description = ${stringOrNull(shelter.description)}, ` +
            `slug = ${stringOrNull(shelter.slug)}, ` +
            `longitude = ${numberOrNull(shelter.longitude)}, ` +
            `latitude = ${numberOrNull(shelter.latitude)}, ` +
            `altitude = ${numberOrNull(shelter.altitude)}, ` +
            `default_photo_id = ${numberOrNull(shelter.defaultPhotoId)}, ` +
            `is_gmc = ${bool2Int(shelter.isGMC)}, ` +
            `architecture = ${stringOrNull(shelter.architecture)}, ` +
            `built_by = ${stringOrNull(shelter.builtBy)}, ` +
            `notes = ${stringOrNull(shelter.notes)}, ` +
            `is_extant = ${bool2Int(shelter.isExtant)}, ` +
            `updated = '${now}' ` +
            `WHERE id = ${shelter.id}`;
        console.log(queryString);
        const insertQuery = db.prepare(queryString);

        const transaction = db.transaction(() => {
            const info = insertQuery.run()
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
        })
        transaction()
    } catch (err) {
        console.error(err)
        throw err
    }
}




const readCategories = () => {
    try {
        const query = "SELECT * FROM categories";
        const readQuery = db.prepare(query);
        return readQuery.all();
    } catch (err) {
        console.error(err);
        throw err
    }
}



const readArchitectures = () => {
    try {
        const query = "SELECT * FROM architectures";
        const readQuery = db.prepare(query);
        return readQuery.all();
    } catch (err) {
        console.error(err);
        throw err
    }
}


const addAKA = (aka:AKA) => {
    try {
        const insertQuery = db.prepare(
            `INSERT INTO shelter_akas (shelter_id, notes, name, created, updated) VALUES (${aka.shelterId}, ${aka.notes || "null"}, ${aka.name || "null"},${getNowString()}, ${getNowString()})`
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

const removeAKA = (akaId: number) => {
    try {
        const insertQuery = db.prepare(
            `DELETE FROM shelter_akas WHERE id = ${akaId}`
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


const updateAKA = (aka: AKA) => {
    try {
        const insertQuery = db.prepare(
            `UPDATE shelter_akas SET name = ${aka.name}, notes = ${aka.notes}, updated = ${getNowString()} WHERE id = ${aka.id}`
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

const dbAPI = {readShelters, insertShelter, deleteShelter, updateShelter, readCategories, readArchitectures, addAKA, removeAKA, updateAKA};
export default dbAPI
