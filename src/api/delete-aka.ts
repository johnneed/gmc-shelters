const deleteAKA =  async (aka: AKA) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("DELETE_AKA", aka);
        console.log("AKA DELETED: ", JSON.stringify(response, null, 2));
        return response;

    } catch (err) {
        console.error(err);
        throw 400;
    }
}
export default deleteAKA;