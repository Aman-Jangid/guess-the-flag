//get random flag and options
export async function generateRandomNumbers(range: number) {
  const numbers = Array.from({ length: range + 1 }, (_, index) => index);
  // Fisher-Yates Shuffle
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}
