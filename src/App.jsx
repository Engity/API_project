import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import './App.css'
import axios from "axios";
import InfoDisplayer from './components/InfoDisplayer';
import HistoryDisplayer from './components/HistoryDisplayer';
import BanListDisplayer from './components/BanListDisplayer';
const API_KEY = import.meta.env.VITE_API_KEY

const fetchData = async (action, limit = 1) => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=' + limit + '&api_key=' + API_KEY + '&has_breeds=1').then(
        (res) => {
            action(res);
        }
    );
}

function App() {
    const [fetchInfo, setFetchInfo] = useState('')
    const [historyInfo, setHistoryInfo] = useState({})
    const [banListInfo, setBanListInfo] = useState({})

    useEffect(() => {
        fetchData((response) => {
            setFetchInfo(response.data[0]);
        })
    }, []);

    const matchBanList = (info) => {

        const breedInfo = info.breeds[0];
        // console.log(breedInfo);
        let res = false;
        Object.keys(banListInfo).map((tag) => {
            
            res ||= banListInfo[tag].includes(breedInfo[tag.toLowerCase()]);
            // console.log(tag, breedInfo[tag.toLowerCase()]);
        });
        
        return res;
    }

    const loadMore = () => {
        fetchData((response) => {
            let match = true;
            for (let i = 0; i < response.data.length; i++) {
                if (!matchBanList(response.data[i])) {
                    setHistoryInfo({
                        ...historyInfo,
                        [fetchInfo['id']]: fetchInfo,
                    })

                    setFetchInfo(response.data[i]);
                    match = false;
                    return;
                }
            }
            //Refetching until find a data that does not match with the ban list
            if (match) {
                loadMore();
            }
        }, 10)
    }

    const loadHistory = (id) => {
        setFetchInfo(historyInfo[id]);
    }

    const addToBanList = (e) => {

        const id = e.target.id;
        const name = e.target.name;
        let val = [name];

        if (banListInfo[id]) {
            if (!banListInfo[id].includes(name)) {
                val = [...banListInfo[id], name];

            }
            else {
                val = [...banListInfo[id]]
            }

        }
        setBanListInfo({
            ...banListInfo,
            [id]: val,
        })
    }

    const removeFromBanList = (e, id, name) => {
        let val = banListInfo[id];
        //Removing it from the ban list
        val.splice(val.indexOf(name), 1);

        //Update the states so React rerenders
        setBanListInfo({
            ...banListInfo,
        });
    }

    return (
        <div className="App">
            <h1>Learn more about cats!</h1>
            <div style={{ display: 'flex' }}>

                <HistoryDisplayer
                    history={historyInfo}
                    loadHistoryAction={loadHistory}
                />

                <InfoDisplayer
                    info={fetchInfo}
                    banListAction={addToBanList}
                    loadMoreAction={loadMore}
                />

                <BanListDisplayer
                    banList={banListInfo}
                    banListAction={removeFromBanList}
                />




            </div>
        </div>
    )
}

export default App
