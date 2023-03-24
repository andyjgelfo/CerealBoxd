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
            <img src={require('../Images/logo.png')} alt='logo' className="logo"/>
            <nav ref={navRef}>
                <a href="AboutPage">ABOUT</a>
                <a href="../Pages/CerealsPage.js">CEREALS</a>
                <a href="/">LOGIN</a>
                <a href="../Pages/RegisterPage.js">REGISTER</a>
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