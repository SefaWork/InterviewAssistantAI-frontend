import { Link } from 'react-router-dom'
import './Topnav.css'

function Topnav() {
    return (
        <div className='topnav-container'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link className="topnav-mobile" to="/login">Login</Link>
            <Link className="topnav-mobile" to="/interview/setup">Interview</Link>
        </div>
    )
}

export default Topnav