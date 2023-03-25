import { useRef } from "react"; 
import { FaBars, FaTimes } from "react-icons/fa"; 
import '../Fonts/SharpGroteskBook20.otf';
import "../Styles/Navbar.css"; 

const Navbar = () =>{
    const navRef = useRef(); 

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav"); 
    }

    return (
        <header>
            <a href="/"><img src={require('../Images/logo.png')} alt='logo' className="logo"/></a>
            <nav ref={navRef}>
                <a href="AboutPage">ABOUT</a>
                <a href="CerealsPage">CEREALS</a>
                <a href="LoginPage">LOGIN</a>
                <a href="RegisterPage">REGISTER</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar; 