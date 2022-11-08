import React,{useState,useEffect} from 'react'
import PlayerData from './PlayerData'
import SideHeading from './SideHeading'
import PredictionNote from './PredictionNote'

const PredictionVicecaptain = (props)=>{
    let [leftSideTeam,setLeftSideTeam] = useState([])
    let [rightSideTeam,setRightSideTeam] = useState([])
    useEffect(()=>{
        let left_team = []
        let right_team = []
        let left_11_team = []
        let right_11_team = []
        let temp_list = []
        for(let i=0;i<70;i++)
            temp_list.push(null)
        for(let i=0;i<props.playerList.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                let p = {...props.playerList[i][j]}
                temp_list[p.player_index] = p;
                if(props.lineups && p.playing === 1 && p.team_index === 0)
                    left_11_team.push(p)
                if(props.lineups && p.playing === 1 && p.team_index === 1)
                    right_11_team.push(p)
            }
        }
        for(let i=0;i<props.data.leftSideTeam.length;i++)
        {
            if(props.lineups)
            {
                if(temp_list[props.data.leftSideTeam[i]].playing === 1)
                {
                    left_team.push(temp_list[props.data.leftSideTeam[i]])
                }
            }
            else
             left_team.push(temp_list[props.data.leftSideTeam[i]])
        }
        for(let i=0;i<props.data.rightSideTeam.length;i++)
        {
            if(props.lineups)
            {
                if(temp_list[props.data.rightSideTeam[i]].playing === 1)
                {
                    right_team.push(temp_list[props.data.rightSideTeam[i]])
                }
            }
            else
             right_team.push(temp_list[props.data.rightSideTeam[i]])
        }
        left_team.sort((x,y)=>{
            if(x.role<y.role)
                return -1;
            else 
                return 1;
        })
        right_team.sort((x,y)=>{
            if(x.role<y.role)
                return -1;
            else 
                return 1;
        })
        setLeftSideTeam(left_team)
        setRightSideTeam(right_team)
    },[])
    return (
        <React.Fragment>
        <SideHeading>Vice Captain Players</SideHeading>
            <div className='d-flex justify-content-center'>
                <img src="/vicecaptain-player.jpg" className="winning-card-image" />
            </div>
            {/* Vice captain Player stuff here */}
            <div className="playing11">
            <div className='left-playing11'>
                <div className="combine-image" style={{alignSelf:'center'}}>
                    <img className="team-image" src={props.leftImage} alt="left" />
                    <span className="left-team-name">{props.leftName}</span>
                </div>
                <hr></hr>
                {/* left playing 11 */}
                <div style={{marginLeft:8}}>
                {leftSideTeam.map(data => <PlayerData data={data} type={3} /> )}
                </div>
                {leftSideTeam.length === 0 ? <span style={{alignSelf:'center',color:'grey'}}>No Player</span> : null}
               
            </div>
            <div className='right-playing11'>
                <div className="combine-image"  style={{alignSelf:'center'}}>
                    <span className="right-team-name">{props.rightName}</span>
                    <img className="team-image" src={props.rightImage} alt="right" />
                </div>
                <hr></hr>
                 {/* right playing 11 */}
                 <div style={{marginLeft:8}}>
                 {rightSideTeam.map(data => <PlayerData data={data} type={3} /> )}
                 </div>
                {rightSideTeam.length === 0 ? <span style={{alignSelf:'center',color:'grey'}}>No Player</span> : null}

            </div>             
        </div>
        <div style={{paddingLeft:10,paddingRight:10}}>
        {/* note stuff here */}
        {props.data.notes ? 
            <PredictionNote 
                title="Vice captain Notes"
                content={props.data.extra}
             />
             : null}
        </div>
        </React.Fragment>
    );
}

export default PredictionVicecaptain;