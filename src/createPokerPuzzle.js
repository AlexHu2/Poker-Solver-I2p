// createPokerPuzzle.js

import PuzzleNode from './PuzzleNode';

function createPokerPuzzle1() {
  // Blinds
  const smallBlind = 0.5;
  const bigBlind = 1.0;

  let heroStack = 100.0; // Hero starts with 100 BB
  let villainStack = 100.0; // Villain starts with 100 BB

  // Hero posts big blind
  heroStack -= bigBlind; // Hero posts 1.0 BB
  const heroBigBlind = bigBlind; // Store hero's big blind

  // Community cards for various stages
  const currCardsFlop = ['K♠', '10♠', '8♦'];
  const turnCard = '2♠';
  const riverCard = '4♥';

  // Initial pot after blinds
  const initialPot = smallBlind + bigBlind; // 0.5 + 1.0 = 1.5 BB

  // Villain raises to 3 BB preflop
  const villainRaisePreflop = 3.0;
  villainStack -= 3; // Villain bets 3.0 BB
  const preflopPotAfterVillainRaise = initialPot + villainRaisePreflop; // 1.5 + 3.0 = 4.5 BB

  // Hero's options preflop
  // If Hero folds preflop
  const endHeroFoldPreflop = new PuzzleNode(
    'You fold and lose the hand.',
    -heroBigBlind, // You lose the big blind
    false, // Not hero's turn after folding
    'Preflop',
    'BB',
    'UTG',
    heroStack, // Hero's stack remains at 99.0 BB
    villainStack, // Villain's stack is at 97.0 BB
    ['K♥', 'Q♥'], // Hero's hand as an array
    [],
    initialPot, // Pot remains as blinds: 1.5 BB
    0
  );

  // If Hero calls preflop
  const heroCallPreflop = villainRaisePreflop - heroBigBlind; // 3.0 - 1.0 = 2.0 BB
  heroStack -= heroCallPreflop; // Hero calls 2.0 BB
  const preflopPotAfterHeroCall = preflopPotAfterVillainRaise + heroCallPreflop; // 4.5 + 2.0 = 6.5 BB

  // Hero's stack after preflop call: 97.0 BB
  const heroStackAfterPreflopCall = heroStack;

  // Flop stage
  const flopHeroNode = new PuzzleNode(
    'Flop has been dealt.',
    0, // Expected value remains unchanged
    true,
    'Flop',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // 97.0 BB
    villainStack, // 97.0 BB
    ['K♥', 'Q♥'],
    currCardsFlop,
    preflopPotAfterHeroCall // 6.5 BB
  );

  // Hero bets 1/2 pot on the flop
  const heroBetFlopHalfPot = preflopPotAfterHeroCall * 0.5; // 6.5 * 0.5 = 3.25 BB
  const heroStackAfterFlopBetHalfPot = heroStackAfterPreflopCall - heroBetFlopHalfPot; // 97.0 - 3.25 = 93.75 BB
  const potAfterHeroFlopBetHalfPot = preflopPotAfterHeroCall + heroBetFlopHalfPot; // 6.5 + 3.25 = 9.75 BB

  // Villain folds to Hero's half-pot bet on the flop
  const endVillainFoldFlop1_2 = new PuzzleNode(
    'Villain folds to your half-pot bet on the flop. You win the hand.',
    potAfterHeroFlopBetHalfPot, // You win the pot: 9.75 BB
    false,
    'Flop',
    'BB',
    'UTG',
    heroStackAfterFlopBetHalfPot, // Hero's stack: 93.75 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    currCardsFlop,
    potAfterHeroFlopBetHalfPot,// 9.75 BB
    100 - villainStack
  );

  // Hero bets 3/4 pot on the flop
  const heroBetFlopThreeQuarterPot = preflopPotAfterHeroCall * 0.75; // 6.5 * 0.75 = 4.875 BB
  const heroStackAfterFlopBetThreeQuarterPot = heroStackAfterPreflopCall - heroBetFlopThreeQuarterPot; // 97.0 - 4.875 = 92.125 BB
  const potAfterHeroFlopBetThreeQuarterPot = preflopPotAfterHeroCall + heroBetFlopThreeQuarterPot; // 6.5 + 4.875 = 11.375 BB

  // Villain folds to Hero's 3/4-pot bet on the flop
  const endVillainFoldFlop3_4 = new PuzzleNode(
    'Villain folds to your 3/4-pot bet on the flop. You win the hand.',
    potAfterHeroFlopBetThreeQuarterPot, // You win the pot: 11.375 BB
    false,
    'Flop',
    'BB',
    'UTG',
    heroStackAfterFlopBetThreeQuarterPot, // Hero's stack: 92.125 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    currCardsFlop,
    potAfterHeroFlopBetThreeQuarterPot, // 11.375 BB
    100 - villainStack
  );

  // Villain checks back on the flop
  const villainChecksBackFlop = new PuzzleNode(
    'Villain checks back on the flop.',
    0,
    true,
    'Turn',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // Hero's stack remains at 97.0 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    currCardsFlop,
    preflopPotAfterHeroCall // 6.5 BB
  );

  // Turn card
  // Hero's options on the turn after Villain checks back flop
  const heroTurnNodeAfterFlopCheck = new PuzzleNode(
    'Turn has been dealt.',
    0,
    true,
    'Turn',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // 97.0 BB
    villainStack, // 97.0 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard],
    preflopPotAfterHeroCall // 6.5 BB
  );

  // Hero bets 1/2 pot on the turn
  const heroBetTurnHalfPot = preflopPotAfterHeroCall * 0.5; // 6.5 * 0.5 = 3.25 BB
  const heroStackAfterTurnBetHalfPot = heroStackAfterPreflopCall - heroBetTurnHalfPot; // 97.0 - 3.25 = 93.75 BB
  const potAfterHeroTurnBetHalfPot = preflopPotAfterHeroCall + heroBetTurnHalfPot; // 6.5 + 3.25 = 9.75 BB

  // Villain folds to Hero's half-pot bet on the turn
  const endVillainFoldTurn = new PuzzleNode(
    'Villain folds to your half-pot bet on the turn. You win the hand.',
    potAfterHeroTurnBetHalfPot, // You win the pot: 9.75 BB
    false,
    'Turn',
    'BB',
    'UTG',
    heroStackAfterTurnBetHalfPot, // Hero's stack: 93.75 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard],
    potAfterHeroTurnBetHalfPot, // 9.75 BB
    100 - villainStack
  );

  // Villain checks back on the turn
  const villainChecksBackTurn = new PuzzleNode(
    'Villain checks back on the turn.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // 97.0 BB
    villainStack, // 97.0 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard],
    preflopPotAfterHeroCall // 6.5 BB
  );

  // River card
  // Hero's options on the river after Villain checks back turn
  const heroRiverNodeAfterTurnCheck = new PuzzleNode(
    'River has been dealt.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // 97.0 BB
    villainStack, // 97.0 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    preflopPotAfterHeroCall // 6.5 BB
  );

  // Hero bets 1/2 pot on the river
  const heroBetRiverHalfPot = preflopPotAfterHeroCall * 0.5; // 6.5 * 0.5 = 3.25 BB
  const heroStackAfterRiverBetHalfPot = heroStackAfterPreflopCall - heroBetRiverHalfPot; // 97.0 - 3.25 = 93.75 BB
  const potAfterHeroRiverBetHalfPot = preflopPotAfterHeroCall + heroBetRiverHalfPot; // 6.5 + 3.25 = 9.75 BB

  // Villain folds to Hero's half-pot bet on the river
  const endVillainFoldRiver = new PuzzleNode(
    'Villain folds to your half-pot bet on the river. You win the hand.',
    potAfterHeroRiverBetHalfPot, // You win the pot: 9.75 BB
    false,
    'River',
    'BB',
    'UTG',
    heroStackAfterRiverBetHalfPot, // Hero's stack: 93.75 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    potAfterHeroRiverBetHalfPot, // 9.75 BB
    100 - villainStack
  );

  // Villain bets 1/2 pot on the river
  const villainBetRiverAmount = preflopPotAfterHeroCall * 0.5; // 6.5 * 0.5 = 3.25 BB
  villainStack -= villainBetRiverAmount; // Villain's stack: 97.0 - 3.25 = 93.75 BB
  const villainStackAfterRiverBet = villainStack;
  const potAfterVillainRiverBet = preflopPotAfterHeroCall + villainBetRiverAmount; // 6.5 + 3.25 = 9.75 BB

  const villainBetsRiver = new PuzzleNode(
    'Villain bets 1/2 pot on the river.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // Hero's stack: 97.0 BB
    villainStackAfterRiverBet, // Villain's stack: 93.75 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    potAfterVillainRiverBet // 9.75 BB
  );

  // Hero calls on the river
  const heroStackAfterRiverCall = heroStackAfterPreflopCall - villainBetRiverAmount; // 97.0 - 3.25 = 93.75 BB
  const finalPotAfterHeroCall = potAfterVillainRiverBet + villainBetRiverAmount; // 9.75 + 3.25 = 13.0 BB

  const endHeroCallsRiver = new PuzzleNode(
    'You call. Villain shows A♥, 10♦. You win the showdown.',
    finalPotAfterHeroCall, // You win the total pot: 13.0 BB
    false,
    'Showdown',
    'BB',
    'UTG',
    heroStackAfterRiverCall, // Hero's stack: 93.75 BB
    villainStackAfterRiverBet, // Villain's stack: 93.75 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    finalPotAfterHeroCall, // 13.0 BB
    100 - villainStackAfterRiverBet
  );

  // Hero raises to 2.5x Villain's bet on the river
  const heroRaiseRiverAmount = villainBetRiverAmount * 2.5; // 3.25 * 2.5 = 8.125 BB
  const heroTotalBetRiver = villainBetRiverAmount + heroRaiseRiverAmount; // 3.25 + 8.125 = 11.375 BB
  const heroStackAfterRiverRaise = heroStackAfterPreflopCall - heroTotalBetRiver; // 97.0 - 11.375 = 85.625 BB
  const potAfterHeroRaiseRiver = potAfterVillainRiverBet + heroRaiseRiverAmount; // 9.75 + 8.125 = 17.875 BB

  // Villain folds to Hero's raise on the river
  const endVillainFoldsToRaise = new PuzzleNode(
    'Villain folds to your raise. You win the hand.',
    potAfterHeroRaiseRiver, // You win the pot: 17.875 BB
    false,
    'River',
    'BB',
    'UTG',
    heroStackAfterRiverRaise, // Hero's stack: 85.625 BB
    villainStackAfterRiverBet, // Villain's stack remains at 93.75 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    potAfterHeroRaiseRiver, // 17.875 BB
    100 - villainStackAfterRiverBet
  );

  // Hero folds on the river
  const endHeroFoldsRiver = new PuzzleNode(
    'You fold. Villain wins the hand.',
    - (heroBigBlind + heroCallPreflop), // You lose your BB and preflop call: -3.0 BB
    false,
    'River',
    'BB',
    'UTG',
    heroStackAfterPreflopCall, // Hero's stack remains at 97.0 BB
    villainStackAfterRiverBet, // Villain's stack: 93.75 BB
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    preflopPotAfterHeroCall, // Pot remains at 6.5 BB
    0
  );

  villainBetsRiver.addNextAction('Call', endHeroCallsRiver);
  villainBetsRiver.addNextAction('Raise 2.5x', endVillainFoldsToRaise);
  villainBetsRiver.addNextAction('Fold', endHeroFoldsRiver);

  // Hero's options on the river after Villain checks back turn
  heroRiverNodeAfterTurnCheck.addNextAction('Bet 1/2 Pot', endVillainFoldRiver);
  heroRiverNodeAfterTurnCheck.addNextAction('Check', villainBetsRiver);

  // Hero's options on the turn after Villain checks back flop
  heroTurnNodeAfterFlopCheck.addNextAction('Bet 1/2 Pot', endVillainFoldTurn);
  heroTurnNodeAfterFlopCheck.addNextAction('Check', villainChecksBackTurn);

  villainChecksBackTurn.addNextAction('Proceed to River', heroRiverNodeAfterTurnCheck);

  villainChecksBackFlop.addNextAction('Proceed to Turn', heroTurnNodeAfterFlopCheck);

  // Hero's options on the flop
  flopHeroNode.addNextAction('Bet 1/2 Pot', endVillainFoldFlop1_2);
  flopHeroNode.addNextAction('Bet 3/4 Pot', endVillainFoldFlop3_4);
  flopHeroNode.addNextAction('Check', villainChecksBackFlop);

  // Hero raises to 10 BB preflop
  const heroRaisePreflop = 10.0;
  const hero3BetAmount = heroRaisePreflop - heroBigBlind; // 10.0 - 1.0 = 9.0 BB
  const heroStackAfter3Bet = heroStack + heroBigBlind - heroRaisePreflop; // 99.0 + 1.0 - 10.0 = 90.0 BB
  const preflopPotAfterHeroRaise = preflopPotAfterVillainRaise + (heroRaisePreflop - heroBigBlind); // 4.5 + 9.0 = 13.5 BB

  // Villain folds to Hero's preflop 3-bet
  const endVillainFoldPreflop = new PuzzleNode(
    'Villain folds to your raise. You win the hand preflop.',
    preflopPotAfterHeroRaise, // You win the pot: 13.5 BB
    false,
    'Preflop',
    'BB',
    'UTG',
    heroStackAfter3Bet, // Hero's stack: 90.0 BB
    villainStack, // Villain's stack remains at 97.0 BB
    ['K♥', 'Q♥'],
    [],
    preflopPotAfterHeroRaise // 13.5 BB
  );

  // Preflop decision node
  const preflopHeroNode = new PuzzleNode(
    'Villain has raised to 3 BB. You are in BB with K♥, Q♥.',
    0, // Initial expected value
    true,
    'Preflop',
    'BB',
    'UTG',
    99.0, // Hero's stack after posting BB: 99.0 BB
    97.0, // Villain's stack after raising: 97.0 BB
    ['K♥', 'Q♥'],
    [],
    preflopPotAfterVillainRaise // 4.5 BB
  );

  preflopHeroNode.addNextAction('Fold', endHeroFoldPreflop);
  preflopHeroNode.addNextAction('Call', flopHeroNode);
  preflopHeroNode.addNextAction('Raise to 10 BB', endVillainFoldPreflop);

  return preflopHeroNode;
}


/**
 * Creates and returns the initial PuzzleNode representing the start of the second poker puzzle.
 *
 * @returns {PuzzleNode} The root node of the second poker puzzle.
 */
function createPokerPuzzle2() {
  // Blinds
  const smallBlind = 0.5;
  const bigBlind = 1.0;

  // Hero's hand
  const heroHand = ['A♦', 'Q♦'];

  // Villain's position and action
  const villainPosition = 'UTG';
  const villainRaisePreflop = 3.0;

  // Initial pot after blinds
  const initialPot = smallBlind + bigBlind; // 1.5 BB

  let heroStack = 100.0; // Hero starts with 100 BB
  let villainStack = 100.0; // Villain starts with 100 BB

  // Pot after villain's raise
  const potAfterVillainRaise = initialPot + villainRaisePreflop; // 1.5 + 3.0 = 4.5 BB

  // Hero's call preflop
  const heroCallPreflop = villainRaisePreflop; // 3.0 BB
  const preflopPot = potAfterVillainRaise + heroCallPreflop; // 4.5 + 3.0 = 7.5 BB

  // Community cards
  const flopCards = ['10♦', 'J♣', '2♦'];
  const turnCard = 'K♦';
  const riverCard = '3♠';

  // Villain bets 5 BB on the flop
  const villainBetFlop = 5.0;
  const potAfterVillainBetFlop = preflopPot + villainBetFlop; // 7.5 + 5.0 = 12.5 BB

  // Hero folds on the flop
  const endHeroFoldsFlop = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -heroCallPreflop, // You lose your preflop call
    false,
    'Flop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    heroCallPreflop // 3.0 BB
  );

  // Villain folds to your raise on the flop
  const endVillainFoldsFlop = new PuzzleNode(
    'Villain folds to your raise on the flop. You win the hand.',
    potAfterVillainBetFlop, // You win the pot after Villain's bet
    false,
    'Flop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    potAfterVillainBetFlop // 12.5 BB
  );

  // Hero calls the flop bet
  const potAfterHeroCallFlop = potAfterVillainBetFlop + villainBetFlop; // 12.5 + 5.0 = 17.5 BB

  // Villain bets 10 BB on the turn
  const villainBetTurn = 10.0;
  const potAfterVillainBetTurn = potAfterHeroCallFlop + villainBetTurn; // 17.5 + 10.0 = 27.5 BB

  // Hero folds on the turn
  const endHeroFoldsTurn = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -(heroCallPreflop + villainBetFlop), // You lose your preflop call and flop call
    false,
    'Turn',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    heroCallPreflop + villainBetFlop // 3.0 + 5.0 = 8.0 BB
  );

  // Villain folds to your raise on the turn
  const endVillainFoldsTurn = new PuzzleNode(
    'Villain folds to your raise on the turn. You win the hand.',
    potAfterVillainBetTurn, // You win the pot after Villain's bet
    false,
    'Turn',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    potAfterVillainBetTurn // 27.5 BB
  );

  // Hero calls the turn bet
  const potAfterHeroCallTurn = potAfterVillainBetTurn + villainBetTurn; // 27.5 + 10.0 = 37.5 BB

  // Villain checks on the river
  const villainChecksRiver = new PuzzleNode(
    'Villain checks on the river.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterHeroCallTurn // 37.5 BB
  );

  // Hero bets on the river
  const heroBetRiverAmount = 20.0;
  const potAfterHeroBetRiver = potAfterHeroCallTurn + heroBetRiverAmount; // 37.5 + 20.0 = 57.5 BB

  // Villain folds to your river bet
  const endVillainFoldsRiver = new PuzzleNode(
    'Villain folds to your bet on the river. You win the hand.',
    potAfterHeroCallTurn, // You win the pot before your river bet
    false,
    'River',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterHeroCallTurn // 37.5 BB
  );

  // Villain calls your river bet
  const endVillainCallsRiver = new PuzzleNode(
    'Villain calls your bet. You win the showdown with the nut flush.',
    potAfterHeroBetRiver, // You win the total pot
    false,
    'Showdown',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterHeroBetRiver // 57.5 BB
  );

  // Add river actions
  villainChecksRiver.addNextAction('Bet 20 BB', endVillainFoldsRiver);
  villainChecksRiver.addNextAction('Check', endVillainCallsRiver);

  // Hero raises on the turn
  const heroRaiseTurnAmount = 25.0;
  const potAfterHeroRaiseTurn = potAfterVillainBetTurn + heroRaiseTurnAmount; // 27.5 + 25.0 = 52.5 BB

  // Villain folds to your turn raise
  const endVillainFoldsToTurnRaise = new PuzzleNode(
    'Villain folds to your raise on the turn. You win the hand.',
    potAfterVillainBetTurn, // You win the pot after Villain's bet
    false,
    'Turn',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    potAfterVillainBetTurn // 27.5 BB
  );

  // Villain calls your turn raise
  const villainCallsTurnRaise = new PuzzleNode(
    'Villain calls your raise on the turn.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterHeroRaiseTurn // 52.5 BB
  );

  // Add river actions after turn raise
  villainCallsTurnRaise.addNextAction('Bet 30 BB', endVillainFoldsRiver);
  villainCallsTurnRaise.addNextAction('Check', endVillainCallsRiver);

  // Add turn actions
  const heroTurnNode = new PuzzleNode(
    'Turn has been dealt.',
    0,
    true,
    'Turn',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    potAfterVillainBetTurn // 27.5 BB
  );

  heroTurnNode.addNextAction('Fold', endHeroFoldsTurn);
  heroTurnNode.addNextAction('Call', villainChecksRiver);
  heroTurnNode.addNextAction('Raise to 25 BB', endVillainFoldsToTurnRaise);
  heroTurnNode.addNextAction('Raise to 25 BB', villainCallsTurnRaise);

  // Hero raises on the flop
  const heroRaiseFlopAmount = 15.0;
  const potAfterHeroRaiseFlop = potAfterVillainBetFlop + heroRaiseFlopAmount; // 12.5 + 15.0 = 27.5 BB

  // Villain folds to your flop raise
  const endVillainFoldsToFlopRaise = new PuzzleNode(
    'Villain folds to your raise on the flop. You win the hand.',
    potAfterVillainBetFlop, // You win the pot after Villain's bet
    false,
    'Flop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    potAfterVillainBetFlop // 12.5 BB
  );

  // Villain calls your flop raise
  const villainCallsFlopRaise = new PuzzleNode(
    'Villain calls your raise on the flop.',
    0,
    true,
    'Turn',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    potAfterHeroRaiseFlop // 27.5 BB
  );

  villainCallsFlopRaise.addNextAction('Bet 10 BB', heroTurnNode);

  // Add flop actions
  const heroFlopNode = new PuzzleNode(
    'Flop has been dealt.',
    0,
    true,
    'Flop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    potAfterVillainBetFlop // 12.5 BB
  );

  heroFlopNode.addNextAction('Fold', endHeroFoldsFlop);
  heroFlopNode.addNextAction('Call', heroTurnNode);
  heroFlopNode.addNextAction('Raise to 15 BB', endVillainFoldsToFlopRaise);
  heroFlopNode.addNextAction('Raise to 15 BB', villainCallsFlopRaise);

  // Preflop actions
  const preflopHeroNode = new PuzzleNode(
    'Villain raises to 3 BB from UTG. You are in BB with A♦, Q♦.',
    0,
    true,
    'Preflop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [],
    potAfterVillainRaise // 4.5 BB
  );

  // End node for folding preflop
  const endHeroFoldsPreflop = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -bigBlind, // You lose your big blind
    false,
    'Preflop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [],
    bigBlind // 1.0 BB
  );

  preflopHeroNode.addNextAction('Fold', endHeroFoldsPreflop);
  preflopHeroNode.addNextAction('Call', heroFlopNode);

  // Hero raises preflop
  const heroRaisePreflop = 9.0;
  const potAfterHeroRaisePreflop = potAfterVillainRaise + heroRaisePreflop; // 4.5 + 9.0 = 13.5 BB

  // Villain folds to your preflop raise
  const endVillainFoldsPreflop = new PuzzleNode(
    'Villain folds to your raise. You win the hand preflop.',
    potAfterVillainRaise, // You win the pot after Villain's raise
    false,
    'Preflop',
    'BB',
    'UTG',
    heroStack,
    villainStack,
    heroHand,
    [],
    potAfterVillainRaise // 4.5 BB
  );

  preflopHeroNode.addNextAction('Raise to 9 BB', endVillainFoldsPreflop);

  return preflopHeroNode;
}

/**
 * Creates and returns the initial PuzzleNode representing the start of the third poker puzzle.
 *
 * @returns {PuzzleNode} The root node of the third poker puzzle.
 */
function createPokerPuzzle3() {
  // Blinds
  const smallBlind = 0.5;
  const bigBlind = 1.0;

  // Hero's hand
  const heroHand = ['9♣', '9♦'];

  // Villain's position and action
  const villainPosition = 'Button';
  const villainRaisePreflop = 2.5;

  let heroStack = 100.0; // Hero starts with 100 BB
  let villainStack = 100.0; // Villain starts with 100 BB

  // Initial pot after blinds
  const initialPot = smallBlind + bigBlind; // 1.5 BB

  // Pot after villain's raise
  const potAfterVillainRaise = initialPot + villainRaisePreflop; // 1.5 + 2.5 = 4.0 BB

  // Hero's options preflop
  const preflopHeroNode = new PuzzleNode(
    'Villain raises to 2.5 BB from the Button. You are in BB with 9♣, 9♦.',
    0,
    true,
    'Preflop',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [],
    potAfterVillainRaise // 4.0 BB
  );

  // Hero folds preflop
  const endHeroFoldsPreflop = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -bigBlind, // You lose your big blind
    false,
    'Preflop',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [],
    bigBlind // 1.0 BB
  );

  // Hero calls preflop
  const heroCallPreflop = villainRaisePreflop - bigBlind; // Additional amount to call
  const preflopPotAfterHeroCall = potAfterVillainRaise + heroCallPreflop; // 4.0 + 1.5 = 5.5 BB

  // Flop cards
  const flopCards = ['9♠', '7♥', '6♣']; // Hero flops top set

  // Hero checks on flop
  const flopHeroCheckNode = new PuzzleNode(
    'Flop has been dealt.',
    0,
    true,
    'Flop',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    preflopPotAfterHeroCall // 5.5 BB
  );

  // Villain bets 3 BB on the flop
  const villainBetFlop = 3.0;
  const potAfterVillainBetFlop = preflopPotAfterHeroCall + villainBetFlop; // 5.5 + 3.0 = 8.5 BB

  // Hero's options after villain bets on the flop
  const heroFlopDecisionNode = new PuzzleNode(
    'Villain bets 3 BB on the flop.',
    0,
    true,
    'Flop',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    potAfterVillainBetFlop // 8.5 BB
  );

  // Hero folds on flop
  const endHeroFoldsFlop = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -heroCallPreflop, // You lose preflop call
    false,
    'Flop',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    flopCards,
    heroCallPreflop // 1.5 BB
  );

  // Hero calls on flop
  const heroCallFlop = villainBetFlop;
  const potAfterHeroCallFlop = potAfterVillainBetFlop + heroCallFlop; // 8.5 + 3.0 = 11.5 BB

  // Turn card
  const turnCard = '5♦';

  // Hero checks on turn
  const turnHeroCheckNode = new PuzzleNode(
    'Turn has been dealt.',
    0,
    true,
    'Turn',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    potAfterHeroCallFlop // 11.5 BB
  );

  // Villain bets 7 BB on the turn
  const villainBetTurn = 7.0;
  const potAfterVillainBetTurn = potAfterHeroCallFlop + villainBetTurn; // 11.5 + 7.0 = 18.5 BB

  // Hero's options after villain bets on turn
  const heroTurnDecisionNode = new PuzzleNode(
    'Villain bets 7 BB on the turn.',
    0,
    true,
    'Turn',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    potAfterVillainBetTurn // 18.5 BB
  );

  // Hero folds on turn
  const endHeroFoldsTurn = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -(heroCallPreflop + heroCallFlop), // Total amount lost
    false,
    'Turn',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard],
    heroCallPreflop + heroCallFlop // Total amount lost
  );

  // Hero calls on turn
  const heroCallTurn = villainBetTurn;
  const potAfterHeroCallTurn = potAfterVillainBetTurn + heroCallTurn; // 18.5 + 7.0 = 25.5 BB

  // River card
  const riverCard = '8♠'; // Possible straight on board

  // Hero checks on river
  const riverHeroCheckNode = new PuzzleNode(
    'River has been dealt.',
    0,
    true,
    'River',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterHeroCallTurn // 25.5 BB
  );

  // Villain shoves all-in on river
  const villainBetRiver = 30.0; // Assuming effective stack size
  const potAfterVillainBetRiver = potAfterHeroCallTurn + villainBetRiver; // 25.5 + 30.0 = 55.5 BB

  // Hero's options on river
  const heroRiverDecisionNode = new PuzzleNode(
    'Villain moves all-in on the river.',
    0,
    true,
    'River',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterVillainBetRiver // 55.5 BB
  );

  // Hero folds on river
  const endHeroFoldsRiver = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -(heroCallPreflop + heroCallFlop + heroCallTurn), // Total amount lost
    false,
    'River',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    heroCallPreflop + heroCallFlop + heroCallTurn // Total amount lost
  );

  // Hero calls on river and wins
  const endHeroCallsRiverWin = new PuzzleNode(
    'You call. Villain shows 7♣, 7♦. You win with a higher set!',
    potAfterVillainBetRiver, // You win the total pot
    false,
    'Showdown',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    potAfterVillainBetRiver // 55.5 BB
  );

  // Hero calls on river and loses
  const endHeroCallsRiverLose = new PuzzleNode(
    'You call. Villain shows 10♣, J♠ for a straight. You lose the hand.',
    -(heroCallPreflop + heroCallFlop + heroCallTurn + villainBetRiver), // Total amount lost
    false,
    'Showdown',
    'BB',
    'Button',
    heroStack,
    villainStack,
    heroHand,
    [...flopCards, turnCard, riverCard],
    heroCallPreflop + heroCallFlop + heroCallTurn + villainBetRiver // Total amount lost
  );

  // For this puzzle, let's assume calling the river results in a win
  heroRiverDecisionNode.addNextAction('Fold', endHeroFoldsRiver);
  heroRiverDecisionNode.addNextAction('Call', endHeroCallsRiverWin);

  // Hero's options on turn
  heroTurnDecisionNode.addNextAction('Fold', endHeroFoldsTurn);
  heroTurnDecisionNode.addNextAction('Call', riverHeroCheckNode);
  // Optionally, Hero can raise on the turn

  // Hero's options on flop
  heroFlopDecisionNode.addNextAction('Fold', endHeroFoldsFlop);
  heroFlopDecisionNode.addNextAction('Call', turnHeroCheckNode);
  // Optionally, Hero can raise on the flop

  // Villain's action after Hero checks on flop
  flopHeroCheckNode.addNextAction('Check', turnHeroCheckNode);
  flopHeroCheckNode.addNextAction('Bet 3 BB', heroFlopDecisionNode);

  // Hero's options preflop
  preflopHeroNode.addNextAction('Fold', endHeroFoldsPreflop);
  preflopHeroNode.addNextAction('Call', flopHeroCheckNode);
  // Optionally, Hero can raise (3-bet) preflop

  return preflopHeroNode;
}

export { createPokerPuzzle2, createPokerPuzzle1, createPokerPuzzle3 };
