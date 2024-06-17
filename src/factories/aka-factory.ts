import { makeNumber, makeString } from "./factory-helpers";

const akaFactory = (aka?: any): AKA => {

  if (!aka) {
    return akaFactory({})
  }
  return {
    id: makeNumber(aka.id),
    shelterId: makeNumber(aka.shelterId || aka.shelter_id),
    name: makeString(aka.name),
    notes: makeString(aka.notes),
  }
}


export default akaFactory;

