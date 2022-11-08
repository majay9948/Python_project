import React from 'react' 
import SideHeading from './SideHeading';
import {MdLocationOn} from 'react-icons/md'
import {BsFillSunFill , BsFillCloudSunFill , BsFillCloudsFill , BsFillCloudRainHeavyFill } from 'react-icons/bs'
import PredictionNote from './PredictionNote';
import { WiDaySunny , WiDayCloudy , WiCloudy , WiDayRainWind , WiNightAltCloudy} from 'react-icons/wi'

const PitchReport = (props)=>{

    let pitchTypeName = [
        'Batting Pitch',
        'Bowling Pitch',
        'Balanced Pitch'
    ]
    let pitchTypeImage = [
        'bat-icon.png',
        'ball-icon.png',
        'balanced-icon.png'
    ]

    let weatherName = [
        'Sunny',
        'Sunny + Cloud',
        'Cloud',
        'Rain',
        'Night'
    ]

    let getWeatherIcon = (w_index)=>{
        let result;
        let vp = parseInt(w_index)
        switch(vp)
        {
            case 0:
                result = <WiDaySunny size={22} />
                break;
            case 1:
                result = <WiDayCloudy size={22} />
                break;
            case 2:
                result = <WiCloudy size={22} />
                break;
            case 3:
                result = <WiDayRainWind size={22} />
                break;
            case 4:
                result = <WiNightAltCloudy size={22} />
                break;
            default:
                result = <WiDaySunny size={22} />
        }
        return result;
    }


    return (
        <React.Fragment>
            <SideHeading>Pitch Report</SideHeading>
            <div className="d-flex flex-column align-items-center" style={{paddingLeft:10,paddingRight:10}}>
                <div className='pitch-team pt-4 d-flex flex-column align-items-center justify-content-between'>
                   <div className='d-flex align-items-center justify-content-center'>
                        <img src={`/${pitchTypeImage[props.data.pitchType]}`} alt="pitch"  className="pitch-icon" />
                        <span className="pitch-heading">{pitchTypeName[props.data.pitchType]}</span>
                   </div>
                   <div className='text-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <img src="/pitch-venue.png" className="pitch-icon" />
                            <span style={{marginLeft:5}}>{props.data.name}</span>
                        </div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <MdLocationOn size={20} />
                            <span style={{marginLeft:5}}>{props.data.location}</span>
                        </div>
                   </div>
                </div>
                {/* pitch details stuff here */}
                <div class="grid-container" style={{alignSelf:'stretch',margin:5}}>
                    <div class="box">
                        <div className="prediction-mini-side-heading">Weather</div>
                        <div className='d-flex align-items-center' style={{marginLeft:5}}>
                            {getWeatherIcon(props.data.weather)}
                            <span style={{marginLeft:5}}>{weatherName[props.data.weather]}</span>
                        </div>
                    </div>
                    <div class="box"> 
                        <div className="prediction-mini-side-heading">Avg Score</div>
                        <h6 style={{marginLeft:5}}>{props.data.avgScore}</h6>
                    </div>
                    <div class="box">
                        <div className="prediction-mini-side-heading">1st Batting Win%</div>
                        <h6 style={{marginLeft:5}}>{props.data.firstBatting}%</h6>
                    </div>
                    <div class="box">
                        <div className="prediction-mini-side-heading">2nd Batting Win%</div>
                        <h6 style={{marginLeft:5}}>{props.data.secondBatting}%</h6>
                    </div>
                </div>
                {/* note stuff here */}
                {props.data.notes ? 
                <PredictionNote 
                    title="Pitch Report Notes"
                    content={props.data.extra}
                 />
                 : null}
            </div>
        </React.Fragment>
    );
}
export default PitchReport;