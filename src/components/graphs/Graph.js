
import { useState, useEffect } from 'react'
import axios from 'axios'
import Tool from './Tooltips'
import tinubu from '../asset/graph/tinubu.jpg'
import obi from '../asset/graph/obi.jpg'
import atiku from '../asset/graph/atiku.png'
// import apc from '../asset/graph/apc.png'
// import pdp from '../asset/graph/pdp.png'
// import labour from '../asset/graph/labour.png'
import './graph.css'
import api from '../api/mapwiner'



const Graph = () => {
    const [president, setPresident] = useState([])
    const [senate, setSenate] = useState({})
    const [house, setHouse] = useState({})
    // const [senateMess, setSenateMess] = useState({})
    // const [house, setHouse] = useState({})
    const [totalVotes, setTotalVotes] = useState(0)
    const [obivotes, setObivotes] = useState(0)
    const [tinubuvotes, setTinubuvotes] = useState(0)
    const [atikuvotes, setAtikuvotes] = useState(0)
    const [obinumb, setObinumb] = useState(0)
    const [tinubunumb, setTinubunumb] = useState(0)
    const [atikunumb, setAtikunumb] = useState(0)


    useEffect(() => {
        
        function getTotal(x) {
            if (president.length > 0){
                return x.reduce((a, cur) => a + cur.candidates_vote, 0)
            }
            
        }
        setTotalVotes(getTotal(president))

    }, [president])

    useEffect(() => {
        try{
            if ((president.length > 0) && (totalVotes > 0)) {
                setObivotes(() => (president[0].candidates_vote / totalVotes* 100).toFixed(2))
                setTinubuvotes(() => (president[1].candidates_vote / totalVotes* 100).toFixed(2))
                setAtikuvotes(() => (president[2].candidates_vote / totalVotes* 100).toFixed(2))
                setObinumb(() => president[0].candidates_vote)
                setTinubunumb(() => president[1].candidates_vote)
                setAtikunumb(() => president[2].candidates_vote)
            }

        }catch (err) {
            console.log(err)
        }


    }, [president, totalVotes])

    useEffect(() => {
        const controller = new AbortController();
        const fetchMapData = async () => {
            try {
                const response = await axios.get('https://elect-her.herokuapp.com/api/v1/elections/candidate-total-votes?type=president',{
                    signal: controller.signal
                })
                
                setPresident(prev => prev = response.data)
                
            } catch (error) {
                if (api.isCancel(error)) {
                  console.log('Request canceled', error.message);
                } else {
                  console.log(error);
                }
            }
        }
        fetchMapData()

        return() => controller.abort();

    }, [])

    useEffect(() => {
        const controller = new AbortController();
        const fetchMapData = async () => {
            try {
                const response = await axios.get('https://elect-her.herokuapp.com/api/v1/elections/candidate-total-votes?type=house',{
                    signal: controller.signal
                })
                
                setHouse(response.data)
                
            } catch (error) {
                  console.log(error);
            }
        }
        fetchMapData()

        return() => controller.abort();

    }, [])

    useEffect(() => {
        const controller = new AbortController();
        const fetchMapData = async () => {
            try {
                const response = await axios.get('https://elect-her.herokuapp.com/api/v1/elections/candidate-total-votes?type=senate',{
                    signal: controller.signal
                })
                
                setSenate(response.data)
                
            } catch (error) {

                  console.log(error);
            }
        }
        fetchMapData()

        return() => controller.abort();

    }, [])


 
    let obiparty = 'Obi, LP'
    let tinubuparty = 'Tinubu, APC' 
    let atikuparty = 'Atiku, PDP'



    return (
        <div className="graph">
            {/* presidential */}
            <div className="president">
                <h3>PRESIDENTIAL</h3>
                <div className="toolholder" style={
                    {
                        // border: '1px solid red',
                        overflow: 'hidden'}}>
                    <Tool 
                        winnerimg={obi}
                        voternum={obinumb}
                        votepercent={obivotes}
                        nameparty={obiparty}
                        colwidth={obivotes}
                        bgcolor='#0AA83F'
                        marg={10}/>
                    <Tool 
                        winnerimg={tinubu}
                        voternum={tinubunumb}
                        votepercent={tinubuvotes}
                        nameparty={tinubuparty}
                        colwidth={tinubuvotes}
                        bgcolor='#64CCFF'
                        marg={0}/>
                    <Tool 
                        winnerimg={atiku}
                        voternum={atikunumb}
                        votepercent={atikuvotes}
                        nameparty={atikuparty}
                        colwidth={atikuvotes}
                        bgcolor='#D62B3C'
                        marg={0}/>

                </div>
            </div>

            <div className="senatehouse">
                {/* senate */}
                <div className="senate">
                    <h3>SENATE</h3>
                    <div className="senatechat">{senate.message}</div>
                </div>
                {/* house */}
                <div className="house">
                    <h3>HOUSE</h3>
                    <div className="housechat">{house.message}</div>
                </div>
            </div>
            
        </div>
    )
}


export default Graph