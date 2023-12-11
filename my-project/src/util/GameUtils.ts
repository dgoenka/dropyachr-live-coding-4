const UNIQUE_CARDS = ["A","B","C","D","E","F","G","H"]

export const generateRandomSet = ()=>{
    let cardMatrix = [["","","",""],["","","",""],["","","",""],["","","",""]];
    for(let times = 0; times < 2; times++) {
        for (let i = 0; i < UNIQUE_CARDS.length; i++) {
            let toPlace = UNIQUE_CARDS[i];
            let xPos = 0;
            let yPos = 0;
            do {
                xPos = Math.floor(Math.random() * 4);
                yPos = Math.floor(Math.random() * 4);
            } while (cardMatrix[xPos][yPos] !== "");
            cardMatrix[xPos][yPos]=toPlace;
        }
    }
    return cardMatrix;
}
