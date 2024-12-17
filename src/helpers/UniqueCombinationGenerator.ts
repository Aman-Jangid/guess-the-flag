export class UniqueCombinationGenerator {
  private indices: number[];
  private usedIndices: Set<string>;

  constructor(size: number) {
    this.indices = Array.from({ length: size }, (_, i) => i);
    this.usedIndices = new Set();
  }

  // Generate a new combination dynamically
  getCombination(): number[] | null {
    if (this.usedIndices.size >= this.indices.length) return null; // No more combinations

    const answerIndex = this.getRandomIndex();
    const otherIndices = this.indices.filter((i) => i !== answerIndex);
    const [op1Index, op2Index] = this.shuffleArray(otherIndices).slice(0, 2);

    const combinationKey = `${answerIndex}-${op1Index}-${op2Index}`;
    if (this.usedIndices.has(combinationKey)) return this.getCombination();

    this.usedIndices.add(combinationKey);
    return [answerIndex, op1Index, op2Index];
  }

  reset() {
    this.usedIndices.clear();
  }

  private getRandomIndex(): number {
    return this.indices[Math.floor(Math.random() * this.indices.length)];
  }

  private shuffleArray<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
