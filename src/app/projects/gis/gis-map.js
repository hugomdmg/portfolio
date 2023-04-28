import './gis.css'
import { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Draw from '../../infraestructure/draw'
import Help from '../../help'

function GisMap() {
  let formatedData = []
  let control = 0
  let draw = new Draw()
  let [shadowControl, setShadowControl] = useState(true)
  let [mapSelect, setMapSelected] = useState(<p>shadow map selected</p>)
  let [loadingMessage, setLoadingMessage] = useState('')

  let helpText = 'Select how you want to process the data (shadow or altitude map), then select from you computer the .csv life you want to use. Use the clean botton to do it again'

  function parseCSV(text) {
    let lines = text.replace(/\r/g, '').split('\n');
    return lines.map(line => {
      let values = line.split(',');
      return values;
    });
  }

  function readFile(evt) {
    setLoadingMessage(<p id='waiting-warning'>Creating map...</p>)
    control = 0
    let data
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      data = parseCSV(e.target.result);
      formatData(data)
    };
    reader.readAsBinaryString(file);

  }

  function formatData(data) {
    formatedData = []
    let max = 0
    let min = 10000
    data.map((point, index) => {
      if (index % 200 == 0) {
        if (point[3] > max) { max = point[3] }
        if (point[3] < min && point[3] > 0) { min = point[3] }
      }
    })

    data.map((point, index) => {
      let rgba = (((min - point[3]) / (min - max)) * 250)
      rgba = `rgba(${rgba}, ${rgba}, ${rgba})`
      if (parseInt(point[3]) % 20 == 0) rgba = 'black'
      if (index % 4 == 0) {
        formatedData.push({
          position: {
            x: ((point[1] - data[1][1]) + 100),
            y: ((point[2] - data[1][2]) + 2000),
            z: parseInt(point[3])
          },
          rgba: rgba
        })
      }
    })
    formatedData.shift()
  }

  const canvasRef = useRef(null)

  useEffect(() => {
    setInterval(() => {
      if (control == 0 && formatedData.length > 0) {
        control = 1
        let canvas = canvasRef.current
        draw.init(canvas)
        if (shadowControl) shadowMap()
        formatedData.forEach((point) => {
          draw.paintPoint(point.position, 2, point.rgba)
        })
        setLoadingMessage('')
      }
    }, 100)
  })

  function readExample(file) {
    fetch(file)
      .then(response => response.text())
      .then(responseText => {
        let data = parseCSV(responseText);
        formatData(data)
      })
  }

  function shadowMap() {
    formatedData.map((point, index) => {
      if (formatedData[index - 1]) {
        let rgba = (point.position.z - formatedData[index - 1].position.z + 3) * 30
        rgba = `rgba(${rgba}, ${rgba}, ${rgba})`
        point.rgba = rgba
      }
    })
  }

  return (
    <>
      <div>
        <Help text={helpText}/>
        <Button variant="outline-success" onClick={() => { setShadowControl(true); setMapSelected(<p>shadow map selected</p>) }}>shadow map</Button>
        <Button variant="outline-success" onClick={() => { setShadowControl(false); setMapSelected(<p>altitud map selected</p>) }}>altitude map</Button>
        <Button variant="outline-success" onClick={() => { window.location.reload(false) }}>clean screen</Button>

        <p>{mapSelect}</p>
      </div>
      <input type="file" id="file" accept=".csv" onChange={readFile} />
      <a href='https://drive.google.com/drive/folders/1CF1brNlwK4JxygXfihcKERXsrzqHFQpc?usp=share_link'>download examples</a>
      {/* <button onClick={()=>{readExample('./lidar/PNOA_penalara.csv')}}>Mount Penalara</button>
      <button onClick={()=>{readExample('./lidar/PNOA_matalascanas.csv')}}>Matalascanas dunes</button>
      <button onClick={()=>{readExample('./lidar/PNOA_duraton.csv')}}>Duraton river</button> */}
      {loadingMessage}
      <div id='scenary-container'>
        <canvas id='gis-scenary' ref={canvasRef} width='3000' height='2000'></canvas>
      </div>
      <p></p>
    </>
  )
}

export default GisMap;