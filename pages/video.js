import React,{useEffect} from 'react'

export default function Video() {
    useEffect(() => {
        fetch('/api/videos').then(res=>res.json()).then(res=>{
            console.log(res);
        })
    }, [])
    return (
        <div>
            111
        </div>
    )
}
