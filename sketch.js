let reels;
let reelImages = [];
let sound;
let reactions = {};
let spinning = false;
let spinSpeed = [];
let reactionDiv;

function preload() {
  // Adjust paths if needed to match your folder structure
  reelImages = [
    loadImage('./images/kith.png'),
    loadImage('./images/hort.png'),
    loadImage('./images/pol.png')
  ];

  reactions.patrick = './images/patrick.png';
  reactions.lilguy  = './images/lilguywithgun.png';
  reactions.banana  = './images/banana.png';
  reactions.sad     = './images/jakesExistentialCrisis.png';
}

function setup() {
  let container = createDiv().class('slot-machine');
  container.position(windowWidth / 2 - 160, windowHeight / 2 - 200);

  // Added header with custom text at the top
  let header = createElement('h1', "It’s near February 14th, maybe I can be the 1 4 you!");
  header.parent(container);

  let reelContainer = createDiv().class('reel-container').parent(container);
  createCanvas(300, 250).parent(reelContainer);

  reels = [0, 0, 0];

  createButton('SPIN')
    .mousePressed(spinReels)
    .parent(container);
}


function draw() {
  background(255);
  for (let i = 0; i < 3; i++) {
    image(reelImages[reels[i]], 20 + i * 100, 10, 80, 80);
  }
}

function spinReels() {
  if (spinning) return;
  spinning = true;
  reactionDiv.style('display', 'none');
  reactionDiv.html('');

  spinSpeed = [
    int(random(10, 30)),
    int(random(10, 30)),
    int(random(10, 30))
  ];

  let interval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      if (spinSpeed[i] > 0) {
        reels[i] = int(random(0, reelImages.length));
        spinSpeed[i]--;
      }
    }
    if (spinSpeed.every(s => s === 0)) {
      clearInterval(interval);
      spinning = false;
      checkResult();
    }
  }, 100);

  if (sound && !sound.isPlaying()) {
    sound.play();
  }
}

function checkResult() {
  let reactionSrc;
  // 3 kith -> patrick
  // 3 hort -> lilguy
  // 3 pol  -> banana
  // else   -> sad
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    if (reels[0] === 0) {
      reactionSrc = reactions.patrick;
    } else if (reels[0] === 1) {
      reactionSrc = reactions.lilguy;
    } else {
      reactionSrc = reactions.banana;
    }
  } else {
    reactionSrc = reactions.sad;
  }

  reactionDiv.html(`<img src="${reactionSrc}" class="reaction-img">`);
  reactionDiv.style('display', 'block');
}
