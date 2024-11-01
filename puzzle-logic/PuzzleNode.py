import tkinter as tk

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
        description="You call. Villain shows A♥ 10♦. You win the showdown.",
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
        "Call": end_hero_calls_river_node,
        "Raise": end_villain_folds_to_raise_node,
        "Fold": end_hero_folds_river_node
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
        "Bet 1/2 Pot": end_villain_fold_node_river,
        "Bet 3/4 Pot": end_villain_fold_node_river,
        "Check": villain_bets_river_node
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
        "Bet 1/2 Pot": end_villain_fold_node_turn,
        "Bet 3/4 Pot": end_villain_fold_node_turn,
        "Check": villain_checks_back_turn_node
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
        "Bet 1/2 Pot": end_villain_fold_node_flop,
        "Bet 3/4 Pot": end_villain_fold_node_flop,
        "Check": villain_checks_back_flop_node
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
        "Fold": end_hero_fold_node_preflop,
        "Call": flop_hero_node,
        "Raise to 10 BB": end_villain_fold_node_preflop
    }

    return preflop_hero_node

class PokerPuzzleGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Poker Puzzle")
        self.initial_node = create_poker_puzzle()
        self.current_node = self.initial_node
        self.create_widgets()
        self.display_node(self.current_node)

    def create_widgets(self):
        self.stage_label = tk.Label(self.root, text="", font=("Helvetica", 16))
        self.stage_label.pack(pady=5)

        self.positions_label = tk.Label(self.root, text="", font=("Helvetica", 12))
        self.positions_label.pack(pady=5)

        self.description_label = tk.Label(self.root, text="", font=("Helvetica", 12), wraplength=400)
        self.description_label.pack(pady=5)

        self.hand_label = tk.Label(self.root, text="", font=("Helvetica", 12))
        self.hand_label.pack(pady=5)

        self.cards_label = tk.Label(self.root, text="", font=("Helvetica", 12))
        self.cards_label.pack(pady=5)

        self.actions_frame = tk.Frame(self.root)
        self.actions_frame.pack(pady=10)

        self.expected_value_label = tk.Label(self.root, text="", font=("Helvetica", 12))
        self.expected_value_label.pack(pady=5)

    def display_node(self, node):
        # Clear previous action buttons
        for widget in self.actions_frame.winfo_children():
            widget.destroy()

        self.stage_label.config(text=f"Stage: {node.stage}")
        self.positions_label.config(text=f"Hero Position: {node.position} | Villain Position: {node.villain_position}")
        player = "Hero" if node.hero else "Villain"
        self.description_label.config(text=f"{player}: {node.description}")

        if node.hand and node.hero:
            self.hand_label.config(text=f"Hero's Hand: {node.hand}")
        else:
            self.hand_label.config(text="")

        if node.curr_cards:
            self.cards_label.config(text=f"Community Cards: {', '.join(node.curr_cards)}")
        else:
            self.cards_label.config(text="")

        self.expected_value_label.config(text=f"Expected Value: {node.expected_value}")

        if not node.next_actions:
            # Game over
            # Display the final result and expected value in the GUI
            self.description_label.config(text=f"Game Over: {node.description}")
            self.expected_value_label.config(text=f"Final Expected Value: {node.expected_value}")

            # Add a Reset button
            reset_button = tk.Button(
                self.actions_frame,
                text="Reset Game",
                width=20,
                command=self.reset_game
            )
            reset_button.pack(pady=2)
            return

        for action_text, next_node in node.next_actions.items():
            action_button = tk.Button(
                self.actions_frame,
                text=action_text,
                width=20,
                command=lambda n=next_node: self.display_node(n)
            )
            action_button.pack(pady=2)

    def reset_game(self):
        self.current_node = self.initial_node
        self.display_node(self.current_node)

def run_puzzle():
    root = tk.Tk()
    app = PokerPuzzleGUI(root)
    root.mainloop()

if __name__ == "__main__":
    run_puzzle()
