import {akaFactory} from "../factories";

const addAKA = async (shelter:Shelter, aka: AKA) => {
    try{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
   const response = await window.api.invoke("ADD_AKA", {shelter, aka});
        console.log("AKA ADDED:", JSON.stringify(response, null, 2));
        return response;
    }
catch(err) {
        console.error(err);
        throw 400;
    }
}

export default addAKA;