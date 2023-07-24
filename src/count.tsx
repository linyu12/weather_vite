import {useState} from 'react';

export function useCount() {
    const [count, setCount] = useState<number>(0);

    const upCount = () => {
        setCount((prevCount) => prevCount + 1);
    }

    return{count, upCount};
}