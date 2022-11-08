import React,{useEffect,useState} from 'react' 
import { toast } from 'react-toastify'
import PropFooter from '../footer/PropFooter'
import PlayerArena from './PlayerArena'



const TeamArena = (props)=>{
  
    let type_name = [
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]

    let full_name = [
        ['Wicket Keeper','Batsman','Alrounder','Bowler'],
        ['Goal Keeper','Defender','Mid Fielder','Forward'],
        ['Point Guard','Shooting Gaurd','Small Forward','Power Forward','Center'],
        ['Defender','Alrounder','Raider']
    ]
    let roleLimit = [
        [1,3,1,3],
        [1,3,3,1],
        [1,1,1,1,1],
        [2,1,2]
    ]
    let partisionLimit = [4,4,3,3]
    let sizeLimit = [11,11,8,7]
    let [typeCount,setTypeCount] = useState([])
    let [teamPlayer,setTeamPlayer] = useState([])
    let [captain,setCaptain] = useState(-1)
    let [vicecaptain,setVicecaptain] = useState(-1)
    let [totalCredit,setTotalCredit] = useState(0)
    let [leftTeam,setLeftTeam] = useState(0)
    let [rightTeam,setRightTeam] = useState(0)
    let get_player_count = ()=>{
        if(props.sportIndex === 2)
            return [0,0,0,0,0]
        else if(props.sportIndex === 3)
            return [0,0,0]
        else 
            return [0,0,0,0]
    }
    let get_player_list = ()=>{
        if(props.sportIndex === 2)
            return [[],[],[],[],[]]
        else if(props.sportIndex === 3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }
    useEffect(()=>{
       let countList = get_player_count()
       let pList = get_player_list()
       setTeamPlayer(pList)
       setTypeCount(countList)
    },[])

    let getTotal = (data_list)=>{
        let sum=0;
        for(let i=0;i<data_list.length;i++)
            sum = sum + data_list[i] 
        return sum;
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
        let t_name=full_name[props.sportIndex]
        for(let i=0;i<size;i++)
            temp_role.push(i)
        //console.log(temp_role)
        let output = temp_role.map(val =>{
            return (
            <React.Fragment>
            <div className='section-info'>
                <span className='section-primary'>{t_name[val]}</span>
            </div>
            {props.playerList[val].map((player)=> <PlayerArena 
                                                            player={player} 
                                                            teamPlayer={teamPlayer} 
                                                            typeCount = {typeCount}
                                                            setTypeCount = {setTypeCount}
                                                            setTeamPlayer={setTeamPlayer} 
                                                            setCaptain={setCaptain} 
                                                            setVicecaptain={setVicecaptain}  
                                                            captain={captain} 
                                                            vicecaptain={vicecaptain}  
                                                            totalCredit={totalCredit}
                                                            setTotalCredit = {setTotalCredit}
                                                            sportIndex={props.sportIndex}
                                                            leftTeam = {leftTeam}
                                                            rightTeam = {rightTeam}
                                                            setLeftTeam = {setLeftTeam}
                                                            setRightTeam = {setRightTeam}
                                                            /> )}
                                                           
            </React.Fragment>
            )
        })
        return output
    }   
    let handleContinue = ()=>{
        if(totalCredit>100)
        {
            toast.error('Credits cannot be more than 100!',{position:'top-center'})
            return 
        }
        let sum=0;
        for(let i=0;i<typeCount.length;i++)
        {
            sum = sum +typeCount[i]
            if(typeCount[i]<roleLimit[props.sportIndex][i])
            {
                toast.error(`${type_name[props.sportIndex][i]} should be atleast ${roleLimit[props.sportIndex][i]}!`,{position:'top-center'})
                return
            }
        }

        if(leftTeam<partisionLimit[props.sportIndex] || rightTeam<partisionLimit[props.sportIndex])
        {
            toast.error('Each Side should have minimum 4 players!',{position:'top-center'})
            return;
        }

        if(sum !== sizeLimit[props.sportIndex])
        {
            toast.error(`Team should have exactly ${sizeLimit[props.sportIndex]} players!`,{position:'top-center'})
            return
        }
        if(captain === -1 || vicecaptain=== -1 || (captain === vicecaptain))
        {
            toast.error('Select captain and vicecaptain properly!',{position:'top-center'})
            return; 
        }


        // all validations are done now 
        // extracting data of the teams
        let extract_list = get_player_list()
        for(let i=0;i<teamPlayer.length;i++)
        {
            for(let j=0;j<teamPlayer[i].length;j++)
            {
                let p = teamPlayer[i][j];
                for(let k=0;k<props.playerList[i].length;k++)
                {
                    if(p === props.playerList[i][k].player_index)
                    {
                        extract_list[i].push({player_index:p,credits:props.playerList[i][k].credits})
                    }
                }
            }
        }

        let new_vp_list = [...props.localHumanTeams]
        new_vp_list.push({
            team_number:props.teamNumber,
            captain: captain,
            vicecaptain: vicecaptain,
            credits: totalCredit,
            team:extract_list
        })
        props.setTeamNumber(props.teamNumber+1)
        props.setLocalHumanTeams(new_vp_list)
        toast.success('Team Added Successfully!',{position:'top-center'})
        props.setTeamArena(false)
        return;
    }

    return (
        <React.Fragment>
            <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0,backgroundColor:'white'}}>
               
                {type_name[props.sportIndex].map((type,index)=>
                    <div onClick={()=>{}} className='sport-icon'>
                    <h6 >{type}</h6>
                    <h4 style={{color:'black'}}>{typeCount[index]}</h4>
                </div>)
                }
                <div onClick={()=>{}} className='sport-icon'>
                    <h6 style={{color:'blue'}} >Total</h6>
                    <h4 style={{color:'black'}}>{getTotal(typeCount)}</h4>
                </div>
                <div onClick={()=>{}} className='sport-icon'>
                    <h6 style={{color:'green'}}>Credit</h6>
                    <h4 style={{color:'black'}}>{totalCredit}</h4>
                </div>
            </nav> 
            <div className="arena-container">
                {get_sub_title()}
            </div>
            <PropFooter label="Add Team" handleContinue={handleContinue} />
        </React.Fragment>
    );
}

export default TeamArena;