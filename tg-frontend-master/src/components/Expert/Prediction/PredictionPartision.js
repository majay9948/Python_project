import React from 'react' 
import SideHeading from './SideHeading';
import MiniSideHeading from './MiniSideHeading'
import PredictionNote from './PredictionNote';

const PredictionPartision = (props)=>{
    let ps = [ 
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ]
    return (
        <React.Fragment>
        <SideHeading>Team Partision</SideHeading>
        <div className='d-flex justify-content-center mt-4'>
            <img src="/team-partision.jpg" className="winning-card-image image-rounded" />
        </div>
        <MiniSideHeading>possible partision strategies</MiniSideHeading>
        {/* team partision stuff here */}
        <div class="grid-container" style={{alignSelf:'stretch',margin:5}}> 
            {props.data.selectedList.map(p_index => 
                <div className="partision-box">
                    <div className="sub-partision-box">
                        <div className="combine-image">
                            <img className="team-image" src={props.leftImage} alt="left" />
                            <span className="right-team-name">{props.leftName}&nbsp;-&nbsp;</span>
                        </div>
                        <span className='right-team-name'>{ps[p_index][0]}</span>
                    </div>
                    <div className="sub-partision-box">
                        <div className="combine-image" >
                            <img className="team-image" src={props.rightImage} alt="right" />
                            <span className="right-team-name">{props.rightName}&nbsp;-&nbsp;</span>
                        </div>
                        <span className='right-team-name'>{ps[p_index][1]}</span>
                    </div>
                </div>
                )}

                
        </div>
        <div style={{paddingLeft:10,paddingRight:10}}>
         {/* note stuff here */}
         {props.data.notes ? 
            <PredictionNote 
                title="Partision Strategy Notes"
                content={props.data.extra}
             />
             : null}
        </div>
        </React.Fragment>
    );
}

export default PredictionPartision;