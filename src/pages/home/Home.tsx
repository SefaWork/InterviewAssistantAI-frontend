import './Home.css'
import HomeImage from '../../assets/home-image.jpg'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <section className="hero-section">
                <img src={HomeImage} alt="Interview Assistant" className="hero-image" />
                <div className="hero-content">
                    <h1 className="hero-title">InterviewAssistant</h1>
                    <p className="hero-subtitle">
                        AI powered interview simulations to help you ace your next job interview.
                    </p>
                    <Link to={"/login"} className="hero-cta">Get Started</Link>
                </div>
            </section>
        </div>
    )
}

export default Home;