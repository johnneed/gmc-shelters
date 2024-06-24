import {makeNumber, makeString} from "./factory-helpers";

const categoryFactory = (category?: any | null): Category => {

    if (!category) {
        return categoryFactory({})
    }
    return {
        id: makeNumber(category.id),
        name: makeString(category.name || category.category_name),
        description: makeString(category.description),
    }
}


export default categoryFactory;

