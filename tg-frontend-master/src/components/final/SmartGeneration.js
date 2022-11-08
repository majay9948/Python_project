import React,{useState,useEffect} from 'react' 
import NavBarTwo from '../navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom';
import GenericFooter from '../footer/GenericFooter';
import { generateTeams,get_attempt,store_data } from '../Generator/TeamGenerator';
import { toast } from 'react-toastify';  
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { get_credit_range } from '../Generator/HelperFunctions';


const SmartGeneration = (props)=>{
    let [pitch,setPitch] = useState([0,0,0])
    let [part,setPart] = useState(1)
    let [strong,setStrong] = useState([0,0,0])
    let [toss,setToss] = useState([0,0])
    let [tossWon,setTossWon] = useState([0,0])
    let [tossResult,setTossResult] = useState([0,0])
    let [teamNumber,setTeamNumber] = useState(null)
   
    let [tossShow,setTossShow] = useState(true)
    let [tossWonShow,setTossWonShow] = useState(false)
    let [tossResultShow,setTossResultShow] = useState(false)
    let [loader,setLoader] = useState(false)
    let [forward,setForward] = useState(false)
    let [tossWonTeamName,setTossWonTeamName] = useState('')
    
    let navigate = useNavigate()

    useEffect(()=>{
        if(props.reload === null || props.sportIndex !== 0)
        {
            navigate('/')
            return
        }
    },[])
    // 0 -> batting , 1 -> bowling , 2 -> balanced
    let credit_range=[
        {
            left:97.5,
            right:100
        },
       {
            left:96,
            right:99
        },
        {
            left:96.5,
            right:99.5
        }
    ]
    let team_combination = [
        [
            [1,4,3,3], [1,5,1,4],[1,6,1,3],[1,3,4,3],[1,4,2,4],[2,3,3,3],[2,4,2,3],[2,5,1,3],[2,4,1,4],[3,3,2,3],[3,4,1,3],[4,3,1,3]
        ],
        [
            [1,3,2,5],[1,3,3,4],[1,4,1,5],[2,3,1,5],[3,3,1,4],[2,3,2,4],[1,4,2,4]
        ],
        [
            [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],[2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],[3,3,2,3],[3,4,1,3],[3,3,1,4],[4,3,1,3]
        ]
    ]
    // 0) left team is strong and no toss
    // 1) left team is strong and toss won by left 
    // 2) right team is strong and no toss
    // 3) right team is strong and toss won by right 
    // 4) equal -> 

    let team_strategy = [
        [
            [7,4],[6,5]
        ],
        [
            [7,4]
        ],
        [
            [5,6],[4,7]
        ],
        [
            [4,7]
        ],
        [
            [4,7],[5,6],[6,5],[7,4]
        ]

    ]

    //handling the pitch 
    let handlePitch = (index)=>{
        let new_arr = [...pitch]
        for(let i=0;i<new_arr.length;i++)
            new_arr[i]=0 
        new_arr[index]=1;
        setPitch(new_arr)
    }
    //handling the string
    let handleStrong = (index)=>{
        if(pitch.indexOf(1)=== -1)
        {
            toast.error('Select Pitch details First!',{position:'top-center'})
            return 
        }
        let new_arr = [...strong]
        for(let i=0;i<new_arr.length;i++)
            new_arr[i]=0 
        new_arr[index]=1;
        setStrong(new_arr)
    }
    //hadleToss
    let handleToss = (index)=>{
        if(strong.indexOf(1)=== -1)
        {
            toast.error('Select Strong Team First!',{position:'top-center'})
            return 
        }
        let new_arr = [...toss]
        for(let i=0;i<new_arr.length;i++)
            new_arr[i]=0 
        new_arr[index]=1;
        setToss(new_arr)
        setTossShow(false)
        setLoader(true)
        if(index===1)
        {
            setTimeout(()=>{
                setLoader(false)
                setForward(true)
            },3000)
        }
        else{
        setTimeout(()=>{
            setLoader(false)
            setTossWonShow(true)
        },3000)
    }
    }
     //hadleTossWon
     let handleTossWon = (index)=>{
        let new_arr = [...tossWon]
        for(let i=0;i<new_arr.length;i++)
            new_arr[i]=0 
        new_arr[index]=1;
        if(index===0)
            setTossWonTeamName(props.leftName)
        else 
            setTossWonTeamName(props.rightName)
        setTossWon(new_arr)
        setTossWonShow(false)
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
            setTossResultShow(true)
        },3000)
    }
     //hadleToss
     let handleTossResult = (index)=>{
        let new_arr = [...tossResult]
        for(let i=0;i<new_arr.length;i++)
            new_arr[i]=0 
        new_arr[index]=1;
        setTossResult(new_arr)
        setTossResultShow(false)
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
            setForward(true)
        },3000)
        
    }
    let handleForward = ()=>{
        setPart(2)
    }
//player-orange
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
        // partision strategy handling 
        let p_index = null;
        if(strong.indexOf(1)===0 && toss.indexOf(1)===0 && tossWon.indexOf(1)===0)
            p_index = 1
        else if(strong.indexOf(1)===0)
            p_index = 0
        else if(strong.indexOf(1)===1 && toss.indexOf(1)===0 && tossWon.indexOf(1)===1)
            p_index = 3 
        else if(strong.indexOf(1)===11)
            p_index = 2 
        else 
            p_index = 4 
        // handling combinations 
        let c_index = null;
        if(toss.indexOf(1)===0)
        {
            if(tossResult.indexOf(1) === 0) 
                c_index = 0 
            else 
                c_index = 1 
        }
        else
        {
            c_index = pitch.indexOf(1)
        }
        //handling credits 
        let req_credits = credit_range[c_index]


        //handling captain 
        let temp_captain = [[],[],[],[]]
        let temp_vicecaptain = [[],[],[],[]]
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                let p = props.selectedPlayers[i][j]
                temp_captain[i].push(p.player_index)
                temp_vicecaptain[i].push(p.player_index)
            }
        }

      let credit_type = 2;
      if(c_index === 1)
        {
            credit_type = 2;
        }
        else if(c_index === 0)
        {
            credit_type = 0;
        }
        else
        {
            credit_type = 1;
        }

        let credit_stuff = get_credit_range(props.selectedPlayers,credit_type,props.sportIndex)
        let temp_right = 100;
        let temp_left = 95;

        if(props.sportIndex === 0 || props.sportIndex === 1)
        {
            temp_left = credit_stuff.left; 
            temp_right = credit_stuff.right;
        }

        //main part start
        let teams_list =  generateTeams(props.selectedPlayers,[[],[],[],[]],temp_captain,temp_vicecaptain,team_strategy[p_index],temp_left,temp_right,team_combination[c_index],tn,null)
        if(teams_list!=null)
        {
            let attempt = get_attempt(props.matchId,props.selectedPlayers,'normal',tn,0,teams_list,props.sportIndex,null,temp_left,temp_right)
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

        //main part end 
    } 

    return (
        <React.Fragment>
            <NavBarTwo navigate = {navigate} />
            <div className='mini-container' style={{padding:5}}>
            {part === 1? 
                <div className='part-one'>
                   <div className='card mt-2' >
                        
                        <h4 className='card-header text-center'>Smart Generation Section</h4>
                        <div className='p-2 mt-2'>
                           <div className='smart-factor'>
                                <h5>Pitch Details:</h5>
                                <div className='smart-container mt-4 mb-4'>
                                    <div onClick={()=> handlePitch(0)} className={pitch[0]===1? 'smart-item player-orange' : 'smart-item'}>Batting &nbsp;{ pitch[0]===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handlePitch(1)}  className={pitch[1]===1? 'smart-item player-orange' : 'smart-item'}>Bowling &nbsp;{ pitch[1]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handlePitch(2)} className={pitch[2]===1? 'smart-item player-orange' : 'smart-item'}>Balanced&nbsp; { pitch[2]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                </div>
                           </div>
                           <div className='smart-factor'>
                                <h5>Strong Team ?</h5>
                                <div className='smart-container mt-4 mb-4'>
                                    <div onClick={()=>handleStrong(0)} className={strong[0]===1? 'smart-item player-orange' : 'smart-item'}>
                                    <img className='kvp-icon' src={props.leftImage} alt="left" />
                                   {props.leftName}&nbsp; { strong[0]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handleStrong(1)} className={strong[1]===1? 'smart-item player-orange' : 'smart-item'}>
                                    <img className='kvp-icon' src={props.rightImage} alt="right" />
                                    {props.rightName}&nbsp; { strong[1]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handleStrong(2)} className={strong[2]===1? 'smart-item player-orange' : 'smart-item'}>Equal&nbsp; { strong[2]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                </div>
                           </div>
                            {/* hidden stuff  */}
                            { tossShow === true?
                           <div className='smart-factor'>
                                <h5>Toss Completed ?</h5>
                                <div className='smart-container mt-4 mb-4'>
                                    <div onClick={()=>handleToss(0)} className={toss[0]===1? 'smart-item player-orange' : 'smart-item'}>Yes &nbsp; { toss[0]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handleToss(1)} className={toss[1]===1? 'smart-item player-orange' : 'smart-item'}>No &nbsp; { toss[1]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                </div>
                           </div>
                           : null }
                           { tossWonShow=== true?
                            <div className='smart-factor'>
                                    <h5>Who won the Toss ?</h5>
                                    <div className='smart-container mt-4 mb-4'>
                                        <div onClick={()=>handleTossWon(0)} className={tossWon[0]===1? 'smart-item player-orange' : 'smart-item'}>
                                            <img className='kvp-icon' src={props.leftImage} alt="left" />
                                            {props.leftName}&nbsp; { tossWon[0]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                        <div onClick={()=>handleTossWon(1)} className={tossWon[1]===1? 'smart-item player-orange' : 'smart-item'}>
                                            <img className='kvp-icon' src={props.rightImage} alt="right" />
                                            {props.rightName}&nbsp; { tossWon[1]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    </div>
                            </div>
                           : null }
                           { tossResultShow=== true?
                            <div className='smart-factor'>
                                <h5>{tossWonTeamName} Elected to ?</h5>
                                <div className='smart-container mt-4 mb-4'>
                                    <div onClick={()=>handleTossResult(0)} className={tossResult[0]===1? 'smart-item player-orange' : 'smart-item'}>Batting &nbsp; { tossResult[0]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                    <div onClick={()=>handleTossResult(1)} className={tossResult[1]===1? 'smart-item player-orange' : 'smart-item'}>Bowling &nbsp; { tossResult[0]===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                </div>
                            </div>
                            : null }
                            <div className='text-center mt-4 mb-4'>
                                <Loader
                                    type="Grid"
                                    color="rgb(86, 61, 124)"
                                    height={60}
                                    width={60}
                                    visible={loader}
                                /> 
                            </div>
                         {forward === true ? 
                            <div className='text-center mt-4 mb-4'>
                                <button onClick={() => handleForward()} className='btn btn-primary' style={{fontWeight:500}}>Continue</button>
                            </div> 
                           :
                           null
                          }
                            
                        </div>
                   </div>
                </div>
            : 
            null
            }
            {part ===2 ? 
                <div className='team-number'>
                    <h3 className='team-number-title'>Enter Number of Teams</h3>
                    <p className='team-number-sub'>you can generate between <b>1 - 3000</b> Teams</p>
                    <div className='team-input'>
                        <input onChange={handleChange} type="number" name="teamNumber" placeholder='No.of Teams' value={teamNumber} />
                        <button onClick={handleClick} className='btn btn-success team-btn'>Generate Teams</button>
                    </div>
                </div>   
            :
            null
            }
            </div>
            <GenericFooter />
        </React.Fragment>
    );    
}

export default SmartGeneration;