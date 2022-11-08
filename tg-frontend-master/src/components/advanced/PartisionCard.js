import React  from 'react' 
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'


const PartisionCard = (props)=>{
  
    return (
        <React.Fragment>
            <div onClick={()=> props.handlePartision(props.strategy.id) } className={ props.strategy.selected ===1 ? 'partision-card-container player-orange' : 'partision-card-container'}>
                <div className = 'partision-item-one'>
                    <div className="partision-card-sub-container">
                        <img  className='team-image p-image' src={props.leftImage} alt="left" />
                        <span className='partision-sub-item'>{props.leftName}</span>
                        <span className='partision-sub-item'>{props.strategy.data[0]}</span>
                    </div>
                    <div className="partision-card-sub-container" >
                        <img className='team-image p-image' src={props.rightImage} alt="left" />
                        <span className='partision-sub-item'>{props.rightName}</span> 
                        <span className='partision-sub-item'>{props.strategy.data[1]}</span>
                    </div>
                </div>
                <div className = 'partision-item-two text-center'  >{ props.strategy.selected === 1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} /> } </div>
                
            </div>
        </React.Fragment>
    );
}

export default PartisionCard;