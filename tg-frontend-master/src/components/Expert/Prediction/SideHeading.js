import React from 'react'


const SideHeading = (props)=>{
    return (
        <React.Fragment>
            <div className="d-flex justify-content-start align-items-center prediction-side-heading">
                {props.children}
            </div>
        </React.Fragment>
    );
}

export default SideHeading;