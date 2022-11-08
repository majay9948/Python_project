import React from 'react' 
import SideHeading from './SideHeading';
import PredictionNote from './PredictionNote';

const WinningCard = (props)=>{
    let teamImage = [
        props.leftImage,props.rightImage 
    ]
    let teamName = [
        props.leftName,props.rightName 
    ]
    let typeName =[
        'One Side Match',
        'Neck to Neck'
    ]
    return (
        <React.Fragment>
            <SideHeading>Winning Card</SideHeading>
            <div className='d-flex justify-content-center'>
                <img src="/winning-card.jpg" className="winning-card-image" />
            </div>
            <div class="grid-container" style={{alignSelf:'stretch',margin:5}}>
                <div class="box">
                    <div className="prediction-mini-side-heading">Win Prediction</div>
                    <div className="combine-image">
                        <img className="team-image" src={teamImage[props.data.winningTeam]} alt="team" />
                        <span className="left-team-name">{teamName[props.data.winningTeam]}</span>
                    </div>
                </div>
                <div class="box"> 
                    <div className="prediction-mini-side-heading">Win Type</div>
                    <h6 style={{marginLeft:5}}>{typeName[props.data.winningType]}</h6>
                </div>

            </div>
            <div style={{paddingLeft:10,paddingRight:10}}>
              {/* note stuff here */}
              {props.data.notes ? 
                <PredictionNote 
                    title="Winning Card Notes"
                    content={props.data.extra}
                 />
                 : null}
            </div>
        </React.Fragment>
    );
}

export default WinningCard;