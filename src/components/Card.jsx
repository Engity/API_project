import React, { useState } from "react";
import '../assets/styles/Card.css'

const Card = ({ quiz, showAnswer, flipRef, correctAnswer }) => {
    let textColor = quiz.textColor;
    let backgroundColor = quiz.backgroundColor;
    let textShadow = quiz.textShadow;
    if (quiz.correctGuess) {
        textColor = quiz.correctTextColor;
        backgroundColor = quiz.correctBackgroundColor;
    }
    return (
        // <div className={'Card'} onMouseDown={revealAnswer} onMouseUp={revealAnswer}
        <div className={'Card'}
            style={{
                color: textColor,
                backgroundColor: backgroundColor,
                textShadow: textShadow,
            }}
        >
            {showAnswer && (quiz.correctGuess ?
                <div className="correct">
                    Correct
                </div>
                : <div className="incorrect">
                    Incorrect
                </div>)}


            <div className="flip-card-inner" ref={flipRef}>
                {!showAnswer ?
                    <div className="flip-card-front" >
                        <center><h5>{quiz.question} </h5></center>
                        {quiz.imageQuestion ? <img src={quiz.imageQuestion}></img> : <></>}
                    </div>
                    :
                    // Showing Answer
                    <div className="flip-card-back" >
                        <center><h6>{quiz.answer}</h6></center>
                        {quiz.imageAnswer ? <img src={quiz.imageAnswer}></img> : <></>}
                    </div>

                }

            </div>



        </div>

    )
}

export default Card;