import {akaFactory, shelterFactory} from "../factories";
import {debounce} from "../lib/debounce";

const updateShelter = debounce((shelter: Shelter, callback?: (shelter: Shelter) => void) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.api.invoke("UPDATE_SHELTER", shelter).then((response) => {
            if (callback) {
                callback(shelterFactory(response));
            }
        });
    } catch (err) {
        console.error(err);
        throw 400;
    }
});


export default updateShelter;