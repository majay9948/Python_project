import React from 'react' 


const PropFooter = (props) =>{
    return (
        <React.Fragment>
        <div className="footer container d-flex justify-content-center p-2" style={{maxWidth:600,padding:0}}>
            <button onClick={()=> props.handleContinue() } className="btn btn-success btn-sm vp-btn"> {props.label} </button>
        </div>
        </React.Fragment>
    );
}

export default PropFooter;