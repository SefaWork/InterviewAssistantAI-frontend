import './Navbar.css'
import DarkModeToggle from './DarkModeToggle'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Navbar() {
    const authContext = useAuth();

    return (
        <section className='navbar'>
            <div className='navbar-link-container'>
                {authContext.authTokens? (<Link to='/account'>Account</Link>) : (<Link to='/login'>Login</Link>) }
            </div>
            <DarkModeToggle />
        </section>
    )
}

export default Navbar