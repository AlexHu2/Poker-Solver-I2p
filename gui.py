import tkinter as tk

# Define the poker ranks
ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

# Generate all possible starting hands
hands = []
for i in range(13):
    row = []
    for j in range(13):
        if i < j:
            hand = ranks[i] + ranks[j] + 's'  # Suited hands
        elif i > j:
            hand = ranks[j] + ranks[i] + 'o'  # Offsuit hands
        else:
            hand = ranks[i] + ranks[j]        # Pairs
        row.append(hand)
    hands.append(row)

class PreflopChartApp:
    def __init__(self, master):
        self.master = master
        master.title("Poker Preflop Chart")

        self.current_player = 1  # Start with Player 1
        self.buttons = {}
        self.highlighted = {1: {}, 2: {}}  # Dictionaries to track highlighted state for each player
        self.bet_frequencies = {1: {}, 2: {}}  # Dictionary to store bet frequencies for each player

        # Create default frequencies for each hand (you can customize these values)
        default_frequencies = {'Fold': 0, '25%': 0, '50%': 0, '75%': 0, '100%': 0, '150%': 0}
        for i in range(13):
            for j in range(13):
                self.bet_frequencies[1][(j, i)] = default_frequencies.copy()
                self.bet_frequencies[2][(j, i)] = default_frequencies.copy()

        # Create buttons for each hand
        for i in range(13):
            for j in range(13):
                hand = hands[j][i]
                btn = tk.Button(master, text=hand, width=5, height=2,
                                command=lambda x=j, y=i: self.toggle_highlight(x, y))
                btn.grid(row=j, column=i, padx=1, pady=1)
                self.buttons[(j, i)] = btn
                self.highlighted[1][(j, i)] = False  # Initialize as not highlighted for Player 1
                self.highlighted[2][(j, i)] = False  # Initialize as not highlighted for Player 2

        # Add player switch buttons
        self.player1_btn = tk.Button(master, text="Hero", command=self.switch_to_player1, relief=tk.SUNKEN)
        self.player1_btn.grid(row=14, column=4, pady=10)

        self.player2_btn = tk.Button(master, text="Villain", command=self.switch_to_player2)
        self.player2_btn.grid(row=14, column=8, pady=10)

        # Add a reset button
        reset_btn = tk.Button(master, text="Reset Chart", command=self.reset_chart)
        reset_btn.grid(row=15, column=6, columnspan=2, pady=10)

        # Add frequency view labels
        frequency_label = tk.Label(master, text="Action Frequencies for Selected Hand:")
        frequency_label.grid(row=16, column=1, columnspan=4, pady=10)

        self.frequency_text = tk.Text(master, width=30, height=6)
        self.frequency_text.grid(row=17, column=1, columnspan=4, pady=10)

        # Initial display update
        self.update_display()

    def toggle_highlight(self, x, y):
        current_player = self.current_player
        self.highlighted[current_player][(x, y)] = not self.highlighted[current_player][(x, y)]
        # Update the display
        self.update_display()
        # Update frequency display for selected hand
        self.update_frequencies_display(x, y)

    def update_display(self):
        for position, btn in self.buttons.items():
            x, y = position
            selected = self.highlighted[self.current_player][(x, y)]
            if selected:
                if self.current_player == 1:
                    btn.configure(fg='red')
                else:
                    btn.configure(fg='blue')
            else:
                btn.configure(fg='black')

    def update_frequencies_display(self, x, y):
        # Update the frequency display for the selected hand
        frequencies = self.bet_frequencies[self.current_player][(x, y)]
        frequency_text = "\n".join([f"{action}: {freq}%" for action, freq in frequencies.items()])
        self.frequency_text.delete(1.0, tk.END)  # Clear the existing text
        self.frequency_text.insert(tk.END, frequency_text)  # Insert new frequency text

    def switch_to_player1(self):
        self.current_player = 1
        self.player1_btn.configure(relief=tk.SUNKEN)
        self.player2_btn.configure(relief=tk.RAISED)
        self.update_display()

    def switch_to_player2(self):
        self.current_player = 2
        self.player1_btn.configure(relief=tk.RAISED)
        self.player2_btn.configure(relief=tk.SUNKEN)
        self.update_display()

    def reset_chart(self):
        for position in self.buttons:
            self.highlighted[1][position] = False
            self.highlighted[2][position] = False
            
            # Reset frequencies as well
            default_frequencies = {'Fold': 0, '25%': 0, '50%': 0, '75%': 0, '100%': 0, '150%': 0}
            self.bet_frequencies[1][position] = default_frequencies.copy()
            self.bet_frequencies[2][position] = default_frequencies.copy()
        self.update_display()
        self.frequency_text.delete(1.0, tk.END)  # Clear the frequency display

if __name__ == "__main__":
    root = tk.Tk()
    app = PreflopChartApp(root)
    root.mainloop()
