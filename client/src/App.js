import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [venueTitle, setVenueTitle] = useState('');
  const [feedbackTxt, setFeedbackTxt] = useState('');


  const submitQualm = () => {
    Axios.post('http://localhost:3001/api/sendqualm', {
      feedback: feedbackTxt,
      venue: venueTitle
    }).then( () => {
      alert('successful post')
    })
  }

  const addVenue = () => {
    // Axios post stuff to backend.
    Axios.post('http://localhost:3001/api/addvenue', {
      venuename: venueTitle
    }).then( () => {
      alert('added venue successfully')
    } )
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getvenues").then((response)=>{
      console.log(response);// currently just mcdonalds. Need to make a function to add venue
    })
  }, []);

  return (
    <div className="App">
      <h1>Qualms</h1>
      <div className='form'>
        <div className='row'>
          <label>Venue:</label>
          <button onClick={addVenue}>Add</button>
        </div>

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
