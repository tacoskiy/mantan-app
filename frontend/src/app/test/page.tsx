'use client'

import { useEffect, useState } from "react";

function TestPage(){
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
        <section>
            <h1 className="text-primary">{data ? data.message : 'Loading...'}</h1>
        </section>
    );
}

export default TestPage;