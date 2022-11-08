import React,{useEffect} from 'react'  
import {useNavigate} from 'react-router-dom'


const CollabComponenet = (props)=>{
    let navigate = useNavigate();
    useEffect(()=>{

            let stuff = localStorage.getItem('tg_stuff')
            if(stuff !== null && stuff !== 'kvp' && stuff.toString().length=== 10)
            {
                props.setAdminPhoneNumber(stuff)
            }
            else 
            {
                localStorage.setItem('tg_stuff',props.mobileNumber) 
                props.setAdminPhoneNumber(props.mobileNumber+'')
            }
        navigate('/')

    },[])
    return (
        <React.Fragment>
        </React.Fragment>
    );
}

export default CollabComponenet;