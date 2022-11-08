import React from 'react'
import SideHeading from './SideHeading';
import MiniSideHeading from './MiniSideHeading';
import PredictionNote from './PredictionNote';

const PredictionStrategy = (props)=>{
    let ts = [
        [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
        [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
        [3,3,2,3],[3,4,1,3],[3,3,1,4],
        [4,3,1,3]
    ]
    return (
        <React.Fragment>
        <SideHeading>Team Strategy</SideHeading>
        <div className='d-flex justify-content-center mt-4'>
            <img src="/team-strategy.jpg" className="winning-card-image image-rounded" />
        </div>
        <MiniSideHeading>possible team combinations</MiniSideHeading>
            {props.data.selectedList.map(t_index =>  
                <div className="combination-card-container">
                    <div className='combination-item-one'>
                        <span>WK</span>
                        <span>{ts[t_index][0]}</span>
                    </div>
                    <div className='combination-item-one'>
                        <span>BAT</span>
                        <span>{ts[t_index][1]}</span>
                    </div>
                    <div className='combination-item-one'>
                        <span>AL</span>
                        <span>{ts[t_index][2]}</span>
                    </div>
                    <div className='combination-item-one'>
                        <span>BOWL</span>
                        <span>{ts[t_index][3]}</span>
                    </div>
                </div>
                )}
            <div style={{paddingLeft:10,paddingRight:10}}>
             {/* note stuff here */}
             {props.data.notes ? 
                <PredictionNote 
                    title="Team Combination Notes"
                    content={props.data.extra}
                 />
                 : null}
            </div>
        </React.Fragment>
    );
}

export default PredictionStrategy;