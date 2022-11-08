import React,{useState,useRef,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import { useParams } from "react-router";
import GenericFooter from '../footer/GenericFooter';
import { toast } from 'react-toastify';
import {MdRemoveCircleOutline,MdAddCircleOutline} from 'react-icons/md'
import Table from './Table'
import {HiOutlineExternalLink} from 'react-icons/hi'


const Analytics = (props)=>{
    let limit = [
        [0,29],
        [30,69],
        [70,100]
    ]

    let [active,setActive] = useState([1,0,0,0,0,0,0])
    let section_name = [
        "Player Selection Data",
        "Captain Selection Data",
        "Vice Captain Selection Data",
        "Combination Selection Data",
        "Credit Selection Data",
        "Team Partision Data",
        "Player % selection Data"
    ] 
    let main_name =  useRef(null)
    let [first,setFirst] = useState([[],[],[]])
    let [second,setSecond] = useState([[],[],[]])
    let [third,setThird] = useState([[],[],[]])
    let [fourth,setFourth] = useState([[],[],[]])
    let [fifth,setFifth] = useState([[],[],[]])
    let [sixth,setSixth] = useState([[],[],[]])
    let [seventh,setSeventh] = useState(null)

   

    let navigate = useNavigate()
    let sportIndex = useRef(null)
    const {match,attempt} = useParams()
    let [finalTeamData,setFinalTeamData] = useState([])
    let get_player_list = ()=>{
        if(sportIndex.current===2)
            return [[],[],[],[],[]]
        else if(sportIndex.current===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    let get_percentage = (x,y)=>{
        return `${parseInt((x/y)*100)}%`;
    }

    useEffect(()=>{
      
        let data = JSON.parse(localStorage.getItem('tgk_data'))
        for(let i=0;i<data.length;i++)
        {
            for(let j=0;j<data[i].length;j++)
            {
                if(data[i][j].id.toString() === match.toString())
                {
                    sportIndex.current = i;
                    break;
                }
            }
        }
        let match_list = data[sportIndex.current] 
        let req_match = null 
        for(let i=0;i<match_list.length;i++)
        {
            if(match_list[i].id.toString() === match.toString())
            {
                req_match = match_list[i]
                break;
            }
        }

        let cs = [
            [
                [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
                [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
                [3,3,2,3],[3,4,1,3],[3,3,1,4],
                [4,3,1,3]
            ],
            [ 
                [1,4,5,1],[1,5,4,1],[1,5,3,2],[1,4,4,2],[1,3,4,3],[1,4,3,3],[1,3,5,2]
            ],
            [
                [1,1,1,1,4],[1,1,1,2,3],[1,1,1,3,2],[1,1,1,4,1],[1,1,2,1,3],[1,1,2,2,2],[1,1,2,3,1],[1,1,3,2,1],[1,1,4,1,1],[1,2,1,1,3],[1,2,1,2,2],[1,2,2,1,2],[1,2,2,2,1],[1,2,3,1,1],[1,3,1,1,2],[1,3,1,2,1],[1,3,2,1,1],[1,4,1,1,1],
                [2,1,1,1,2],[2,1,1,1,3],[2,1,1,2,2],[2,1,1,3,1],[2,1,2,1,2],[2,1,2,2,1],[2,1,3,1,1],[2,2,1,1,2],[2,2,1,2,1],[2,2,2,1,1],[2,3,1,1,1],
                [3,1,1,1,2],[3,1,1,2,1],[3,1,2,1,1],[3,2,1,1,1],
                [4,1,1,1,1]
             ],
             [
                [2,2,3],[3,2,2],[3,1,3],[4,1,2],[4,2,1]
            ]
        ]

        let ps = [
            [
            [4,7],
            [5,6],
            [6,5],
            [7,4]
        ],
        [
            [4,7],
            [5,6],
            [6,5],
            [7,4]
        ],
        [
            [3,5],
            [4,4],
            [5,3]
        ],
        [
            [2,5],
            [3,4],
            [4,3],
            [5,2]
        ]
        ]
        // console.log(sportIndex.current)
        // console.log(req_match)
        if(req_match===null)
        {
            navigate('/')
            return 
        }
        main_name.current =  [
            "Player",
            "Player",
            "Player",
            "Combination",
            "Credits",
            `${req_match.left_name} - ${req_match.right_name}`,
            "player %"
        ]
        let req_attempt = null 
        for(let i=0;i<req_match.attempts.length;i++)
        {
            if(attempt.toString() === req_match.attempts[i].id.toString())
            {
                req_attempt = req_match.attempts[i]
            }
        }
        if(req_attempt===null || req_attempt.type === 'toss')
        {
            navigate('/')
            return 
        }
        let temp_list = []
        for(let i=0;i<70;i++)
            temp_list.push(null)
        for(let i=0;i<req_attempt.player_list.length;i++)
        {
            for(let j=0;j<req_attempt.player_list[i].length;j++)
            {
                let p = req_attempt.player_list[i][j]
                temp_list[p.player_index] = p;
            }
        }
        
        let final_team_list = []
        for(let i=0;i<req_attempt.team_list.length;i++)
        {
            let temp_team = req_attempt.team_list[i]
            let final_team = get_player_list()
            for(let j=0;j<temp_team.team.length;j++)
            {
                for(let k=0;k<temp_team.team[j].length;k++)
                {
                    final_team[j].push(temp_list[temp_team.team[j][k]])
                }
            }
            final_team_list.push({
                team_number: temp_team.team_number,
                captain: temp_team.captain,
                final_team:final_team,
                vicecaptain : temp_team.vicecaptain,
                credits: temp_team.credits
            })
        }
        setFinalTeamData(final_team_list)
        //now setting up the things in our direction 
        // 1) player selection analytics 
        let first_data = [] // player selection % 
        let second_data = [] // captain player selection % 
        let third_data = [] // vicecaptain player selection % 
        let fourth_data = [] // strategy selection % 
        let fifth_data = [] // credits selection % 
        let sixth_data = [] // player partision selection % 
        let seventh_data = req_attempt.selection_strategy === true ? [] : null ; //% of player selection % 
      

        for(let i=0;i<70;i++)
        {   
            first_data.push(0)
            second_data.push(0)
            third_data.push(0)
        }
        for(let i=0;i<final_team_list.length;i++)
        {
            let ft = final_team_list[i]
            let t_one =0
            let t_two =0
            let vp = [0,0,0]
            for(let j=0;j<ft.final_team.length;j++)
            {
                for(let k=0;k<ft.final_team[j].length;k++)
                {
                    let p = ft.final_team[j][k];
                    //selection 
                    if(p.selected_by>=parseFloat(limit[0][0]) && p.selected_by<=parseFloat(limit[0][1]))
                        vp[0]++;
                    else if(p.selected_by>=parseFloat(limit[1][0]) && p.selected_by<=parseFloat(limit[1][1]))
                        vp[1]++;
                    else 
                        vp[2]++;

                    if(p.team_index===0)
                        t_one++;
                    else 
                        t_two++;

                    first_data[p.player_index] = first_data[p.player_index] + 1 
                    if(ft.captain === p.player_index)
                    {
                        second_data[p.player_index] = second_data[p.player_index] +1
                    }
                    if(ft.vicecaptain === p.player_index)
                    {
                        third_data[p.player_index] = third_data[p.player_index] + 1
                    }
                   
                    // credits, team partision and player selection % stuff need to be done here     
                }
               
                 
            }

              // player % of % section 
              if(req_attempt.selection_strategy === true )
              {
                  let percentage_key = `${vp[0]}-${vp[1]}-${vp[2]}`
                  let percentage_flag = false 
                  for(let p=0;p<seventh_data.length;p++)
                  {
                      if(seventh_data[p].key=== percentage_key)
                      {
                          seventh_data[p].value = seventh_data[p].value + 1 
                          percentage_flag = true 
                          break;
                      }
                  }
                  if(percentage_flag === false)
                  {
                      seventh_data.push({key:percentage_key,value:1})
                  }
              }
              // team partision stuff here 
              let p_key = `${t_one} - ${t_two}`
              let p_flag = false 
              for(let p=0;p<sixth_data.length;p++)
              {
                  if(sixth_data[p].key === p_key)
                  {
                      sixth_data[p].value = sixth_data[p].value + 1 
                      p_flag = true 
                      break;
                  }
              }
              if(p_flag === false)
              {
                  sixth_data.push({key:p_key,value:1})
              }

              sixth_data.sort((x,y)=>{
                  let x_value = parseInt(x.key.replace(" - ",""))
                  let y_value = parseInt(y.key.replace(" - ",""))
                  if(x_value<y_value)
                    return -1;
                   return 1;
              })

              //strategies stuff here 
              let flag = false 
              let s_key = ''
              for(let p=0;p<ft.final_team.length-1;p++)
              {
                  s_key = s_key + `${ft.final_team[p].length}-`
              }
              s_key = s_key + `${ft.final_team[ft.final_team.length-1].length}`
              for(let p=0;p<fourth_data.length;p++)
              {
                  if(fourth_data[p].key===s_key)
                  {
                      fourth_data[p].value = fourth_data[p].value + 1 
                      flag = true 
                      break;
                  }
              }
              if(flag === false)
              {
                  fourth_data.push({key:s_key,value: 1})
              }
              //credits stuff here 
              let c_flag = false 
              for(let p=0;p<fifth_data.length;p++)
              {
                  if(fifth_data[p].key===ft.credits)
                  {
                      fifth_data[p].value = fifth_data[p].value + 1 
                      c_flag = true 
                      break;
                  }
              }
              if(c_flag === false)
              {
                fifth_data.push({key:ft.credits,value: 1})
              }
        }
        //sorting the credits data 
        fifth_data.sort((x,y)=>{
            if(x.key<y.key)
                return -1;
            return 1;
        })
        //nailing the first thing 
        let first_key = []
        let first_filter_value = []
        let first_value =[]
        let first_percentage = []
        for(let i=0;i<first_data.length;i++)
        {
            if(temp_list[i]!==null)
            {
                first_key.push(temp_list[i].name)
                first_filter_value.push(temp_list[i].player_index)
                first_value.push(first_data[i])
                first_percentage.push(get_percentage(first_data[i],req_attempt.number_of_teams))
             }
        }
        setFirst([first_key,first_value,first_percentage,first_filter_value])
        //naling the second thing 
        let second_key = []
        let second_filter_value = []
        let second_value =[]
        let second_percentage = []
        for(let i=0;i<second_data.length;i++)
        {
            if(temp_list[i]!==null)
            {
                second_key.push(temp_list[i].name)
                second_filter_value.push(temp_list[i].player_index)
                second_value.push(second_data[i])
                second_percentage.push(get_percentage(second_data[i],req_attempt.number_of_teams))
             }
        }
        setSecond([second_key,second_value,second_percentage,second_filter_value])
        //naling the third thing 
        let third_key = []
        let third_filter_value = []
        let third_value =[]
        let third_percentage = []
        for(let i=0;i<third_data.length;i++)
        {
            if(temp_list[i]!==null)
            {
                third_key.push(temp_list[i].name)
                third_filter_value.push(temp_list[i].player_index)
                third_value.push(third_data[i])
                third_percentage.push(get_percentage(third_data[i],req_attempt.number_of_teams))
             }
        }
        setThird([third_key,third_value,third_percentage,third_filter_value])
        let fourth_key = []
        let fourth_filter_value = []
        let fourth_value =[]
        let fourth_percentage = []

        for(let i=0;i<fourth_data.length;i++)
        {
            fourth_key.push(fourth_data[i].key)
            let d = fourth_data[i].key.split('-')
            let d_i = d.map(v => parseInt(v))
            let vp_list = cs[sportIndex.current]
            for(let i=0;i<vp_list.length;i++)
            {
                let size = vp_list[i].length 
                let cnt = 0 
                for(let j=0;j<vp_list[i].length;j++)
                {
                    if(vp_list[i][j] === d_i[j])
                        cnt++;
                }
                if(cnt === size)
                {
                    fourth_filter_value.push(i);
                    break;
                }
            }
            fourth_value.push(fourth_data[i].value)
            fourth_percentage.push(get_percentage(fourth_data[i].value,req_attempt.number_of_teams))
        }
        setFourth([fourth_key,fourth_value,fourth_percentage,fourth_filter_value])

        let fifth_key = []
        let fifth_filter_value = []
        let fifth_value =[]
        let fifth_percentage = []

        for(let i=0;i<fifth_data.length;i++)
        {
            fifth_key.push(fifth_data[i].key)
            fifth_filter_value.push(fifth_data[i].key)
            fifth_value.push(fifth_data[i].value)
            fifth_percentage.push(get_percentage(fifth_data[i].value,req_attempt.number_of_teams))
        }
        setFifth([fifth_key,fifth_value,fifth_percentage,fifth_filter_value])
        console.log([fifth_key,fifth_value,fifth_percentage])
        let sixth_key = []
        let sixth_filter_value=[]
        let sixth_value =[]
        let sixth_percentage = []

        for(let i=0;i<sixth_data.length;i++)
        {
            sixth_key.push(sixth_data[i].key)
            let d = sixth_data[i].key.split('-')
            let d_i = d.map(v => parseInt(v))
            let vp_list = ps[sportIndex.current]
            for(let i=0;i<vp_list.length;i++)
            {
                if(d_i[0] === vp_list[i][0] && d_i[1] === vp_list[i][1]){
                    sixth_filter_value.push(i);
                    break;
                }
            }
            sixth_value.push(sixth_data[i].value)
            sixth_percentage.push(get_percentage(sixth_data[i].value,req_attempt.number_of_teams))
        }
        setSixth([sixth_key,sixth_value,sixth_percentage,sixth_filter_value])
        if(seventh_data!==null)
        {
            let seventh_key = []
        let seventh_value =[]
        let seventh_percentage = []

        for(let i=0;i<seventh_data.length;i++)
        {
            seventh_key.push(seventh_data[i].key)
            seventh_value.push(seventh_data[i].value)
            seventh_percentage.push(get_percentage(seventh_data[i].value,req_attempt.number_of_teams))
        }
        setSeventh([seventh_key,seventh_value,seventh_percentage,[]])
        }
       
    },[])
    let handleActive = (active_index)=>{
        let new_list = [...active]
        for(let i=0;i<new_list.length;i++)
        {
            if(i=== active_index)
                new_list[i] = 1 
            else 
                new_list[i] = 0
        }
        setActive(new_list)
    }
    let get_table = ()=>{
        let f_type = 0
        let req_index = active.indexOf(1)
        let data = null 
        if(req_index === 0){
            data = first;
            f_type =0;
        }
        else if(req_index === 1){
            data = second 
            f_type = 1;
        }
        else if(req_index === 2){
            data = third 
            f_type = 2;
        }
        else if(req_index === 3){
            data = fourth 
            f_type = 5;
        }
        else if(req_index === 4){
            data = fifth 
            f_type = 4;
        }
        else if(req_index === 5){
            data = sixth 
            f_type = 3;
        }
        else {
            data =seventh 
        }
        console.log(data)
        if(main_name.current===null)
            return  <div></div>
        return (
            <React.Fragment>
                <Table
                data = {data} 
                filterType = {f_type}
                header = {section_name[req_index]}
                name = {main_name.current[req_index]}
                match = {match}
                attempt = {attempt}
                />
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        <div className='mini-big-container'>
            <div className="section-info">
                <span className='section-primary pb-2'>Analytics</span>
            </div>
            
            <div className="analytic-container">
            
            <div className="analytic-item">
                <div onClick={()=>{handleActive(0)}} className={active[0]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Player Selection &nbsp;{ active[0] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                <div onClick={()=>{handleActive(1)}}  className={active[1]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Captain Selection &nbsp;{ active[1] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
            </div>
            <div className="analytic-item">
                <div onClick={()=>{handleActive(2)}} className={active[2]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>VC Selection &nbsp;{ active[2] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                <div onClick={()=>{handleActive(3)}}  className={active[3]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Combination Selection &nbsp;{ active[3] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
            </div>
            <div className="analytic-item">
                <div onClick={()=>{handleActive(4)}} className={active[4]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Credit Selection &nbsp;{ active[4] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                <div onClick={()=>{handleActive(5)}}  className={active[5]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Team Partision &nbsp;{ active[5] ===1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
            </div>
            {
                seventh !==null ?
                <div className='analytic-item'>
                <div onClick={()=>{handleActive(6)}} className={active[6]===1? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Player % Selection Data &nbsp;{ active[6] ===1 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                </div>
                :
                null
            }
            </div>
            {
                get_table()
            }
        </div>
        <GenericFooter />
        </React.Fragment>
    );
}

export default Analytics;


