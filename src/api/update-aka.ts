import {akaFactory} from "../factories";
import {debounce} from "../lib/debounce";

const updateAKA = debounce(async (aka: AKA, callback?: (aka: AKA) => void) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.api.invoke("UPDATE_AKA", aka).then((response) => {
            if (callback) {
                callback(akaFactory(response));
            }
        });
    } catch (err) {
        console.error(err);
        throw 400;
    }
})


export default updateAKA;