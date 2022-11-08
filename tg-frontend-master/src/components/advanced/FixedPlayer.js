import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom';
import NavBarTwo from '../navbar/NavBarTwo';
import ContinueFooter from '../footer/ContinueFooter'
import PlayerTwo from './PlayerTwo';
import { toast } from 'react-toastify';


const FixedPlayer = (props)=>{
   
    let type_name = [
        ['Wicket Keeper','Batsman','Alrounder','Bowler'],
        ['Goal Keeper','Defender','Mid Fielder','Forward'],
        ['Point Guard','Shooting Gaurd','Small Forward','Power Forward','Center'],
        ['Defender','Alrounder','Raider']
    ]
    let limit = [8,8,5,4]
    let navigate = useNavigate()
    let [localFixed,setLocalFixed] = useState([])
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let vp_list =[]
        for(let i=0;i<props.fixedPlayers.length;i++)
        {
            for(let j=0;j<props.fixedPlayers[i].length;j++)
                vp_list.push(props.fixedPlayers[i][j])
        }
        setLocalFixed(vp_list)
    },[])
    let handlePlayer = (r,pi)=>{
        let result = props.fixedPlayers[r].indexOf(pi)
        let newList = [...props.fixedPlayers]
        if(result===-1)
        {
            newList[r].push(pi)
            props.setFixedPlayers(newList)
            let tempList = [...localFixed]
            tempList.push(pi)
            setLocalFixed(tempList)
        }
        else 
        {
            newList[r].splice(result,1)
            props.setFixedPlayers(newList)
            let newLocalList = localFixed.filter( index => index !== pi )
            setLocalFixed(newLocalList)
        }
      
    }

    let get_sub_title = ()=>{
        let size = null 
        if(props.sportIndex===2)
            size = 5 
        else if(props.sportIndex===3)
            size = 3 
        else 
            size = 4 
        let temp_role =[]
        let t_name=type_name[props.sportIndex]
        for(let i=0;i<size;i++)
            temp_role.push(i)
        let output = temp_role.map(val =>{
            return (
            <React.Fragment>
            <div className='section-info'>
                <span className='section-primary'>{t_name[val]}</span>
            </div>
            {props.selectedPlayers[val].map((player)=> <PlayerTwo player={player} handlePlayer={handlePlayer} activeList={localFixed}   /> )}
            </React.Fragment>
            )
        })
        return output
    }   

    let handleContinue = ()=>{
        let cnt = 0;
        for(let i=0;i<props.fixedPlayers.length;i++)
           cnt = cnt + props.fixedPlayers[i].length
        if(limit[props.sportIndex]<cnt)
        {
            toast.error(`You cannot select more than ${limit[props.sportIndex]} players`,{
                position:"top-center"
            })
            return 
        }
         navigate('/captain')
    }


    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} /> 
            <div className='continue-container'>
            <div className="section-info" style={{borderBottom:"4px solid red",lineHeight:"1.2"}}>
                <span className='section-primary'>Fixed Player Section</span><br></br>
                <span className='section-secondary'>Selected Player will be included in every created team</span><br></br>
                <span className='section-secondary'>you can selected any where between <span style={{color:'black',fontWeight:500}}>0 - {limit[props.sportIndex]} players</span></span>
            </div>
            {get_sub_title()}
            </div>
            <ContinueFooter handleContinue ={handleContinue}  />
        </React.Fragment>
    );
}

export default FixedPlayer;