import React,{useState,useEffect} from 'react' 
import NavBarTwo from '../navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../footer/GenericFooter';
import { generateTeams,get_attempt,store_data } from '../Generator/TeamGenerator';
import { toast } from 'react-toastify';
import { get_credit_range } from '../Generator/HelperFunctions';

// 11 teams for GL, 4 teams for SL and 1 team for H2h 
const GrandLeague = (props)=>{
    let navigate = useNavigate()
    let [teamNumber,setTeamNumber] = useState(null)
    let combinations = [
        [
                [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
            [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
            [3,3,2,3],[3,4,1,3],[3,3,1,4],
            [4,3,1,3]
        ],
        [ 
            [1,4,5,1],[1,5,4,1],[1,5,3,2],[1,4,4,2],[1,3,4,3],[1,4,3,3],[1,3,5,2]
        ],
        [
            [1,1,1,1,4],[1,1,1,2,3],[1,1,1,3,2],[1,1,1,4,1],[1,1,2,1,3],[1,1,2,2,2],[1,1,2,3,1],[1,1,3,2,1],[1,1,4,1,1],[1,2,1,1,3],[1,2,1,2,2],[1,2,2,1,2],[1,2,2,2,1],[1,2,3,1,1],[1,3,1,1,2],[1,3,1,2,1],[1,3,2,1,1],[1,4,1,1,1],
            [2,1,1,1,2],[2,1,1,1,3],[2,1,1,2,2],[2,1,1,3,1],[2,1,2,1,2],[2,1,2,2,1],[2,1,3,1,1],[2,2,1,1,2],[2,2,1,2,1],[2,2,2,1,1],[2,3,1,1,1],
            [3,1,1,1,2],[3,1,1,2,1],[3,1,2,1,1],[3,2,1,1,1],
            [4,1,1,1,1]
         ],
        [
            [2,2,3],[3,2,2],[3,1,3],[4,1,2],[4,2,1]
        ]
    ]
    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    let strategies = [
        [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [3,5],
        [4,4],
        [5,3]
    ],
    [
        [2,5],
        [3,4],
        [4,3],
        [5,2]
    ]
    ]
  
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
        if(tn === null || tn<=0 || tn>3000 || tn==='')
        {
            toast.error('Enter Valid Number of Teams',{
                position:"top-center"
            })
            return  
        }

        //captain stuff 
        let p_count = 0;
        let single_count = 0;
        let tempCaptain = get_player_list()
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                let p = props.selectedPlayers[i][j]
                if(p.credits>=9)
                {
                    tempCaptain[i].push(p.player_index)
                }
                p_count++;
                if(p.credits === 1)
                {
                    single_count++;
                }
            }
        }
        //vice captain stuff 
        let tempVicecaptain = get_player_list()
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                let p = props.selectedPlayers[i][j]
                if(p.credits>=8.5)
                {
                    tempVicecaptain[i].push(p.player_index)
                }
            }
        }

        if(p_count === single_count)
        {
            tempCaptain = get_player_list()
            tempVicecaptain = get_player_list()
            let tempAllList = get_player_list()
            let accurateCount = 0;
            for(let i=0;i<props.selectedPlayers.length;i++)
            {
                for(let j=0;j<props.selectedPlayers[i].length;j++)
                {
                    let p = props.selectedPlayers[i][j]
                    if(parseFloat(p.selected_by)>=50)
                    {
                        tempCaptain[i].push(p.player_index)
                        accurateCount++;
                    }
                    if(parseFloat(p.selected_by)>=25)
                    {
                        tempVicecaptain[i].push(p.player_index)
                    }
                    tempAllList[i].push(p.player_index)
                }
            }
            if(accurateCount === 0)
            {
                tempCaptain = tempAllList;
                tempVicecaptain = tempAllList;
            }
        }


        let credit_stuff = get_credit_range(props.selectedPlayers,2,props.sportIndex)
        let temp_right = 100;
        let temp_left = 95;

        if(props.sportIndex === 0 || props.sportIndex === 1)
        {
            temp_left = credit_stuff.left; 
            temp_right = credit_stuff.right;
        }

        let tempFixed = get_player_list()
        // 0 -> smart, 1 -> grand league , 2 -> advanced , 3 -> auto 
       let teams_list =  generateTeams(props.selectedPlayers,tempFixed,tempCaptain,tempVicecaptain,strategies[props.sportIndex],temp_left,temp_right,combinations[props.sportIndex],tn,null)
        if(teams_list!=null)
        {
            let attempt = get_attempt(props.matchId,props.selectedPlayers,'normal',tn,1,teams_list,props.sportIndex,null,temp_left,temp_right)
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
                    <p className='team-number-sub'>you can generate between <b>1 - 3000</b> Teams</p>
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

export default GrandLeague;