import React, {useState, useEffect} from 'react';
import './App.css';
import Article from "./components/article"

function App() {

  const [state, setState] = useState({input: "None", select: "None"});
  const [response, setResponse] = useState({fromServer: {topics: []}});
  const [output, setOutput] = useState({sent: ""})

  useEffect(()=>{console.log(response)}, [])

  function changeSubmit(event){
    async function getData(){
        let responseServer = await fetch("http://localhost:5000",{method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify(state)});
        responseServer = await responseServer.json();
        setResponse({fromServer: responseServer})
        setOutput({sent: responseServer.sentiment})
        console.log(response)
    }
    getData()
    event.preventDefault();
  }

  function changeInput(event){
      if (event.target.id === "entity")
        {
          setState((prev) => {prev.input = event.target.value; return prev;})
        }
      else
        {
          setState((prev) => {prev.select = event.target.value; return prev;})
        }
  }

  return (
    <>
    <div className='contents'>
      <h1 className='title'>Dark web sentiment analysis</h1>
      <form onSubmit={changeSubmit} className={(response.fromServer.topics.length === 0)? "form modified-form" : "form"}>
        <div className='top'>
          <h3>Get major sentiment for entity.</h3>  
          <label className='header'>Entity</label>
          <input type="text" id="entity" placeholder='Ex: Entity' onChange={changeInput}></input>
        </div>
        <div className='bottom'>
          <h3>Get meaningful articles for sentiment.</h3>
          <label className='header'>Sentiment</label>
          <select onChange={changeInput}>
            <option style={{display:"none"}} defaultValue>--Select an option--</option>
            <option>Pozitive</option>
            <option>Negative</option>
            <option>Neutre</option>
            <option>None</option>
          </select>
        </div>
        <div className='output1'>
          <button type="Submit" value="Submit" className='submit'>Submit</button>
          <h4 style={(state.input === "None")? {display:"none"} : {}}>Dominant sentiment for entity "{state.input}  " is <span className={(output.sent === "Pozitive")? "positive" : "negative"}>{output.sent}</span></h4>
        </div>
      </form>
      {/* <div className='outputs'>{JSON.stringify(response)}</div> */}
    </div>
      <div className={(response.fromServer.topics.length == 0)? 'articles undisplayed' : "articles"}>
        <div className='articles-content'>
          {
            response.fromServer.topics.map((elem)=>{
              return(
                <Article id={elem.id} text={elem.text}></Article>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default App;
