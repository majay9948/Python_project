import React,{useState,useEffect} from 'react'
import NavBarTwo from '../components/navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GenericFooter from '../components/footer/GenericFooter';
import { toast } from 'react-toastify';
import axios from 'axios'


const BookTeams = (props)=>{
    let navigate = useNavigate()
    let {id} = useParams()
    let [teamNumber,setTeamNumber] = useState(null)

    let handleChange = (e)=>{
        setTeamNumber(e.target.value)
     }

    let handleClick = ()=>{
        if(teamNumber === null || teamNumber === '')
        {
            toast.error('Field cannot be empty!',{position:'top-center'})
            return    
        }
        if(parseInt(teamNumber) < 3 || parseInt(teamNumber)>12)
        {
            toast.error('Number of teams should in-between 3-12 teams!',{position:'top-center'})
            return;
        }
        axios.post(`${props.backend}/api/primebooking/book`,{
            matchId: id, 
            phoneNumber: props.phoneNumber, 
            bookedTeams: teamNumber
        })
        .then((response)=>{
            if(response.status === 200)
            {
                toast.success('Prime Teams Booked Successfully!',{position:'top-center'})
                navigate('/')
                return 
            }
            else 
            {
                toast.success(response.data.messsage,{position:'top-center'})
                return
            }
        })
    }
    return (
        <React.Fragment>
        <NavBarTwo  navigate={navigate} />
        <div className='mini-container'>
           <div className='team-number-mini'>
                <img src='/booking.jpg' style={{width:'70%'}} />
                <h3 className='team-number-title'>Book Your Prime Teams</h3>
                <p className='team-number-sub'>you can book between between <b>3 - 12</b> Teams</p>
                <div className='team-input'>
                    <input onChange={handleChange} type="number" name="teamNumber" placeholder='No.of Teams' value={teamNumber} />
                    <button onClick={()=> handleClick()} className='vp-btn btn btn-success team-btn'>Book Teams</button>
                </div>
           </div>
        </div>
        <GenericFooter />
    </React.Fragment>
    );
}


export default BookTeams;
