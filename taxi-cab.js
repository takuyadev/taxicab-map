// All test cases for this problem
const testCases = [
  ["right", 2, "left", 3, "left", 1],
  ["left", 1, "right", 1, "left", 1, "right", 1, "left", 1, "right", 1],
  ["left", 3, "right", 1, "right", 3, "right", 1],
];

// Use array to simulate compass
const compass = [
  {
    axis: "y",
    isForward: true,
  },
  {
    axis: "x",
    isForward: true,
  },
  {
    axis: "y",
    isForward: false,
  },
  {
    axis: "x",
    isForward: false,
  },
];

// Initial default starting position
const startingPosition = { arrow: 0, east: 0, north: 0 };

// Formats direction from weirdly formatted array to objects
const formatDirections = (directions) => {
  let result = [];
  for (let i = 0; i < directions.length; i += 2) {
    result.push({ turn: directions[i], move: directions[i + 1] });
  }
  return result;
};

// Gets current direction based on axis provided
const getDirection = (direction) => (direction === "x" ? "east" : "north");

// Set the current direction of the arrow
const setArrow = (arrow, turn) => {
  arrow += turn === "right" ? 1 : -1;
  
  //Shortened if statement, for catching loops
  return arrow > 3 ? 0 : arrow < 0 ? 3 : arrow
};

const calculateBlocks = (acc, { turn, move }, i, arr) => {
  // Sets arrow position, loop back condition applied
  acc.arrow = setArrow(acc.arrow, turn);
  const { isForward, axis } = compass[acc.arrow];

  // Gets current direction based off of axis provided
  const direction = getDirection(axis);

  // Based off of if isForward is true or false, set positive or negative
  const amount = isForward ? move : -Math.abs(move);

  // Add move amount to total move amount
  acc[direction] += amount;

  // If array is on the last item, make all value positive
  if (i >= arr.length - 1) {
    acc.east = Math.abs(acc.east);
    acc.north = Math.abs(acc.north);
  }

  return acc;
};

// Convert directions to map to current position
const blocksAway = (directions, initial) => {
  const { east, north } = directions.reduce(calculateBlocks, { ...initial });
  return { east, north };
};

// Array of all formatted directions
const formattedDirections = [
  formatDirections(testCases[0]),
  formatDirections(testCases[1]),
  formatDirections(testCases[2]),
];

// Loop through all test cases
for (const direction of formattedDirections) {
  console.log(blocksAway(direction, startingPosition));
}