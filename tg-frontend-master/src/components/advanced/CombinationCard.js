import React  from 'react' 
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'


const CombinationCard = (props)=>{
    let placeDynamicCode = ()=>{
        return props.combination.data.map((cnt,index)=>{
            let result = <div className='combination-item-one'>
                <span>{props.combinationName[index]}</span>
                <span>{cnt}</span>
            </div>
            return result
        })
    }
    return (
        <React.Fragment>
            <div onClick={()=> props.handleCombination(props.combination.id) } className={ props.combination.selected ===1 ? 'combination-card-container player-orange' : 'combination-card-container'}>
                 {placeDynamicCode()}
                <div className = 'combination-item-two text-center'  >{ props.combination.selected === 1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} /> } </div>
            </div>
        </React.Fragment>
    );
}

export default CombinationCard;