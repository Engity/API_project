import React, { useEffect } from "react";
import '../assets/styles/HistoryDisplayer.css'

const HistoryDisplayer = ({ history, loadHistoryAction }) => {
    return (
        <div className='HistoryDisplayer'>
            <h2>History</h2>
            { Object.values(history).map((his) => {
                let { breeds, url, height, width, id} = his;
                return <button key = {id} className='hisButton' onClick={() => {loadHistoryAction(id)}} name={breeds[0].name}>
                    {breeds[0].name}
                    
                    <center><img className="hisThumbnail" src = {url}></img></center>
                </button>
            })}

        </div>
    );
}

export default HistoryDisplayer;