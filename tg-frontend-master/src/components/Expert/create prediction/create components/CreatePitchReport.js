import React,{useState,useEffect} from 'react' 
import {MdAddCircle} from 'react-icons/md'
import { toast } from 'react-toastify';

const CreatePitchReport = (props)=>{

    const [pname,setPname] = useState(null)
    const [plocation,setPlocation] = useState(null) 
    const [weather,setWeather] = useState(0)
    const [pitchType,setPitchType] = useState(0)
    const [avgScore,setAvgScore] = useState(null)
    const [firstBatting,setFirstBatting] = useState(null) 
    const [secondBatting,setSecondBatting] = useState(null)
    const [notes,setNotes] = useState(false)
    const [extra,setExtra] = useState(null)

    let handlePname = (e)=>{
        setPname(e.target.value)
    }
    let handlePlocation = (e)=>{
        setPlocation(e.target.value)
    }
    let handleWeather = (e)=>{
        setWeather(e.target.value)
    }
    let handlePitchType = (e)=>{
        setPitchType(e.target.value)
    }
    let handleAvgScore = (e)=>{
        setAvgScore(parseInt(e.target.value))
    }
    let handleFirstBatting = (e)=>{
        setFirstBatting(parseFloat(e.target.value))
    }
    let handleSecondBatting = (e)=>{
        setSecondBatting(parseFloat(e.target.value))
    }
    let handleExtra = (e)=>{
        setExtra(e.target.value)
    }
    let handleCheckbox = (e)=>{
        setNotes(!notes)
    }
    let handleSubmit = (e)=>{
        e.preventDefault();
        //validation stuff here 
        if(pname === null || plocation === null || avgScore === null || firstBatting === null || secondBatting === null){
            toast.warning('All fields should be filled!',{position:'top-center'})
            return;
        }
        if(firstBatting+secondBatting!== 100)
        {
            toast.warning('Sum of winning % should be equal to 100!',{position:'top-center'})
            return;
        }
        let stuff = {
            name: pname,
            location: plocation,
            weather: weather, 
            avgScore: avgScore,
            firstBatting: firstBatting,
            secondBatting: secondBatting,
            notesAvailable: notes, 
            extraNotes: extra
        }
        let tempList = [...props.predictionData]
        for(let i=0;i<props.predictionData.length;i++){
          if(props.predictionData[i].id === 0){
              tempList[i].name = stuff.name
              tempList[i].location = stuff.location
              tempList[i].weather = stuff.weather
              tempList[i].avgScore = stuff.avgScore
              tempList[i].firstBatting = stuff.firstBatting
              tempList[i].secondBatting = stuff.secondBatting
              tempList[i].notes = notes 
              tempList[i].extra = extra
              props.setPredictionData(tempList)
              toast.success('Pitch Report already there, modified with new data!',{position:'top-center'})
              return;
          }
        }
        let p_data = {
          id: 0,
          title:'Pitch Report',
          name: pname,
          location: plocation,
          pitchType: pitchType,
          weather: weather, 
          avgScore: avgScore,
          firstBatting: firstBatting,
          secondBatting: secondBatting,
          notes: notes,
          extra: extra
        }
        tempList.push(p_data)
        props.setPredictionData(tempList)
        toast.success('Pitch Report Added!',{position:'top-center'})
        return;
    }


    return (
        <React.Fragment>
        <div style={{padding:5,marginTop:10,marginBottom:10,boxShadow:'0px 0px 5px grey',borderRadius:5}}> 
            <div className='text-center' style={{fontWeight:500}}>Pitch Report</div>   
            <div style={{borderBottom:'0.5px solid grey',marginTop:5}}></div>
            <div>
                <form className="mt-2 p-2" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="pitchName">Pitch Name: </label>
                        <input type="text" onChange={handlePname} class="form-control" id="pitchName" value={pname}  placeholder="Enter Pitch Name" />
                    </div>
                    <div class="form-group">
                        <label for="pitchLocation">Location (ex: mumbai): </label>
                        <input type="text" onChange={handlePlocation} value={plocation} class="form-control" id="pitchLocation"  placeholder="Enter Location" />
                    </div>
                    <div class="form-group">
                        <label for="pitchType">Pitch Type: </label>
                        <select onChange={handlePitchType} className='form-control' id="pitchType">
                            <option defaultValue={true} value={pitchType}>Batting</option>
                            <option value="1">Bowling</option>
                            <option value="2">Balanced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pitchWeather">Weather: </label>
                        <select onChange={handleWeather} className='form-control' id="pitchWeather">
                            <option defaultValue={true} value={weather}>Full Sunny</option>
                            <option value="1">Sum + Cloud</option>
                            <option value="2">Cloud</option>
                            <option value="3">Rain</option>
                            <option value="4">Night</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pitchAvg">Avg Score: </label>
                        <input type="number" onChange={handleAvgScore} value={avgScore} class="form-control" id="pitchAvg"  placeholder="Enter Avg Score" />
                    </div>
                    <div class="form-group">
                        <label for="pitchFirst">First Batting Win %: </label>
                        <input type="number" onChange={handleFirstBatting} value={firstBatting} class="form-control" id="pitchFirst"  placeholder="Enter First Win %" />
                    </div>
                    <div class="form-group">
                        <label for="pitchSecond">Second Batting Win %: </label>
                        <input type="number" onChange={handleSecondBatting} value={secondBatting} class="form-control" id="pitchSecond"  placeholder="Enter Second Win %" />
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
        
        </React.Fragment>
    );
}

export default CreatePitchReport; 