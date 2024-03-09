import React, {useState, useEffect} from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  const [latitude, setLatitude] = useState(37)
  const [longitude, setLongitude] = useState(-120.4243)
  const [crop, setCrop] = useState("nothing")
  const [area, setArea] = useState(20)

  const fetchData = async() => {
      const res = await (await fetch(`/result?latitude=${latitude}&longitude=${longitude}&crop=${crop}&area=${area}`)).json()
      setData(res)
    }

  function checkResponse(data){
    if (typeof data.latitude === "undefined"){
      return <p>Bad Input</p>
    }
    else {
      return <p>{data.latitude}</p>
    }
  }

  return (
    <div className="App">
      <input className='latitude' required="required" placeholder='Enter latitude' value = {latitude} onChange={e=>setLatitude(e.target.value)}/>
      <input className='longitude' required="required" placeholder='Enter longitude' value = {longitude} onChange={e=>setLongitude(e.target.value)}/>
      <button onClick={fetchData} type="submit">Generate</button>
      {checkResponse(data)}
    </div>
  )
}


export default App