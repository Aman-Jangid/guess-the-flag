//get random flag and options
// export async function generateRandomNumbers(range: number) {
//   const numbers = Array.from({ length: range + 1 }, (_, index) => index);
//   // Fisher-Yates Shuffle
//   for (let i = numbers.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//   }
//   return numbers;
// }

async function shuffleArray<T>(array: T[]): Promise<T[]> {
  return array.sort(() => Math.random() - 0.5);
}

export async function generateOptions(countries: any) {
  const countryCodes = Object.keys(countries);
  const randomAnswerIndex = Math.floor(Math.random() * countryCodes.length);
  const answerCode = countryCodes[randomAnswerIndex];
  const answerCountry = countries[answerCode].country;

  const randomOptions: string[] = [];
  while (randomOptions.length < 2) {
    const randomIndex = Math.floor(Math.random() * countryCodes.length);
    const optionCountry = countries[countryCodes[randomIndex]].country;
    if (
      optionCountry !== answerCountry &&
      !randomOptions.includes(optionCountry)
    ) {
      randomOptions.push(optionCountry);
    }
  }

  const allOptions = shuffleArray([
    answerCode,
    answerCountry,
    ...randomOptions,
  ]);

  return allOptions;
}