import { useState, useEffect } from "react";
import categoryFactory from "../factories/category-factory";
import {readCategories} from "../api";

interface categoryResults {
    categories: Category[] | null;
    isCategoriesLoading: boolean;
    categoriesError: Error | null;
}

function useCategories(): categoryResults {
    const [data, setData] = useState<Category[] | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const readData = () => {
            setIsLoading(true);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                readCategories.then(function (res: unknown[]) {
                    const categories = res.map((category: unknown) => categoryFactory(category));
                    setData(categories);
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

    return { categories: data,   isCategoriesLoading:  isLoading,   categoriesError: error };
}

export default useCategories;