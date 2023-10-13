import React, { useEffect } from "react";
import '../assets/styles/InfoDisplayer.css'

const redirectHandler = (link) => {
    if (window.confirm('This will redirect to another window.\n Would you like to proceed?')) {
        window.location.href = link;
    }
}

const InfoDisplayer = ({ info, banListAction, loadMoreAction }) => {
    let { breeds, url, height, width } = info;

    //Not finished fetching data;
    if (!breeds) {
        return null;
    }

    const breedInfo = breeds[0];

    const tagList = [
        { key: 'Name', data: breedInfo.name },
        { key: 'Origin', data: breedInfo.origin },
        { key: 'Weight', data: breedInfo.weight.imperial },
    ]

    return (
        <div className='InfoDisplayer'>

            <img src={url} style={{ width: 300 + 'px', height: height * 300 / width + 'px' }} />
            <br></br>
            <p id='description'>{breedInfo.description}</p>
      
            {tagList.map((tag) => {
                return <button key={tag.key} onClick={banListAction} id={tag.key} name={tag.data}>
                    {tag.key}: {tag.data}
                </button>
            })}

            <button onClick={() => redirectHandler(breedInfo.wikipedia_url)}>Learn more</button>
            <br></br>
            <button id="discoverButton" onClick={loadMoreAction}> Discover </button>

        </div>
    );
}

export default InfoDisplayer;