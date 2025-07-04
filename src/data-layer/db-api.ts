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
            `start_year = ${numberOrNull(shelter.startYear)}, ` +
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
            `updated = '${now}', ` +
            `category = ${stringOrNull(shelter.category)} ` +
            `WHERE id = ${shelter.id}`;
        console.log("QUERY STRING FOR UPDATE SHELTER: ", queryString);
        const shelterUpdateQuery = db.prepare(queryString);

        const transaction = db.transaction(() => {
            const info = shelterUpdateQuery.run()
        });

        transaction();

        (shelter.akas || []).forEach((aka: AKA) => {
            if (aka.id) {
                updateAKA(aka);
            } else {
                addAKA({...aka, shelterId: shelter.id});
            }
        });

        const readShelterQueryString = "SELECT * FROM view_shelters_akas WHERE id = " + shelter.id;
        console.log("QUERY STRING FOR SELECT SHELTER: ", readShelterQueryString);
        const readQuery = db.prepare(readShelterQueryString);
        return readQuery.all();
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


const addAKA = (aka: AKA) => {
    try {
        const queryString = `INSERT INTO shelter_akas (shelter_id, notes, name, created, updated) VALUES (` +
            `${aka.shelterId}, ${stringOrNull(aka.notes)}, ${stringOrNull(aka.name)},'${getNowString()}', '${getNowString()}')`;
        console.log("QUERY STRING FOR ADD AKA: ", queryString);

        const insertQuery = db.prepare(queryString);

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
        const queryString = `DELETE FROM shelter_akas WHERE id = ${akaId}`;
        const removeAKAQuery = db.prepare(queryString)

        const transaction = db.transaction(() => {
            const info = removeAKAQuery.run()
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
        const queryString = "UPDATE shelter_akas SET " +
            `name = ${stringOrNull(aka.name)}, ` +
            `notes = ${stringOrNull(aka.name)}, ` +
            `updated = '${getNowString()}' WHERE id = ${aka.id}`
        console.log("QUERY STRING FOR UPDATE AKA: ", queryString);
        const updateAKAQuery = db.prepare(queryString);

        const transaction = db.transaction(() => {
            const info = updateAKAQuery.run()
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

const dbAPI = {
    readShelters,
    insertShelter,
    deleteShelter,
    updateShelter,
    readCategories,
    readArchitectures,
    addAKA,
    removeAKA,
    updateAKA
};
export default dbAPI
