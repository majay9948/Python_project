import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'
import {MdOutlineDataSaverOff,MdOutlineAppRegistration,MdOutlineArrowRightAlt} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import Team from '../display/Team'
import { toast } from 'react-toastify'

const ShowExpertTeams = (props)=>{
    let {id} = useParams()
    let [expertActive,setExpertActive] = useState([1,0])
    let [finalTeamData,setFinalTeamData] = useState([])
    let [avatar,setAvatar] = useState('0')
    let [name,setName] = useState('expert')
    let handleExpertActive = (index)=>{
        let temp = [...expertActive]
        temp[0]=0;
        temp[1]=0;
        temp[index]=1;
        setExpertActive(temp)
    }     
    let navigate = useNavigate()
    let [fetchedData,setFetchedData] = useState(null)

    useEffect(()=>{
        console.log(id)
        console.log(props.fetchedExpertCards)
        if(Number(id)<props.fetchedExpertCards.length)
        {
            setFetchedData(props.fetchedExpertCards[id])
        }
        else 
        {
            toast.error('Failed to fetch data!',{position:'top-center'})
            return;
        }
        for(let i=0;i<props.expertUserList.length;i++)
        {
            if(props.expertUserList[i].phoneNumber.toString() === props.fetchedExpertCards[id].expertNumber.toString())
            {
                setName(props.expertUserList[i].name)
                setAvatar(props.expertUserList[i].avatar)
                break;
            }
        }
    },[])
    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }
    useEffect(()=>{
        if(fetchedData!==null)
        {
            let tempTeamData = fetchedData.teamData 
            let temp_list = []
            for(let i=0;i<70;i++)
                temp_list.push({})
            for(let i=0;i<props.playerList.length;i++)
            {
                for(let j=0;j<props.playerList[i].length;j++)
                {
                    let p = props.playerList[i][j]
                    temp_list[p.player_index] = {...p};
                }
            }
            
            let final_team_list = []
            for(let i=0;i<tempTeamData.length;i++)
            {
                let temp_team = tempTeamData[i]
                let final_team = get_player_list()
                for(let j=0;j<temp_team.team.length;j++)
                {
                    for(let k=0;k<temp_team.team[j].length;k++)
                    {
                        let jp = temp_list[temp_team.team[j][k].player_index]
                        jp.credits = temp_team.team[j][k].credits
                        final_team[j].push(jp)
                    }
                }
                final_team_list.push({
                    team_number: temp_team.team_number,
                    captain: temp_team.captain,
                    final_team:final_team,
                    vicecaptain : temp_team.vicecaptain,
                    credits: temp_team.credits
                })
            }
            setFinalTeamData(final_team_list)

        }
    },[fetchedData])
    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <nav class="d-flex justify-content-around top-nav  pt-1 top-fix-two" style={{backgroundColor:'#fff'}}>
                <div onClick={()=>handleExpertActive(0)} className={expertActive.indexOf(1) === 0  ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdOutlineDataSaverOff size={20} />
                    <span>&nbsp;Creation Data&nbsp;</span>
                </div>
                <div onClick={()=>handleExpertActive(1)} className={expertActive.indexOf(1) === 1 ? 'sport-icon sport-icon-active':'sport-icon'}>
                    <MdOutlineAppRegistration size={20} /> 
                    <span>Expert Teams</span>
                </div>
            </nav>
            
                {expertActive.indexOf(1) === 0 ?
                    <React.Fragment>
                        <div className='expert-team-container' style={{paddingLeft:5,paddingRight:5}}>
                            <div className="card mt-2 text-center">
                                <div className='card-header d-flex justify-content-between'>
                                    <h4>Team Creation Data</h4>
                                </div>
                                <div class="m-2">
                                    <table className='table '>
                                        <tbody>
                                        <tr>
                                        <td className='font-green-500'>Teams</td>
                                        {
                                          fetchedData &&  fetchedData.typeOfTeams === 'software' ? 
                                         <td className='text-center'><div className='badge badge-outline-success' style={{fontSize:14}}>Created With Software</div></td>
                                            :
                                            <td className='text-center'><div className='badge badge-outline-warning' style={{fontSize:14}}>Created By Human</div></td>
                                         }
                                    </tr>
                                    <tr>
                                        <td className='font-green-500'>Expert</td>
                                        <td>
                                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <img src={`/${avatar}.jpg`} className='team-image' />
                                            <span className='font-500'>&nbsp;&nbsp;{name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='font-green-500'>Teams Lineups</td>
                                        {fetchedData && fetchedData.tossData === 'Predicted11'?
                                        <td><div className='badge badge-outline-warning' style={{fontSize:12}}>Predicted11</div></td>
                                        :
                                        <td><div className='badge badge-outline-success vp-blink' style={{fontSize:12}}>Playing11 (lineups)</div></td>
                                    }
                                    </tr>
                                    <tr>
                                        <td className='font-green-500'>Best For</td>
                                        
                                        <td ><div className='badge badge-outline-success' style={{fontSize:12}}>{fetchedData !== null? `${fetchedData.teamUse}` : ''}</div></td>
                                        
                                    </tr>
                                    <tr>
                                    <td className='font-green-500'>Player Data </td>
                                    <td>
                                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <img src={`/${fetchedData !== null ? fetchedData.fantasyApp : ''}.jpg`} className='team-image' />
                                            <span className='font-500'>&nbsp;&nbsp;{fetchedData!==null? fetchedData.fantasyApp : ''}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='font-green-500'>No.of Teams</td>
                                    <td><div className='font-500' style={{fontSize:12}}><h4>{fetchedData!==null? fetchedData.numberOfTeams : ''}</h4></div></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        { fetchedData && fetchedData.typeOfTeams === 'software'? 
                                            <span className='font-blue-500'>
                                                All these teams are created by expert by using software. All the Best
                                            </span>
                                        :
                                            <span className='font-blue-500'>
                                                All these teams are Human made by expert, these are self teams not by software
                                            </span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                <td colSpan={2}>
                                        <button onClick={()=> handleExpertActive(1)} className='btn btn-success font-500'>See Teams <MdOutlineArrowRightAlt size={20} /></button>
                                </td>
                            </tr>
                                        </tbody>
                                    </table>
                                
                                </div>
                            </div>
                        </div>
                        <GenericFooter />
                    </React.Fragment>
                 : 
                 <div className='container' style={{maxWidth:1200,padding:8}}>

                 <div className="card mt-2 text-center">
                     <div className='card-header d-flex justify-content-between'>
                         <h4>Expert Teams</h4>
                     </div>
                     <div className="display-team">
                         { finalTeamData.map((team)=> <Team teamData = {team} sportIndex={props.sportIndex} type={0} />)}
                     </div>
                 </div>
             </div>
                }
        </React.Fragment>
    );
}

export default ShowExpertTeams;