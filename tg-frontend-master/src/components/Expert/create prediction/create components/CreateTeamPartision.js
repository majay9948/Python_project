import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import NormalChip from '../../../display/Filter/NormalChip'
import { toast } from 'react-toastify';


const CreateTeamPartision = (props)=>{
    let tpl =  [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ]
    const [sp,setSp] = useState(0)
    const [selectedList,setSelectedList] = useState([])

    // form inputs her e
    const [notes,setNotes] = useState(false)
    const [extra,setExtra] = useState(null)

    let handleExtra = (e)=>{
        setExtra(e.target.value)
    }

    let handleFirstSelect = (e)=>{
        setSp(parseInt(e.target.value))
    }
    let handleFirstAdd = (e)=>{
        e.preventDefault()
        let tempList = [...selectedList]
        if(tempList.includes(parseInt(sp)))
        {
            toast.warning('Strategy already selected!',{position:'top-center'})
            return;
        }
        tempList.push(parseInt(sp))
        setSelectedList(tempList)
    }

    let handleClose = (p_index)=>{
        let tempList = [...selectedList]
        let pi = tempList.indexOf(parseInt(p_index))
        if(pi!== -1)
            tempList.splice(pi,1);
        setSelectedList(tempList)
    }

    let handleCheckbox = (e)=>{
        setNotes(!notes)
    }

    let handleSubmit = (e)=>{
        e.preventDefault();
        // some checks here 
        if(selectedList === null || selectedList.length === 0)
        {
            toast.warning('Atleast select one strategy!',{position:'top-center'})
            return;
        }
        let stuff = {
            selectedList: selectedList, 
            notes: notes,
            extra: extra
        }
        let tempList = [...props.predictionData]
          for(let i=0;i<props.predictionData.length;i++){
            if(props.predictionData[i].id === 7){
                tempList[i].selectedList = stuff.selectedList
                tempList[i].notes = notes 
                tempList[i].extra = extra
                props.setPredictionData(tempList)
                toast.success('Partision data already there, modified with new data!',{position:'top-center'})
                return;
            }
          }
          let p_data = {
            id: 7,
            title:'Partision Data',
            selectedList: selectedList,
            notes: notes,
            extra: extra
          }
          tempList.push(p_data)
          props.setPredictionData(tempList)
          toast.success('Partision Data Added!',{position:'top-center'})
          return;
    }

    return (
        <React.Fragment>
        <div style={{padding:5,marginTop:10,marginBottom:10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
            <div className='text-center' style={{fontWeight:500}}>Team Partision</div>   
            <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <form className="mt-2 p-2" onSubmit={handleSubmit}>
                <div className="text-left pl-2 text-success" style={{fontWeight:500}}>{props.leftName} - {props.rightName}</div>
                    <div className='d-flex justify-content-around align-items-center' style={{marginTop:5,marginBottom:5}}>
                        <select onChange={handleFirstSelect} value={sp} class="form-select" style={{width:'70%'}}>
                            {tpl.map((p,index) => <option value={index}>
                                                                        {p[0]} - {p[1]}
                                                            </option>
                                )}
                        </select>
                        <button onClick={handleFirstAdd} className='btn btn-sm btn-success' style={{fontWeight:500}}><MdAddCircle size={20} /> Add</button>
                    </div>
                    <div style={{backgroundColor:'rgb(234, 238, 243)',marginTop:10,marginBottom:10,borderRadius:8,padding:5}}>
                        {selectedList.length === 0 ? 
                            <div className='text-center' style={{fontWeight:500,color:'grey'}}>
                            No partision is selected
                            </div>
                        :
                            <div className="chip-container">
                            {
                                selectedList.map(p_index => <NormalChip handleClose={handleClose} value={p_index} >{`${tpl[p_index][0]}-${tpl[p_index][1]}`}</NormalChip>)
                            }
                            </div>
                        }  
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

export default CreateTeamPartision; 