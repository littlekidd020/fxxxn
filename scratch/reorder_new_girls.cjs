const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/data.js');
let content = fs.readFileSync(filePath, 'utf8');

// Match the girls array
const girlsMatch = content.match(/export const girls = (\[[\s\S]*?\]);(?:\r?\n|$)/);
if (!girlsMatch) {
  console.error("Could not find girls array");
  process.exit(1);
}

let girlsArrayStr = girlsMatch[1];

// We can't really parse it with JSON.parse because it's JS (regex, unicode, nested objects)
// But we can identify the individual objects { ... } at the top level of the array.
// Each object starts with { and ends with }, and they are comma separated.

const objects = [];
let depth = 0;
let currentObject = "";
let inString = false;
let stringChar = "";

// Simple parser to split the array into top-level objects
for (let i = 1; i < girlsArrayStr.length - 1; i++) {
  const char = girlsArrayStr[i];
  const nextChar = girlsArrayStr[i+1];

  if (!inString) {
    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringChar = char;
    } else if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
    }
  } else {
    if (char === stringChar && girlsArrayStr[i-1] !== '\\') {
      inString = false;
    }
  }

  currentObject += char;

  if (depth === 0 && char === '}' && !inString) {
    objects.push(currentObject.trim());
    currentObject = "";
    // Skip comma
    while (girlsArrayStr[i+1] === ',' || girlsArrayStr[i+1] === '\n' || girlsArrayStr[i+1] === '\r' || girlsArrayStr[i+1] === ' ') {
      i++;
    }
  }
}

console.log(`Found ${objects.length} objects`);

// Extract IDs to identify the ones to move
const toMoveIds = [29, 30, 31, 32, 33, 34];
const objectsToMove = [];
const remainingObjects = [];

objects.forEach(obj => {
  const idMatch = obj.match(/id:\s*(\d+)/);
  if (idMatch && toMoveIds.includes(parseInt(idMatch[1]))) {
    objectsToMove.push(obj);
  } else {
    remainingObjects.push(obj);
  }
});

// User said "put (ID 29), (ID 30), (ID 31), (ID 32), (ID 33), (ID 34) to the top"
// I'll preserve that specific order in the top list.
objectsToMove.sort((a, b) => {
  const idA = parseInt(a.match(/id:\s*(\d+)/)[1]);
  const idB = parseInt(b.match(/id:\s*(\d+)/)[1]);
  return idA - idB;
});

const newGirlsArrayStr = "[\n  " + [...objectsToMove, ...remainingObjects].join(',\n  ') + "\n]";

const newContent = content.replace(girlsMatch[0], `export const girls = ${newGirlsArrayStr};\n`);
fs.writeFileSync(filePath, newContent);
console.log("Successfully reordered girls");
