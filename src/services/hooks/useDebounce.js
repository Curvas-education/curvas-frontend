import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
    const [search, setSearch] = useState(value);

    useEffect(() => {
        let timer = setTimeout(() => {
            setSearch(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return search;
};

export default useDebounce;