import {shelterFactory} from "../factories";

const updateShelter = async (shelter: Shelter) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("UPDATE_SHELTER", shelter);
        console.log("SHELTER UPDATED: ", JSON.stringify(response, null, 2));
        return shelterFactory(response);
    } catch (err) {
        console.error(err);
        throw 400;
    }
}

export default updateShelter;