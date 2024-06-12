import {makeNumber, makeString, makeBool} from "./model-helpers";

type Photo = {
  id?: number;
  photographer?: string;
  dateTaken?: string;
  caption?: string;
  fileName?: string;
  notes?: string;
}

const photoFactory = (photo?: Photo | null): Photo => {

  if (!photo) {
    return photoFactory({})
  }
  return {
    id: makeNumber(photo.id),
    photographer: makeString(photo.photographer),
    dateTaken: makeString(photo.dateTaken),
    caption: makeString(photo.caption),
    fileName: makeString(photo.fileName),
    notes: makeString(photo.notes),
  }
}


export default photoFactory;
export { Photo };
