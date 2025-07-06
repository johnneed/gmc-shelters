const makeNumber = (num: unknown, deflt?: number): number | undefined => {
    const myNumber = Number(num);
    return (isNaN(myNumber)) ? deflt : myNumber;
}

const makeString = (str: unknown, deflt?: string): string | undefined => {
    const strType = typeof str;
    if (strType === "undefined" || strType === "object" || str === null) {
        return deflt;
    }
    return String(str);
}

const makeBool = (bool: unknown, defaultValue = false): boolean | undefined => {
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
            return defaultValue;

        case "number":
            switch (bool) {
                case 1:
                    return true;
                case 0:
                    return false;
                default:
                    return defaultValue;
            }
        case "boolean":
            return bool;
        default:
            return defaultValue;
    }
}


export {makeNumber, makeString, makeBool};
