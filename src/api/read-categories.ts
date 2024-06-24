import categoryFactory from "../factories/category-factory";


const readCategories = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("READ_CATEGORIES");
        return response.map((category: unknown) => categoryFactory(category));
    } catch (err) {
        console.error(err);
        throw 400;
    }
}

export default readCategories;