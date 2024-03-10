import React, {useState} from 'react'
import './styles/assets/css/main.css'
import MyLocation from './Location.js'
import spout from './assets/spout.jpg'
import irrigation from './assets/Irrigation.jpg'

function App() {
  const [data, setData] = useState([{}])

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [crop, setCrop] = useState('')
  const [area, setArea] = useState('')
  const [stage, setStage] = useState('')
  const [evaRate, setEvaRate] = useState('')
  const [spacing, setSpacing] = useState('')

  const fetchData = async() => {
      const res = await (await fetch(`/result?latitude=${latitude}&longitude=${longitude}&crop=${crop}&stage=${stage}&area=${area}&evaRate=${evaRate}&spacing=${spacing}`)).json()
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
      <h1><strong>Crop Irrigation Water Calculator</strong></h1>
      <h2><em>A solution to watering and irrigation</em></h2>
      <i>Disclaimer: Tool Works in US only. <br></br> </i>
      ⓘ <i>Valid US coordinates range from latitudes of around 30 to 45 and longitudes of around -120 to -75. </i>
      <hr></hr>
      </header>
      <div id="main">
        <section id = "content" className="main">
          <section><MyLocation/></section>
          <hr></hr>
          <section>
            <h2>User Inputs:</h2>
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
                    <option value="wheat">Wheat</option>
                    <option value="cotton">Cotton</option>
                    <option value="alfalfa">Alfalfa</option>
                    <option value="banana">Banana</option>
                    <option value="citrus">Citrus</option>
                    <option value="grape">Grape</option>
                    <option value="pineapple">Pineapple</option>
                    <option value="potato">Potato</option>
                    <option value="groundnut">Groundnut</option>
                    <option value="olive">Olive</option>
                    <option value="safflower">Safflower</option>
                    <option value="soybean">Soybean</option>
                    <option value="sunflower">Sunflower</option>
                    <option value="bean">Bean</option>
                    <option value="pea">Pea</option>
                    <option value="sugar beet">Sugar Beet</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="cabbage">Cabbage</option>
                    <option value="onion">Onion</option>
                    <option value="pepper">Pepper</option>
                    <option value="tomato">Tomato</option>
                    <option value="watermelon">Watermelon</option>

                  </select>
                </div>
                <div className="col-6 col-12-xsmall">
                  <select name="stage" id="stage" onChange={e=>setStage(e.target.value)}>
                  <option value>- Select a stage -</option>
                    <option value="inital">Initial</option>
                    <option value="development">Development</option>
                    <option value="middle">Middle</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type='text'
                    placeholder='Enter Area (Acres)'
                    value = {area}
                    onChange={e=>setArea(e.target.value)}/>
                </div>
                <div className="col-6 col-12-xsmall">
                  <input
                    type='text'
                    placeholder='Enter Distance between plants (ft)'
                    value = {spacing}
                    onChange={e=>setSpacing(e.target.value)}/>
                </div>
                <div className = "col-12">
                  <label>Evaporation Rate (gallons/m^2):</label>
                <input
                    type='text'
                    placeholder='Leave blank for default upper bound value'
                    value = {evaRate}
                    onChange={e=>setEvaRate(e.target.value)}/>
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
              <h2><b>Result:</b></h2> <h3>{checkResponse(data)}</h3>
          </section>
          <hr></hr>
          <section>
            <h2><i>Background:</i>
           <span className="image right">
                <img src={irrigation} alt="irrigation" width={200} height={200}></img>
              </span>
            </h2> 
            <p>
            Water is an essential and limited resource. Conserving water helps to preserve our natural ecosystems and biodiversity, 
            which depend on water cycles to thrive. Large campaigns were run around the nation asking individual people to conserve
            water on their lawns, but another large source of freshwater usage comes from farming and irrigation systems.
            Water is wasted when there is runoff and crops are overwatered.
            </p>
            <h4>Thought Process
            </h4>

            <p>
              If we would somehow optimize the watering of crops by giving an estimate to farmers of their water usage,
              more water would be conserved, and crop yield would be higher.</p>
              <p>
              To optimize irrigation, we had to restrict a lot of variables. The factors we took into account were water consumption of a crop type and evaporation, but we decided against calculating runoff, transpiration, precipitation, and condensation. 
              With our inputs decided, we looked for formulas to use. Since the most accurate formulas required complex calculations 
              that we were not able to do with our given inputs, we chose to estimate it with a formula for the evaporation rate
              of a swimming pool, and multiplying the result by a factor that we derived by matching the result with actual
               results from data we found. We ended up making this factor 0.71. </p>
               <p>
            The formula we found also required the vapor pressure, which we found a simple equation online that took the temperature
            to estimate the vapor pressure of water. With these formulas, we tweaked the inputs necessary by the user to make sure
            that the output was calculable, and added the evaporation per day to the amount of water necessary to grow a plant
            per day to get the minimum amount of water needed to grow the crop type in a specified area.
            </p>
            <h4>Solution             
              <span className="image left">
                <img src={spout} alt="water spout" width={200} height={200}></img>
              </span></h4>
            <p>
              With this information, etc
            </p>
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