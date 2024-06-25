import {useCallback, useEffect} from "react";
import {debounce} from "lodash";

const useDebouncedResizeObserver = (callback: (entries: any) => any, options: any) => {
    const debouncedCallback = useCallback(
        debounce((entries: any) => callback(entries), 100),
        [callback]
    );

    useEffect(() => {
        const observer = new ResizeObserver(debouncedCallback);
        observer.observe(document.body, options);
        return () => observer.disconnect();
    }, [debouncedCallback, options]);
}

export default useDebouncedResizeObserver;