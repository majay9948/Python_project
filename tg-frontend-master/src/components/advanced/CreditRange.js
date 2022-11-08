import React,{useState , useEffect} from 'react' 
import { useNavigate } from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter';
import {MdSouth , MdWest} from 'react-icons/md'
import { toast } from 'react-toastify';
import { AiFillSketchCircle } from 'react-icons/ai'
import { get_credit_range } from '../Generator/HelperFunctions';



const CreditRange = (props)=>{
    let [minimum,setMinimum] = useState(props.leftRange)
    let [maximum,setMaximum] = useState(props.rightRange)
    let [suggestionActive,setSuggestionActive] = useState(false)
    let [h2h,setH2h] = useState(null)
    let [sl,setSl] = useState(null) 
    let [gl,setGl] = useState(null)

    useEffect(()=>{
        setH2h(get_credit_range(props.selectedPlayers,0,props.sportIndex))
        setSl(get_credit_range(props.selectedPlayers,1,props.sportIndex))
        let temp_gl = get_credit_range(props.selectedPlayers,2,props.sportIndex)
        setGl(temp_gl)
        if(temp_gl!== null)
        {
            setMinimum(temp_gl.left)
            setMaximum(temp_gl.right)
        }
    },[])

    let handleInput = (e)=>{
        if(e.target.name === 'minimum')
            setMinimum(parseFloat(e.target.value))
        else if(e.target.name === 'maximum')
            setMaximum(parseFloat(e.target.value))
    }
    let handleCredit = ()=>{
        if(minimum>maximum || minimum > 100 || maximum >100)
        {
            toast.error('Enter Valid Credit Range',{
                position:"top-center"
            });
            return
        }
        props.setLeftRange(minimum)
        props.setRightRange(maximum)
        navigate('/combination')
        
    }
    let navigate = useNavigate()

    let handleSuggestion = ()=>{
        setSuggestionActive(true)
    }
    let handleKvp = (type)=>{
        if(type === 0)
        {
            setMinimum(gl.left)
            setMaximum(gl.right)
        }
        else if(type === 1)
        {
            setMinimum(sl.left)
            setMaximum(sl.right)
        }
        else 
        {
            setMinimum(h2h.left)
            setMaximum(h2h.right)
        }
        setSuggestionActive(false)
    }

    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        {suggestionActive ?
            <div className="mini-big-container">
                <div className="section-info" style={{lineHeight:"1.2"}}>
                    <span className='section-primary'>Credit Range</span> <br></br>
                    <span className='section-secondary'>Give credit range to creat teams within that range of credits</span> <br></br>
                    <span className='section-secondary'>Example Range will be <span style={{color:'black',fontWeight:500}}>97 - 100 credtis</span></span>
                </div>
                <div style={{backgroundColor:'#fff',paddingLeft:8,paddingRight:8}}>
                    <div style={{paddingTop:8,textAlign:'center'}}>
                        <MdWest onClick={() => setSuggestionActive(false) } size={22} style={{marginLeft:10,float:'left',marginTop:5}} />
                        <span className='section-primary' >Credit Range Suggestions</span>
                    </div>
                </div>  
                <div>
                    <span className='section-primary'>Grand Leauge</span>
                    <div className='partision-card-container'>
                        <div className = 'partision-item-one'>
                            <table class="table m-2">
                                <tbody>
                                <tr>
                                    <td>Minimum Credit</td>
                                    <td>{gl.left}</td>
                                </tr>
                                <tr>
                                    <td>Maximum Credit</td>
                                    <td>{gl.right}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className='btn btn-sm btn-primary' onClick={()=> handleKvp(0)} style={{marginLeft:40,marginRight:40}}>Add</button>
                    </div>
                </div>
                <div>
                    <span className='section-primary'>Small League</span>
                    <div className='partision-card-container'>
                        <div className = 'partision-item-one'>
                            <table class="table m-2">
                                <tbody>
                                <tr>
                                    <td>Minimum Credit</td>
                                    <td>{sl.left}</td>
                                </tr>
                                <tr>
                                    <td>Maximum Credit</td>
                                    <td>{sl.right}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className='btn btn-sm btn-primary' onClick={()=> handleKvp(1)} style={{marginLeft:40,marginRight:40}}>Add</button>
                    </div>
                </div>
                <div>
                    <span className='section-primary'>H2H League</span>
                    <div className='partision-card-container'>
                        <div className = 'partision-item-one'>
                            <table class="table m-2">
                                <tbody>
                                <tr>
                                    <td>Minimum Credit</td>
                                    <td>{h2h.left}</td>
                                </tr>
                                <tr>
                                    <td>Maximum Credit</td>
                                    <td>{h2h.right}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className='btn btn-sm btn-primary' onClick={()=> handleKvp(2)} style={{marginLeft:40,marginRight:40}}>Add</button>
                    </div>
                </div>
            </div>
              
        : 
        <div className='mini-big-container'>
        <div className="section-info" style={{lineHeight:"1.2"}}>
            <span className='section-primary'>Credit Range</span> <br></br>
            <span className='section-secondary'>Give credit range to creat teams within that range of credits</span> <br></br>
            <span className='section-secondary'>Ideal Range will be <span style={{color:'black',fontWeight:500}}>97 - 100 credtis</span></span>
        </div>
        <div className='credit-container'>
            <input className='credit-item' type="number" onChange={handleInput} name="minimum" placeholder='minimum team credits' value={minimum} />
                <MdSouth size={24} />
            <input className='credit-item' type="number" onChange={handleInput} name="maximum" placeholder='maximum team credits' value={maximum} />
            <div className="d-flex">
            { props.sportIndex === 0 || props.sportIndex === 1 ?
            <button onClick={()=> handleSuggestion() } className='btn btn-dark credit-item'><AiFillSketchCircle size={22} /> Suggestion</button>
                : null}
            <button onClick={()=> handleCredit() } className='btn btn-primary credit-item'>Continue</button>
            </div>
        </div>
        </div>
        }
        <GenericFooter />
        </React.Fragment>
    );
}

export default CreditRange;


