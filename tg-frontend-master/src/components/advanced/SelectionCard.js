import React  from 'react' 
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'


const SelectionCard = (props)=>{
  
    return (
        <React.Fragment>
            <div  onClick={()=> props.handleSelection(props.strategy.id) } className={ props.strategy.selected ===1 ? 'partision-card-container player-orange' : 'partision-card-container'}>
                <div className = 'partision-item-one'>
                    <table class="table m-2">
                        <tbody>
                           {props.limit.map((l,index)=>
                            <tr>
                                <td>{l[0]} - {l[1]}%</td>
                                <td>{props.strategy.data[index]}</td>
                            </tr>
                           )}
                        </tbody>
                    </table>
                </div>
                <div className = 'partision-item-two text-center'  >{ props.strategy.selected === 1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} /> } </div>
                
            </div>
        </React.Fragment>
    );
}

export default SelectionCard;