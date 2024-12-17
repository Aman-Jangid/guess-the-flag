function shuffleArray(array: number[]) {
  return array.sort(() => Math.random() - 0.5);
}

function generateCombinations(array: number[]) {
  const combinations = [];
  const n = array.length; // 254 elements

  for (let i = 0; i < n; i++) {
    const uniqueElement = array[i];
    const otherElements = array.slice(0, i).concat(array.slice(i + 1));

    // Shuffle to ensure randomness
    const shuffledOthers = shuffleArray([...otherElements]);

    // Select the first two unique elements
    const firstOther = shuffledOthers[0];
    const secondOther = shuffledOthers[1];

    combinations.push([uniqueElement, firstOther, secondOther]);
  }

  return shuffleArray(combinations); // Shuffle the final combinations for extra randomness
}

// Function to retrieve a unique, non-repeating combination
class UniqueCombinationGenerator {
  private combinations: number[][];
  private usedCombinations: Set<string>;

  constructor(array: number[]) {
    this.combinations = generateCombinations(array);
    this.usedCombinations = new Set();
  }

  getUniqueCombination(): number[] | null {
    for (const combination of this.combinations) {
      const key = combination.join("-");
      if (!this.usedCombinations.has(key)) {
        this.usedCombinations.add(key);
        return combination;
      }
    }
    return null; // No more unique combinations left
  }
}

// const arr = Array.from({ length: 254 }, (_, i) => i);
// const combinationGenerator = new UniqueCombinationGenerator(arr);

export { UniqueCombinationGenerator };
