

import './graph.css'
import tinubu from '../asset/graph/tinubu.jpg'


const Tool = ({nameparty, winnerimg, voternum, votepercent, colwidth, bgcolor, marg}) => {
    return (
        // column width
        <div className="tool" style={{width: `${colwidth}%`}}>
            {/* background color */}
            <div className="bar" style={{backgroundColor: `${bgcolor}`,}}></div>
            {/* marginleft */}
            <div className="tip" style={{marginLeft: `${marg}%`}}>
                <div className="tipcont">
                    <div className='winnerimg'>
                        {/* winner image */}
                        <img src={winnerimg} alt="winner" />
                    </div>
                    <div className="wintext">
                        {/* winner name and party */}
                        <h3>{nameparty}</h3>
                        {/* winner votes and percent */}
                        <p><span>{voternum} votes</span><span>({votepercent}%)</span>  </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default Tool