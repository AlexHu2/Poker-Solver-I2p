class PuzzleNode:
    def __init__(
        self,
        description,
        expected_value,
        next_actions,
        hero: bool,
        stage,
        position,
        villain_position,
        stack=None,
        hand=None,
        curr_cards=None
    ):
        """
        Initializes a PuzzleNode.

        :param description: Description of the current game state.
        :param expected_value: The expected value of the current state.
        :param next_actions: A dictionary mapping action names to subsequent PuzzleNodes.
        :param hero: Boolean indicating if it's the hero's turn.
        :param stage: Current stage of the game (e.g., 'Preflop', 'Flop').
        :param position: Hero's position ('UTG', 'BB', etc.).
        :param villain_position: Villain's position ('UTG', 'BB', etc.).
        """
        self.description = description
        self.expected_value = expected_value
        self.next_actions = next_actions  # dict of action_name: PuzzleNode
        self.hero = hero
        self.stage = stage
        self.position = position  # Hero's position
        self.villain_position = villain_position  # Villain's position
        self.stack = stack
        self.hand = hand
        self.curr_cards = curr_cards or []

    def display(self):
        """
        Displays the current game state.
        """
        print(f"Stage: {self.stage}")
        print(f"Hero Position: {self.position}")
        print(f"Villain Position: {self.villain_position}")
        print(f"{'Hero' if self.hero else 'Villain'}: {self.description}")
        if self.hand:
            print(f"Hero's Hand: {self.hand}")
        if self.curr_cards:
            print(f"Community Cards: {', '.join(self.curr_cards)}")
        print("Available actions:")
        for action in self.next_actions.keys():
            print(f" - {action}")
        print(f"Expected Value: {self.expected_value}\n")


def create_poker_puzzle():
    # Flop and later cards
    curr_cards_flop = ["K♠", "10♠", "8♦"]
    turn_card = "2♠"
    river_card = "4♥"

    # End nodes
    end_hero_fold_node_preflop = PuzzleNode(
        description="You fold and lose the hand.",
        expected_value=-0.5,  # You lose the small blind
        next_actions={},  # No further actions
        hero=True,
        stage="Preflop",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥"
    )

    end_villain_fold_node_preflop = PuzzleNode(
        description="Villain folds to your raise. You win the hand preflop.",
        expected_value=3,  # You win the 3 BB from villain's raise
        next_actions={},  # No further actions
        hero=True,
        stage="Preflop",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥"
    )

    end_villain_fold_node_flop = PuzzleNode(
        description="Villain folds to your bet on the flop. You win the hand.",
        expected_value=6,  # Pot is 6 BB after the flop
        next_actions={},  # No further actions
        hero=True,
        stage="Flop",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop
    )

    # End nodes for turn actions
    end_villain_fold_node_turn = PuzzleNode(
        description="Villain folds to your bet on the turn. You win the hand.",
        expected_value=6,  # Pot is 6 BB
        next_actions={},  # No further actions
        hero=True,
        stage="Turn",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card]
    )

    # End nodes for river actions
    end_villain_fold_node_river = PuzzleNode(
        description="Villain folds to your bet on the river. You win the hand.",
        expected_value=6,
        next_actions={},
        hero=True,
        stage="River",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    end_hero_calls_river_node = PuzzleNode(
        description="You call. Villain shows a A♥ 10♦. You win the showdown.",
        expected_value=6,  # You win the pot
        next_actions={},
        hero=True,
        stage="Showdown",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    end_villain_folds_to_raise_node = PuzzleNode(
        description="Villain folds to your raise. You win the hand.",
        expected_value=6,
        next_actions={},
        hero=True,
        stage="River",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    end_hero_folds_river_node = PuzzleNode(
        description="You fold. Villain wins the hand.",
        expected_value=-3,  # You lose your previous bets
        next_actions={},
        hero=True,
        stage="River",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    # Villain bets on the river
    villain_bets_river_node = PuzzleNode(
        description="Villain bets 1/2 pot on the river.",
        expected_value=0,
        next_actions={},  # To be filled
        hero=True,
        stage="River",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    villain_bets_river_node.next_actions = {
        "call": end_hero_calls_river_node,
        "raise": end_villain_folds_to_raise_node,
        "fold": end_hero_folds_river_node
    }

    # Villain checks back on the turn
    villain_checks_back_turn_node = PuzzleNode(
        description="Villain checks back on the turn.",
        expected_value=0,
        next_actions={},  # To be filled
        hero=True,
        stage="River",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card, river_card]
    )

    # Hero's options on the river after villain checks back turn
    villain_checks_back_turn_node.next_actions = {
        "bet 1/2 pot": end_villain_fold_node_river,
        "bet 3/4 pot": end_villain_fold_node_river,
        "check": villain_bets_river_node
    }

    # Hero's options on the turn after both check on flop
    villain_checks_back_flop_node = PuzzleNode(
        description="Villain checks back on the flop.",
        expected_value=0,
        next_actions={},  # To be filled
        hero=True,
        stage="Turn",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop + [turn_card]
    )

    villain_checks_back_flop_node.next_actions = {
        "bet 1/2 pot": end_villain_fold_node_turn,
        "bet 3/4 pot": end_villain_fold_node_turn,
        "check": villain_checks_back_turn_node
    }

    # Flop stage
    flop_hero_node = PuzzleNode(
        description="Flop has been dealt.",
        expected_value=0,
        next_actions={},  # To be filled next
        hero=True,
        stage="Flop",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥",
        curr_cards=curr_cards_flop
    )

    flop_hero_node.next_actions = {
        "bet 1/2 pot": end_villain_fold_node_flop,
        "bet 3/4 pot": end_villain_fold_node_flop,
        "check": villain_checks_back_flop_node
    }

    # Preflop hero node
    preflop_hero_node = PuzzleNode(
        description="Villain has raised 3 BB. You are in BB with K♥, Q♥.",
        expected_value=0,
        next_actions={},  # To be filled next
        hero=True,
        stage="Preflop",
        position="BB",
        villain_position="UTG",
        hand="K♥, Q♥"
    )

    preflop_hero_node.next_actions = {
        "fold": end_hero_fold_node_preflop,
        "call": flop_hero_node,
        "raise to 10 BB": end_villain_fold_node_preflop
    }

    return preflop_hero_node


def run_puzzle():
    current_node = create_poker_puzzle()

    while True:
        current_node.display()

        if not current_node.next_actions:
            print("Puzzle ended.")
            break

        action = input("Choose your action (enter exactly as shown): ").strip()

        if action not in current_node.next_actions:
            print("Invalid action. Please choose a valid action from the options provided.\n")
            continue

        # Move to the next node
        current_node = current_node.next_actions[action]

    print(f"Final Expected Value: {current_node.expected_value}")
    print(f"Result: {current_node.description}")


if __name__ == "__main__":
    run_puzzle()
