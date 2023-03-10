
import { useState, useEffect } from 'react'
import './map.css'
import Mapimg from './Mapimg';
import api from '../api/mapwiner'




const Map = () => {

    const [mapVote, setMapVote] = useState([])
    const [mapCandidate, setMapCandidate] = useState({})
    const [mapOver, setMapOver] = useState({
        "29": false,
        "25": false,
        "4": false,
        "15": false,
        "5": false,
        "11": false
    })
    const [ed, setEd] = useState(false)    //remove

    useEffect(() => {
        const controller = new AbortController();
        const fetchMapData = async () => {
            try {
                const response = await api.get('/elections/candidate-total-votes?type=map',{
                    signal: controller.signal
                })
                
                setMapVote(prev => prev = response.data)
                
            } catch (error) {
                if (api.isCancel(error)) {
                  console.log('Request canceled', error.message);
                } else {
                  console.log(error);
                }
            }
        }
        fetchMapData()

        return() => {
            controller.abort();
        }

    }, [])



    const handleEnter = (e) => {
        const {id, } = e.target
        setEd(true)
        setMapOver(prev => {
            return {
                ...prev,
                [id]: true
            }
        })
        setMapCandidate(mapVote.filter((mv) => +id === mv.id)[0])
    }

    const handleLeave = (e) => {
        const {id, } = e.target
        setEd(false)
        setMapOver(prev => {
            return {
                ...prev,
                [id]: false
            }
        }) 
        setMapCandidate({})
    }


    let mapBoxParty, mapBoxName;
    if(mapCandidate.political_party_name === `Labour Party`){
         mapBoxParty = 'LP';
         mapBoxName = 'peter obi'
    } 
    if (mapCandidate.political_party_name === `People's Democratic Party`) {
        mapBoxParty = 'PDP'
        mapBoxName = 'atiku abubakar'
    } 
    if (mapCandidate.political_party_name === `All Progressive Congress`) {
        mapBoxParty = 'APC'
        mapBoxName = 'bola ahmed tinubu'
    } ;

        let mapBoxCount = mapCandidate.candidate_votes




    return (
        <div className="map">
            <p className="chosen">Presidential</p>
            <div className="mapcontainer">
                <Mapimg
                    handleEnter={handleEnter}
                    handleLeave={handleLeave}
                    mapOn={mapOver}
                     />
                     {/* replace true with ed */}
                {ed && <div className="showvoted">
                        <div className="flashhead">
                            <h3>vote count</h3>
                            <p><a href="/#">see full list</a></p>
                        </div>
                        <div className="statewinner">
                            <p className="winname">{mapBoxName}</p>
                            <p className="winparty">{mapBoxParty}</p>
                            <p className="wincount">{mapBoxCount}</p>
                        </div>
                    </div>}
            </div>
        </div>
    )
}


export default Map