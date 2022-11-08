import React,{useEffect, useState} from 'react' 
import { useNavigate } from 'react-router-dom';
import NavBarTwo from '../navbar/NavBarTwo';
import ContinueFooter from '../footer/ContinueFooter';
import PlayerTwo from './PlayerTwo';
import { toast } from 'react-toastify';


const VicecaptainPlayer = (props)=>{
    let type_name = [
        ['Wicket Keeper','Batsman','Alrounder','Bowler'],
        ['Goal Keeper','Defender','Mid Fielder','Forward'],
        ['Point Guard','Shooting Gaurd','Small Forward','Power Forward','Center'],
        ['Defender','Alrounder','Raider']
    ]
    let navigate = useNavigate()
    let [localVicecaptain,setLocalVicecaptain] = useState([])
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let vp_list =[]
        for(let i=0;i<props.vicecaptainPlayers.length;i++)
        {
            for(let j=0;j<props.vicecaptainPlayers[i].length;j++)
                vp_list.push(props.vicecaptainPlayers[i][j])
        }
        setLocalVicecaptain(vp_list)

    },[])
    let handlePlayer = (r,pi)=>{
        let result = props.vicecaptainPlayers[r].indexOf(pi)
        let newList = [...props.vicecaptainPlayers]
        if(result===-1)
        {
           // console.log(pi)
            newList[r].push(pi)
            props.setVicecaptainPlayers(newList)
            let tempList = [...localVicecaptain]
            tempList.push(pi)
            setLocalVicecaptain(tempList)
        }
        else 
        {
            newList[r].splice(result,1)
            props.setVicecaptainPlayers(newList)
            let newLocalList = localVicecaptain.filter( index => index !== pi )
            setLocalVicecaptain(newLocalList)
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
        let t_name= type_name[props.sportIndex]
      
        for(let i=0;i<size;i++)
            temp_role.push(i)
        let output = temp_role.map(val =>{
            return (
            <React.Fragment>
            <div className='section-info'>
                <span className='section-primary'>{t_name[val]}</span>
            </div>
            {props.selectedPlayers[val].map((player)=> <PlayerTwo player={player} handlePlayer={handlePlayer} activeList={localVicecaptain}   /> )}
            </React.Fragment>
            )
        })
        return output
    }   
    
    let handleContinue = ()=>{
        let cnt =0 
        for(let i=0;i<props.vicecaptainPlayers.length;i++)
            cnt = cnt + props.vicecaptainPlayers[i].length 
        if(cnt < 2 )
        {
            toast.error('Select 2 or More for vicecaptain',{
                position:"top-center"
            });
            return 
        }
        navigate('/partision') 
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} /> 
            <div className='continue-container'>
            <div className="section-info" style={{borderBottom:"4px solid violet",lineHeight:"1.2"}}>
                <span className='section-primary'>Vice Captain Player Section</span> <br></br>
                <span className='section-secondary'>Selected Players will be considered for vice-captain</span> <br></br>
                <span className='section-secondary'>you can selected <span style={{color:'black',fontWeight:500}}>2 or More players</span></span>
            </div>
            {get_sub_title()}
            </div>
            <ContinueFooter handleContinue ={handleContinue}  />
        </React.Fragment>
    );
}



export default VicecaptainPlayer;