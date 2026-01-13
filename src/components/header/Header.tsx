import './Header.css'
import logo from '../../assets/logo.png'
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <section className='header-container'>
            <section className='header-logo-container'>
                <Link to='/' className='header-logo-link'>
                    <img className='header-logo' src={logo}>
                    </img>
                </Link>
            </section>
            <section className='header-navbar'>
                <Navbar />
            </section>
        </section>
    )
}

export default Header;