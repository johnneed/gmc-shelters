/**
 * Creates a debounced function that delays invoking the provided async function until after
 * wait milliseconds have elapsed since the last time the debounced function was invoked.
 * @param myFunction The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns {Function} The new debounced function.
 */
export function debounce(myFunction: (...args: any[]) => any, wait = 500) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function(...args: any[]) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            console.log("Debounced function called with:", args);
            myFunction(...args);
        }, wait);
    };
}




// Example usage
// const asyncFunction = async (obj: object) => {
//     console.log('Async function called with:', obj);
// };

// const debouncedAsyncFunction = debounce(asyncFunction, 2000);

// Example call
// debouncedAsyncFunction({ key: 'value' });
