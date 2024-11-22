/**
 * Represents a node in the poker puzzle game, encapsulating the current game state
 * and possible subsequent actions.
 */
class PuzzleNode {
  /**
   * Initializes a PuzzleNode with the specified parameters.
   *
   * @param {string} description - Description of the current game state.
   * @param {number} expectedValue - The expected value of the current state.
   * @param {boolean} hero - Indicates if it's the hero's turn.
   * @param {string} stage - Current stage of the game (e.g., "Preflop", "Flop").
   * @param {string} position - Hero's position (e.g., "UTG", "BB").
   * @param {string} villainPosition - Villain's position (e.g., "UTG", "BB").
   * @param {number} [heroStack=0] - Hero's stack amount.
   * @param {number} [villainStack=0] - Villain's stack amount.
   * @param {Array<string>} [hand=[]] - Optional array representing hero's hand.
   * @param {Array<string>} [currCards=[]] - Optional array of current community cards.
   * @param {number} [potSize=0.00] - The current size of the pot.
   */
  constructor(
    description,
    expectedValue,
    hero,
    stage,
    position,
    villainPosition,
    heroStack = 0,
    villainStack = 0,
    hand = [],
    currCards = [],
    potSize = 0.00
  ) {
    this.description = description;
    this.expectedValue = expectedValue;
    this.nextActions = {}; // Object mapping action names to PuzzleNode instances
    this.hero = hero;
    this.stage = stage;
    this.position = position;
    this.villainPosition = villainPosition;
    this.heroStack = parseFloat(heroStack.toFixed(2)); // Hero's stack amount
    this.villainStack = parseFloat(villainStack.toFixed(2)); // Villain's stack amount
    this.hand = hand; // Array of individual cards, e.g., ["K♥", "Q♥"]
    this.currCards = currCards; // Array of community cards, e.g., ["K♠", "10♠", "8♦"]
    this.potSize = parseFloat(potSize.toFixed(2)); // Initialize potSize with two decimals
  }

  /**
   * Adds a next action to the current node.
   *
   * @param {string} actionName - The name of the action.
   * @param {PuzzleNode} node - The subsequent PuzzleNode resulting from the action.
   */
  addNextAction(actionName, node) {
    this.nextActions[actionName] = node;
  }

  /**
   * Returns a string representation of the PuzzleNode.
   *
   * @returns {string} String representation.
   */
  toString() {
    return `PuzzleNode {
      description: ${this.description},
      expectedValue: ${this.expectedValue},
      nextActions: ${Object.keys(this.nextActions)},
      hero: ${this.hero},
      stage: ${this.stage},
      position: ${this.position},
      villainPosition: ${this.villainPosition},
      heroStack: ${this.heroStack.toFixed(2)},
      villainStack: ${this.villainStack.toFixed(2)},
      potSize: ${this.potSize.toFixed(2)},
      hand: ${this.hand.join(', ')},
      currCards: ${this.currCards.join(', ')}
    }`;
  }
}

export default PuzzleNode;
