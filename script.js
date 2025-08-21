function playerCards(){
    const randomize=(num) => {
        return Math.floor((Math.random()*num)+1);
    }
    const firstNum=randomize(11);
    const secondNum=randomize(11);
    const sum=firstNum+secondNum;
    const initialCards=() => {
        console.log(`Your cards are ${firstNum}, ${secondNum} totalling: ${sum} `);
    }
    const addCard=() => {
        sum+= randomize(11);
    }
    return{initialCards,addCard} ;
}

function dealerCards(){
    const randomize=(num) => {
        return Math.floor(Math.random()*num);
    }
    const firstNum=randomize(11);
    const secondNum=randomize(11);
    const initialSum=firstNum+secondNum;

    const dealerCard=() => {
        console.log(`Dealer's First card: ${firstNum}`);
    }
    const dealerDraw=() => {
        while(initialSum<17){
            initialSum+= randomize(11);
        }    
    }
    return{dealerDraw,dealerCard};
}

function playGame(){
    const hold=() => {
        if(!areHolding){
            
        }
    }
}

const player=playerCards();
const dealer=dealerCards()
player.initialCards();
dealer.dealerCard();