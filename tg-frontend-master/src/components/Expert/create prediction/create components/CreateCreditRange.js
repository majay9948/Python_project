import React,{useState} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import {toast} from 'react-toastify'

const CreateCreditRange = (props)=>{

    const [notes,setNotes] = useState(false)
    const [extra,setExtra] = useState(null)
    const [leftCredit,setLeftCredit] = useState(null)
    const [rightCredit,setRightCredit] = useState(null) 



    let handleCheckbox = (e)=>{
        setNotes(!notes)
    }
    let handleLeftCredit = (e)=>{
        setLeftCredit(parseFloat(e.target.value))
    } 
    let handleRightCredit = (e)=>{
        setRightCredit(parseFloat(e.target.value))
    }
    let handleExtra = (e)=>{
        setExtra(e.target.value)
    }
    let handleSubmit = (e)=>{
        e.preventDefault();
        // some validation checks here 
        if(leftCredit === null || rightCredit === null || leftCredit>rightCredit)
        {
            toast.warning('Invalid or Empty Credits!',{position:'top-center'})
            return;
        }
        let tempList = [...props.predictionData]
        for(let i=0;i<props.predictionData.length;i++){
          if(props.predictionData[i].id === 6){
              tempList[i].leftCredit = leftCredit
              tempList[i].rightCredit = rightCredit
              tempList[i].notes = notes 
              tempList[i].extra = extra
              props.setPredictionData(tempList)
              toast.success('credit data already there, modified with new data!',{position:'top-center'})
              return;
          }
        }
        let p_data = {
          id: 6,
          title:'Credit Range',
          leftCredit: leftCredit,
          rightCredit: rightCredit,
          notes: notes,
          extra: extra
        }
        tempList.push(p_data)
        props.setPredictionData(tempList)
        toast.success('Credit Data Added!',{position:'top-center'})
        return;
    }

    return (
        <React.Fragment>
        <div style={{padding:5,marginTop:10,marginBottom: 10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
            <div className='text-center' style={{fontWeight:500}}>Credit Range</div>   
            <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <form className="mt-2 p-2" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="leftCredit">Left Credit: </label>
                        <input type="number" onChange={handleLeftCredit} value={leftCredit} class="form-control" id="leftCredit"  placeholder="Enter Left Credit" />
                    </div>
                    <div class="form-group">
                        <label for="rightCredit">Right Credit: </label>
                        <input type="number" onChange={handleRightCredit} value={rightCredit} class="form-control" id="rightCredit"  placeholder="Enter Right Credit" />
                    </div>
                    <div class="form-check mt-2">
                        <input type="checkbox" onChange={handleCheckbox} checked={notes} class="form-check-input" id="pitchReportNote" />
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
        
        </React.Fragment>
    );
}

export default CreateCreditRange; 