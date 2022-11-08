import React from 'react'
import SideHeading from './SideHeading';
import PredictionNote from './PredictionNote';

const PredictionCredit = (props)=>{
    return (
        <React.Fragment>
        <SideHeading>Credit Range</SideHeading>
        <div className='d-flex justify-content-center mt-4'>
            <img src="/credit-range.jpg" className="winning-card-image image-rounded" />
        </div>
        {/* credit range stuff here */}
        <div class="grid-container" style={{alignSelf:'stretch',margin:'15px 5px 5px 5px'}}>
                    <div class="box">
                        <div className="prediction-mini-side-heading">Left Credit</div>
                        <h6 style={{marginLeft:20}}>{props.data.leftCredit}</h6>
                    </div>
                    <div class="box"> 
                        <div className="prediction-mini-side-heading">Right Credit</div>
                        <h6 style={{marginLeft:20}}>{props.data.rightCredit}</h6>
                    </div>
                     {/* note stuff here */}
               

                </div>
                <div style={{paddingLeft:10,paddingRight:10}}>
                {props.data.notes ? 
                    <PredictionNote 
                        title="Credit Range Notes"
                        content={props.data.extra}
                     />
                     : null}
                </div>
        </React.Fragment>
    );
}
export default PredictionCredit;  