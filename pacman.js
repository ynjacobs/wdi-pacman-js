// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellet = 4;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
const blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
const pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
const clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

ghosts = [inky, blinky, pinky, clyde];

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log(`Power-Pellets: ${powerPellet}`);
  
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellet > 0) console.log('(p) Eat Power-Pellet');
  
  for(i = 0; i < ghosts.length; i++){
    console.log(`(${i+1}) Eat ${ghosts[i].name} (${ghosts[i].edible? "Edible":"Not Edible"})`);
    
    
    
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case 'p':
    if (powerPellet > 0){
      eatPowerPellet();
    }else {
      console.log('no more pellets left to eat, do not press p again please');
      
    }
    break;
      
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function eatGhost (ghost) {
  if(ghost.edible){
    console.log(`${ghost.name} has been eated, he was a mean ${ghost.character}!`);
    score += 200;
    ghost.edible = false;
  }
  else{
    lives-- ;
    console.log(`the ghost is ${ghost.name} and he is ${ghost.colour} and he ate pacman `);
    
    checkLives();
    
  }
}

function eatPowerPellet() {
  score += 50;
  for (index in ghosts){
    ghosts[index].edible = true;
  }
  powerPellet--;
}

function checkLives() {
  if (lives == 0) {
    displayStats()

    process.exit();
    
  }
}
//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
