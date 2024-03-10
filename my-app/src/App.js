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

  const fetchData = async() => {
      setData([{"code": 199}])
      const res = await (await fetch(`/result?latitude=${latitude}&longitude=${longitude}&crop=${crop}&stage=${stage}&area=${area}&evaRate=${evaRate}`)).json()
      setData(res)
    }

  function checkResponse(data){
    if (typeof data.code === "undefined"){
      return <p><i>Awaiting User Input/Loading...</i></p>
    }
    else if(data.code === 400){
      return <p>Error 400: Bad Input</p>
    }
    if (typeof data.code === 199){
      return <p><i>Loading...</i></p>
    }
    else if(data.code === 200){
      return <p><b>{data.water} gallons/day for field size {data.area} acres </b><br></br>
      <i>Params:</i> <br></br>
      Latitude: {data.latitude} <br></br>
      Longitude: {data.longitude} <br></br>
      Area: {data.area} acres <br></br>
      Evaporation Rate: {data.evaRate} gallons/day<br></br>
      Wind Speed: {data.windSpeed} mph <br></br>
      Crop: {data.crop} <br></br>
      Stage Mult: {data.stageMult}x <br></br>
      Plant Usage: {data.plantUsage}
      </p>
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
                    <option value="initial">Initial</option>
                    <option value="development">Development</option>
                    <option value="middle">Middle</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                <div className="col-6 col-12">
                  <input
                    type='text'
                    placeholder='Enter Area (Acres)'
                    value = {area}
                    onChange={e=>setArea(e.target.value)}/>
                </div>
                <div className = "col-12">
                  <label>Evaporation Rate (gallons/day * 1/m^2):</label>
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
            water on their lawns, but another large source of freshwater usage comes from farming and irrigation systems. Even
            though irrigation is already fairly lossless, the sheer amount of water being used while farming means that small
            optimizations can make a huge difference.
            </p>
            <h3>Thought Process
            </h3>

            <p>
              If we would somehow optimize the watering of crops by giving an estimate to farmers of their water usage,
              more water would be conserved, and crop yield would be higher.</p>
              <p>
              To optimize irrigation, we had to restrict a lot of variables. The factors we took into account were water consumption of a crop type and evaporation, but we decided against calculating runoff, transpiration, precipitation, and condensation. 
              With our inputs decided, we looked for formulas to use. Since the most accurate formulas required complex calculations 
              that we were not able to do with our given inputs, we chose to estimate it with a formula for the evaporation rate
              of a swimming pool. By using API values from the weather.gov and our formula, we were able to determine water loss  .
              We then adjusted the result to be more specific for fields. (The amount of water lost by a swimming pool is about ~1.8x the amount of water lost by a field during peak evaporation months) </p>
               <p>
            With these formulas, we tweaked the inputs necessary by the user to make sure
            that the output was calculable, and added the evaporation per day to the amount of water necessary to grow a plant
            per day, adjusting the value by stage of growth, to get the minimum amount of water needed to grow the crop type in a specified area.
            </p>
            <h3>Solution             
              <span className="image left">
                <img src={spout} alt="water spout" width={200} height={200}></img>
              </span></h3>
            <p>
              With this information, farmers can be more cognizant of their water usage, and get base values for best practices. General
              knowledge states that an acre of crop needs about 5000-9000 gallons/day, and this calculator manages values around that range.
              With this calculator, farmers are able to further optimize water usage, applying it to their specific irrigation system.
              Optimizing water usage in agriculture is imperative for stabilizing food supplies, minimizing the risk of
              crop failures due to water stress, and ultimately ensuring food security for the rapidly expanding global
              population. Efficient water management practices also equip communities to better
              withstand and adapt to the effects of climate change,
              reducing vulnerability to extreme weather events such as droughts and floods.
            </p>
          </section>
          <hr></hr>
          <section>
            <h2>Sources and Further Reading</h2>
            <ul>
              <li>
            <a href='https://ucanr.edu/sites/UrbanHort/Water_Use_of_Turfgrass_and_Landscape_Plant_Materials/Soil_Water_Holding_Characteristics/'>https://ucanr.edu/sites/UrbanHort/Water_Use_of_Turfgrass_and_Landscape_Plant_Materials/Soil_Water_Holding_Characteristics/'</a></li>
            <li>
            <a href="https://www.omnicalculator.com/chemistry/vapour-pressure-of-water">https://www.omnicalculator.com/chemistry/vapour-pressure-of-water</a>
            </li>
            <li>
              <a href="https://dengarden.com/swimming-pools/Determine-Evaporation-Rate-for-Swimming-Pool">https://dengarden.com/swimming-pools/Determine-Evaporation-Rate-for-Swimming-Pool</a>
            </li>
            <li>
              <a href="https://www.fao.org/land-water/databases-and-software/crop-information/tobacco/en/">https://www.fao.org/land-water/databases-and-software/crop-information/tobacco/en/</a>
            </li>
            <li>
              <a href="https://www.weather.gov/documentation/services-web-api">https://www.weather.gov/documentation/services-web-api</a>
            </li>
            <li>
              <a href="https://www.fao.org/3/s2022e/s2022e02.htm">https://www.fao.org/3/s2022e/s2022e02.htm</a>
            </li>
            </ul>
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