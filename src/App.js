import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Data from './components/Data'


const App = () => {

  const [qualm, setQualm] = useState('')
  const [data, setData] = useState([])

  // submit event
  const handleSubmit=(e)=>{
      e.preventDefault();

      console.log(qualm)
      
      const data = {
        qualm
      }

    //Add Task
    axios.post('https://sheet.best/api/sheets/729ee64c-5a65-4f3b-95b2-21a717a6ee98',data).then(response=>{
      // console.log(response);
      setQualm('');
    })
  }

  // getting data function
  const getData=()=>{
    axios.get('https://sheet.best/api/sheets/729ee64c-5a65-4f3b-95b2-21a717a6ee98').then((response)=>{
      setData(response.data);
    })
  }

  // triggering function
  useEffect(()=>{
    getData();
  },[data])


  return (
    <div className='container'>
     <Header/>
      <br></br>
      <form autoComplete="off" className='form-control'
      onSubmit={handleSubmit}>
        <label>Tell us your qualms..</label>
        <input type='text' className='form-control' required
          placeholder='Enter feedback' onChange={(e)=>setQualm(e.target.value)}
          value={qualm}
        />
        <br></br>
        <div style={{display:"flex",justifyContent:'flex-end'}}>
          <button type='submit' className='btn'>Submit</button>
        </div>
      </form>
      <div className='view-data'>
        {data.length<1&&<>No previous qualms</>}
        {data.length>0&&(
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Previous qualms</th>
                </tr>
              </thead>
              <tbody>
                <Data data={data}/>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
