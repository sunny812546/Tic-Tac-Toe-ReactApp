import React, { useState } from "react";
import "./App.css";
import Icon from "./components/icon";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const gameStates = ["empty", "cross", "circle"];

const itemArray = new Array(9).fill(gameStates[0]);

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };
  const isEmptyArray = () => {
    return itemArray
      .map((item) => {
        return item === "empty";
      })
      .reduce((first, second) => {
        return first && second;
      }, true);
  };
  const changeItem = (index) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }
    if (itemArray[index] === gameStates[0]) {
      if (winMessage) {
        return toast("Reload The Game", { type: "error" });
      } else {
        itemArray[index] = isCross ? gameStates[1] : gameStates[2];
        setIsCross(!isCross);
      }
    } else {
      return toast("already filled", { type: "error" });
    }
    checkWinner();
  };
  const checkWinner = () => {
    if (
      itemArray[0] !== gameStates[0] &&
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2]
    ) {
      setWinMessage(`${itemArray[0]} Won`);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }
  };
  return (
    <Container className="p-3">
      <h1
        style={{
          textTransform: "uppercase",
          fontFamily: "fantasy",
          letterSpacing: "4px",
        }}
        className=" text-uppercase text-white text-center"
      >
        Tic-Tac-Toe
      </h1>
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2 animated-box text-uppercase text-center">
              {/* <h3 className="text-success text-uppercase text-center" style> */}
              {winMessage}
              {/* </h3> */}
            </div>
          ) : (
            <div className="mb-2 mt-2">
              <h3 className="text-success text-uppercase text-center">
                {isCross ? "Cross" : "Circle"} Turns
              </h3>
            </div>
          )}
          <div className="container-box">
            {itemArray.map((item, index) => (
              <div
                key={index}
                className="box"
                onClick={() => {
                  changeItem(index);
                }}
              >
                <Icon name={item} />
              </div>
            ))}
          </div>
          <Button
            style={{
              outline: "none",
              fontSize: "25px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginTop: "20px",
            }}
            color="success"
            block
            onClick={reloadGame}
            disabled={isEmptyArray()}
          >
            Reload the game
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
