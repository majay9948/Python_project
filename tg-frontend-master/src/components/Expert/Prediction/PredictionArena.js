import React,{useState,useEffect} from 'react'
import NavBarTwo from '../../navbar/NavBarTwo';
import GenericFooter from '../../footer/GenericFooter';
import { useNavigate } from 'react-router-dom';                        
import { useParams } from 'react-router-dom';             
import { toast } from 'react-toastify';
import {MdVisibility} from 'react-icons/md'                  
import './predictionstyle.css'
import PitchReport from './PitchReport';
import WinningCard from './WinningCard';
import Playing11 from './Playing11';
import PredictionFixed from './PredictionFixed';
import PredictionCaptain from './PredictionCaptain';
import PredictionVicecaptain from './PredictionVicecaptain';
import PredictionCredit from './PredictionCredit';
import PredictionPartision from './PredictionPartision';
import PredictionStrategy from './PredictionStrategy'
import axios from 'axios'
import { generateTeams,get_attempt,store_data } from './../../Generator/TeamGenerator';

const PredictionArena = (props)=>{
    let navigate = useNavigate();
    let {id} = useParams()
    let [loader,setLoader] = useState(true)
    let [reqData,setReqData] = useState(null)
    let [name,setName] = useState("")
    let [avatar,setAvatar] = useState("")
    let [ds,setDs] = useState("")
    let [generateActive,setGenerateActive] = useState(false)
    let [teamNumber,setTeamNumber] = useState(null)
    let [sp,setSp] = useState(null)
    let [fp,setFp] = useState(null)
    let [cp,setCp] = useState(null)
    let [vcp,setVcp] = useState(null)
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
  

    function compare( a, b ) {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }
      


    useEffect(()=>{
        axios.get(`${props.backend}/api/expert/specific/getprediction/${id}`)
        .then((response)=>{
            if(response.status === 200)
            {
                let tempObj = {...response.data.data}
                tempObj.predictionData.sort(compare)

                setReqData(tempObj)
                let t = new Date(response.data.data.createdAt)

                setDs(`${t.getDate()}-${t.getMonth()+1}-${t.getFullYear()}, ${t.getHours()}:${t.getMinutes()}`)



                for(let i=0;i<response.data.expertData.length;i++)
                {
                    if(response.data.expertData[i].phoneNumber.toString() === response.data.data.expertNumber.toString())
                    {
                        setName(response.data.expertData[i].name)
                        setAvatar(response.data.expertData[i].avatar)
                        break;
                    }
                }
                setLoader(false)
            }
        })
    },[])

    useEffect(()=>{
        if(reqData !== null)
        {
            let left_team = []
            let right_team = []
            let left_11_team = []
            let right_11_team = []
            let temp_list = []
            for(let i=0;i<70;i++)
                temp_list.push(null)
            for(let i=0;i<props.playerList.length;i++)
            {
                for(let j=0;j<props.playerList[i].length;j++)
                {
                    let p = {...props.playerList[i][j]}
                    temp_list[p.player_index] = p;
                    if(props.lineups && p.playing === 1 && p.team_index === 0)
                        left_11_team.push(p)
                    if(props.lineups && p.playing === 1 && p.team_index === 1)
                        right_11_team.push(p)
                }
            }
            // separing the playing 11 stuff here 
            let selected_players = get_player_list()
            let p11 = null;
            for(let i=0;i<reqData.predictionData.length;i++)
            {
                if(reqData.predictionData[i].id === 2)
                {
                    p11 = {...reqData.predictionData[i]}
                }
            }
            if(!props.lineups){
                for(let i=0;i<p11.leftSideTeam.length;i++)
                {
                    let jp = temp_list[p11.leftSideTeam[i]]
                    selected_players[jp.role].push({...jp})
                }
                for(let i=0;i<p11.rightSideTeam.length;i++)
                {
                    let jp = temp_list[p11.rightSideTeam[i]]
                    selected_players[jp.role].push({...jp})
                }
            }
            else 
            {
                for(let i=0;i<left_11_team.length;i++)
                {
                    let jp = temp_list[left_11_team[i].player_index]
                    selected_players[jp.role].push({...jp})
                }
                for(let i=0;i<right_11_team.length;i++)
                {
                    let jp = temp_list[right_11_team[i].player_index]
                    selected_players[jp.role].push({...jp})
                }
            }
            console.log(selected_players)
            setSp(selected_players)
            // now handle stuff based on selected players
            // to extract fixed, captain and vice captain
            // fixed
            let f_p = null;
            for(let i=0;i<reqData.predictionData.length;i++)
            {
                if(reqData.predictionData[i].id === 3)
                    f_p = {...reqData.predictionData[i]}
            }
            let fixed_players = get_player_list()
            for(let i=0;i<selected_players.length;i++)
            {
                for(let j=0;j<selected_players[i].length;j++)
                {
                    let p = {...selected_players[i][j]}
                    if(f_p.leftSideTeam.includes(p.player_index) || f_p.rightSideTeam.includes(p.player_index))
                    {
                        console.log('hi')
                        fixed_players[p.role].push(p.player_index)
                    }
                }
            }
            setFp(fixed_players)

            // captain
            let c_p = null;
            for(let i=0;i<reqData.predictionData.length;i++)
            {
                if(reqData.predictionData[i].id === 4)
                    c_p = {...reqData.predictionData[i]}
            }
            let captain_players = get_player_list()
            for(let i=0;i<selected_players.length;i++)
            {
                for(let j=0;j<selected_players[i].length;j++)
                {
                    let p = selected_players[i][j]
                    if(c_p.leftSideTeam.includes(p.player_index) || c_p.rightSideTeam.includes(p.player_index))
                    {
                        captain_players[p.role].push(p.player_index)
                    }
                }
            }
            setCp(captain_players)

            // vice captain
            let vc_p = null;
            for(let i=0;i<reqData.predictionData.length;i++)
            {
                if(reqData.predictionData[i].id === 5)
                    vc_p = {...reqData.predictionData[i]}
            }
            let vice_captain_players = get_player_list()
            for(let i=0;i<selected_players.length;i++)
            {
                for(let j=0;j<selected_players[i].length;j++)
                {
                    let p = selected_players[i][j]
                    if(vc_p.leftSideTeam.includes(p.player_index) || vc_p.rightSideTeam.includes(p.player_index))
                    {
                        vice_captain_players[p.role].push(p.player_index)
                    }
                }
            }
            setVcp(vice_captain_players)
        }
    },[reqData])

    let getPredictionComponents = ()=>{
        return (
            <React.Fragment>
                {reqData && reqData.predictionData.map((p,index)=>
                        getRequiredComponent(p)
                    )}
            </React.Fragment>
        );
    }
    let getRequiredComponent= (p)=>{
        let result;
        switch(p.id){
            case 0:
                result = <React.Fragment><PitchReport data={p} /><div className='line-separate'></div></React.Fragment>
                break;
            case 1:
                result = <React.Fragment><WinningCard 
                            data={p}
                            leftImage = {props.leftImage}
                            rightImage = {props.rightImage}
                            leftName = {props.leftName}
                            rightName = {props.rightName}
                /><div className='line-separate'></div></React.Fragment>
                break;
            case 2:
                result = <React.Fragment><Playing11 
                        data={p}
                        leftImage = {props.leftImage}
                        rightImage = {props.rightImage}
                        leftName = {props.leftName}
                        rightName = {props.rightName}
                        playerList = {props.playerList}
                        lineups = {props.lineups}
                 /><div className='line-separate'></div></React.Fragment>
                break;
            case 3:
                result = <React.Fragment><PredictionFixed 
                        data={p}
                        leftImage = {props.leftImage}
                        rightImage = {props.rightImage}
                        leftName = {props.leftName}
                        rightName = {props.rightName}
                        playerList = {props.playerList}
                        lineups = {props.lineups}
                /><div className='line-separate'></div></React.Fragment>
                break;
            case 4:
                result = <React.Fragment><PredictionCaptain 
                        data={p}
                        leftImage = {props.leftImage}
                        rightImage = {props.rightImage}
                        leftName = {props.leftName}
                        rightName = {props.rightName}
                        playerList = {props.playerList}
                        lineups = {props.lineups}
                /><div className='line-separate'></div></React.Fragment>
                break;
            case 5:
                result = <React.Fragment><PredictionVicecaptain 
                        data={p}
                        leftImage = {props.leftImage}
                        rightImage = {props.rightImage}
                        leftName = {props.leftName}
                        rightName = {props.rightName}
                        playerList = {props.playerList}
                        lineups = {props.lineups}
                /><div className='line-separate'></div></React.Fragment>
                break;
            case 6:
                result = <React.Fragment><PredictionCredit data={p} /><div className='line-separate'></div></React.Fragment>
                break;
            case 7:
                result = <React.Fragment><PredictionPartision 
                        data={p}
                        leftImage = {props.leftImage}
                        rightImage = {props.rightImage}
                        leftName = {props.leftName}
                        rightName = {props.rightName}
                /><div className='line-separate'></div></React.Fragment>
                break;
            case 8:
                result = <React.Fragment><PredictionStrategy data={p} /><div className='line-separate'></div></React.Fragment>
                break;
            default:
                result = <React.Fragment><PitchReport data={p} /><div className='line-separate'></div></React.Fragment>
            
        }
        return result;
    }

    let handleGenerate = ()=>{
        setGenerateActive(true)
    }

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
        let credit_p = null;
        for(let i=0;i<reqData.predictionData.length;i++)
        {
            if(reqData.predictionData[i].id === 6)
                credit_p = {...reqData.predictionData[i]}
        }
        //paritions
        let partision_p = null
        for(let i=0;i<reqData.predictionData.length;i++)
        {
            if(reqData.predictionData[i].id === 7)
                partision_p = {...reqData.predictionData[i]}
        }
        let final_partision = []
        for(let i=0;i<partision_p.selectedList.length;i++)
        {
            final_partision.push([...strategies[props.sportIndex][partision_p.selectedList[i]]])
        }
        //combination
        let combination_p = null
        for(let i=0;i<reqData.predictionData.length;i++)
        {
            if(reqData.predictionData[i].id === 8)
                combination_p = {...reqData.predictionData[i]}
        }
        let final_combination = []
        for(let i=0;i<combination_p.selectedList.length;i++)
        {
            final_combination.push(combinations[props.sportIndex][combination_p.selectedList[i]])
        }

        let temp_left = parseFloat(credit_p.leftCredit);
        let temp_right = parseFloat(credit_p.rightCredit);

        let temp_captain_cnt = 0;
        let temp_vice_captain_cnt=0;
        for(let i=0;i<cp.length;i++)
            temp_captain_cnt = temp_captain_cnt + cp[i].length;
        for(let i=0;i<vcp.length;i++)
            temp_vice_captain_cnt = temp_vice_captain_cnt + vcp[i].length;
        if(temp_captain_cnt === 0 || temp_vice_captain_cnt === 0)
        {
            toast.error('C / VC is empty!',{
                position:"top-center"
            })
            return  
        }

        // console.log(sp)
        // console.log(fp)
        // console.log(cp)
        // console.log(vcp)
        // console.log(final_partision)
        // console.log(final_combination)
        // console.log(temp_left)
        // console.log(temp_right)
        // console.log(tn)
        // 0 -> smart, 1 -> grand league , 2 -> advanced , 3 -> auto 
       let teams_list =  generateTeams(sp,fp,cp,vcp,final_partision,temp_left,temp_right,final_combination,tn,null)
        if(teams_list!=null)
        {
            let attempt = get_attempt(props.matchId,sp,'normal',tn,4,teams_list,props.sportIndex,null,temp_left,temp_right)
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
            <NavBarTwo navigate = {navigate} /> 
            { generateActive ? 
               <React.Fragment>
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
                : 
                <React.Fragment>
                    {loader ?  
                        <div>
                            <div className="mini-container">
                            <div className="d-flex justify-content-center" style={{marginTop:200}}>
                                    <div class="spinner-border text-primary" role="status">
                                    </div>
                            </div>
                            </div> 
                            <GenericFooter />
                        </div>
                        : 
                        <div>
                            <div className='mini-container' style={{padding:0,backgroundColor:'white'}}>
                            {/* First container about article and author */}  
                            <div className='first-container'>
                                {/* Author details */}
                                <div className='author-container'>
                                    <div className='d-flex align-items-center'>
                                        <img src={`/${avatar}.jpg`} className='author-image' />  
                                        <div className='d-flex flex-column justify-content-center align-items-center' style={{marginLeft:5}} >
                                            <span className='author-designation'>author</span>
                                            <span style={{fontWeight:500}}>{name}</span>
                                        </div>
                                    </div>
                                    <span className='post-date'>{ds}</span>
                                </div>
                                <div className='views-container'>
                                    <div className='align-items-center'><MdVisibility size={20} style={{color:'green'}} /><b>&nbsp;{reqData.numberOfViews
                                    }</b></div>
                                    <span className='post-date'>post views</span>
                                </div>
                            </div>
                            <div className='line-separate'></div>
                            {/* series name or article name given by author */}
                            <div className='d-flex justify-content-center post-title'>
                                {false ? <h4>Custom</h4> : <h4>{props.seriesName}</h4>}
                            </div>
                            <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                                <div className="combine-image">
                                    <img className="team-image" src={props.leftImage} alt="left" />
                                    <span className="left-team-name">{props.leftName}</span>
                                </div>
                                <div className="timer"> VS </div>
                                <div className="combine-image" >
                                    <span className="right-team-name">{props.rightName}</span>
                                    <img className="team-image" src={props.rightImage} alt="right" />
                                </div>
                            </div>
                            <div className='line-separate'></div>
                                {getPredictionComponents()}
                            </div>
                            <div className="footer container d-flex justify-content-center p-2" style={{maxWidth:600,padding:0}}>
                                <button onClick={()=> handleGenerate() } className="btn btn-success btn-sm vp-btn"> Create Teams </button>
                            </div>
                        </div>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default PredictionArena;
