import { useState } from "react";
import axios from "axios";
import NASAData from "./components/NASAData";
import "./App.css";

// function declaration
function App() {
  // Functional components are considered stateless
  // Class components are considered stateful

  // Write your state towards the very top of your component
  // 1.) import useState at the top of your code
  // 2.) First argument = the name of your state
  // 3.) Second arg = your method to update your state
  // const [state, setState] = useState(initialState)
  const [like, setLike] = useState("unliked");
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // In functional components, we no longer have to use the keyword 'this'

  const toggle = () => {
    console.log("toggling");
    // :(
    // setData('liked') ? setData('unliked') : setData('liked')

    // ternary
    // data === 'unliked' ? setData('liked') : setData('unliked')

    // reg if/else
    if (like === "unliked") {
      setLike("liked");
    } else {
      setLike("unliked");
    }
  };

  const handleChange = (e) => {
    // console.log('handling change', e.target.value)
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");

    setLoading(true);

    // Any AJAX calls/HTTP REQUEST using axios/fetch will return a Promise => response
    axios
      .get(`https://images-api.nasa.gov/search?q=${userInput}`)
      // whenever we get a response back, only then will then() run
      // we no longer need to use json()
      .then((response) => {
        setData(response.data.collection.items);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className="header">
        <img
          className="img"
          src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
          alt=""
        />
        <h1>NASA-Gram</h1>

        {console.log("state", data)}
        {/* CONTROLLED FORM - meaning handle our change via state */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="userInput">Search: </label>
          <input
            type="text"
            id="userInput"
            name="userInput"
            onChange={handleChange}
            value={userInput}
          />
          <button type="submit" value="submit">
            Explore
          </button>
        </form>
      </div>

      {/* <button onClick={toggle}>{like}</button> */}

      {loading ? (
        <img
          src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"
          alt=""
        />
      ) : (
        <div id="nasa-container">
          {data.map((item) => {
            return <NASAData className="list" item={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
