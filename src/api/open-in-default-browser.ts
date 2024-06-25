
const openInDefaultBrowser = async (url: string) => {
    try{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
   const response = await window.api.invoke("OPEN_IN_DEFAULT_BROWSER", url);
        return response;
    }
catch(err) {
        console.error(err);
        throw 400;
    }
}

export default openInDefaultBrowser;