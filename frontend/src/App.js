// HOME PAGE 

import React from 'react'; 
import Navbar from "./Components/Navbar"; 
import Login from "./Components/Login"; 
import AboutUs from "./pages/AboutPage";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" index element = {
          <Navbar />
          <Login />} />
        <Route path = "/AboutUs" index element = {<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
  ); 

}

export default App; 
