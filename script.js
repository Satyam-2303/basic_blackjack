function playerData(playerName = "Player One",chips=400){
    const player={
        name:playerName,
        chips:chips,
        bust:false,
        blackJack:false,
        cards:[],
    }
    const randomize=() => {
        let randomNum=Math.floor((Math.random()*13)+1);
        if(randomNum > 10){
            return 10;
        }else{
            return randomNum;
        }
    }
    player.cards=[randomize(),randomize()];
    const sum=() => {
        return player.cards.reduce((acc,value) => acc+value,0);
    }
    const initialCards=() => {
        const pCards=document.querySelector('#pcards');
        pCards.textContent=`Your cards are: ${player.cards[0]}, ${player.cards[1]} totalling: ${sum()}`;
    }
    const addCard=() => {
        const newcard=randomize()
        const playerTotal=document.querySelector('#ptotal');
        if(sum()<=21){
            player.cards.push(newcard);
            sum()
            playerTotal.textContent=`Yow Drew ${newcard} new total: ${sum()}`;
        }else{
            throw Error('Check your Sum');
        }
    }
    return{initialCards,addCard,sum,player} ;
}

function dealerData(){
    const randomize=() => {
        let randomNum=Math.floor((Math.random()*13)+1);
        if(randomNum > 10){
            return 10;
        }else{
            return randomNum;
        }
    }
    const dealer={
        name:'Maximillion',
        chips:NaN,
        bust:false,
        blackJack:false,
        cards:[],
    }
    dealer.cards=[randomize(),randomize()]
    const sum=() => {
        return dealer.cards.reduce((acc,value) => acc+value,0);
    }

    const dealerCard=() => {
        const dcards=document.querySelector('#dcards');
        dcards.textContent=`Dealer's First card: ${dealer.cards[0]}`;
    }
    const dealerDraw=() => {
    while (sum() < 17) {
        const newCard = randomize();
        dealer.cards.push(newCard);
    }
}
    return{dealerDraw,dealerCard,dealer,sum};
}

function playGame(playerModule, dealerModule) {
    const playerStaus = () => {
        const playerTotal = playerModule.sum();
        const player = playerModule.player;
    
        if (playerTotal < 21) {
            player.bust = false;
            player.blackJack = false;
        } else if (playerTotal === 21) {
            player.bust = false;
            player.blackJack = true;
        } else {
            player.bust = true;
            player.blackJack = false;
        }
    }
    const dealerStatus = () => {
        const dealerTotal = dealerModule.sum();
        const dealer = dealerModule.dealer;

        if (dealerTotal < 21) {
            dealer.bust = false;
            dealer.blackJack = false;
        } else if (dealerTotal === 21) {
            dealer.bust = false;
            dealer.blackJack = true;
        } else {
            dealer.bust = true;
            dealer.blackJack = false;
        }
    }
    const winOrLose=() => {
        const player = playerModule.player;
        const dealer = dealerModule.dealer;
        const playerTotal = playerModule.sum();
        const dealerTotal = dealerModule.sum();
        const totals=document.querySelector('#totals');
        const results=document.querySelector('#result');

        totals.textContent=`Player total: ${playerTotal}, Dealer total: ${dealerTotal}`;

        if (player.blackJack && dealer.blackJack || player.bust && dealer.bust) {
            results.textContent="It's a tie!, House wins";
        }else if(dealer.bust){
            results.textContent="House busted. You win!";
        }else if (player.bust) {
            results.textContent="You busted. House wins!";
        } else if (player.blackJack) {
            results.textContent="You got BlackJack! You win!";
        } else if (dealer.blackJack) {
            results.textContent="Dealer got BlackJack. Dealer wins!";
        }else{
            if (playerTotal > dealerTotal) {
            results.textContent="You win!";
        } else if (playerTotal < dealerTotal) {
            results.textContent="House wins!";
        } else {
            results.textContent="It's a tie!";
        }
        }
    }
    return { dealerStatus,playerStaus,winOrLose};
}

let player1 = playerData();
let dealer1 = dealerData();
let game = playGame(player1, dealer1);
const start=document.querySelector('#start');
start.addEventListener('click', () => {
    player1 = playerData();
    dealer1 = dealerData();
    game = playGame(player1, dealer1);
// intialize the game simple reset
    player1.initialCards();
    dealer1.dealerCard();
    playerInfo();
})

const reset=document.querySelector('#reset');
reset.addEventListener('click', () => {
    window.location.reload();
})

const newcard=document.querySelector('#addCard');
newcard.addEventListener('click', () => {
    player1.addCard();
})

const hold=document.querySelector('#hold');
hold.addEventListener('click',() => {
    dealer1.dealerDraw();
    game.playerStaus();
    game.dealerStatus();
    game.winOrLose();
})

function playerInfo(){
    const pName=document.querySelector('#pName');
    const pChpis=document.querySelector('#pChips');
    pName.textContent="Player Name: "+player1.player.name;
    pChpis.textContent="Player Chips: "+player1.player.chips;
}

