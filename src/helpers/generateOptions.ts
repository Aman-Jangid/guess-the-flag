import { shuffleArray } from "../utils/shuffleArray.js";
import { CountryType } from "../types/CountryType.js";
import { UniqueCombinationGenerator } from "../helpers/genUniqueCombination.js";

export function generateOptions(
  countries: Record<string, CountryType>,
  combinationGenerator: UniqueCombinationGenerator,
  endGame: () => void
) {
  const combination = combinationGenerator.getUniqueCombination();
  if (!combination) {
    endGame();
    return null;
  }

  const [ansIndex, op1Index, op2Index] = combination;

  const answerCountry = countries[ansIndex].countryName;
  const op1Country = countries[op1Index].countryName;
  const op2Country = countries[op2Index].countryName;

  return {
    answerCountry,
    flagUrl: countries[ansIndex].flag,
    options: shuffleArray([answerCountry, op1Country, op2Country]),
  };
}
