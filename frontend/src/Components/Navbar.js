import { useRef } from "react"; 
import { FaBars, FaTimes } from "react-icons/fa"; 
import '../Fonts/SharpGroteskBook20.otf';
import "../Styles/Navbar.css"; 

const Navbar = () =>{
    const navRef = useRef(); 

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav"); 
    }

    const logOut=()=>{
        window.localStorage.clear(); 
    }

    return (
        <header>
            <a href="/"><img src={require('../Images/logo.png')} alt='logo' className="logo"/></a>
            <nav ref={navRef}>
                <a href="/AboutPage">ABOUT</a>
                <a href="/CerealsPage">CEREALS</a>

                {/* Hide when user is logged in */}
                {!localStorage.getItem('user_data') && (<a href="/LoginPage">LOGIN</a>)}
                {!localStorage.getItem('user_data') && (<a href="/RegisterPage">REGISTER</a>)}

                {/* Hide when user is logged out */}
                {localStorage.getItem('user_data') && (<a href="/HomePage">MY BOX</a>)}
                {localStorage.getItem('user_data') && (<a href="/HomePage" onClick={logOut}>LOGOUT</a>)}

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