import React,{useEffect,useState} from 'react' 
import NavBarTwo from '../components/navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom';
import Team from '../components/display/Team';

const DisplayPrimeTeam = (props)=>{
    let navigate = useNavigate()
    let [finalTeamData,setFinalTeamData] = useState([])

    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        if(props.primeFetchedData !== null)
        {
            let tempTeamData = props.primeFetchedData.teamData 
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
                    team_number: i+1,
                    captain: temp_team.captain,
                    final_team:final_team,
                    vicecaptain : temp_team.vicecaptain,
                    credits: temp_team.credits
                })
            }
            setFinalTeamData(final_team_list)
        }
    },[props.primeFetchedData])
    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <div className='container' style={{maxWidth:1200,padding:8}}>
                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Your Prime Teams | Teams = {props.primeFetchedData.numberOfTeams}</h4>
                    </div>
                    <div className="display-team">
                        { finalTeamData.map((team)=> <Team teamData = {team} sportIndex={props.sportIndex} type={0} />)}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DisplayPrimeTeam;