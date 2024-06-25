import {akaFactory} from "../factories";

const updateAKA = async (aka: AKA) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("UPDATE_AKA", aka);
        console.log("AKA UPDATED: ", JSON.stringify(response, null, 2));
        return akaFactory(response);
    }
    catch(err) {
            console.error(err);
            throw 400;
        }
}

export default updateAKA;