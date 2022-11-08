import React,{useState} from 'react'
import NavBarTwo from '../../navbar/NavBarTwo';
import { useNavigate } from 'react-router-dom'; 
import {useParams} from 'react-router'
import ContinueFooter from '../../footer/ContinueFooter';
import { MdRemoveCircleOutline , MdAddCircleOutline } from 'react-icons/md'
import './createpanel.css'
import CreatePitchReport from './create components/CreatePitchReport';
import CreateWinningCard from './create components/CreateWinningCard';
import CreatePlaying11 from './create components/CreatePlaying11';
import CreateFixedPlayer from './create components/CreateFixedPlayer';
import CreateCaptain from './create components/CreateCaptain';
import CreateViceCaptain from './create components/CreateViceCaptain';
import CreateCreditRange from './create components/CreateCreditRange';
import CreateTeamPartision from './create components/CreateTeamPartision';
import CreateTeamCombination from './create components/CreateTeamCombination';
import NormalChip from '../../display/Filter/NormalChip';
import {toast } from 'react-toastify'
import axios from 'axios'

const CreatePanel = (props)=>{
    let navigate = useNavigate()
    let [firstActive,setFirstActive] = useState([1,0])
    let [selectValue,setSelectValue] = useState(0)
    let [standardValue,setStandardValue] = useState(0)
    let [predictionData,setPredictionData] = useState([])
    let {id} = useParams()


    let handleFirstActive = (fa)=>{
        let temp = [0,0]
        temp[fa] = 1
        setFirstActive(temp)
    }

    let handleStandardSelectChange = (e)=>{
        setSelectValue(e.target.value)
    }   

    let handleStandardClick = ()=>{
        setStandardValue(selectValue)
        //console.log(standardValue)
    }

    let getCreateComponents = (sv)=>{
        let resultTemplate = <React.Fragment></React.Fragment>
        switch (sv) {
            case 0:
                resultTemplate = <React.Fragment>
                                    <CreatePitchReport 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                    />
                                 </React.Fragment>
                break;
            case 1:
                resultTemplate = <React.Fragment>
                                    <CreateWinningCard 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        leftName= {props.leftName}
                                        rightName = {props.rightName}
                                        
                                    />
                                    </React.Fragment>
                break;
            case 2:
                resultTemplate = <React.Fragment>
                                    <CreatePlaying11 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        playerList = {props.playerList}
                                        leftName = {props.leftName}
                                        rightName = {props.rightName}
                                        leftImage = {props.leftImage}
                                        rightImage = {props.rightImage}
                                        seriesName = {props.seriesName}
                                    />
                                    </React.Fragment>
                break;
            case 3:
                resultTemplate = <React.Fragment>
                                    <CreateFixedPlayer 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        playerList = {props.playerList}
                                        leftName = {props.leftName}
                                        rightName = {props.rightName}
                                        leftImage = {props.leftImage}
                                        rightImage = {props.rightImage}
                                        seriesName = {props.seriesName}
                                    />
                                    </React.Fragment>
                break;
            case 4:
                resultTemplate = <React.Fragment>
                                    <CreateCaptain 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        playerList = {props.playerList}
                                        leftName = {props.leftName}
                                        rightName = {props.rightName}
                                        leftImage = {props.leftImage}
                                        rightImage = {props.rightImage}
                                        seriesName = {props.seriesName}
                                    />
                                    </React.Fragment>
                break;
            case 5:
                resultTemplate = <React.Fragment>
                                    <CreateViceCaptain 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        playerList = {props.playerList}
                                        leftName = {props.leftName}
                                        rightName = {props.rightName}
                                        leftImage = {props.leftImage}
                                        rightImage = {props.rightImage}
                                        seriesName = {props.seriesName}
                                    />
                                    </React.Fragment>
                break;
            case 6:
                resultTemplate = <React.Fragment>
                                    <CreateCreditRange 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                    />
                                    </React.Fragment>
                break;
            case 7:
                resultTemplate = <React.Fragment>
                                    <CreateTeamPartision 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                        leftName = {props.leftName} 
                                        rightName = {props.rightName}
                                    />
                                    </React.Fragment>
                break;
            case 8:
                resultTemplate = <React.Fragment>
                                    <CreateTeamCombination 
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                    />
                                    </React.Fragment>
                break;
            default: 
                resultTemplate = <React.Fragment>
                                    <CreatePitchReport
                                        predictionData = {predictionData}
                                        setPredictionData = {setPredictionData}
                                    />
                                </React.Fragment>
        }
        return resultTemplate;
    }

    let handlePredictionClose = (p_id)=>{
        let tempList = []
        for(let i=0;i<predictionData.length;i++)
        {
            if(predictionData[i].id !== p_id)
            {
                tempList.push({...predictionData[i]})
            }
        }
        setPredictionData(tempList)
    }

    let handleFinalContinue = ()=>{
        console.error(predictionData)
        let check = [-1,-1,-1,-1,-1,-1,-1,-1,-1]
        for(let i=0;i<predictionData.length;i++)
            check[predictionData[i].id] = 0;
        let cnt =0;
        for(let i=0;i<9;i++) if(check[i]===0) cnt++;
        if(cnt === 9)
        {
            // calling the api
            axios.post(`${props.backend}/api/expert/postprediction`,{ 
                matchId: id,
                predictionData: predictionData,
                sportIndex: props.sportIndex,
                expertNumber: props.phoneNumber
            })
            .then((response)=>{
                if(response.status === 200)
                {
                    toast.success('Prediction Data posted successfully!',{position:'top-center'})
                    navigate('/')
                    return;
                }
            })
            .catch((e)=>{
                toast.error('Something went wrong!',{position:'top-center'})
                return;
            })
        }
        else
        {
            toast.warning('Add all types of data!',{position:'top-center'})
            return;
        }
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <div className="continue-container" style={{backgroundColor:'white'}}>
                {/* nav stuff here */}
                <div className="analytic-container">
                    <div className="analytic-item">
                        <div onClick={()=>handleFirstActive(0)} className={firstActive[0]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Standard Options &nbsp;{ firstActive[0] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                        <div onClick={()=>handleFirstActive(1)}  className={firstActive[1]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Custom Options &nbsp;{ firstActive[1] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                    </div>
                </div>
                {/* options stuff here */}
                <div className='create-option-container'>
                    { firstActive.indexOf(1) === 0 ? 
                        <div className='d-flex justify-content-center align-items-center' >
                            <select onChange={handleStandardSelectChange} className='form-select' value={selectValue} style={{width:'60%'}} >
                                <option defaultValue={true} value="0">Pitch Report</option>
                                <option value="1">Winning Card</option>
                                <option value="2">Predicted Playing11</option>
                                <option value="3">Fixed Players</option>
                                <option value="4">Captain Players</option>
                                <option value="5">VC Players</option>
                                <option value="6">Team Credits</option>
                                <option value="7">Team Partision</option>
                                <option value="8">Team Combination</option>
                            </select>
                            <button onClick={()=> handleStandardClick() } className='btn btn-sm btn-primary' style={{fontWeight:500,marginLeft:5}}><MdAddCircleOutline size={20} />&nbsp; Select</button>
                        </div>
                   : null }
                    { firstActive.indexOf(1) === 1? 
                        <div className='text-center'>
                            <h6 style={{margin:0,padding:5}}>Custom Sections are still under development</h6>
                        </div>
                   : null }
                </div>
                <div style={{borderBottom:'1px solid lightgrey',margin:'0px 8px'}}></div>
                {/* options container here */}
                <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,marginLeft:8,marginRight:8,padding:5}}>
                    { 
                        predictionData.length === 0 ? 
                        <div className='text-center' style={{fontWeight:500,color:'grey'}}>No Data Is Added</div>
                        :
                        <div className='chip-container'>
                            {
                                predictionData.map(p => <NormalChip handleClose={handlePredictionClose} value={p.id} >{p.title}</NormalChip>)
                            }
                        </div>
                    }  
                </div>
                <div style={{borderBottom:'1px solid lightgrey',margin:'0px 8px'}}></div>
                {/*components stuff here*/}
                <div style={{paddingLeft:8,paddingRight:8}}>
                    {getCreateComponents(parseInt(standardValue))}
                </div>

                

            </div>
            <ContinueFooter handleContinue={handleFinalContinue} />
        </React.Fragment>
    );
}

export default CreatePanel;