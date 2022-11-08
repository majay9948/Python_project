import React,{useState} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import {toast} from 'react-toastify'

const CreateWinningCard = (props)=>{

    const [winningTeam,setWinningTeam] = useState(0)
    const [winningType,setWinningType] = useState(0)
    const [notes,setNotes] = useState(false)
    const [extra,setExtra] = useState(null)


    let handleCheckbox = (e)=>{
        setNotes(!notes)
    }
    let handleWinningTeam = (e)=>{
        setWinningTeam(parseInt(e.target.value))
    }
    let handleWinningType = (e)=>{
        setWinningType(parseInt(e.target.value))
    }
    let handleExtra = (e)=>{
        setExtra(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault();
        let tempList = [...props.predictionData]
        for(let i=0;i<props.predictionData.length;i++){
          if(props.predictionData[i].id === 1){
              tempList[i].winningTeam = winningTeam
              tempList[i].winningType = winningType
              tempList[i].notes = notes 
              tempList[i].extra = extra
              props.setPredictionData(tempList)
              toast.success('captain data already there, modified with new data!',{position:'top-center'})
              return;
          }
        }
        let p_data = {
          id: 1,
          title:'Winning Data',
          winningTeam: winningTeam,
          winningType:winningType,
          notes: notes,
          extra: extra
        }
        tempList.push(p_data)
        props.setPredictionData(tempList)
        toast.success('Winning Data Added!',{position:'top-center'})
        return;
    }

    return (
        <React.Fragment>
        <div style={{padding:5,marginTop:10,marginBottom: 10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
            <div className='text-center' style={{fontWeight:500}}>Winning Card</div>   
            <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <form className="mt-2 p-2" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="winningTeam">Winning Team: </label>
                        <select onChange={handleWinningTeam} value={winningTeam} className='form-control' id="winningTeam">
                            <option defaultValue={true} value="0">{props.leftName}</option>
                            <option value="1">{props.rightName}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="winningType">Win Type: </label>
                        <select onChange={handleWinningType} value={winningType} className='form-control' id="winningType">
                            <option defaultValue={true} value="0">One Side Match</option>
                            <option value="1">Neck to Neck</option>
                        </select>
                    </div>
                    <div class="form-check mt-2">
                        <input type="checkbox" onChange={handleCheckbox} checked={notes} class="form-check-input" id="pitchReportNote" />
                        <label class="form-check-label" for="pitchReportNote">Want to add notes?</label>
                    </div>
                    {
                        notes?  
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Extra Notes</label>
                            <textarea onChange={handleExtra} class="form-control" id="exampleFormControlTextarea1" rows="3">{extra}</textarea>
                        </div>
                        : null
                    }
                    <button type="submit" class="btn btn-primary mt-2">Add This Section</button>
                </form>
            </div>
        </div>
        </React.Fragment>
    );
}

export default CreateWinningCard; 