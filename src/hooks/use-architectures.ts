import { useState, useEffect } from "react";
import architectureFactory from "../factories/architecture-factory";
import {readArchitectures} from "../api";
interface architectureResults {
    architectures: Architecture[] | null;
    isArchitecturesLoading: boolean;
    architecturesError: Error | null;
}

function useArchitectures(): architectureResults {
    const [data, setData] = useState<Architecture[] | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const readData = async () => {
            setIsLoading(true);

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                readArchitectures().then(function (res: unknown[]) {
                    const architectures = res.map((architecture: unknown) => architectureFactory(architecture));
                    setData(architectures);
                    setError(null);
                    setIsLoading(false);
                })
                    .catch(function (err: Error) {
                        // console.error(err); // will print "This didn't work!" to the browser console.
                        setError(err);
                        setData(null);
                        setIsLoading(false);
                    });
        };

        readData();
    }, []);

    return {architectures: data, isArchitecturesLoading: isLoading, architecturesError: error };
}

export default useArchitectures;