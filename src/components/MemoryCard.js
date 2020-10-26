import React from 'react';

import Tilt from 'react-tilt';
import Flip from 'react-reveal/Flip';
import RubberBand from 'react-reveal/RubberBand';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


import { memoryImages } from '../images';
import bgImg from '../images/bg.jpg';

const cardStyle = {
    borderRadius: '8px',
    boxShadow: '2px 2px 10px grey'
}

function MemoryCard(props) {
    return (
        <Grid item xs={4} sm={3} md={3} xl={3}>
            <Tilt className="Tilt" options={{ max: 30, scale: 1.1 }}>
                <Flip right spy={props.card.faceDown}>
                    <RubberBand spy={props.card.solved}>
                        <Card style={cardStyle} className="memoryCard">
                            <CardMedia
                                image={props.card.faceDown ? bgImg : memoryImages[props.card.pairId]}
                                className="memoryImg"
                                onClick={props.card.solved || !props.card.faceDown ? null : () => props.onClick(props.card.id)}
                            />
                        </Card>
                    </RubberBand>
                </Flip>
            </Tilt>
        </Grid>
    );
}

export default MemoryCard;