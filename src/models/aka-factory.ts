import { makeNumber, makeString } from "./model-helpers";

type AKA = {
  id?: number;
  shelterId?: number;
  name?: string;
  notes?: string;
}

const akaFactory = (aka?: AKA | null): AKA => {

  if (!aka) {
    return akaFactory({})
  }
  return {
    id: makeNumber(aka.id),
    shelterId: makeNumber(aka.shelterId),
    name: makeString(aka.name),
    notes: makeString(aka.notes),
  }
}


export default akaFactory;
export { AKA };
