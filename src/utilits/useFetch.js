import { useEffect, useState } from "react";

export default function useFetch(url){

    const [data, setData] = useState([])
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState(null)


    async function FetchData(url){
        try{
            setError(null)
            setLoading(true)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error (`HTTP error: ${response.status}`)
            }
            const responseData  = await response.json()
            setData(responseData )
        } catch(e){
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(()=>{
        FetchData(url)
    }, [url])


    return [data, loading, error]

}