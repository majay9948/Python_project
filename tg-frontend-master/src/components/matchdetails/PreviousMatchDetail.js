import React,{useState,useEffect,useRef} from 'react' 
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router'
import GenericFooter from '../footer/GenericFooter';
import NavBarTwo from '../navbar/NavBarTwo';
import AttemptCard from './AttemptCard';
import axios from 'axios'
import { toast } from 'react-toastify';
import {MdContentCopy} from 'react-icons/md'

const PreviousMatchDetail = (props)=>{
    let sportName = ['cricket','football','basketball','kabaddi']
    let [attemptArray,setAttemptArray] = useState([])
    let [leftName,setLeftName]= useState(null)
    let [leftImage,setLeftImage]= useState(null)
    let [rightName,setRightName]= useState(null)
    let [rightImage,setRightImage]= useState(null)
    let [result,setResult] = useState(null)
    let [matchStatus,setMatchStatus] = useState(0)
    let [seriesName,setSeriesName] = useState(null)
    let [playerPoints,setPlayerPoints] = useState(null)
    let [attemptData,setAttemptData] =useState(null)
    let [getNumber,setGetNumber] = useState(null)
    let [getNumberLoader,setGetNumberLoader] = useState(false)
    let [resultNumber,setResultNumber] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    let getPoints = (player_fixed_id,player_data)=>{
        for(let i=0;i<player_data.length;i++)
        {
            if(player_data[i].player_fixed_id === player_fixed_id)
                return player_data[i].player_points;
        }
        return 0;
    }

    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        props.setMatchId(id)
        let all_sports = JSON.parse(localStorage.getItem('tgk_data'))
        let req_sport = all_sports[props.sportIndex]
        let req_match = null 
        for(let i=0;i<req_sport.length;i++)
        {
            if(id.toString() === req_sport[i].id.toString())
            {
                req_match = req_sport[i]
            }
        }
        if(req_match===null){navigator('/');return}

        // api call have to be made 
        if(req_match.status !== 2){
            axios.get(`${props.backend}/api/fantasy/scorecard/${sportName[props.sportIndex]}/${req_match.id}`)
            .then((response)=>{
                let vp_status = response.data.data.match_status
                console.log(vp_status)
                if(vp_status !== 'active')
                {
                    // calling local storage
                    req_sport = req_sport.map((kvp)=>{
                        if(kvp.id.toString() === id.toString())
                        {
                            // do lot of stuff here 
                            kvp.player_list[0] = kvp.player_list[0].map((bobby)=>{
                                bobby.points = getPoints(bobby.player_fixed_id,response.data.data.player_data)
                                return bobby;
                            })
                            kvp.player_list[1] = kvp.player_list[1].map((bobby)=>{
                                bobby.points = getPoints(bobby.player_fixed_id,response.data.data.player_data)
                                return bobby;
                            })
                            console.log(vp_status)
                            if(vp_status==='inprogress')
                                kvp.status = 1;
                            else if(vp_status === 'inactive')
                                kvp.status = 2;
                            setMatchStatus(kvp.status)
                        }
                        
                        return kvp;
                    })
                    all_sports[props.sportIndex] = req_sport 
                    localStorage.setItem('tgk_data',JSON.stringify(all_sports))
                }

            })
        }
     
        setLeftName(req_match.left_name)
        setLeftImage(req_match.left_image)
        setRightName(req_match.right_name)
        setRightImage(req_match.right_image) 
        setSeriesName(req_match.series_name)
        if(req_match.status === 2)
            setMatchStatus(2)
       
        setResult(req_match.result)

        let temp_list = req_match.attempts 
        temp_list.sort((x,y)=>{
            if(x.time<y.time)
            return 1 
            else 
            return -1
        })
        setAttemptData(temp_list)
        let stuff = []
        for(let i=0;i<temp_list.length;i++)
            stuff.push(0)
        setAttemptArray(stuff)
        console.log(props.primeAdmin)
    },[])

    let handleAddPoint = ()=>{
        navigate(`/addpoint/${id}`)
    }

    let handleMerge = ()=>{
        let cnt =0;
        for(let i=0;i<attemptArray.length;i++)
        {
            if(attemptArray[i] === 1)
                cnt++;
        }
        if(cnt<2)
        {
            toast.error('Select more than 1 attempts to Merge!',{position:'top-center'})
            return;
        }
        else 
        {
            //merging stuff should be done here 
            let all_sports = JSON.parse(localStorage.getItem('tgk_data'))
            let req_sport = all_sports[props.sportIndex]
            let req_match = null 
            for(let i=0;i<req_sport.length;i++)
            {
                if(id.toString() === req_sport[i].id.toString())
                {
                    req_match = req_sport[i]
                }
                
            }
            let temp_list = req_match.attempts 
            
            let merge_list = []
            for(let i=0;i<attemptArray.length;i++)
            {   
                if(attemptArray[i] === 1)
                {
                    for(let j=0;j<temp_list.length;j++)
                    {
                        if(i === temp_list[j].id){
                            merge_list.push({...temp_list[j]})
                            temp_list.splice(j,1);
                        }
                    }
                }
            }
            let l_c = 100 
            let r_c = 50
            let t_n = 0;
            let vp_team = []
            let vikas =1;
            let player_container = []
            for(let i=0;i<=70;i++)
                    player_container.push(null)
            for(let i=0;i<merge_list.length;i++)
            {
                if(merge_list[i].type=== 'toss')
                {
                    toast.error('Auto Teams Cannot be Merged!',{position:'top-center'})
                    return 
                }
                if(l_c>merge_list[i].left_credits)
                    l_c = merge_list[i].left_credits 
                if(r_c<merge_list[i].right_credits)
                    r_c = merge_list[i].right_credits
                t_n = t_n + parseInt(merge_list[i].number_of_teams);
                
                for(let j=0;j<merge_list[i].team_list.length;j++)
                {
                    let t = merge_list[i].team_list[j]
                    t.team_number = vikas; 
                    vikas++;
                    vp_team.push(t)
                }
                // i need to setup the playlist as well here
                let karthik = merge_list[i].player_list
                for(let j=0;j<karthik.length;j++)
                {
                    for(let k=0;k<karthik[j].length;k++)
                    {
                        let kvp = karthik[j][k];
                        if(player_container[kvp.player_index]=== null)
                            player_container[kvp.player_index] = kvp;
                    }
                }
            }
          //0'  console.log(player_container)
            if(t_n === null)
            {
                console.log('error')
                return
            }
            let jp = merge_list[merge_list.length-1]
            let pp_list = []
            for(let i=0;i<jp.player_list.length;i++)
                pp_list.push([])
            for(let i=0;i<player_container.length;i++)
            {
                if(player_container[i]!== null)
                {
                    pp_list[player_container[i].role].push(player_container[i]);
                }
            }
         //   console.log(pp_list)
            temp_list.push({
                generation_type: jp.generation_type,
                id:5,
                left_credits: l_c,
                number_of_teams:t_n,
                player_list: pp_list,
                right_credits: r_c,
                selection_strategy:false,
                team_list:vp_team,
                time: jp.time,
                type:jp.type
            })
            for(let i=0;i<temp_list.length;i++)
            {
                temp_list[i].id = i;
            }
            //storing in the local storage
            req_match.attempts = temp_list 
            console.log(temp_list)
            localStorage.setItem('tgk_data',JSON.stringify(all_sports))

            let stuff = []
            for(let i=0;i<temp_list.length;i++)
                stuff.push(0)
            setAttemptArray(stuff)
            //sorting stuff 
            temp_list.sort((x,y)=>{
                if(x.time<y.time)
                return 1 
                else 
                return -1
            })
            setAttemptData(temp_list)
            
           // console.log(merge_list)
        }
    }

    let handleGetNumber = (e)=>{
        setGetNumber(parseInt(e.target.value))
    }

    let findPhoneNumber = ()=>{
        setResultNumber(null)
        if(getNumber === null)
        {
            toast.error("Invalid Team Number!",{position:'top-center'});
            return;
        }
        setGetNumberLoader(true);
        axios.get(`${props.backend}/api/prime/getnumber/${id}/${getNumber}`)
        .then((response)=>{
            setGetNumberLoader(false)
            if(response.status === 200)
            {
                setResultNumber(response.data.phoneNumber)
            }
            else 
            {
                toast.error(response.data.message,{position:'top-center'});
                return;
            }
        })
        .catch((e)=>{
            setGetNumberLoader(false)
            toast.error("Something went wrong!",{position:'top-center'});
            return;
        })
    }

    let handleCopy = ()=>{
        navigator.clipboard.writeText(resultNumber);
        toast.success("Number copied!",{position:'top-center'});
        return;
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <div className='mini-container' style={{padding:0}}>
                <div className='p-match-header pb-2 mb-2'>
                    <div style={{display:'flex',justifyContent:'space-around',paddingTop:5}}>
                    <h5>{seriesName}</h5>
                    {props.primeAdmin === true ? 
                    <button onClick={()=> handleMerge()} className="btn btn-sm" style={{backgroundColor:'purple',color:'white',fontWeight:500}}>Merge</button>
                        : null}
                    </div>
                    <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                    <div className="combine-image">
                        <img className="team-image" src={leftImage} alt="left" />
                        <span className="left-team-name">{leftName}</span>
                     </div>
                    <div className="timer"> VS </div>
                    <div className="combine-image" >
                        <span className="right-team-name">{rightName}</span>
                        <img className="team-image" src={rightImage} alt="right" />
                    </div>
                    </div>
                    {
                        matchStatus === 0?
                        <React.Fragment>
                            <span>Match is not started Yet, see teams here !</span>
                            <span> if you want to change points <button onClick={()=> handleAddPoint() } className='btn btn-success btn-sm' style={{fontWeight:500}}>Change Points</button></span>
                        </React.Fragment>
                        :
                        null
                    }
                    {
                        matchStatus === 1?
                        <React.Fragment>
                            <span>Match is in Progress, You can check points of your teams</span>
                            <span> if you want to change points <button onClick={()=> handleAddPoint() } className='btn btn-success btn-sm' style={{fontWeight:500}}>Change Points</button></span>
                        </React.Fragment>
                        :
                        null
                    }
                    {
                        matchStatus === 2?
                        <React.Fragment>
                            <span>Match is Finished! Check results of  your teams !!!</span>
                            <span> if you want to change points <button onClick={()=> handleAddPoint() } className='btn btn-success btn-sm' style={{fontWeight:500}}>Change Points</button></span>
                        </React.Fragment>
                        :
                        null
                    }
                </div>
                <div className="d-flex flex-column" style={{paddingLeft:5,paddingRight:5}}>
                {/* prime admin stuff start here */}
                    <div className="match-card pb-2">
                        <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                            <span className="series-name">get phone number using team number</span>
                        </div> 
                        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                 
                            <div className="text-center" style={{marginLeft:10,flexGrow:1,marginRight:10}}>
                                <div className='d-flex justify-content-around align-items-center mt-2'>
                                    <input type="number" onChange={handleGetNumber} value={getNumber} name="getNumber" style={{width:'45%'}} placeholder="Team Number" />
                                    <button onClick={()=> findPhoneNumber()} className='btn btn-primary btn-sm' style={{width:'45%'}}>Get Phone Number</button> 
                                </div>
                            </div>
                        </div>
                        {
                            getNumberLoader? 
                            <div className="d-flex justify-content-center m-2 mt-4">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                            :
                             null
                        }
                        {
                            getNumberLoader === false && resultNumber !== null ?
                            <div className="d-flex justify-content-center m-2">
                                <span>Phone Number: <span style={{fontWeight:500,color:'green'}}>{resultNumber}</span> <MdContentCopy className='ml-2' size={22} onClick={()=> handleCopy()} /></span>
                            </div>
                            :
                            null
                        }
                    
                    </div>

                {/* prime admin stuff end here */}
                { attemptData &&  attemptData.map((attempt)=> <AttemptCard key={attempt.id} primeTeamData={props.primeTeamData} setPrimeTeamData={props.setPrimeTeamData} primeAdmin={props.primeAdmin} attemptArray={attemptArray} setAttemptArray={setAttemptArray}  attempt = {attempt}  status={matchStatus} matchId={id} /> ) }
                </div> 
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default PreviousMatchDetail;