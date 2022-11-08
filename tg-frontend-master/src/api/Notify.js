import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../components/footer/GenericFooter';
import NavBarFour from '../components/navbar/NavBarFour';
import axios from 'axios';
import NotifyCard from './NotifyCard';

const Notify = (props)=>{
    
    let [notifyData,setNotifyData] = useState(null)
   
    let navigate = useNavigate()
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return 
        }
        if(props.userRole !== 'admin')
        {
            navigate('/')
            return
        }
        let admin_id = localStorage.getItem('tg_id')
        axios.get(`${props.backend}/api/auth/notify/${admin_id}`)
        .then(response =>{
            if(response.status === 200)
            {
                let data = response.data.data 
                setNotifyData(data)
            }
        })

    },[])
   
    
    return (
        <React.Fragment>
        <NavBarFour  navigate={navigate}  />
            <div className='mini-container' style={{padding:5}}>
                <h2>Super User Notify List</h2>
                {
                    notifyData && notifyData.map(d => <NotifyCard data = {d} />)
                }
            </div>
            <GenericFooter /> 
        </React.Fragment>
    );
}

export default Notify; 