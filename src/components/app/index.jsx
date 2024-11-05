import Contact from "../contact"
import OurClients from "../our-clients"
import OurService from "../our-service"
import logoImg from "../../assets/logo.png"
import "./app.scss"

function App() {

  return (
    <div className="app">
     <div className="container">
      <div className="logo">
        <img src={logoImg} alt="limsa" />
      </div>
      <div className="banner">
        <OurService/>
        <Contact/>
      </div>
      <OurClients/>
     </div>
    </div>
  )
}

export default App
