'use client'

import { useEffect, useState } from "react";

function Test(){
    const [data, setData] = useState<{message: string} | null>(null);

    useEffect(() => {
        const hello = fetch('http://localhost:8000/api/hello', {
            method: 'GET',
            headers: {
                'X-CSRF-Token': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json()).then((res) => setData(res)).catch((err) => console.error(err));
    },[])

    return(
        <>
            <h1>{data ? data.message : 'Loading'}</h1>
        </>
    );
}

export default Test;