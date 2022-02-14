import CM_logo from './CM_logo.svg';
import CM_logo_small from './CM_logo_small.svg' //smaller one for mobile
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBell } from "@fortawesome/free-regular-svg-icons"
import useWindowDimensions from './functions/useWindowDimensions';
import Searchbar from './components/Searchbar'
import './App.css';

function App() {
  const { height, width } = useWindowDimensions(); // to dynamically resize logo
  return (
    <div className="Navbar"> 
      <img className = "Logo" src={width >= 551 ? CM_logo : CM_logo_small} alt="CM_logo"/>
      <div className = "SearchAndIcons">
        <Searchbar/>
        
        <FontAwesomeIcon className = "IndividualIcon" icon={faBullhorn}/> {/*don't have pro version here for icon*/}
        <FontAwesomeIcon className = "IndividualIcon" icon={faBell}/>
        <FontAwesomeIcon className = "IndividualIcon" icon={faBars}/>
      </div>

      
    </div>
  );
}

export default App;
