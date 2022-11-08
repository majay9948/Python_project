// normal function to export the data 

let get_rand_value = function(limit)
{
    return Math.floor(Math.random()*limit)
}

let limit = [
    [0,29],
    [30,69],
    [70,100]
]


let fillPlayers = function(source,team,np,player_hash,index)
{
    //console.log(source,team,np,player_hash,index)
    if(np===0)
    return 
    if(source.length===0)
    return
    let s_length = source.length ;
    let cnt=0;
    let dp=0
    while(true)
    {
        if(dp>300)
        break;
        //console.log('suspect')
        let temp = get_rand_value(s_length)
       // console.log(player_hash)
        if(player_hash[source[temp]] === 0)
        {
            team[index].push(source[temp])
            player_hash[source[temp]] = 1 
            cnt++;
        }
        if(cnt===np)
            break;
        dp++;
    }
    
}

let get_full_team = function(team,selectedPlayers)
{
    let size = team.length;
    let final_team = []
    for(let i=0;i<size;i++)
        final_team.push([])
    for(let i=0;i<size;i++)
    {
        for(let j=0;j<team[i].length;j++)
        {
            let pi = team[i][j]
            for(let k=0;k<selectedPlayers[i].length;k++)
            {
                if(selectedPlayers[i][k].player_index===pi)
                    final_team[i].push(selectedPlayers[i][k])
            }
        }
    }
    return final_team
}

let validate_credits = function(full_team,leftRange,rightRange)
{
    let sum = 0;
    for(let i=0;i<full_team.length;i++)
    {
        for(let j=0;j<full_team[i].length;j++)
        {
            sum = sum + full_team[i][j].credits 
        }
    }
    if(sum>=leftRange && sum<=rightRange)
        return sum;
    else 
        return -1;
}

let validate_partision = function(full_team,partisionStrategy)
{
    let team1=0
    let team2=0 
    for(let i=0;i<full_team.length;i++)
    {
        for(let j=0;j<full_team[i].length;j++)
        {
            if(full_team[i][j].team_index === 0)
                team1++;
            else 
                team2++;
        }
    }
    let flag = false 
    for(let i=0;i<partisionStrategy.length;i++)
    {
        if(partisionStrategy[i][0]===team1 && partisionStrategy[i][1]===team2)
            flag = true 
    }
    return flag;
}

//validate_selection 
let validate_selection = (full_team,selectionStrategy) =>{

   // console.log(selectionStrategy)
    if(selectionStrategy===null)
        return true
    let c =[0,0,0]
    for(let i=0;i<full_team.length;i++)
    {
        for(let j=0;j<full_team[i].length;j++)
        {
            let p = full_team[i][j]
            if(parseFloat(p.selected_by)>=parseFloat(limit[0][0]) && parseFloat(p.selected_by)<=parseFloat(limit[0][1]))
                c[0]= c[0] + 1;
            else if(parseFloat(p.selected_by)>=parseFloat(limit[1][0]) && parseFloat(p.selected_by)<=parseFloat(limit[1][1]))
                c[1]= c[1] + 1;
            else
                c[2] = c[2] + 1 
        }
    }
    for(let i=0;i<selectionStrategy.length;i++)
    {
        if(selectionStrategy[i][0]===c[0] && selectionStrategy[i][1] === c[1] && selectionStrategy[i][2] === c[2])
        {
            return true;
        }
    }
    return false;
}

let get_captain_vicecaptain = function(team,captainPlayers,vicecaptainPlayers)
{
   let t = []
   let c = []
   let vc = []
   for(let i=0;i<team.length;i++)
   {
        for(let j=0;j<team[i].length;j++)
            t.push(team[i][j])
        for(let j=0;j<captainPlayers[i].length;j++)
            c.push(captainPlayers[i][j])
        for(let j=0;j<vicecaptainPlayers[i].length;j++)
            vc.push(vicecaptainPlayers[i][j])
   }
   let dp =0;
   while(true)
   {
      // console.log('coderkvp2')
       if(dp>300)
       {
           break;
       }
      // console.log('hi')
       let c_index = c[get_rand_value(c.length)];
       if(t.indexOf(c_index)!==-1)
       {
            let vc_index = vc[get_rand_value(vc.length)];
            if(t.indexOf(vc_index)!== -1 && c_index !== vc_index)
                return {captain:c_index,vicecaptain:vc_index}
       }
       dp++;
   }
   return null;
}

let validate_final = function(team,c_vc_obj,team_hash)
{
    let my_list = []
    for(let i=0;i<team.length;i++)
    {
        for(let j=0;j<team[i].length;j++)
            my_list.push(team[i][j])
    }
    my_list.sort()
    let my_string = ''
    for(let i=0;i<my_list.length;i++)
    {
        if(my_list[i]===c_vc_obj.captain)
            my_string = my_string+(my_list[i]+33)
        else if(my_list[i]===c_vc_obj.vicecaptain)
            my_string = my_string+(my_list[i]+55)
        else 
            my_string = my_string+my_list[i]
    }
        
    if(team_hash.indexOf(my_string)=== -1)
    {
        team_hash.push(my_string)
        return true 
    }
    else 
    return false
}

let generateTeams = (selectedPlayers,fixedPlayers,captainPlayers,vicecaptainPlayers,partisionStrategy,leftRange,rightRange,combination,tn,selectionStrategy)=>{
   let created_team_list  = []
    leftRange = Number(leftRange)
    rightRange = Number(rightRange)
    let team_hash = []
    let dp = 0;
    let team_cnt=0;
   // console.log(selectionStrategy)
    while(true)
    {
        if(team_cnt===tn)
        {
            console.log(dp)
            return created_team_list;
        }
        if(dp>100000){
            console.log('software out of combinations')
            return null;
        }
           
        let s_combination = combination[get_rand_value(combination.length)]
       // console.log(s_combination)
        let f_combination = [...s_combination]
        //setting up the variables for teams start
        let player_hash = []
        let team = []
        let eligible_players = []
        for(let i=0;i<s_combination.length;i++){
            team.push([])
            eligible_players.push([])
        }
       // console.log(eligible_players)
        for(let i=0;i<=60;i++)
            player_hash.push(0)
        // setting up the variables for teams end
        for(let i=0;i<f_combination.length;i++)
            f_combination[i]= f_combination[i] - fixedPlayers[i].length 
        //console.log(f_combination)
        for(let i=0;i<fixedPlayers.length;i++)
        {
            for(let j=0;j<fixedPlayers[i].length;j++)
            {
                team[i].push(fixedPlayers[i][j]);
                player_hash[fixedPlayers[i][j]] = 1;
            }
        }
      //  console.log(team)
        // so we are done with fixed part 
        for(let i=0;i<selectedPlayers.length;i++)
        {
            for(let j=0;j<selectedPlayers[i].length;j++)
            {
                let pi = selectedPlayers[i][j].player_index
                if(player_hash[pi]===0)
                    eligible_players[i].push(pi)
            }
        }
       // console.log(eligible_players)
        // we have successfully separated fixed and eligible players 
        for(let i=0;i<eligible_players.length;i++)
        {
            let temp_array = eligible_players[i]; 
            fillPlayers(temp_array,team,f_combination[i],player_hash,i)
        }
        //validating the teams 
        //console.log('coderkvp1')
        let full_team = get_full_team(team,selectedPlayers)
        let credit_valid = validate_credits(full_team,leftRange,rightRange)
        let partision_valid = validate_partision(full_team,partisionStrategy)
        //validate the selection strategy 
        //console.log(selectionStrategy)
        let selection_valid = selectionStrategy === null ? true : validate_selection(full_team,selectionStrategy);
        if(credit_valid !== -1 && partision_valid && selection_valid )
        {
            //select captains and if problem handle otherwise push 
            let c_vc_obj = get_captain_vicecaptain(team,captainPlayers,vicecaptainPlayers)
            if(c_vc_obj!=null)
            {
                let final_validation = validate_final(team,c_vc_obj,team_hash)
                if(final_validation===true)
                {
                    // 0 -> smart, 1 -> gl 2-> advanced , 3 -> auto creation
                    //localhost storage 
                    console.log('team no: ',team_cnt+1)
                    console.log(team)
                    console.log(c_vc_obj)
                    //credit_valid 
                    created_team_list.push({
                        team_number: team_cnt+1,
                        credits:credit_valid,
                        team:team,
                        captain:c_vc_obj.captain,
                        vicecaptain: c_vc_obj.vicecaptain
                    })
                    team_cnt++;
                }
            }
        }
        dp++;
    }
   
}

let get_attempt = function(matchId,selectedPlayers,type,number_of_teams,generation_type,team_list,sport_index,selectionStrategy,left_credits,right_credits)
{
    let data = JSON.parse(localStorage.getItem('tgk_data'))
    let req_data = data[sport_index]
    let size = req_data.length
    let attempt_length = 0;
    for(let i=0;i<size;i++)
    {
        if(Number(req_data[i].id) === Number(matchId))
        {
            attempt_length = req_data[i].attempts.length
        }
    }
    let ss = selectionStrategy === null ? false : true
    return {
        id: attempt_length,
        player_list:selectedPlayers,
        type:type,
        number_of_teams:number_of_teams,
        generation_type:generation_type,
        time:Date.now(),
        team_list:team_list,
        selection_strategy: ss,
        left_credits:left_credits,
        right_credits:right_credits
    }
}
let store_data = function(matchId,seriesName,leftName,leftImage,rightName,rightImage,playerList,attempt,sport_index,matchTime)
{
    let data = JSON.parse(localStorage.getItem('tgk_data'))
    // this is the spot 
    for(let i=0;i<data.length;i++)
    {
        data[i]= data[i].filter(match =>{
            let match_time = new Date(match.time).getTime();
            let now = new Date().getTime()
            let distance = now-match_time 
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            if(days<2)
                return true 
            else 
                return false
        })
    }
    
    // spot end 
    let req_data = data[sport_index]
    let size = req_data.length
    let match = null
    let match_index = -1 
    for(let i=0;i<size;i++)
    {
        if(Number(req_data[i].id) === Number(matchId))
        {
           match = req_data[i]
           match_index = i
        }
    }
    if(match===null)
    {
        let new_player_list = [[],[]]
        for(let i=0;i<playerList.length;i++)
        {
            for(let j=0;j<playerList[i].length;j++)
            {
                let p = playerList[i][j]
                if(p.team_index === 0)
                    new_player_list[0].push({
                        name:p.name,
                        image:p.image,
                        team_index: 0,
                        player_index: p.player_index,
                        player_fixed_id:p.player_fixed_id,
                        points:0                    
                    })
                else 
                    new_player_list[1].push({
                        name:p.name,
                        image:p.image,
                        team_index: 1,
                        player_index: p.player_index,
                        player_fixed_id:p.player_fixed_id,
                        points:0  
                    })
            }
        }

        let obj = {
            id:matchId,
            series_name : seriesName,
            match_time: matchTime,
            left_name:leftName,
            right_name: rightName,
            left_image:leftImage,
            right_image: rightImage,
            player_list:new_player_list,
            attempts:[attempt,],
            time:Date.now(),
            result:false ,
            status: 0  // 0 - match not started , 1 - in progress , 2 - match completed 
        }
        console.log(obj)
        console.log(data)
       data[sport_index].push(obj)
       localStorage.setItem('tgk_data',JSON.stringify(data))
       return {matchId:matchId,attempt_id: attempt.id,type:attempt.type}
    }
    else 
    {
        console.log(match)
        console.log(data)
        match.attempts.push(attempt)
        data[sport_index][match_index]= match 
       localStorage.setItem('tgk_data',JSON.stringify(data))
       return {matchId:matchId,attempt_id: attempt.id ,type:attempt.type }
    }

    return null;

}


export {generateTeams,get_attempt,store_data};