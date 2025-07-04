import ShelterFactory from "../factories/shelter-factory";


const readShelters = async () => {
    try {
        console.log("READING SHELTERS");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("READ_SHELTERS");
        return response.map((shelter: unknown) => ShelterFactory(shelter));
    } catch (err) {
        console.error(err);
        throw 400;
    }
}

export default readShelters;