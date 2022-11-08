import React,{useEffect,useState,useRef} from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {MdWest,MdHome , MdEventAvailable} from 'react-icons/md'
import { toast } from 'react-toastify';


import axios from 'axios'
import Player from "./Player";

const Match = (props)=>{
    //category by sport type 

    let [loader,setLoader] = useState(true)
    let type_name = [
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]
    let side_limit =[
        [7,7],
        [7,7],
        [5,5],
        [5,5]
    ]
    let limit = [
        [1,3,1,3],
        [1,3,3,1],
        [1,1,1,1,1],
        [2,1,1]
    ]
    let navigate = useNavigate()
    const {id} = useParams()
    const [time,setTime] = useState('')
    let [matchTime,setMatchTime] = useState(null)
    let [teamsBooked,setTeamsBooked] = useState(false)
    let [openBooking,setOpenBooking] = useState(false)

    let match_data = useRef({})
    let get_active_role = ()=>{
        if(props.sportIndex===2)
            return [1,0,0,0,0]
        else if(props.sportIndex===3)
            return [1,0,0]
        else 
            return [1,0,0,0]
    }
    let [activeRole,setActiveRole] = useState(get_active_role())

    


    function handleRole(vp)
    {
        let newRole = [...activeRole]
        for(let i=0;i<activeRole.length;i++)
            newRole[i]=0 
        newRole[vp]=1 
        setActiveRole(newRole)
    }
    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }
   
    let wrapper = (m_data)=>{
            match_data.current = m_data 
            setMatchTime(match_data.current.match_time)
            let player_list = get_player_list()
            props.setLeftName(match_data.current.left_team_name)
            props.setRightName(match_data.current.right_team_name)
            props.setLeftImage(match_data.current.left_team_image)
            props.setRightImage(match_data.current.right_team_image)
            props.setMatchId(id)  
            match_data.current.left_team_players.forEach((player)=>{
                player.selected = 0
                player_list[player.role].push(player)
            })
            match_data.current.right_team_players.forEach((player)=>{
                player.selected = 0
                player_list[player.role].push(player)
            })
            let cnt=0 
            for(let i=0;i<props.playerList.length;i++)
                for(let j=0;j<props.playerList[i].length;j++)
                        cnt = cnt + 1 
            for(let i=0;i<player_list.length;i++)
            {
                player_list[i] = player_list[i].sort((x,y)=>{
                    if(x.credits<y.credits)
                        return 1;
                    else 
                        return -1;
                })
            }
            if(cnt ===0 || props.expertMatchList.indexOf(id.toString()) !== -1)
            {
            props.setPlayerList(player_list)
            }
            console.log(player_list)
    }

    useEffect(()=>{
       
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        if(props.login === false)
        {
            navigate('/login')
            return 
        }
        if(props.plan === false)
        {
            navigate('/plandata')
        }
        let m_data = null
        let temp = JSON.parse(localStorage.getItem('team_data'))
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].id === id )
            {
                m_data = temp[i].data 
            }
        }
        if(m_data === null) 
        {
                axios.get(`${props.backend}/api/fantasy/match/${id}`)
                .then((response)=>{
                    setLoader(false)
                    temp.push({
                        id: id,
                        data: response.data.data    
                    })
                    m_data = response.data.data 
                    localStorage.setItem('team_data',JSON.stringify(temp))
                    wrapper(m_data)
                })
                .catch((e)=>{
                    console.log('eror occured')
                })     
           
        }
        else 
        {   
            let present = new Date(Date.now())
            let m_time = new Date(props.matchTime)
            if(m_time>=present)
            {
                console.log('here vp')
                console.log(m_time>present)
                axios.get(`${props.backend}/api/fantasy/match/${id}`)
                .then((response)=>{
                    setLoader(false)
                    m_data.lineup_status = response.data.data.lineup_status 
                    //left side updating 
                    for(let k=0;k<response.data.data.left_team_players.length;k++)
                    {
                        let player = response.data.data.left_team_players[k]; 
                        for(let j=0;j<m_data.left_team_players.length;j++)
                        {
                            if(m_data.left_team_players[j].player_index=== player.player_index)
                            {
                                m_data.left_team_players[j].playing = player.playing; 
                                m_data.left_team_players[j].image = player.image;
                            }
                        }
                    }
                    //right side updating 
                    for(let k=0;k<response.data.data.right_team_players.length;k++)
                    {
                        let player = response.data.data.right_team_players[k]; 
                        for(let j=0;j<m_data.right_team_players.length;j++)
                        {
                            if(m_data.right_team_players[j].player_index=== player.player_index)
                            {
                                m_data.right_team_players[j].playing = player.playing;
                                m_data.right_team_players[j].image = player.image 
                            } 
                        }
                    }
                    temp = temp.map((m)=>{
                        if(m.id == id)
                        {
                            m.data = m_data 
                        }
                        return m;
                    })
                    localStorage.setItem('team_data',JSON.stringify(temp))
                    wrapper(m_data)
                })
            }
            else 
            {
                setLoader(false)
                wrapper(m_data)
            }
        }  

        // doing stuff for prime bookings 
        if(props.primeUser === true && props.primePlan === true && props.bookingOpenList.indexOf(id) !== -1)
        {
            axios.get(`${props.backend}/api/primebooking/status/${id}/${props.phoneNumber}`)
            .then((response)=>{
                if(response.status === 200)
                {
                    setTeamsBooked(response.data.booked)
                }
                else 
                {
                    setTeamsBooked(false)
                }
            })
        }
        if(props.phoneNumber === '9848579715')
        {
            axios.get(`${props.backend}/api/primebooking/admin/status/${id}`)
            .then((response)=>{
                if(response.status === 200)
                {
                    setOpenBooking(true)
                }
                else 
                {
                    setOpenBooking(false)
                }
            })
        }
        
    },[])

    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = new Date(matchTime).getTime() - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let timeString = ''
        if(days>0)
            timeString += days+"d "
        if(hours>0)
            timeString += hours+"h "
        if(minutes>0)
            timeString += minutes+"m "
        if(seconds>0)
            timeString += seconds+"s "
        setTime(timeString)
        if (distance < 0) {
            clearInterval(x);
            setTime("Expired")
          }
      }, 1000);


    let getActiveRole = (role_list)=>{
        return role_list.indexOf(1)
    }
    let handlePlayer = (r,pi) =>{
        //alert(pi)
         let player = null 
         for(let i=0;i<props.playerList[r].length;i++)
            if(props.playerList[r][i].player_index === pi)
                player = props.playerList[r][i]
        if(player.selected===1)
        {
            if(player.team_index === 0)
                props.setLeft(props.left-1)
            else 
                props.setRight(props.right-1)
            props.role[r] = props.role[r]-1
            props.setRole([...props.role])
        }
        else 
        {
            if(player.team_index === 0)
            props.setLeft(props.left+1)
        else 
            props.setRight(props.right+1)
            props.role[r] = props.role[r]+1
            props.setRole([...props.role])
        }
         let newPlayerList = [...props.playerList]
         newPlayerList[r]= newPlayerList[r].map(player =>{
             if(player.player_index === pi)
                player.selected = player.selected === 0? 1 : 0;
            return player 
         })
         props.setPlayerList([...newPlayerList])
    }
    let handleContinue = ()=>{
       //(props.playerList)
        
        if(props.left<side_limit[props.sportIndex][0] || props.right<side_limit[props.sportIndex][1])
        {
            toast.error(`Minimum ${side_limit[props.sportIndex][0]} players from each side`,{position:"top-center"})
            return 
        }
        if(props.sportIndex===2 && (props.left+props.right)<12)
        {
            toast.error(`Select Minimum 12 palyers from both sides`,{position:"top-center"})
            return
        }
        for(let i=0;i<props.role.length;i++)
        {
            if(props.role[i]<limit[props.sportIndex][i])
            {
                toast.error(`Select Minimum ${limit[props.sportIndex][i]} - ${type_name[props.sportIndex][i]} players`,
                {
                    position:"top-center"
                }
                )
                return
            }
        }
        if(props.left>11 || props.right>11)
        {
            toast.error('Cannot select more than 11 players from each side',{position:"top-center"})
            return 
        }

     
        let new_list = get_player_list()
        for(let i=0;i<new_list.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                if(props.playerList[i][j].selected === 1)
                {
                    new_list[i].push(props.playerList[i][j])
                }
            }
        }
      //  console.log(new_list)
        props.setSelectedPlayers(new_list)
       // console.log(props.selectedPlayers)
        navigate('/section')
    }

    let get_sub_title = ()=>{
        let size = null
        if(props.sportIndex===3)
            size = 3 
        else if(props.sportIndex===2)
            size =5 
        else 
            size = 4 
        
        let temp_role =[]
        let t_name= type_name[props.sportIndex]
       
        for(let i=0;i<size;i++)
            temp_role.push(i)
        let output = temp_role.map(val =>{
            return (
                <div onClick={() => handleRole(val)}  className={ activeRole[val] === 1 ? 'sport-icon role sport-icon-active':'role sport-icon'}>
                <span>{t_name[val]}({props.role[val]})</span>
                </div>
            )
        })
        return output
    }   
    let handleAuto = ()=>{
        let cnt = 0;
        let new_list = get_player_list()
        for(let i=0;i<new_list.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                if(props.playerList[i][j].playing === 1)
                {
                    cnt = cnt + 1 
                    new_list[i].push(props.playerList[i][j])
                }
            }
        }
        
        if(props.sportIndex===3 || cnt>14)
        {
            props.setSelectedPlayers(new_list)
            navigate('/auto')
            return 
        }   
        else 
        {
            toast.error('Something Went Wrong',{position:'top-center'})
            return 
        } 
    }

    let handleEdit = ()=>{
        navigate('/change')
        return 
    }
    let handleBook = ()=>{
        navigate(`/bookteams/${id}`)
        return 
    }
    let handleOpenBooking = ()=>{
        axios.post(`${props.backend}/api/admin/primebooking/create`,{
            matchId: id, 
            sportIndex: props.sportIndex
        })
        .then((response)=>{
            if(response.status === 200)
            {
                toast.success(response.data.message,{position:'top-center'})
                setOpenBooking(true)
                return;
            }
            else 
            {
                toast.error(response.data.message,{position:'top-center'})
                return;
            }
        })
    }

    return (
        <React.Fragment>
        {loader? 
            <React.Fragment>
                <div class="shimmer" style={{backgroundColor: "rgb(56, 56, 56)"}}>
                    <div class="wrapper">
                        <div class="stroke animate"></div>
                        <div class="stroke animate"></div>
                        <div style={{display:"flex", justifyContent: "space-between", marginTop: 10}}>
                        <div class="image-card animate"></div>
                        <div class="image-card animate"></div>
                        </div>
                    </div>
                </div>

                <div class="shimmer">
                    <div class="wrapper" >
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                    </div>
                </div>

                <div class="shimmer">
                    <div class="wrapper" >
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                    </div>
                </div>
                <div class="shimmer">
                    <div class="wrapper" >
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                        <div class="stroke animate "></div>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:15}}>
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div> 
            </React.Fragment>
        : 
        <React.Fragment>
            <div style={{backgroundColor: "rgb(56,56,56)",color:'white'}}>
            <div>
                <nav className="d-flex justify-content-between align-items-center" >
                        <MdWest onClick={() => navigate(-1) } size={24} style={{marginLeft:10}} />
                        <span className="navbar-brand mb-0 text-center">
                            <span>{time === 'Expired'? 'Expired' : `${time} left`}</span>
                        </span>
                        <MdHome onClick={()=> navigate('/')} size={24} style={{marginRight:10}} />
                </nav>
            </div>
            <div className="text-center m-2" style={{fontSize:12}}>Select any where between {props.sportIndex===2 || props.sportIndex===3?'12-16' : '14-22'} players</div>
                <div className="d-flex justify-content-between">
                    <div className="select-team-left">
                        <div className="d-flex left-item  flex-column align-items-center">
                            <span>Players</span>
                            <span><span className="bright-text">{props.left}</span></span>
                        </div>
                        <img className="team-image-big left-item" src={props.leftImage} alt="left" />
                        <span className="left-item">{props.leftName}</span>
                    </div>
                   
                    <div className="select-team-right">
                        <span className="right-item">{props.rightName}</span>
                        <img className="team-image-big right-item" src={props.rightImage} alt="right" />
                        <div className="d-flex right-item flex-column align-items-center" >
                            <span>Players</span>
                            <span><span className="bright-text">{props.right}</span></span>
                        </div>
                    </div>
                </div>
           </div>
           {/* Here i am going to give option to edit and add player data */}
            <div className="change-data">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                <span><span style={{color:'grey',fontSize:'13px'}}>Credit or role mismatch? </span><button onClick={()=> handleEdit()} className="vp-btn btn btn-sm btn-dark">Edit Data</button> </span>
                { props.primeUser === true && props.primePlan === true && props.bookingOpenList.indexOf(id.toString()) !== -1 ? 
                    <React.Fragment>
                        { 
                            teamsBooked === true ? <span className="vp-btn btn btn-sm btn-success"><MdEventAvailable /> Booked</span>
                             : 
                            <button onClick={()=> handleBook()} className="vp-btn btn btn-sm btn-primary">Book Teams</button>
                        }
                    </React.Fragment>
                    : 
                    null
                }
                {
                    props.phoneNumber.toString() === '9848579715' ? 
                    <React.Fragment>
                    { 
                        openBooking === true ? <span className="vp-btn btn btn-sm btn-success">Booking Opened</span>
                         : 
                        <button onClick={()=> handleOpenBooking()} className="vp-btn btn btn-sm btn-primary">Open Booking</button>
                    }
                </React.Fragment>
                : 
                null
                }
            </div>
            </div>  
           {/* Here the main part of selecting players will happen */}
           <nav class="d-flex justify-content-around top-nav top-fix-two" style={{backgroundColor:'#fff'}}>
              {get_sub_title()}
           </nav>
           {/* players data here  */}
           <div className="section-container">
            <span className="section-item-one">SELECTED BY</span>
            <span className="section-item-two">POINTS</span>
            <span className="section-item-two">CREDITS</span>
           </div>
           <div className="player-content">
           {props.playerList && props.playerList[getActiveRole(activeRole)].map((player) => <Player key={player.name} player ={player} handlePlayer = {handlePlayer} /> )}
           </div>
           <div className="footer container d-flex justify-content-center p-2" style={{maxWidth:600,padding:0}}>
               { match_data.current.lineup_status === 1?
                <button onClick={()=> handleAuto()} className="btn btn-dark btn-sm vp-btn" style={{marginRight:5}}> Auto Create Teams</button>
                : null} 
                <button onClick={()=> handleContinue() } className="btn btn-success btn-sm vp-btn"> Continue </button>
                { props.userRole !== 'customer'?
                    <button onClick={()=> { navigate(`/superdecision/${id}`)}} className="btn btn-primary btn-sm vp-btn" style={{marginLeft:5}}>Expert Choice</button>
                    : null}
                </div>
        </React.Fragment>
        }
        </React.Fragment>
    );
}

export default Match;