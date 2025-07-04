import {makeNumber, makeString, makeBool} from "./factory-helpers";
import photoFactory from "./photo-factory";
import akaFactory from "./aka-factory";


const shelterFactory = (shelter?: any): Shelter => {

    if (!shelter) {
        return shelterFactory({})
    }
    return {
        id: makeNumber(shelter.id),
        name: makeString(shelter.name),
        startYear: makeNumber(shelter.startYear || shelter.start_year),
        endYear: makeNumber(shelter.endYear || shelter.end_year),
        description: makeString(shelter.description),
        slug: makeString(shelter.slug),
        longitude: makeNumber(shelter.longitude),
        latitude: makeNumber(shelter.latitude),
        altitude: makeNumber(shelter.altitude),
        defaultPhotoId: makeNumber(shelter.default_photo_id || shelter.defaultPhotoId),
        isGMC: makeBool(shelter.isGMC || shelter.is_gmc),
        architecture: makeString(shelter.architecture),
        category: makeString(shelter.category),
        builtBy: makeString(shelter.builtBy || shelter.built_by),
        notes: makeString(shelter.notes),
        photos: Array.isArray(shelter.photos) ? (shelter.photos.map((p: any) => photoFactory(p))) : [],
        akas: Array.isArray(shelter.akas) ? (shelter.akas.map((a: any) => akaFactory(a))) : [],
        isExtant: makeBool(shelter.isExtant || shelter.is_extant),
        created: makeString(shelter.created),
        updated: makeString(shelter.updated),
    }
}


export default shelterFactory;
