
const shuffleCards = () => {
    let memoryCards = [];
    for (let i = 0; i < 12; i++) {
        memoryCards[i] = {
            id: i,
            pairId: Math.floor(i / 2),
            faceDown: true,
            solved: false
        };
    }
    memoryCards.sort(() => Math.random() - 0.5);
    return memoryCards;
}

export default shuffleCards;
