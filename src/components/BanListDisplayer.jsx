import React, { useEffect } from "react";
import '../assets/styles/BanListDisplayer.css'




const BanListDisplayer = ({ banList, banListAction }) => {
    return (
        <div className='BanListDisplayer'>
            <h2>BanList</h2>
            {Object.keys(banList).map((tag) => {
                return banList[tag].map((value) => {
                    return <button key={tag + ':' + value} className='banListButton' onClick={(e) => { banListAction(e, tag, value) }}>
                        {tag}: {value}
                    </button>
                })
            })}

        </div>
    );
}

export default BanListDisplayer;