import './Home.css'
import HomeImage from '../assets/home-image.jpg'

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
                    <button className="hero-cta">Get Started</button>
                </div>
            </section>
        </div>
    )
}

export default Home;