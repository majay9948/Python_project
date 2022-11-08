import React,{useEffect,useState} from 'react'
import { useParams } from "react-router";
import {useNavigate} from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo';
import {MdIosShare , MdAddBox } from 'react-icons/md'
import { toast } from 'react-toastify';
import TeamArena from './TeamArena';
import ShareTeam from './ShareTeam';

const ShareHuman = (props)=>{
    let {match} = useParams()
   
    const [teamArena,setTeamArena] = useState(false)
    const [teamNumber,setTeamNumber] = useState(1)
    const [localHumanTeams,setLocalHumanTeams] = useState([])
    let [selectedTeams,setSelectedTeams] = useState([])
    let [finalTeamData,setFinalTeamData] = useState([])
    let navigate = useNavigate()

    let get_player_list = ()=>{
        if(props.sportIndex === 2)
            return [[],[],[],[],[]]
        else if(props.sportIndex === 3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    useEffect(()=>{ 
       // console.log(localHumanTeams)
        // do some stuff here 
        let final = []
        
        for(let i=0;i<localHumanTeams.length;i++)
        {
            let temp_final = get_player_list()
            let vp = localHumanTeams[i].team 
            for(let j=0;j<vp.length;j++)
            {
                for(let k=0;k<vp[j].length;k++)
                {
                    for(let p=0;p<props.playerList[j].length;p++)
                    {
                        let jp = props.playerList[j][p]
                        if(vp[j][k].player_index === jp.player_index)
                        {
                            temp_final[j].push({...jp})
                        }
                    }
                }
            }
            final.push({
                team_number: localHumanTeams[i].team_number,
                captain: localHumanTeams[i].captain,
                final_team:temp_final,
                vicecaptain : localHumanTeams[i].vicecaptain,
                credits: localHumanTeams[i].credits
            })
        }
        setFinalTeamData(final)

    },[localHumanTeams])


    let handleShareTeams = ()=>{
        if(selectedTeams.length>0)
        {
            let shareStuff = []
            for(let i=0;i<selectedTeams.length;i++)
            {
                let t_index = selectedTeams[i]
                shareStuff.push({
                    team_number: i+1,
                    captain: localHumanTeams[t_index].captain,
                    vicecaptain: localHumanTeams[t_index].vicecaptain,
                    credits:localHumanTeams[t_index].credits,
                    team:localHumanTeams[t_index].team
                })
            }
            props.setHumanTeams(shareStuff)
            navigate(`/storeexpertteams/${match}/1`)
            return;
        }
        else 
        {
            toast.error('Select Atleast One Teams!',{position:'top-center'})
            return;
        }
    }



    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} />
        {teamArena === true? 
            <TeamArena 
                sportIndex = {props.sportIndex}
                playerList = {props.playerList}
                teamNumber = {teamNumber}
                setTeamNumber = {setTeamNumber}
                localHumanTeams = {localHumanTeams}
                setLocalHumanTeams = {setLocalHumanTeams}
                teamArena = {teamArena}
                setTeamArena = {setTeamArena}
            /> 
            : 
        <div style={{backgroundColor:'white'}}>
        <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
            <div onClick={()=>{}} className='sport-icon'>
            <h2 style={{color:'black'}}>{localHumanTeams.length}</h2>
                <span>Teams Created</span>
            </div>
            <div onClick={()=>{}} className='sport-icon'>
                    <h2 style={{color:'black'}}>{selectedTeams.length}</h2>
                <span>Selected Teams</span>
            </div>
            <div onClick={()=> handleShareTeams()}  className={'sport-icon'}>
                <MdIosShare style={{color:'green'}} size={36} />
                <span>Share Teams</span>
            </div>
        </nav> 
        <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
            <button onClick={()=>{setTeamArena(true)}} className='btn btn-primary' style={{fontWeight:500}}>
               <div className="d-flex align-items-center">
               <MdAddBox size={24} />
               <span>&nbsp;Add Team</span>
               </div>
            </button>
        </nav>
        <div className='preview-container' style={{maxWidth:1200,padding:8}}>

                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Select Teams to share</h4>
                    </div>
                    <div className="display-team">

                        { finalTeamData.length>0?  finalTeamData.map((team,index)=> <ShareTeam teamData = {team} sportIndex={props.sportIndex} index={index} setSelectedTeams={setSelectedTeams} selectedTeams={selectedTeams} type={0} />)
                        :
                        <span className='mt-4 p-4'>
                        Please Add Teams to see Here
                        </span>
                    }
                    </div>
                </div>
            </div>

        
        </div>
        }
        </React.Fragment>
    );
}

export default ShareHuman;