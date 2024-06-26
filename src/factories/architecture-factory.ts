import { makeNumber, makeString } from "./factory-helpers";

const architectureFactory = (architecture?: any | null): Architecture => {

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

