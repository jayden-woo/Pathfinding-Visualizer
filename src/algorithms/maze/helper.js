// Help function to pick a random integer between the given range
export const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Help function to pick a random even integer between 2 and the given number
export const randEven = (num) => Math.floor(randInt(2, num) / 2) * 2;

// Help function to pick a random odd integer between 1 and the given number
export const randOdd = (num) => Math.floor(randInt(1, num - 1) / 2) * 2 + 1;
