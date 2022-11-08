import React,{useState,useEffect} from 'react' 
import NavBarTwo from '../navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../footer/GenericFooter';
import { generateTeams,get_attempt,store_data } from '../Generator/TeamGenerator';
import { toast } from 'react-toastify';


// 11 teams for GL, 4 teams for SL and 1 team for H2h 
const AdvancedGeneration = (props)=>{
    let navigate = useNavigate()
    let [teamNumber,setTeamNumber] = useState(null)
  
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
    },[])

    let handleChange = (e)=>{
       setTeamNumber(e.target.value)
    }

    let handleClick = ()=>{
        let tn = Number(teamNumber)
        if(tn === null || tn<=0 || tn>2000 || tn==='')
        {
            toast.error('Enter Valid Number of Teams',{
                position:"top-center"
            })
            return  
        }
        let ss = props.selectionFlag === true ? props.selectionStrategy : null;
       let teams_list =  generateTeams(props.selectedPlayers,props.fixedPlayers,props.captainPlayers,props.vicecaptainPlayers,props.partisionStrategy,props.leftRange,props.rightRange,props.combination,tn,ss)
        if(teams_list!=null)
        {
            let attempt = get_attempt(props.matchId,props.selectedPlayers,'normal',tn,2,teams_list,props.sportIndex,ss,props.leftRange,props.rightRange)
            if(attempt!=null)
            {
                let result_obj = store_data(props.matchId,props.seriesName,props.leftName,props.leftImage,props.rightName,props.rightImage,props.playerList,attempt,props.sportIndex,props.matchTime)
                if(result_obj!=null){
                    toast.success('teams stored successfully!',{
                        position:'top-center'
                    })
                    navigate(`/display/${result_obj.matchId}/${result_obj.attempt_id}/9/9`)
                    return 
                }
            }
        }
        else{
            toast.error('Software Out of Combinations',{
                position:"top-center"
            })
            return  
        }
    }
    return (
        <React.Fragment>
            <NavBarTwo  navigate={navigate} />
            <div className='mini-container'>
               <div className='team-number'>
                    <h3 className='team-number-title'>Enter Number of Teams</h3>
                    <p className='team-number-sub'>you can generate between <b>1 - 2000</b> Teams</p>
                    <div className='team-input'>
                        <input onChange={handleChange} type="number" name="teamNumber" placeholder='No.of Teams' value={teamNumber} />
                        <button onClick={handleClick} className='btn btn-success team-btn'>Generate Teams</button>
                    </div>
               </div>
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default AdvancedGeneration;