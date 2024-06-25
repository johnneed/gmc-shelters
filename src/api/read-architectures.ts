import architectureFactory from "../factories/architecture-factory";


const readArchitectures = async () => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await window.api.invoke("READ_ARCHITECTURES");
        return response.map((architecture: unknown) => architectureFactory(architecture));
    } catch (err) {
        console.error(err);
        throw 400;
    }
}

export default readArchitectures;