// createPokerPuzzle.js

import PuzzleNode from './PuzzleNode';

/**
 * Creates and returns the initial PuzzleNode representing the start of the poker puzzle.
 *
 * @returns {PuzzleNode} The root node of the poker puzzle.
 */
function createPokerPuzzle() {
  // Community cards for various stages
  const currCardsFlop = ['K♠', '10♠', '8♦'];
  const turnCard = '2♠';
  const riverCard = '4♥';

  // End nodes for various outcomes

  const endHeroFoldPreflop = new PuzzleNode(
    'You fold and lose the hand.',
    -0.5, // You lose the small blind
    true,
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'] // Hero's hand as an array
  );

  const endVillainFoldPreflop = new PuzzleNode(
    'Villain folds to your raise. You win the hand preflop.',
    3, // You win the 3 BB from villain's raise
    true,
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥']
  );

  const endVillainFoldFlop = new PuzzleNode(
    'Villain folds to your bet on the flop. You win the hand.',
    6, // Pot is 6 BB after the flop
    true,
    'Flop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    currCardsFlop
  );

  const endVillainFoldTurn = new PuzzleNode(
    'Villain folds to your bet on the turn. You win the hand.',
    6, // Pot is 6 BB
    true,
    'Turn',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard]
  );

  const endVillainFoldRiver = new PuzzleNode(
    'Villain folds to your bet on the river. You win the hand.',
    6,
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  const endHeroCallsRiver = new PuzzleNode(
    'You call. Villain shows A♥, 10♦. You win the showdown.',
    6, // You win the pot
    true,
    'Showdown',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  const endVillainFoldsToRaise = new PuzzleNode(
    'Villain folds to your raise. You win the hand.',
    6,
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  const endHeroFoldsRiver = new PuzzleNode(
    'You fold. Villain wins the hand.',
    -3, // You lose your previous bets
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  // Villain actions on the river
  const villainBetsRiver = new PuzzleNode(
    'Villain bets 1/2 pot on the river.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  villainBetsRiver.addNextAction('Call', endHeroCallsRiver);
  villainBetsRiver.addNextAction('Raise', endVillainFoldsToRaise);
  villainBetsRiver.addNextAction('Fold', endHeroFoldsRiver);

  // Villain checks back on the turn
  const villainChecksBackTurn = new PuzzleNode(
    'Villain checks back on the turn.',
    0,
    true,
    'River',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard, riverCard]
  );

  villainChecksBackTurn.addNextAction('Bet 1/2 Pot', endVillainFoldRiver);
  villainChecksBackTurn.addNextAction('Bet 3/4 Pot', endVillainFoldRiver);
  villainChecksBackTurn.addNextAction('Check', villainBetsRiver);

  // Villain checks back on the flop
  const villainChecksBackFlop = new PuzzleNode(
    'Villain checks back on the flop.',
    0,
    true,
    'Turn',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    [...currCardsFlop, turnCard]
  );

  villainChecksBackFlop.addNextAction('Bet 1/2 Pot', endVillainFoldTurn);
  villainChecksBackFlop.addNextAction('Bet 3/4 Pot', endVillainFoldTurn);
  villainChecksBackFlop.addNextAction('Check', villainChecksBackTurn);

  // Flop stage
  const flopHeroNode = new PuzzleNode(
    'Flop has been dealt.',
    0,
    true,
    'Flop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥'],
    currCardsFlop
  );

  flopHeroNode.addNextAction('Bet 1/2 Pot', endVillainFoldFlop);
  flopHeroNode.addNextAction('Bet 3/4 Pot', endVillainFoldFlop);
  flopHeroNode.addNextAction('Check', villainChecksBackFlop);

  // Preflop end nodes
  const preflopHeroNode = new PuzzleNode(
    'Villain has raised 3 BB. You are in BB with K♥, Q♥.',
    0,
    true,
    'Preflop',
    'BB',
    'UTG',
    null,
    ['K♥', 'Q♥']
  );

  preflopHeroNode.addNextAction('Fold', endHeroFoldPreflop);
  preflopHeroNode.addNextAction('Call', flopHeroNode);
  preflopHeroNode.addNextAction('Raise to 10 BB', endVillainFoldPreflop);

  return preflopHeroNode;
}

export default createPokerPuzzle;
