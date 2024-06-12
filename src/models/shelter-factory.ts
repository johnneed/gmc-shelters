import {makeNumber, makeString, makeBool} from "./model-helpers";
import photoFactory, {Photo} from './photo-factory';
import akaFactory, {AKA} from "./aka-factory";
type Shelter = {
  id?: number;
  name?: string;
  startYear?: number;
  endYear?: number;
  description?: string;
  slug?: string;
  longitude?: number;
  latitude?: number;
  altitude?: number;
  defaultPhotoId?: number;
  isGMC?: boolean;
  architecture?: string;
  builtBy?: string;
  notes?: string;
  photos?: Photo[]
  aka?: AKA[]
}

const shelterFactory = (shelter?: Shelter | null): Shelter => {

  if (!shelter) {
    return shelterFactory({})
  }
  return {
    id: makeNumber(shelter.id),
    name: makeString(shelter.name),
    startYear: makeNumber(shelter.startYear),
    endYear: makeNumber(shelter.endYear),
    description: makeString(shelter.description),
    slug: makeString(shelter.slug),
    longitude: makeNumber(shelter.latitude),
    latitude: makeNumber(shelter.latitude),
    altitude: makeNumber(shelter.altitude),
    defaultPhotoId: makeNumber(shelter.defaultPhotoId),
    isGMC: makeBool(shelter.isGMC),
    architecture: makeString(shelter.architecture),
    builtBy: makeString(shelter.builtBy),
    notes: makeString(shelter.notes),
    photos: Array.isArray(shelter.photos) ? (shelter.photos.map(p => photoFactory(p))) : [],
    aka:  Array.isArray(shelter.aka) ? (shelter.aka.map(a => akaFactory(a))) : [],
  }
}


export default shelterFactory;
export { Shelter };
