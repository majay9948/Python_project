import React,{useState} from 'react' 
import CreatePlayerSelection from './CreatePlayerSelection';
import {MdOfflinePin} from 'react-icons/md'
import { toast } from 'react-toastify';

const CreatePlaying11 = (props)=>{
    const [template,setTemplate] = useState(false)
    const [requiredData,setRequiredData] = useState(null)
    const [notes,setNotes] = useState(false)
    const [extra,setExtra] = useState(null)

    let handleCheckbox = (e)=>{
        setNotes(!notes)
    }
    let handleExtra = (e)=>{
        setExtra(e.target.value)
    }

    let handleAddPlaying11 = ()=>{
        setTemplate(true)
    }
    let handleRemovePlaying11 = ()=>{
        setRequiredData(null)
        toast.success('Playing11 data removed!',{position:'top-center'})
    }

    let handleSubmit = (e)=>{
        e.preventDefault();
          // some validation checks here 
          if(requiredData === null)
          {
              toast.warning('Select Playing11!',{position:'top-center'})
              return;
          }
          let stuff = {
              leftSideTeam: requiredData.leftSideTeam,
              rightSideTeam: requiredData.rightSideTeam,
              notes: notes,
              extra:extra
          }
          let tempList = [...props.predictionData]
          for(let i=0;i<props.predictionData.length;i++){
            if(props.predictionData[i].id === 2){
                tempList[i].leftSideTeam = requiredData.leftSideTeam
                tempList[i].rightSideTeam = requiredData.rightSideTeam
                tempList[i].notes = notes 
                tempList[i].extra = extra
                props.setPredictionData(tempList)
                toast.success('Playing-11 already there, modified with new data!',{position:'top-center'})
                return;
            }
          }
          let p_data = {
            id: 2,
            title:'Playing11',
            leftSideTeam: requiredData.leftSideTeam,
            rightSideTeam: requiredData.rightSideTeam,
            notes: notes,
            extra: extra
          }
          tempList.push(p_data)
          props.setPredictionData(tempList)
          toast.success('Playing-11 Added!',{position:'top-center'})
          return;
    }

    return (
        <React.Fragment>
        { template ?
            <CreatePlayerSelection 
                template = {template}
                setTemplate = {setTemplate}
                leftName = {props.leftName} 
                rightName = {props.rightName}
                leftImage = {props.leftImage}
                rightImage = {props.rightImage}
                playerList = {props.playerList}
                type = {0}
                requiredData = {requiredData}
                setRequiredData = {setRequiredData}
            />
            :
            <div style={{padding:5,marginTop:10,marginBottom:10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
                <div className='text-center' style={{fontWeight:500}}>Predicted Playing11</div>   
                <div style={{borderBottom:'0.5px solid grey',marginTop:5}}>
                </div>
                <div>
                    <form className="mt-2 p-2" onSubmit={handleSubmit}>
                        <div className='d-flex align-items-center justify-content-center'>
                            {requiredData === null? 
                                <button className='btn btn-success' onClick={()=> handleAddPlaying11()} style={{fontWeight:500}}>Add Playing11</button>
                                : 
                                <div className="expert-block">
                                    <div className='expert-content'>
                                        <div className='expert-box' style={{padding:10,fontWeight:400,fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                            <MdOfflinePin size={24} style={{color:'green'}}/> <span>&nbsp;Data Added</span><button className='btn btn-sm btn-danger' onClick={()=> handleRemovePlaying11()} style={{marginLeft:5,fontWeight:500}}>X</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div class="form-check mt-2">
                            <input type="checkbox" checked={notes} onChange={handleCheckbox} class="form-check-input" id="pitchReportNote" />
                            <label class="form-check-label" for="pitchReportNote">Want to add notes?</label>
                        </div>
                    {
                            notes? 
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Extra Notes</label>
                                <textarea class="form-control" onChange={handleExtra} id="exampleFormControlTextarea1" rows="3">{extra}</textarea>
                            </div>
                            : null
                    }
                        <button type="submit" class="btn btn-primary mt-2">Add This Section</button>
                    </form>
                </div>
            </div>
            
        }
        </React.Fragment>
    );
}

export default CreatePlaying11; 