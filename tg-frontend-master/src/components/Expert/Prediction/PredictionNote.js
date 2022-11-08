import React from 'react' 


const PredictionNote = (props)=>{
    return (
        <React.Fragment>
        <div class="alert alert-info" role="alert" style={{width:'100%'}}>
            <h4 class="alert-heading">{props.title}</h4>
            <p>{props.content}</p>
        </div>
        </React.Fragment>
    )
}

export default PredictionNote;