import React ,{useState} from "react";

export const ProgressBar=({progress})=>{
    if (progress === undefined || progress === null) {
        return null;
      }
  
    return <div className="container">
    <div className="progress-bar">
        <div className="progress-fill" style={{width:`${progress}%`}}></div>
       
    </div>
    <div className="progress-label">{progress}%</div>
    </div>
};