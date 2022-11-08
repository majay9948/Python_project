let get_credit_range = (selectedPlayers,type,sportIndex)=>{
    let sum_credit = 0;
    let player_cnt = 0;
    for(let i=0;i<selectedPlayers.length;i++)
    {
        for(let j=0;j<selectedPlayers[i].length;j++)
        {
            sum_credit = sum_credit + parseFloat(selectedPlayers[i][j].credits);
            player_cnt++;
        }
    }
    let ts_array = [11,11,8,7];
    let team_size = ts_array[sportIndex];
    let req_stuff = sum_credit/player_cnt;
    let base_credit = req_stuff * team_size;
    let base = Math.floor(base_credit);
    if(base_credit === 11)
    {
        return {
            left: 11,
            right: 11
        }
    }
    else if(type === 0)
    {
        return {
            left: sportIndex === 0 || sportIndex === 1? base+1 : base,
            right: sportIndex === 0 || sportIndex === 1? base+1.5 : base+ 3.5
        }
    }
    else if(type === 1)
    {
        return {
            left: sportIndex === 0 || sportIndex === 1? base+0.5 : base,
            right: sportIndex === 0 || sportIndex === 1? base+2 : base+ 3.5,
        }
    }
    else 
    {
        return {
            left: sportIndex === 0 || sportIndex === 1? base - 0.5 : base - 2,
            right: sportIndex === 0 || sportIndex === 1? base+2 : base+ 3,
        }
    }
}


export {get_credit_range};