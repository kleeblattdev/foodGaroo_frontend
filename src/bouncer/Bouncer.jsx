import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Bouncer = () => {
    const [allowed, setAllowed] = useState(false)
    const [verified,setVerified] = useState(false)
    const navigate = useNavigate()



	const url = import.meta.env.VITE_BACKEND + import.meta.env.VITE_API_VERSION;


    useEffect(() => {
        const verify = async () => {
            const response = await fetch(url+"/verify",{
                credentials: 'include',
            })
            setVerified(true)
            if(!response.ok) {
                setAllowed(false)
                navigate('/')
            }else {
                setAllowed(true)
            }
        }
        verify()
    },[])

    if(!verified) return (<h2>loading</h2>)
    else {
        return ( <Outlet/>)
    }
}
 
export default Bouncer;