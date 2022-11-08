import React,{useEffect,useState} from 'react'  
import {useNavigate} from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import ContinueFooter from '../footer/ContinueFooter'
import { toast } from 'react-toastify';
import PlayerChange from './PlayerChange';


const ChangeData = (props)=>{
    let navigate = useNavigate()
    let [leftTeam,setLeftTeam] = useState(null)
    let [rightTeam,setRightTeam] = useState(null)
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let team_left = []
        let team_right = []
     //   console.log(props.playerList)
        for(let i=0;i<props.playerList.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                let p = props.playerList[i][j]
                if(p.team_index===0)
                    team_left.push({...p})
                else 
                    team_right.push({...p})
            }
        }
        setLeftTeam(team_left)
        setRightTeam(team_right)

    },[])

    let get_empty_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    let handlePlayer = (pi,ti,credits,role,selection_percentage) =>{
        if(ti===0)
        {
            let temp = [...leftTeam]
            temp = temp.map(player => {
                if(player.player_index===pi)
                {
                    player.credits= Number(credits)
                    player.role = Number(role)
                    player.selected_by = parseFloat(selection_percentage)
                }
                return player 
            })
            setLeftTeam(temp)
        }
        else 
        {
            let temp = [...rightTeam]
             temp =   temp.map(player => {
                if(player.player_index===pi)
                {
                    player.credits= Number(credits)
                    player.role = Number(role)
                    player.selected_by = parseFloat(selection_percentage)
                }
                
                return player 
            })
            setRightTeam(temp)
        }
    }

    let handleContinue = ()=>{
        let player_credits = []
        let player_role = []
        let player_percentage = []
        for(let i=0;i<70;i++)
        {
            player_credits.push(0)
            player_role.push(0)
            player_percentage.push(0)
        }
        for(let i=0;i<leftTeam.length;i++)
        {
            let p = leftTeam[i] 
            if(p.credits === null || p.credits === '')
                player_credits[p.player_index] = 0
            else 
                player_credits[p.player_index] = Number(p.credits) 
            if(p.role === null || p.role === '')
                player_role[p.player_index] = 0
            else 
                player_role[p.player_index] = Number(p.role) 
            if(p.percentage === null || p.percentage === '')
                player_percentage[p.player_index] = 0
            else 
                player_percentage[p.player_index] = Number(p.selected_by) 
        }
        for(let i=0;i<rightTeam.length;i++)
        {
            let p = rightTeam[i] 
            if(p.credits === null || p.credits === '')
                player_credits[p.player_index] = 0
            else 
                player_credits[p.player_index] = Number(p.credits) 
            if(p.role === null || p.role === '')
                player_role[p.player_index] = 0
            else 
                player_role[p.player_index] = Number(p.role) 
            if(p.percentage === null || p.percentage === '')
                player_percentage[p.player_index] = 0
            else 
                player_percentage[p.player_index] = Number(p.selected_by)
        }
        // now the drama 
        let new_list = [...props.playerList]
        let final_list = get_empty_list()
        for(let i=0;i<new_list.length;i++)
        {
            for(let j=0;j<new_list[i].length;j++)
            {
                let p = new_list[i][j]
                p.credits = player_credits[p.player_index]
                p.role = player_role[p.player_index]
                p.selected_by = player_percentage[p.player_index]
                final_list[p.role].push(p)
            }
        }
        props.setPlayerList(final_list)
        //changing in the localStorage as well  
        let temp = JSON.parse(localStorage.getItem('team_data'))
        let m_data = null 
        let m_index = -1
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].id === props.matchId)
            {
                m_data = temp[i];
                m_index = i;
                break; 
            }
        }
      //  console.log(m_data)
        if(m_data!==null)
        {
            for(let i=0;i<final_list.length;i++)
            {
                for(let j=0;j<final_list[i].length;j++)
                {
                    let p = final_list[i][j]
                    if(p.team_index===0)
                    {
                        for(let k=0;k<m_data.data.left_team_players.length;k++)
                        {
                            if(m_data.data.left_team_players[k].player_index === p.player_index)
                            {
                                m_data.data.left_team_players[k].credits = p.credits 
                                m_data.data.left_team_players[k].role = p.role 
                                m_data.data.left_team_players[k].selected_by = p.selected_by
                                
                            }
                        }
                    }
                    else 
                    {
                        for(let k=0;k<m_data.data.right_team_players.length;k++)
                        {
                            if(m_data.data.right_team_players[k].player_index === p.player_index)
                            {
                                m_data.data.right_team_players[k].credits = p.credits 
                                m_data.data.right_team_players[k].role = p.role 
                                m_data.data.right_team_players[k].selected_by = p.selected_by
                            }
                        }
                    }
                }
            }
            temp[m_index] = m_data 
            //console.log(m_data)
            localStorage.setItem('team_data',JSON.stringify(temp))
        }
        
        toast.success('Players Data Updated Successfully!',{position:'top-center'})
        navigate(-1)
        return 
    }

    return (
        <div> 
      <NavBarTwo navigate={navigate} /> 
      <div className='continue-container'>
      <div className="section-info" style={{lineHeight:"1.2"}}>
          <span className='section-primary'>Change Player Data</span> <br></br>
          <span className='section-secondary'>If Any Miss match in the data change here</span>
      </div>
      <div className='section-info'>
        <div style={
            {
                display:"flex",
                justifyContent:"space-between",
                width:"100%"
            }
        }>
        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
        <span>percentage</span>
        <span>credit</span>
        <span>role &nbsp; &nbsp;</span>
        </div>
      </div>
      <div className='section-info'>
          <span className='section-primary'>Team - {props.leftName}</span>
      </div>
      {leftTeam && leftTeam.map((player)=> <PlayerChange player={player} handlePlayer={handlePlayer} index={0} sportIndex={props.sportIndex}   /> )}
      <div className='section-info'>
          <span className='section-primary'>Team - {props.rightName}</span>
      </div>
      {rightTeam && rightTeam.map((player)=> <PlayerChange player={player} handlePlayer={handlePlayer} index={1} sportIndex={props.sportIndex} /> )}
      </div>
      <ContinueFooter handleContinue ={()=>handleContinue()}  />
      </div>
    );
}

export default ChangeData;