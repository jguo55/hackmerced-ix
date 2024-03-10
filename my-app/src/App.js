import React, {useState, useEffect} from 'react'
import './styles/assets/css/main.css'
import MyLocation from './Location.js'

function App() {
  const [data, setData] = useState([{}])

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [crop, setCrop] = useState('')
  const [area, setArea] = useState('')
  const [stage, setStage] = useState('')

  const fetchData = async() => {
      const res = await (await fetch(`/result?latitude=${latitude}&longitude=${longitude}&crop=${crop}&stage=${stage}&area=${area}`)).json()
      setData(res)
    }

  function checkResponse(data){
    if (typeof data.code === "undefined"){
      return <p><i>Awaiting User Input</i></p>
    }
    else if(data.code === 400){
      return <p>Error 400: Bad Input</p>
    }
    else if(data.code === 200){
      return <p>{data.humidity}</p>
    }
  }

  return (
    <div id="wrapper">
      <header id="header">
      <h1><strong>Minimum Crop Water Usage</strong></h1>
      <h2><em>A solution to watering and irrigation</em></h2>
      <i>Disclaimer: Tool Works in US only. <br></br> </i>
      ⓘ <i>Valid US coordinates range from latitudes of around 30 to 45 and longitudes of around -120 to -75. </i>
      </header>
      <hr></hr>
      <div id="main">
        <section id = "content" className="main">
          <section><MyLocation/></section>
          <hr></hr>
          <section>
            <h2>User Inputs</h2>
              <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                  <input 
                    type='text' 
                    placeholder='Enter latitude' 
                    value = {latitude} 
                    onChange={e=>setLatitude(e.target.value)}/>
                    </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type='text'
                    placeholder='Enter longitude'
                    value = {longitude}
                    onChange={e=>setLongitude(e.target.value)}/>
                </div>
                <div className="col-6 col-12-xsmall">
                  <select name="crops" id="crops" onChange={e=>setCrop(e.target.value)}>
                    <option value>- Select a crop -</option>
                    <option value="tobacco">Tobacco</option>
                    <option value="maize">Maize</option>
                    <option value="sorghum">Sorghum</option>
                  </select>
                </div>
                <div className="col-6 col-12-xsmall">
                  <select name="stage" id="stage" onChange={e=>setStage(e.target.value)}>
                  <option value>- Select a stage -</option>
                    <option value="inital">Initial</option>
                    <option value="middle">Middle</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                <div className="col-12">
                  <input
                    type='text'
                    placeholder='Enter Area (Acres)'
                    value = {area}
                    onChange={e=>setArea(e.target.value)}/>
                </div>
                <div className="col-12">
                  <ul className="actions">
                    <li>
                    <button onClick={fetchData} className="primary">Calculate</button>
                    </li>
                  </ul>
                </div>
            </div>
          </section>
          <hr></hr>
          <section>
              <h2><b>Result</b></h2> <h3>{checkResponse(data)}</h3>
          </section>
      </section>
      </div>
      <hr></hr>
      <footer id="footer">
        <section>
          <h2>Credits</h2>
          By: Jensen Guo, Eric Wang, James Zhang, Kevyn Sierra <br></br>
          <i>Made for HackMerced IX</i>
        </section>
        <section>
          <h2>Assets</h2>
          HTML/CSS Template: <a href="https://html5up.net/">https://html5up.net/</a> <br></br>
          Liscence: Creative Commons 3.0
        </section>
      </footer>

    </div>
  )
}


export default App