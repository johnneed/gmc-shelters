import {makeNumber, makeString} from "./factory-helpers";


const photoFactory = (photo?: any): Photo => {

    if (!photo) {
        return photoFactory({})
    }
    return {
        id: makeNumber(photo.id),
        photographer: makeString(photo.photographer),
        dateTaken: makeString(photo.dateTaken || photo.date_taken ),
        caption: makeString(photo.caption),
        fileName: makeString(photo.fileName),
        notes: makeString(photo.notes),
    }
}


export default photoFactory;
