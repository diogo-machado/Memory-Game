import React from 'react';

import Tilt from 'react-tilt';
import Tada from 'react-reveal/Tada';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

const cardStyle = {
    borderRadius: '8px',
    boxShadow: '2px 2px 10px grey'
}

function GameOverScreen({ time, moves, onClick }) {
    return (
        <div className="gameOver">
            <Container maxWidth="lg">
                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item xs={8} sm={6}>
                        <Tada>
                            <Card style={cardStyle} className="message">
                                <CardContent>
                                    <Grid container alignItems="center" justify="center">
                                        <Grid item xs={12} className="title">you win</Grid>
                                        <Grid item xs={6} className="title">{time} <span className="stat"> seconds</span></Grid>
                                        <Grid item xs={6} className="title">{moves} <span className="stat"> moves</span></Grid>
                                        <Grid item xs={10}>
                                            <Tilt className="Tilt" options={{ max: 30, scale: 1.1 }}>
                                                <Card style={cardStyle} className="restartBtn title" onClick={onClick}>
                                                    restart
                        </Card>
                                            </Tilt>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Tada>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default GameOverScreen;