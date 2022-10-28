import "./App.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import cheerio from "cheerio";

function App() {
  const [url, setUrl] = useState("");
  const [word, setWord] = useState("");
  const [total, setTotal] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currAng, setAng] = useState(0);

  const urlRef = useRef(null);
  const wordRef = useRef(null);
  // const express = require("express");
  // const app = express();
  // const cors = require("cors");
  // app.use(cors());

  function changeURl() {
    setUrl(urlRef.current.value);
    urlRef.current.value = "";
    console.log(url);
  }

  function changeWord() {
    setWord(wordRef.current.value);
    wordRef.current.value = "";
    console.log(word);
  }

  function findResults() {
    console.log("in");
    // Axios.get(url)
    //   .then((error, response, html) => {
    //     if (!error & (response.statusCode == 200)) {
    //       const $ = Cheerio.load(html);

    //       let test = $("*");
    //       let x = 0;
    //       console.log(test.text());

    //       test.each((i, el) => {
    //         if ($(el).text().includes(`${url}`)) {
    //           x++;
    //         }
    //       });

    //       setTotal(x);
    //     }
    //   })
    //   .catch((err) => console.error(err));
    //let x = 0;
    // axios.get(url).then((response) => {
    //   response.data.each((i, el) => {
    //     if (el.includes(word)) {
    //       x++;
    //     }
    //   });
    // });

    // setTotal(x);

    // fetch(url, (error, response, html) => {
    //   if (!error & (response.statusCode == 200)) {
    //     const $ = cheerio.load(html);

    //     let test = $("*");

    //     console.log(test.text());

    //     test.each((i, el) => {
    //       if ($(el).text().includes(word)) {
    //         console.log($(el).text());
    //         x++;
    //       }
    //     });

    //     console.log(x);
    //   }
    // });

    // setTotal(x);
  }

  async function scrapeData() {
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url);
      console.log("Data is " + data);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);

      // Select all the list items in plainlist class
      const listItems = $("*");
      console.log("List Items" + listItems);

      let x = 0;

      //we need to find a way to count the occurences of a word!
      listItems.each((idx, el) => {
        if ($(el).text().includes(word)) {
          x++;
        }
        console.log($(el).text());
      });

      // Write countries array in countries.json file

      console.log(x);
      setTotal(x);
    } catch (err) {
      console.error(err);
    }
  }

  const handleMouseMove = (e) => {
    console.log(e);

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setMousePos({ x: mouseX, y: mouseY });
    console.log(mousePos);
    const anchor = document.getElementById("anchor");
    const rect = anchor.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top + rect.height / 2;

    const angelDeg = angle(mouseX, mouseY, anchorX, anchorY);
    const re1 = document.getElementById("rickeye1");
    setAng(angelDeg);
    re1.style.transform = `rotate(${90 + currAng}deg)`;
  };

  function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  }

  return (
    <div className="App">
      <h1 className="firstHeader">Bryan's Url Scraper</h1>
      <div className="urlEnter">
        <h1>Please Enter A URL</h1>
        <input ref={urlRef} type="text"></input>
        <button type="button" onClick={changeURl}>
          Submit
        </button>
        <h2> Current URL: {url}</h2>
      </div>

      <div className="wordEnter">
        <h1>Please Enter A Word</h1>
        <input ref={wordRef} type="text"></input>
        <button type="button" onClick={changeWord}>
          Submit
        </button>
        <h2> Current Word: {word}</h2>
      </div>

      <button className="showOutput" onClick={scrapeData}>
        Results
      </button>

      <div className="outputWindow">
        <h1>{total}</h1>
      </div>

      <div className="pictureIMG">
        <img
          id="anchor"
          className="benderPNG"
          src={require("./img/ricknmorty.png")}
        ></img>
        <div className="eyes">
          <img
            className="rickeye1"
            src={require("./img/eye.png")}
            onMouseMove={handleMouseMove}
          ></img>
          <img
            className="rickeye2"
            src={require("./img/eye.png")}
            onMouseMove={handleMouseMove}
          ></img>
          <img
            className="morteye1"
            src={require("./img/eye.png")}
            onMouseMove={handleMouseMove}
          ></img>
          <img
            className="morteye2"
            src={require("./img/eye.png")}
            onMouseMove={handleMouseMove}
          ></img>
        </div>
      </div>

      <div>
        Coords: {mousePos.x} {mousePos.y}
      </div>
      <div>Deg: {currAng}</div>
    </div>
  );
}

export default App;
