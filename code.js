//
// Global Variables
//

// Player Variables
var playersCardDeck;
var playerCardCount;

// Bot Variables
var bot2CardDeck = [];
var bot3CardDeck = [];
var bot4CardDeck = [];
var botFoundNoCard = false;
var currentTurn = 1;
var regularTurn = true;
var botDeck = [];

// Game States
var card_choosen;
var drag_state = false;
var card_orginX;
var card_orginY;

// Time
var timer;
var pause;

// Game Data, Rules and Effects
var index;
var minutes = 3;
var middleSetup = ["centerDecor1", "centerDecor2", "centerDecor3", "centerDecor4", "middleCard"];
var cardSetup = ["player1Card1", "player2Card1", "player3Card1", "player4Card1", "player1Card2", "player2Card2", "player3Card2", "player4Card2", "player1Card3", "player2Card3", "player3Card3", "player4Card3", "player1Card4", "player2Card4", "player3Card4", "player4Card4", "player1Card5", "player2Card5", "player3Card5", "player4Card5", "player1Card6", "player2Card6", "player3Card6", "player4Card6", "player1Card7", "player2Card7", "player3Card7", "player4Card7"];
var items = ["assets/Uno_SFX_Card_Deal_Comm_01.wav", "assets/Uno_SFX_Card_Deal_Comm_02.wav", "assets/Uno_SFX_Card_Deal_Comm_04.wav"];
var item = items[Math.floor(Math.random()*items.length)];
var cards = ["assets/red1.png", "assets/red2.png", "assets/red3.png", "assets/red4.png", "assets/red5.png", "assets/red6.png", "assets/red7.png", "assets/red8.png", "assets/red9.png", "assets/green1.png", "assets/green2.png", "assets/green3.png", "assets/green4.png", "assets/green5.png", "assets/green6.png", "assets/green7.png", "assets/green8.png", "assets/green9.png", "assets/yellow1.png", "assets/yellow2.png", "assets/yellow3.png", "assets/yellow4.png", "assets/yellow5.png", "assets/yellow6.png", "assets/yellow7.png", "assets/yellow8.png", "assets/yellow9.png", "assets/blue1.png", "assets/blue2.png", "assets/blue3.png", "assets/blue4.png", "assets/blue5.png", "assets/blue6.png", "assets/blue7.png", "assets/blue8.png", "assets/blue9.png", "assets/redPlus2.png", "assets/greenPlus2.png", "assets/yellowPlus2.png", "assets/bluePlus2.png", "assets/reversered.png", "assets/reversegreen.png", "assets/reverseyellow.png", "assets/reverseblue.png", "assets/plus4.png", "assets/wild.png"]; // buggy: "assets/skipred.png", "assets/skipblue.png", "assets/skipgreen.png", "assets/skipyellow.png"
var sound = true;

//
// Pause Timer Function (ms wait)
//

function pause(howLong) {
  timer = getTime();
  while (((getTime() - timer) < howLong)){}
}

// 
// Screen Handling
//

// Open Screen
function goToNewMenu(type) {
  setProperty("disableHomeText", "hidden", false);
  setProperty("credits", "hidden", true);
  setProperty("settings", "hidden", true);
  setProperty("play", "hidden", true);
  setProperty("howToPlay", "hidden", true);
  while((getXPosition("leftSideCardsMenu")) < 45) {
    pause(1);
    setProperty("leftSideCardsMenu", "x", (getXPosition("leftSideCardsMenu")) + 1);
    setProperty("rightSideCardsMenu", "x", (getXPosition("rightSideCardsMenu")) - 1);
  }
  pause(100);
  setScreen(type);
}

// Back Button
function returnToMain() {
  setProperty("disableHomeText", "hidden", true);
  setProperty("credits", "hidden", false);
  setProperty("settings", "hidden", false);
  setProperty("play", "hidden", false);
  setScreen("Landing");
  setProperty("howToPlay", "hidden", false);
  
  while((getXPosition("leftSideCardsMenu")) > -35) {
    pause(1);
    setProperty("leftSideCardsMenu", "x", (getXPosition("leftSideCardsMenu")) - 1);
    setProperty("rightSideCardsMenu", "x", (getXPosition("rightSideCardsMenu")) + 1);
  }
}

//
// Settings Screen
//

// Open Settings
onEvent("settings", "click", function() {
  goToNewMenu("settingsScreen");
});

// Theme Toggle 

onEvent("themeToggle", "click", function(){
  if (getProperty("themeToggle", "value") == 100) {
    // Backgrounds
    setProperty("unoGameBoard", "background-color", "white");    
    setProperty("Landing", "image", "assets/LandingLight.png");
    setProperty("creditsScreen", "image", "assets/CreditsLight.png");
    setProperty("settingsScreen", "image", "assets/settingsLight.png");
    // Elements
    setProperty("timeRemainingLogo", "icon-color", "black");    
    setProperty("timeRemainingMinutes", "text-color", "black");  
    setProperty("timeRemainingSeconds", "text-color", "black"); 
    setProperty("disableHomeText", "background-color", rgb(255, 255, 255));
    setProperty("leftCycleDeck", "text-color", rgb(41, 45, 45));
    setProperty("leftCycleDeck", "background-color", rgb(255, 255, 255));
    setProperty("rightCycleDeck", "text-color", rgb(41, 45, 45));
    setProperty("rightCycleDeck", "background-color", rgb(255, 255, 255));
  } else {
    // Backgrounds
    setProperty("unoGameBoard", "background-color", rgb(41, 45, 45));        
    setProperty("Landing", "image", "assets/blankLanding.png");
    setProperty("creditsScreen", "image", "assets/creditsPage.png");
    setProperty("settingsScreen", "image", "assets/settingsMenuImproved.png");
    // Elements
    setProperty("timeRemainingLogo", "icon-color", "white");    
    setProperty("timeRemainingMinutes", "text-color", "white");  
    setProperty("timeRemainingSeconds", "text-color", "white");  
    setProperty("disableHomeText", "background-color", rgb(41, 45, 45));
    setProperty("leftCycleDeck", "text-color", rgb(255, 255, 255));
    setProperty("leftCycleDeck", "background-color", rgb(41, 45, 45));
    setProperty("rightCycleDeck", "text-color", rgb(255, 255, 255));
    setProperty("rightCycleDeck", "background-color", rgb(41, 45, 45));
  }
});

// Close Settings
onEvent("settingsToMainMenu", "click", function() {
  returnToMain();
});

//
// gameGuide Screen
//

// How to Play Menu
onEvent("howToPlay", "click", function () {
  if (getProperty("themeToggle", "value") == 100) {
    setProperty("gameGuide", "image", "assets/GameGuideLight.png");
  } else {
    setProperty("gameGuide", "image", "assets/GameGuideDark.png");
  }
  setScreen("gameGuide");
});

// Back Button
onEvent("leaveGameGuide", "click", function( ) {
	setScreen("Landing");
});

// Sounds Toggle
onEvent("soundToggle", "click", function(){
  if(sound == true) {
    sound = false;
  } else {
    if(sound == false) {
    sound = true;
    }}}); // Note: Checks for sound listed where sound is used in code.

//
// Credits Screen
//

// Open Credits
onEvent("credits", "click", function() {
  goToNewMenu("creditsScreen");
});

// Close Credits
onEvent("creditsToMainMenu", "click", function() {
  returnToMain();
});

// Play (Button)
onEvent("play", "click", function( ) {
  goToNewMenu("unoGameBoard");
  pause(100);
  if(sound == true) {
    playSound("assets/gameStartPlings.mp3", false);
  }
  setScreen("unoGameBoard");
    createCards();
    createWhileLoop(60, 1000);
    unhideCenter();
});

//
// Game Startup
//

// Choose Random Cards (Array)
function chooseRandomElement(array, mode) {
  if(mode == "all") {
  index = Math.floor(Math.random() * array.length);
  return array[index];
  } else {
    index = Math.floor(Math.random() * 36);
    return array[index];
  }
}

// Choose Cards and Middle Game Card
var randomCardChoosen = chooseRandomElement(cards);
setProperty("middleCard", "image", randomCardChoosen);
for (var i = 1; i < 8; i++) {
  randomCardChoosen = chooseRandomElement(cards, "all");
  var card = "player1Card";
  var cardIndex = i;
  card = card.concat(cardIndex);
  setProperty(card, "image", randomCardChoosen);
}

// Bots 2, 3, & 4 Random Cards
for (var botIndex = 2; botIndex < 5; botIndex++) {
  for (var i = 1; i < 8; i++) {
    randomCardChoosen = chooseRandomElement(cards, "all");
    if (botIndex == 2) {
      bot2CardDeck = bot2CardDeck.concat(randomCardChoosen);
    }
    if (botIndex == 3) {
      bot3CardDeck = bot3CardDeck.concat(randomCardChoosen);
    }
    if (botIndex == 4) {
      bot4CardDeck = bot4CardDeck.concat(randomCardChoosen);
    }
  }
}

// Play Middle Cards
function unhideCenter() {
  var i = 0;
  while (i < 5) {
    gameSetupY(middleSetup[i]);
    i++;
  }
}

// Cards Start Animation
function gameSetupY(element) {
  item = items[Math.floor(Math.random()*items.length)];
  if(sound == true) {
    playSound(item, false);
  }
  var getY = getProperty(element, "y");
  setProperty(element, "hidden", false);
  setProperty(element, "y", 0);
  while ((getProperty(element, "y") < getY)) {
    pause(1);
    setProperty(element, "y", (getProperty(element, "y") + 2));
  }
}

// Shows All Cards and Middle Card Timer (gameStartupY Shortens Code)
function createCards() {
  var i = 0;
  while (i < 28) {
    if (i == 1) {
    setProperty("numberCountdown", "hidden", false);
    setProperty("numberCountdown", "text", "3");
    }
    if (i == 10) {
    setProperty("numberCountdown", "hidden", false);
    setProperty("numberCountdown", "text", "2");      
    }
    if (i == 18) {
    setProperty("numberCountdown", "hidden", false);
    setProperty("numberCountdown", "text", "1");      
    }
    gameSetupY(cardSetup[i]);
    i++;
  }
}

//
// Gameplay ("Gameloop")
//

// Game Clock (3 Minutes)
function createWhileLoop(integer, intervalTime) {
    var interval = setInterval(function() {
    integer--;
    var tens = Math.floor(integer / 10);
    var ones = integer % 10;
    var formattedInteger = tens + "" + ones;
    setProperty("timeRemainingMinutes", "text", minutes - 1 + ":");
    setProperty("timeRemainingSeconds", "text", formattedInteger);
    if (integer === 0) {
      if (minutes !== 1) {
        minutes--;
        clearInterval(interval);
        createWhileLoop(60, 1000);        
      } else {
        clearInterval(interval);
      }
    }
  }, intervalTime);
}

setInterval(function() {
  if (playersCardDeck.length == 0) {
    gameOver(1);
  }
  if (bot2CardDeck.length == 0) {
    gameOver(2);
  }
  if (bot3CardDeck.length == 0) {
    gameOver(3);
  }
  if (bot4CardDeck.length == 0) {
    gameOver(4);
  }
  if (getText("timeRemainingMinutes") == "0:" && getText("timeRemainingSeconds") == "00") {
    gameOver(5);
  }  
}, 1000);

function gameOver(winner) {
  setScreen("gameOver");
  if (getProperty("themeToggle", "value") == 100) {
    setProperty("gameOver", "image", "assets/GameoverLight.png");
  } else {
    setProperty("gameOver", "image", "assets/GameoverDark.png");
  }
  if (winner == 1) {
    setText("winner", "You Won!");
    setProperty("trophy", "hidden", false);
  } else if (winner > 1 && winner < 5) {
    setText("winner", "Another Player Reached Victory! Better Luck Next Time!"); 
    setProperty("sadFace", "hidden", false);
  } else if (winner == 5) {
    setText("winner", "The Clock Hit Zero. It's a 4 Way Tie!");
    setProperty("sadFace", "hidden", false);
  }
}

// Set Card Image of Each Card Based on Availability
function checkDeckCardsAvailability() {
  for (var i = 0; i < 7; i++) {
    var playerCard = "player1Card";
    var cardDeckIndex = i;
    var cardIndex = i + 1;
    playerCard = playerCard.concat(cardIndex);
    if(playersCardDeck[cardDeckIndex] !== undefined) {
      setImageURL(playerCard, playersCardDeck[cardDeckIndex]);
      } else {
        setImageURL(playerCard, "");
      }      
    }
  }

//
// Bots
//

// global variables for bots: botFoundNoCard, currentTurn, regularTurn, botDeck

function nextPlayer() {
  if (regularTurn == true) {
    currentTurn++;
    if (currentTurn == 5) {
      currentTurn = 1;
    }   
  } else {
    currentTurn--;
    if (currentTurn == 0) {
      currentTurn = 4;
    }
  }
  // Player
  if (currentTurn == 1) {
    if (drawMode == true) {
      drawCard("player", drawAmount, undefined);
      drawMode = false;
      drawAmount = 0;
      nextPlayer();
    } else {
      deckVisibility("player", true, undefined);
    }
  }
  // Bots
  if (currentTurn > 1) {
    if (currentTurn == 2) {botDeck = bot2CardDeck;}
    if (currentTurn == 3) {botDeck = bot3CardDeck;}
    if (currentTurn == 4) {botDeck = bot4CardDeck;}
    if (drawMode == true) {
      deckVisibility("bot", false, currentTurn);
      drawCard("bot", drawAmount, currentTurn);
      drawMode = false;
      drawAmount = 0;
      nextPlayer();
    } else {
      deckVisibility("bot", true, currentTurn);
      botFoundNoCard = false;
      deckVisibility("bot", true, currentTurn);
      setTimeout(function() {
        checkForBotCards(botDeck);
      }, 1500);
    }    
  }
}


//
// Gamerules
//
var cardColors = ["green", "blue", "red", "yellow"];
var cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cardTypes = ["skip", "reverse", "Plus2"];
var drawMode = false;
var drawAmount = 0;

function checkForBotCards(botDeck) {
  var middleCard = getProperty("middleCard", "image");
  var specialCheck = false;
  var colorsCheck = false;
  var numbersCheck = false;
  var typesCheck = false;
  var botCardIndex = 0;
  var cardImage = "";
  var foundCard = false;
  
  // Find Matching Color
  for (botCardIndex = 0; botCardIndex < botDeck.length; botCardIndex++) {
    if (foundCard == false) {
      cardImage = botDeck[botCardIndex];
      for (var colorsIndex = 0; colorsIndex < cardColors.length; colorsIndex++) {
        if (colorsCheck == false) {
          if (cardImage.includes(cardColors[colorsIndex])) {
            if (middleCard.includes(cardColors[colorsIndex])) {
              colorsCheck = true;
              foundCard = true;
              playMoveBot(botCardIndex);
              console.log("[BOT] CARD PLAYED: " + cardImage.slice(0, -4));
              break;
            }
          }        
        }      
      }
    } else {
      break;
    }
  }
  
  // Find Matching Number-
  for (botCardIndex = 0; botCardIndex < botDeck.length; botCardIndex++) {
    if (foundCard == false) {
      cardImage = botDeck[botCardIndex];
      for (var numbersIndex = 0; numbersIndex < cardNumbers.length; numbersIndex++) {
        if (cardImage !== "assets/wild.png" && cardImage !== "assets/plus4.png") {
          if (numbersCheck == false) {
            if (cardImage.includes(cardNumbers[numbersIndex])) {
              if (middleCard.includes(cardNumbers[numbersIndex])) {
                numbersCheck = true;
                foundCard = true;
                playMoveBot(botCardIndex);
                console.log("[BOT] CARD PLAYED: " + cardImage.slice(0, -4));
                break;
              }
            }
          }
        } //else {
          //console.log("Tried to play WILD/+4 [DENINED ACCESS]");
        //}      
      }      
    } else {
      break;
    }    
  }
  // Find Matching Type
  for (botCardIndex = 0; botCardIndex < botDeck.length; botCardIndex++) {
    if (foundCard == false) {
      cardImage = botDeck[botCardIndex];
      for (var typesIndex = 0; typesIndex < cardTypes.length; typesIndex++) {
        if (typesCheck == false) {
          if (cardImage.includes(cardTypes[typesIndex])) {
            if (middleCard.includes(cardTypes[typesIndex])) {
              numbersCheck = true;
              foundCard = true;
              playMoveBot(botCardIndex);
              console.log("[BOT] CARD PLAYED: " + cardImage.slice(0, -4));
              break;
            }
          }
        }
      }      
    } else {
      break;
    }    
  }
  
  // Find Special Cards (Wild & +4)
  for (botCardIndex = 0; botCardIndex < botDeck.length; botCardIndex++) {
    if (foundCard == false) {
      cardImage = botDeck[botCardIndex];
      if (specialCheck == false) {
        if (cardImage == "assets/wild.png" || cardImage == "assets/plus4.png") {
          specialCheck = true;
          foundCard = true;
          playMoveBot(botCardIndex);
          console.log("[BOT] CARD PLAYED: " + cardImage.slice(0, -4));
          break;
        }        
      }
    } else {
      break;
    }    
  }
  if (colorsCheck == false && numbersCheck == false && typesCheck == false && specialCheck == false) {
    // Draw / Next Player
    console.log("[BOT] NO PLAYABLE CARD IN DECK.");
    drawCard("bot", 1, currentTurn);
    deckVisibility("bot", false, currentTurn);
    nextPlayer();
    return;
  }
}

function playMoveBot(index) {
  setImageURL("middleCard", botDeck[index]);
  removeCardFromDeck("bot", botDeck, botDeck[index]);
  var middleCard = getProperty("middleCard", "image");
  // Reverse
  if (middleCard.includes("reverse")) {
    regularTurn = false;
  }
  if (middleCard.includes("Plus2")) {
    drawMode = true;
    drawAmount = 2;
  }
  if (middleCard == "assets/plus4.png") {
    drawMode = true;
    drawAmount = 4;
  }  
  // Wild / +4
  if (getProperty("middleCard", "image") == "assets/wild.png" || getProperty("middleCard", "image") == "assets/plus4.png") {
    var randomColor = randomNumber(1, 4);
    setTimeout(function() {
      if (randomColor == 1) {
        setProperty("middleCard", "image", "assets/blankred.png");
      }
      if (randomColor == 2) {
        setProperty("middleCard", "image", "assets/blankgreen.png");
      }
      if (randomColor == 3) {
        setProperty("middleCard", "image", "assets/blankyellow.png");
      }
      if (randomColor == 4) {
        setProperty("middleCard", "image", "assets/blankblue.png");
      }
      deckVisibility("bot", false, currentTurn);
      nextPlayer();      
    }, 2000);
  } else {
    deckVisibility("bot", false, currentTurn);
    nextPlayer();
  }
}

function checkMove(cardImage, cardId, index) {
  var middleCard = getProperty("middleCard", "image");
  var colorsCheck = false;
  var numbersCheck = false;
  var foundCard = false;
  if (cardImage == "assets/wild.png" || cardImage == "assets/plus4.png") {
    playMove(cardId, index);
  }
  // Checks for Matching Color
  for (var colorsIndex = 0; colorsIndex < cardColors.length; colorsIndex++) {
    if (foundCard == false) {
      // Duplication Prevention
      if (colorsCheck == false) {
        if (cardImage.includes(cardColors[colorsIndex])) {
          if (middleCard.includes(cardColors[colorsIndex])) {
            colorsCheck = true;
            foundCard = true;
            playMove(cardId, index);
            break;
          }  
        }        
      }      
    } else {
      break;
    }
  }
  // Checks for Matching Number
  for (var numbersIndex = 0; numbersIndex < cardNumbers.length; numbersIndex++) {
    if (foundCard == false) {
      if (numbersCheck == false) {
        if (cardImage.includes(cardNumbers[numbersIndex])) {
          if (middleCard.includes(cardNumbers[numbersIndex])) {
            numbersCheck = true;
              foundCard = true;
            playMove(cardId, index);
            break;
          }  
        }        
      }      
    } else {
      break;
    }
  }     
  // Checks for Matching Color
  for (var typesIndex = 0; typesIndex < cardTypes.length; typesIndex++) {
    if (foundCard == false) {
      // Duplication Prevention
      if (colorsCheck == false) {
        if (cardImage.includes(cardTypes[typesIndex])) {
          if (middleCard.includes(cardTypes[typesIndex])) {
            colorsCheck = true;
            foundCard = true;
            playMove(cardId, index);
            break;
          }  
        }        
      }      
    } else {
      break;
    }
  }
  // Doesn't Find a Matching Color or Number 
  if (colorsCheck == false && numbersCheck == false) {
    drag_state = false;
    setStyle(card_choosen, "z-index: 0");
    setProperty(cardId, "x", card_orginX);
    setProperty(cardId, "y", card_orginY);
  }
}

function playMove(card, index) {
  setImageURL("middleCard", playersCardDeck[index]);
  var middleCard = getProperty("middleCard", "image");
  drag_state = false;
  setStyle(card_choosen, "z-index: 0");
  setProperty(card, "x", card_orginX);
  setProperty(card, "y", card_orginY);
  removeCardFromDeck("player", playersCardDeck, playersCardDeck[index]);
  var playerCardCount = playersCardDeck.length; 
  setProperty("playerCardsAmount", "text", playerCardCount + " Cards");
  checkDeckCardsAvailability();    
  // Reverse
  if (middleCard.includes("reverse")) {
    regularTurn = false;
  }
  if (middleCard.includes("Plus2")) {
    drawMode = true;
    drawAmount = 2;
  }
  if (middleCard == "assets/plus4.png") {
    drawMode = true;
    drawAmount = 4;
  }  
  if (middleCard.includes("skip")) {
    if (regularTurn == true) {
      currentTurn++;
    } else {
      currentTurn--;
    }
  }
  // Color Change
  if (middleCard.includes("wild") || middleCard.includes("plus4")) {
    setProperty("choose_red", "hidden", false);
    setProperty("choose_green", "hidden", false);
    setProperty("choose_yellow", "hidden", false);
    setProperty("choose_blue", "hidden", false);      
  }
  // Turns
  if (middleCard != "assets/wild.png" && middleCard != "assets/plus4.png") {
    deckVisibility("player", false, undefined);
    nextPlayer();
  }
}

//
// Players Moves
//

function deckVisibility(type, mode, currentTurn) {
  var i;
  if (type == "player") {
    for (i = 1; i < 8; i++) {
      var cardInDeck = "player1Card";
      cardInDeck = cardInDeck.concat(i);
      if (mode == false) {
        //setProperty(cardInDeck, "y", getProperty(cardInDeck, "y") + 40);
      } else {
        //setProperty(cardInDeck, "y", getProperty(cardInDeck, "y") - 40);
      }
    }       
  } else {
    for (i = 1; i < 8; i++) {
      var card = "player";
      card = card.concat(currentTurn);
      card = card.concat("Card");
      card = card.concat(i);
      if (mode == false) {
        setProperty(card, "background-color", rgb(251,104,104,0.2));
      } else {
        setProperty(card, "background-color", rgb(251,104,104));
      }
    }    
  }
}

onEvent("choose_red", "click", changeColor);
onEvent("choose_green", "click", changeColor);
onEvent("choose_yellow", "click", changeColor);
onEvent("choose_blue", "click", changeColor);

function changeColor(event) {
  var color = event.currentTargetId;
  color = color.slice(7, color.length);
  var blank = "blank";
  blank = blank.concat(color);
  blank = blank.concat(".png");
  setProperty("middleCard", "image", blank);
  setProperty("choose_red", "hidden", true);
  setProperty("choose_green", "hidden", true);
  setProperty("choose_yellow", "hidden", true);
  setProperty("choose_blue", "hidden", true);  
  deckVisibility("player", false, undefined);
  nextPlayer();
}

//
// Card Handling
//

// Get Player's Current Deck
playersCardDeck = [getProperty("player1Card1", "image"), getProperty("player1Card2", "image"), getProperty("player1Card3", "image"), getProperty("player1Card4", "image"), getProperty("player1Card5", "image"), getProperty("player1Card6", "image"), getProperty("player1Card7", "image")];

// Draw Card(s)
onEvent("drawCard", "click", function() {
  drawCard("player", 1, undefined);
});

function drawCard(type, amount, currentTurn) {
  for (var i = 0; i < amount; i++) {
    var randomCardChoosen = chooseRandomElement(cards, "all");
    if (type == "player") {
      playersCardDeck = playersCardDeck.concat(randomCardChoosen);
      var playerCardCount = playersCardDeck.length; 
      setProperty("playerCardsAmount", "text", playerCardCount + " Cards");
      checkDeckCardsAvailability();    
    } else {
      if (currentTurn == 2) {bot2CardDeck = bot2CardDeck.concat(randomCardChoosen);}
      if (currentTurn == 3) {bot3CardDeck = bot3CardDeck.concat(randomCardChoosen);}
      if (currentTurn == 4) {bot4CardDeck = bot4CardDeck.concat(randomCardChoosen);}
    }    
  }
}

// Remove a Card from the Current Deck (Specific Card)
function removeCardFromDeck(type, deck, card) {
  var i;
  if (type == "player") {
    i = 0;
    while (i < deck.length) {
      if (deck[i] === card) {
        // Only subtract the element if it's the last time we've seen it
        if (i === deck.length - 1 || deck[i + 1] !== 3) {
          deck.splice(i, 1);
      } else {
        i++;
      }
    } else {
      i++;
    }    
  }
  } else {
    i = deck.indexOf(card);
    if (i > -1) {
      deck.splice(i, 1);
    }    
  }
}

//
// Cycle Cards (Card Handling)
//

// Cycle Cards Left (Button + Array)
onEvent("leftCycleDeck", "click", function() {
  leftCycleDeck(playersCardDeck);
  checkDeckCardsAvailability();
});

function leftCycleDeck(deck) {
  if (!Array.isArray(deck)) {
    return;
  }
  if (deck != "" || deck == undefined) {
    var firstElement = deck[0];
    for (var i = 0; i < deck.length - 1; i++) {
      deck[i] = deck[i + 1];
    }
    deck[deck.length - 1] = firstElement;    
  }
}

// Cycle Cards Right (Button + Array)
onEvent("rightCycleDeck", "click", function() {
  rightCycleDeck(playersCardDeck);
  checkDeckCardsAvailability();
});

function rightCycleDeck(deck) {
  if (!Array.isArray(deck)) {
    return;
  }
  if (deck != "" || deck == undefined) {
    var lastElement = deck[deck.length - 1];
    for (var i = deck.length - 1; i > 0; i--) {
      deck[i] = deck[i - 1];
    }
    deck[0] = lastElement;    
  }
}

//
// Drag Card (Card Handling)
//

// Check All Cards in Their States
onEvent("player1Card1", "click", pickupCard);
onEvent("player1Card2", "click", pickupCard);
onEvent("player1Card3", "click", pickupCard);
onEvent("player1Card4", "click", pickupCard);
onEvent("player1Card5", "click", pickupCard);
onEvent("player1Card6", "click", pickupCard);
onEvent("player1Card7", "click", pickupCard);

onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);
onEvent("unoGameBoard", "mousemove", movingCard);

// Pickup Card
function pickupCard(event) {
  var card = event.currentTargetId;
  var index = parseInt(card.slice(-1)) - 1;
  if (getProperty(card, "x") > 100 && getProperty(card, "x") < 220) {
    if (getProperty(card, "y") > 145 && getProperty(card, "y") < 295) {
      checkMove(getProperty(card, "image"), card, index);
      console.log("[PLAYER] PLACED SELECTED CARD.");
    } else {
      if (drag_state == false) {
        card_orginX = getProperty(card, "x");
        card_orginY = getProperty(card, "y");        
      }
      drag_state = true;
      card_choosen = card;
    }
  } else {
    if (drag_state == false) {
        card_orginX = getProperty(card, "x");
        card_orginY = getProperty(card, "y");        
    }
    drag_state = true;
    card_choosen = card;
  }  
}

// Move Card
function movingCard(event) {
  if (drag_state == true) {
      setProperty(card_choosen, "x", event.x - 20);
      setProperty(card_choosen, "y", event.y - 20);
      setStyle(card_choosen, "z-index: 1");
  }
}

//
// Count All Cards in Player's Current Deck
//

playerCardCount = playersCardDeck.length; 
setProperty("playerCardsAmount", "text", playerCardCount + " Cards");
