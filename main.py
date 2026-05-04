import random
def guessing_game():
    number = random.randint(1,1000)
    guesses = 0
    while True:
        guess = int(input("Guess the number between 1 and 1000: "))
        guesses += 1
        if guess < number:
            print("Too low, please try again! 😁")
        elif guess > number:
            print("Too high, please try again! 🤨")
        else:
            print(f"Congratulation! You guessed right in {guesses} attempts! 👍")
            break

if __name__ == "__main__":
    print('Welcome to the guessing game!')
    guessing_game()
    play_again = input("Do you want to play again? (yes/no): ")
    while play_again.lower() == "yes":
        guessing_game()
        play_again = input("Do you want to play again? (yes/no): ")
    print("Thanks for playing!")