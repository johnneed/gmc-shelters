const makeNumber = (num: unknown, deflt?: number): number | undefined => {
    const myNumber = Number(num);
    return (isNaN(myNumber)) ? deflt : myNumber;
}

const makeString = (str: unknown, deflt?: string): string | undefined => {
    return (typeof str !== "string") ? deflt : str;
}

const makeBool = (bool: unknown, deflt = false): boolean | undefined => {
    switch (typeof bool) {
        case "string":
            if (bool.toLowerCase() === "true") {
                return true;
            }
            if (bool.toLowerCase() === "false") {
                return false;
            }
            if (bool.toLowerCase() === "on") {
                return true;
            }
            if (bool.toLowerCase() === "off") {
                return false;
            }
            return deflt;

        case "number":
            switch (bool) {
                case 1:
                    return true;
                case 0:
                    return false;
                default:
                    return deflt;
            }
        case "boolean":
            return bool;
        default:
            return deflt;
    }
}


export {makeNumber, makeString, makeBool};
