import React, {useState, useEffect} from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([{}])

  const [latitude, setLatitude] = useState(37)
  const [longitude, setLongitude] = useState(-120.4243)


  useEffect(() => {
    fetch(`/result?latitude=${latitude}&longitude=${longitude}`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[])

  return (
    <div className="App">
      {(typeof data.cats === 'undefined') ? (
        <p>Loading...</p>
      ): (
          <p>{data.result}</p>
        )}
    </div>
  )
}

export default App