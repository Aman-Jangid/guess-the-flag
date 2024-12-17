import { CountryType } from "../types/CountryType.js";

class GameManager {
  private countries: CountryType[];
  private currentIndex: number;
  private score: number;
  private lives: number;
  private timeLeft: number;
  private streak: number;
  private timer: number | null;
  private mode: "timer" | "streak";

  constructor(countries: CountryType[]) {
    this.countries = countries;
    this.currentIndex = 0;
    this.score = 0;
    this.lives = 3; // Default lives for streak mode
    this.timeLeft = 60; // Default time for timer mode
    this.streak = 0;
    this.timer = null;
    this.mode = "streak"; // Default mode is streak
  }

  // Start the game with a specific mode
  startGame(mode: "timer" | "streak") {
    this.mode = mode;
    if (this.mode === "timer") {
      this.timeLeft = 60; // Reset timer
    } else {
      this.streak = 0; // Reset streak
    }
  }

  // Generate the next question with options
  generateQuestion() {
    // Select a random country index
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    const answerCountry = this.countries[randomIndex].countryName;
    const flagUrl = this.countries[randomIndex].flag;

    // Generate two other random countries to form options
    const options = this.getOptions(randomIndex);

    return {
      correctAnswer: answerCountry,
      flagUrl,
      options,
    };
  }

  // Get two random options for the question
  private getOptions(answerIndex: number): string[] {
    const options: string[] = [];
    while (options.length < 2) {
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      if (
        randomIndex !== answerIndex &&
        !options.includes(this.countries[randomIndex].countryName)
      ) {
        options.push(this.countries[randomIndex].countryName);
      }
    }
    options.push(this.countries[answerIndex].countryName); // Add the correct answer
    return this.shuffleArray(options);
  }

  // Shuffle the options
  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // Handle an answer and update the game state
  updateGameState(isCorrect: boolean): boolean {
    if (isCorrect) {
      this.score += 1;
      if (this.mode === "streak") {
        this.streak += 1;
      }
    } else {
      if (this.mode === "streak") {
        this.lives -= 1;
      }
      if (this.lives <= 0) {
        return true; // Game Over
      }
    }
    return false; // Continue game
  }

  // Decrement time for the timer mode
  decrementTime() {
    if (this.mode === "timer" && this.timeLeft > 0) {
      this.timeLeft -= 1;
    }
  }

  // Check if the game is over
  isGameOver(): boolean {
    return this.mode === "timer" ? this.timeLeft <= 0 : this.lives <= 0;
  }

  // Get current game stats
  getStats() {
    return {
      score: this.score,
      lives: this.lives,
      streak: this.streak,
      timeLeft: this.timeLeft,
    };
  }
}

export { GameManager };
