
import './state.css'
import { useState, useEffect } from 'react'
import api from '../api/mapwiner'


const Stateres = () => {
    const [statesData, setStatesData] = useState([])
    // const [rowState, setRowState] = useState([])
    // const [rowResult, setRowResult] = useState([])

    useEffect(() => {
        const controller = new AbortController();
        const fetchStateData = async () => {
            try {
                const response = await api.get('/elections/candidate-total-votes?type=state_result',{
                    signal: controller.signal
                })
                console.log('fetching')
                setStatesData(Object.entries(response.data))
                
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchStateData()

        return() => {
            controller.abort();
        }

    }, [])



 

    return (
        <div className="stateres">
            <table className="statetable">

                <thead>
                    <tr>
                        <th>STATE</th>
                        <th>APC</th>
                        <th>LP</th>
                        <th>PDP</th>
                        <th>Leading</th>
                    </tr>
                </thead>

                <tbody>
                    {statesData.map(state=> (
                        <tr key={state[0]}>
                            <td className='statename'>{state[0]}</td>
                            {state[1]
                                .sort((a, b) => (a.political_party_name.toUpperCase() > b.political_party_name.toUpperCase()) ? -1 : 1)
                                .map(item => <td className='partynum'>{item.candidate_votes}</td>)
                            }
                            <td className='statelead'></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
                
}


export default Stateres


