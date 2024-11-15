// createPokerPuzzle.js

import PuzzleNode from './PuzzleNode';

/**
 * Creates and returns the initial PuzzleNode representing the start of the poker puzzle.
 *
 * @returns {PuzzleNode} The root node of the poker puzzle.
 */
function createPokerPuzzle() {
  // Blinds
  const smallBlind = 0.5;
  const bigBlind = 1.0;

  // Community cards for various stages
  const currCardsFlop = ['K♠', '10♠', '8♦'];
  const turnCard = '2♠';
  const riverCard = '4♥';

  // Initial pot after blinds
  const initialPot = smallBlind + bigBlind; // 1.5 BB

  // Villain raises to 3 BB preflop
  const villainRaisePreflop = 3.0;
  const preflopPotAfterVillainRaise = initialPot + villainRaisePreflop; // 1.5 + 3.0 = 4.5 BB

  // Hero's call preflop
  const heroCallPreflop = 3.0;
  const heroCallPot = preflopPotAfterVillainRaise + heroCallPreflop; // 4.5 + 3.0 = 7.5 BB

  // Hero raises to 10 BB preflop
  const heroRaisePreflop = 10.0;
  const preflopPotAfterHeroRaise = preflopPotAfterVillainRaise + heroRaisePreflop; // 4.5 + 10.0 = 14.5 BB

  // Villain bets 1/2 pot on the river
  const villainBetRiverAmount = 0.5 * heroCallPot; // 0.5 * 7.5 = 3.75 BB
  const villainBetRiverPot = heroCallPot + villainBetRiverAmount; // 7.5 + 3.75 = 11.25 BB

  // End nodes for various outcomes

  // Hero folds preflop
  const endHeroFoldPreflop = new PuzzleNode(
    'You fold and lose the hand.',
    -bigBlind, // You lose the big blind
    false, // Not hero's turn after folding
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'], // Hero's hand as an array
    [],
    initialPot // Pot remains as blinds: 1.5 BB
  );

  // Villain folds preflop after hero raises to 10 BB
  const endVillainFoldPreflop = new PuzzleNode(
    'Villain folds to your raise. You win the hand preflop.',
    villainRaisePreflop, // You win the villain's raise: 3.0 BB
    false,
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [],
    preflopPotAfterHeroRaise // Total pot after hero's raise: 14.5 BB
  );

  // Villain folds on the flop after hero bets 1/2 pot (3.75 BB)
  const endVillainFoldFlop3_4= new PuzzleNode(
    'Villain folds to your bet on the flop. You win the hand.',
    villainRaisePreflop + 3.75, // You win the villain's fold plus your bet
    false,
    'Flop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    currCardsFlop,
    heroCallPot + heroCallPot * 3/4 // 7.5 + 3.75 = 11.25 BB
  );

    // Villain folds on the flop after hero bets 1/2 pot (3.75 BB)
    const endVillainFoldFlop1_2 = new PuzzleNode(
      'Villain folds to your bet on the flop. You win the hand.',
      villainRaisePreflop + 3.75, // You win the villain's fold plus your bet
      false,
      'Flop',
      'BB',
      'UTG',
      null,
      ['K♥', 'Q♥'],
      currCardsFlop,
      heroCallPot + 3.75 // 7.5 + 3.75 = 11.25 BB
    );

  // Villain folds on the turn after hero bets 1/2 pot (3.75 BB)
  const endVillainFoldTurn = new PuzzleNode(
    'Villain folds to your bet on the turn. You win the hand.',
    villainRaisePreflop + 3.75, // You win the villain's fold plus your bet
    false,
    'Turn',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard],
    heroCallPot + 3.75 // 7.5 + 3.75 = 11.25 BB
  );

  // Villain folds on the river after hero bets 1/2 pot (3.75 BB)
  const endVillainFoldRiver = new PuzzleNode(
    'Villain folds to your bet on the river. You win the hand.',
    villainRaisePreflop + 3.75, // You win the villain's fold plus your bet
    false,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    villainBetRiverAmount + villainBetRiverPot // 7.5 + 3.75 = 11.25 BB
  );

  // Hero calls on the river and wins showdown
  const endHeroCallsRiver = new PuzzleNode(
    'You call. Villain shows A♥, 10♦. You win the showdown.',
    villainRaisePreflop + heroCallPreflop + villainBetRiverAmount, // 3.0 + 3.0 + 3.75 = 9.75 BB
    false,
    'Showdown',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    villainBetRiverPot + villainBetRiverAmount // 7.5 + 3.75 = 11.25 BB
  );

  // Villain folds to hero's raise on the river
  const endVillainFoldsToRaise = new PuzzleNode(
    'Villain folds to your raise. You win the hand.',
    villainRaisePreflop + heroRaisePreflop, // 3.0 + 10.0 = 13.0 BB
    false,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    villainBetRiverPot + villainBetRiverAmount * 2.5
  );

  // Hero folds on the river
  const endHeroFoldsRiver = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -heroCallPreflop, // You lose your call: 3.0 BB
    false,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    heroCallPreflop // Represents the amount lost: 3.0 BB
  );

  // Villain actions on the river
  const villainBetsRiver = new PuzzleNode(
    'Villain bets 1/2 pot on the river.',
    0, // Expected value to be calculated based on actions
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    villainBetRiverPot // 11.25 BB
  );

  villainBetsRiver.addNextAction('Call', endHeroCallsRiver);
  villainBetsRiver.addNextAction('Raise 2.5x', endVillainFoldsToRaise);
  villainBetsRiver.addNextAction('Fold', endHeroFoldsRiver);

  // Villain checks back on the turn
  const villainChecksBackTurn = new PuzzleNode(
    'Villain checks back on the turn.',
    0, // Expected value remains unchanged
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard],
    heroCallPot // 7.5 BB
  );

  villainChecksBackTurn.addNextAction('Bet 1/2 Pot', endVillainFoldRiver);
  villainChecksBackTurn.addNextAction('Bet 3/4 Pot', endVillainFoldRiver);
  villainChecksBackTurn.addNextAction('Check', villainBetsRiver);

  // Villain checks back on the flop
  const villainChecksBackFlop = new PuzzleNode(
    'Villain checks back on the flop.',
    0, // Expected value remains unchanged
    true,
    'Turn',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard],
    heroCallPot // 7.5 BB
  );

  villainChecksBackFlop.addNextAction('Bet 1/2 Pot', endVillainFoldTurn);
  villainChecksBackFlop.addNextAction('Bet 3/4 Pot', endVillainFoldTurn);
  villainChecksBackFlop.addNextAction('Check', villainChecksBackTurn);

  // Flop stage
  const flopHeroNode = new PuzzleNode(
    'Flop has been dealt.',
    0, // Expected value remains unchanged
    true,
    'Flop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    currCardsFlop,
    heroCallPot // 7.5 BB
  );

  flopHeroNode.addNextAction('Bet 1/2 Pot', endVillainFoldFlop1_2);
  flopHeroNode.addNextAction('Bet 3/4 Pot', endVillainFoldFlop3_4);
  flopHeroNode.addNextAction('Check', villainChecksBackFlop);

  // Preflop end nodes
  const preflopHeroNode = new PuzzleNode(
    'Villain has raised 3 BB. You are in BB with K♥, Q♥.',
    0, // Initial expected value
    true,
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [],
    preflopPotAfterVillainRaise // 4.5 BB
  );

  preflopHeroNode.addNextAction('Fold', endHeroFoldPreflop);
  preflopHeroNode.addNextAction('Call', flopHeroNode);
  preflopHeroNode.addNextAction('Raise to 10 BB', endVillainFoldPreflop);

  return preflopHeroNode;
}

export default createPokerPuzzle;
