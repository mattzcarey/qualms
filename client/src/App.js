import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [venueTitle, setVenueTitle] = useState('');
  const [feedbackTxt, setFeedbackTxt] = useState('');


  const submitQualm = () => {
    Axios.post('http://localhost:3001/api/insert', {
      feedback: feedbackTxt,
      venue: venueTitle
    }).then( () => {
      alert('successful post')
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      console.log(response);// currently just mcdonalds. Need to make a function to add venue
    })
  }, []);

  return (
    <div className="App">
      <h1>Qualms</h1>
      <div className='form'>
        <label>Venue:</label>
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
