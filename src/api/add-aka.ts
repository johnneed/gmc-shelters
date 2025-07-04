import {akaFactory} from "../factories";

const addAKA = async (shelterId: number, aka?: AKA) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id, ...myAKA} = aka || akaFactory();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("ADD_AKA", {...myAKA, shelterId});
        console.log("AKA ADDED:", JSON.stringify(response, null, 2));
        return response;
    } catch (err) {
        console.error(err);
        throw 400;
    }
}

export default addAKA;