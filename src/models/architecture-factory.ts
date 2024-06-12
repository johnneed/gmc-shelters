import { makeNumber, makeString } from "./model-helpers";

type Architecture = {
  id?: number;
  name?: string;
  description?: string;
}

const architectureFactory = (architecture?: Architecture | null): Architecture => {

  if (!architecture) {
    return architectureFactory({})
  }
  return {
    id: makeNumber(architecture.id),
    name: makeString(architecture.name),
    description: makeString(architecture.description),
  }
}


export default architectureFactory;
export { Architecture };
