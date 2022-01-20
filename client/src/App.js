//Qualms FRONTEND

//Imports
import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


function App() {
  //State things
  const [venueTitle, setVenueTitle] = useState('');
  const [feedbackTxt, setFeedbackTxt] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState(['one', 'two', 'three']);

   //Static dropdown list
  //  const options = [
  //   'one', 'two', 'three' //wants to be dynamic.
  // ];
  // setDropdownOptions = options;

  //Main gameplay loop baby!
  const submitQualm = () => {
    Axios.post('http://localhost:3001/api/sendqualm', {
      feedback: feedbackTxt,
      venue: venueTitle
    }).then( () => {
      alert('successful post')
    })
  }

  //Expanding the empire...
  const addVenue = () => {
    // Axios post stuff to backend.
    Axios.post('http://localhost:3001/api/addvenue', {
      venuename: venueTitle
    }).then( () => {
      alert('added venue successfully')
    } )
  }

  //Dropdown selection happened
  const dropdownSelected = (selected) => {
    console.log(selected);
    //set venueTitle

  }

  //This should happen on page load...
  // it should result in a nice json data lump we can use to set the dropdown state.
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getvenues").then((response)=>{
      console.log(response);// currently just mcdonalds. Need to make a function to add venue
      let venuelist = []
      for (const venu in response.data) {
        venuelist.append(venu.venuename)
      }
      setDropdownOptions(venuelist)
      // response.data.venuename
    })
  }, []);

 
  
  const defaultOption = dropdownOptions[0]; //will this update when options does? I think no. 


  return (
    <div className="App">
      <h1>Qualms</h1>
      <div className='form'>
        <div className='row'>
          <label>Venue:</label>
          <button onClick={addVenue}>Add</button>
        </div>
        <Dropdown options={dropdownOptions} onChange={dropdownSelected} value={defaultOption} placeholder="Select an option" />
        <input type='text' name='venueTitle' onChange={(e)=> {
          setVenueTitle(e.target.value);
        }}/>
        <label>Anonomous Feedback:</label>
        <input type="text" name="feedbackTxt" onChange={(e)=> {
          setFeedbackTxt(e.target.value);
        }}/>
        <button onClick={submitQualm}>Submit</button>
      </div>
    </div>
  );
}

export default App;