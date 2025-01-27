const cardArray = [
    {
        name: 'fries',
        img: "imgs/fries.png"
    },
    {
        name: 'cheeseburger',
        img: "imgs/cheeseburger.png"
    },
    {
        name: 'hotdog',
        img: "imgs/hotdog.png"
    },
    {
        name: 'ice-cream',
        img: "imgs/ice-cream.png"
    },
    {
        name: 'milkshake',
        img: "imgs/milkshake.png"
    },
    {
        name: 'pizza',
        img: "imgs/pizza.png"
    },
    {
        name: 'fries',
        img: "imgs/fries.png"
    },
    {
        name: 'cheeseburger',
        img: "imgs/cheeseburger.png"
    },
    {
        name: 'hotdog',
        img: "imgs/hotdog.png"
    },
    {
        name: 'ice-cream',
        img: "imgs/ice-cream.png"
    },
    {
        name: 'milkshake',
        img: "imgs/milkshake.png"
    },
    {
        name: 'pizza',
        img: "imgs/pizza.png"
    }
]


cardArray.sort(() => 0.5 - Math.random())//shortcut to shuffling an array

const gridDisplay = document.querySelector("#grid")
let resultDisplay = document.querySelector("#result")
const restartBtn = document.querySelector("#button")
let msgDisplay = document.querySelector("#msgs")
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard(){
    for(let i=0; i < cardArray.length; i++){
        //creating an card and setting its attributes
        const card = document.createElement("img")
        card.setAttribute("src","imgs/blank.png")
        card.setAttribute("data-id",i)
        //creating an eventlistener whenever an user clicks on the card
        card.addEventListener("click",flipCard)
        //adding the card  element as a child to the gridDisplay array
        gridDisplay.appendChild(card)
    }
}
createBoard()

function checkCards(){
    const allCards = document.querySelectorAll("#grid img")
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    //if the user clicked the same card twice
    if(optionOneId == optionTwoId){
        allCards[optionOneId].setAttribute("src","imgs/blank.png")
        allCards[optionTwoId].setAttribute("src","imgs/blank.png")
        msgDisplay.textContent = "you have clicked the same card twice!"
    }else{
    
        if(cardsChosen[0] == cardsChosen[1]){
            // if they are a match turn the cards into a white background image
            allCards[optionOneId].setAttribute("src","imgs/blue.png")
            allCards[optionTwoId].setAttribute("src","imgs/blue.png")
            //Removing event listeners if they are a match
            allCards[optionOneId].removeEventListener("click", flipCard)
            allCards[optionTwoId].removeEventListener("click", flipCard)
            //pushing the cards we won to a new array
            cardsWon.push(cardsChosen)
            msgDisplay.textContent = "You've got a match!"
        }else{
            //if the two cards are not a match flip the card back to position
            allCards[optionOneId].setAttribute("src","imgs/blank.png")
            allCards[optionTwoId].setAttribute("src","imgs/blank.png")
            msgDisplay.textContent = "Sorry, Try again!"
        }
    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardArray.length/2){
        msgDisplay.textContent = "Congratulations! you've found them all."
    }
}


function flipCard(){
    //getting the attribute of the card clicked by user
    let cardId = this.getAttribute("data-id")
    //pushing the name of the card with corresponding data-id, into a new array
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    //changing the pic on the card by accessing objects in the cards array
    this.setAttribute("src",cardArray[cardId].img)
    //checking if the imgs popped up are the same
    if(cardsChosen.length === 2){
        setTimeout(checkCards, 500)
    }
}

restartBtn.addEventListener("click",() => {
    location.reload()
})