import React from 'react' 

 

let NotifyCard = (props)=>{
    let getMyDate = (mydate) =>{ 
        let md = new Date(mydate) 
        let year = md.getFullYear() 
        let day = md.getDate() 
        let month = md.getMonth()+1
        let hrs = md.getHours()
        let minutes = md.getMinutes();
        let seconds = md.getSeconds();


        return `${day}-${month}-${year} ; time : ${hrs} : ${minutes} : ${seconds}`;

    }
    return (
        <React.Fragment>
                <div className="match-card">
                <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                    <span className="series-name">{getMyDate(props.data.createdAt)}</span>
                    <span ></span>
                </div> 
                <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                <div className="combine-image" style={{display:"flex",flexDirection:"column"}}>
                    <span className='left-team-name'>Super User</span>
                    <span className="left-team-name" style={{color:'blue'}}>{props.data.superUserPhoneNumber}</span>
                </div>
                    <div className="timer">Duration : {props.data.duration} </div>
                <div className="combine-image" style={{display:"flex",flexDirection:"column"}}wq     >
                <span className='left-team-name'>Customer</span>
                <span className="left-team-name" style={{color:'green'}}>{props.data.userPhoneNumber}</span>
                </div>
                
                </div>
                <div className="card-end-part">
                {props.data.notifyType === 'register'?
                    <span class="badge badge-outline-success">Register</span>
                    : 
                    <span class="badge badge-outline-warning">Add Plan</span>
                }
                </div>
            </div>
        </React.Fragment>
    );
}

export default NotifyCard;