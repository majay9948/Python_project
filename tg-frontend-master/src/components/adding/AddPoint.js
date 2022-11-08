import React,{useEffect,useState} from 'react'  
import {useNavigate} from 'react-router-dom' 
import {useParams} from 'react-router'
import NavBarTwo from '../navbar/NavBarTwo'
import ContinueFooter from '../footer/ContinueFooter'
import { toast } from 'react-toastify';
import PlayerPoint from './PlayerPoint'



let AddPoint = (props)=>{
    let navigate = useNavigate()
    let [leftName,setLeftName] = useState(null)
    let [rightName,setRightName] = useState(null)
    let [leftTeam,setLeftTeam] = useState(null)
    let [rightTeam,setRightTeam] = useState(null)
    let {id} = useParams()
    useEffect(()=>{
    if(props.reload === null)
    {
        navigate('/')
        return
    }
    let data = JSON.parse(localStorage.getItem('tgk_data'))
        let match_list = data[props.sportIndex] 
        let req_match = null 
        for(let i=0;i<match_list.length;i++)
        {
            if(match_list[i].id.toString() === id.toString())
            {
                req_match = match_list[i]
                break;
            }
        }
        if(req_match===null)
        {
            navigate('/')
            return 
        }
        setLeftName(req_match.left_name)
        setRightName(req_match.right_name)
        setLeftTeam(req_match.player_list[0])
        setRightTeam(req_match.player_list[1])


    },[])

    let handlePlayer = (pi,ti,points)=>{
        if(ti===0)
        {
            leftTeam.map(player => {
                if(player.player_index===pi)
                {
                    player.points= Number(points)
                }
                return player 
            })
            setLeftTeam(leftTeam)
        }
        else 
        {
            rightTeam.map(player => {
                if(player.player_index===pi)
                {
                    player.points= Number(points)
                }
                return player 
            })
            setRightTeam(rightTeam)
        }

    }

    let handleContinue = ()=>{
        for(let i=0;i<leftTeam.length;i++)
        {
            let p = leftTeam[i]
            if(p.points === null || p.points === '')
            {
                toast.error('Player Points Cannot be Empty!',{position:'top-center'})
                return 
            }
        }
        for(let i=0;i<rightTeam.length;i++)
        {
            let p = rightTeam[i]
            if(p.points === null)
            {
                toast.error('Player Points Cannot be Empty!',{position:'top-center'})
                return 
            }
        }
        let data = JSON.parse(localStorage.getItem('tgk_data'))
        let match_list = data[props.sportIndex] 
        match_list = match_list.map((match)=>{
            if(match.id.toString() === id.toString())
            {
                match.player_list[0] = leftTeam 
                match.player_list[1] = rightTeam 
                match.status = 2; 
            }

            return match
        })
        data[props.sportIndex] = match_list 
        localStorage.setItem('tgk_data',JSON.stringify(data))
        toast.success('Player points Updated Successfully!',{position:'top-center'})
        navigate(-1)
        return 
    }

    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        <div className='continue-container'>
        <div className="section-info" style={{lineHeight:"1.2"}}>
            <span className='section-primary'>Add Player Points</span><br></br>
            <span className='section-secondary'>Enter Points from the fantasy app you are using</span>
        </div>
        <div className='section-info'>
            <span className='section-primary'>Team - {leftName}</span>
        </div>
        {leftTeam && leftTeam.map((player)=> <PlayerPoint player={player} handlePlayer={handlePlayer} index={0}   /> )}
        <div className='section-info'>
            <span className='section-primary'>Team - {rightName}</span>
        </div>
        {rightTeam && rightTeam.map((player)=> <PlayerPoint player={player} handlePlayer={handlePlayer} index={1} /> )}
        </div>
        <ContinueFooter handleContinue ={()=>handleContinue()}  />
        </React.Fragment>
    );
}

export default AddPoint;
