import {shelterFactory} from "../factories";

const addShelter = async (shelter?: Shelter) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("ADD_SHELTER", shelter);
        console.log("SHELTER ADDED:", JSON.stringify(response, null, 2));
        return shelterFactory(response);
    } catch (err) {
        console.error(err);
        throw 400;
    }
}
export default addShelter;