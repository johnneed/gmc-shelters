import db  from "./db";

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

const insertShelterPerson = (name: string, age: number) => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO person (name, age) VALUES ('${name}' , ${age})`
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

export readShelters;
