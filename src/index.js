import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


import MemoryCard from './components/MemoryCard';
import GameOverScreen from './components/GameOverScreen';

import shuffleCards from './utils/shuffleCards';

import './index.css';

const MemoryGame = () => {

    const [openCards, setOpenCards] = useState(0);
    const [memoryCards, setMemoryCards] = useState(shuffleCards());
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [timer, setTimer] = useState(0);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);
    const [tempoID, setTempoID] = useState(0);



    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.addEventListener("resize", null);
        }
    }, []);

    const handleResize = () => {
        setScreenHeight(window.innerHeight);
    }

    const handleClick = id => {
        let newMemoryCards = memoryCards.slice();
        let newMoves = moves;
        let clickedCard = newMemoryCards.find((card) => { return card.id === id; });
        let currentOpenCards = openCards;

        if (currentOpenCards === 0) {
            startTimer();
            currentOpenCards = 1;
        } else if (currentOpenCards === 1) {
            newMoves++;
            currentOpenCards = 2;
            checkMatch(clickedCard, memoryCards.find((card) => { return (!card.faceDown && !card.solved) }));
        } else if (currentOpenCards === 2) {
            currentOpenCards = 1;
            allCardsDown();
        }
        clickedCard.faceDown = false;


        setOpenCards(currentOpenCards);
        setMemoryCards(newMemoryCards);
        setMoves(newMoves);


    }

    const startTimer = () => {
        setTempoID(setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000))
        console.log(tempoID);
    }

    const stopTimer = () => {
        clearInterval(tempoID);
        console.log("timer stop");
    }

    const checkMatch = (card1, card2) => {
        if (card1.pairId === card2.pairId && card1.id !== card2.id) {
            card1.faceDown = false;
            let newMemoryCards = memoryCards;
            newMemoryCards.find((card) => { return card.id === card1.id }).solved = true;
            newMemoryCards.find((card) => { return card.id === card2.id }).solved = true;

            setOpenCards(0);
            setMemoryCards(newMemoryCards);

            checkWin();
        }
    }

    const checkWin = () => {
        let win = true;
        memoryCards.forEach((card) => {
            if (!card.solved) {
                win = false;
                return;
            }
        });
        if (win) {
            stopTimer();
            setWon(true);
        }
    }

    const allCardsDown = () => {
        let newMemoryCards = memoryCards;
        newMemoryCards.forEach((card) => {
            card.faceDown = true;
            if (card.solved) card.faceDown = false;
        });
        setMemoryCards(newMemoryCards);
    }

    const restartGame = () => {
        setOpenCards(0);
        setMemoryCards(shuffleCards());
        setTimer(0);
        setMoves(0);
        setWon(false);
    }


    return (
        <Container maxWidth="lg">
            <Grid container direction="column" justify="flex-start" alignItems="center">
                <Grid item container className="gameStats" alignItems="stretch" style={{ height: screenHeight / 6 }}>
                    <Grid item xs={6}><span className="title">Memory Game</span></Grid>
                    <Grid item xs={3}>{timer}<span className="stat"> Seconds</span></Grid>
                    <Grid item xs={3}>{moves}<span className="stat"> Moves</span></Grid>
                </Grid>
                <Grid item container spacing={2} style={{ height: screenHeight / 6 * 4 }}>
                    {memoryCards.map((card) => {
                        return <MemoryCard key={card.id} card={card} onClick={(id) => handleClick(id)} />
                    })}
                </Grid>
            </Grid>
            {won ? <GameOverScreen onClick={restartGame} time={timer} moves={moves} /> : null}
        </Container>
    );
}


ReactDOM.render(
    <MemoryGame />,
    document.getElementById('root')
);