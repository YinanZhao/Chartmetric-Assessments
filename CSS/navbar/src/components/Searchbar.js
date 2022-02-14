import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css';



export default function Searchbar() {
  return (
    <div className = "InputContainer">
      <FontAwesomeIcon className = "IconInput" icon={faSearch}/>
      <input className = "TextInput" type="text" name="search" placeholder='Search ("/" for hotkey)'/>
    </div>
  )
}