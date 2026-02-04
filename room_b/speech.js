const textDisplay = document.getElementById('overlay');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const noteContainer = document.querySelector('.note-container');
const sadGif = document.getElementById("sadGif");
const madGif = document.getElementById("madGif");
const happyGif = document.getElementById("happyGif");
const body = document.body;


recognition.lang = 'en-US';


recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    textDisplay.textContent = transcript;
};


recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};


  


const responses = [
  {
    phrases: [
      "can i be helped or am i too far gone",
      "am i too far gone",
      "can i be helped"
    ],
    reply: "You're not too far gone. It's okay to ask for help, and I'm glad you did. Bananas are always the solution."
  },
      {
    phrases: [
      "i am sad",
      "im sad",
      "i'm sad",
      "feeling sad",
      "i feel sad"
    ],
    reply: "OOH OOH AH AH. You feel sad. Makes me feel sad...",
    action: "sadMode"
  },

    {
    phrases: [
      "hello monkey",
      "hello"
    ],
    reply: "Hello! OOh OOh Do you like bananas?"
  },

  {
    phrases: [
      "I like bananas",
      "bananas are good",
      "bananas good",

    ],
    reply: "Yay we can be friends.",
    action: "happyMode"
  },
{
    phrases: [
      "i hate bananas",
      "i dont like bananas",
      "bananas are bad",
      "bananas bad",

    ],
    reply: "I don't like you...",
    action: "madMode"
  },


  {
    phrases: [
      "how can i live my best life",
      "i want to live my best life"
    ],
    reply: "Swing everywhere you go. It makes me happy.",
    action: "happyMode"
  },
  {
    phrases: [
      "what are some good habits that i should take up",
      "good habits i should take"
    ],
    reply: "Eat bugs off of your friend's backs and go climb trees. It is good for the brain."
  },
  { 
    phrases: [ 
        "What do I do if I feel lonely", 
        "i am lonely", 
        "im lonely", 
        "i'm lonely", 
        "feeling lonely" 
    ], 
    reply: "OOH… AH… Being lonely is hard. I’ll sit with you.",
    action: "sadMode"
  },
  {
    phrases : [
        "i am mad",
        "im mad",
        "i'm mad",
        "feeling mad",
        "i feel mad",
        "i am angry",
        "im angry",
        "i'm angry",
        "feeling angry",
        "i feel angry"
      ],
    reply: "OOH OOH AH AH. You feel mad. I don't do well with anger...",
    action: "madMode"
  }
];

// Helper function: lowercase and remove punctuation
function cleanText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

// Start speech recognition on button click
startBtn.addEventListener('click', () => {
  recognition.start();
  console.log("Listening...");
});

// Runs every time speech is detected
recognition.onresult = function (event) {
  const transcript =
    event.results[event.results.length - 1][0].transcript;

  const lowerTranscript = cleanText(transcript);

  let matched = false;

  for (const rule of responses) {
    if (rule.phrases.some(phrase => lowerTranscript.includes(cleanText(phrase)))) {
      textDisplay.textContent = rule.reply;

      // Monkey reply color
      textDisplay.style.color = "orange";

      matched = true;
      break;
    }
  }

  // Default behavior if no phrase matched
  if (!matched) {
    textDisplay.textContent = transcript;

    // Reset to default color
    textDisplay.style.color = "black";
  }
};


// Actions

function deactivateAllActions() {
  sadGif.classList.remove("visible");
  madGif.classList.remove("visible");
  happyGif.classList.remove("visible");
  body.classList.remove("dark-background");
  rain.classList.remove("visible");
}

function activateAction(actionName) {
  if (actionName === "sadMode") {
    sadGif.classList.add("visible");
    createRain();
    rain.classList.add("visible");
  } else if (actionName === "madMode") {
    madGif.classList.add("visible");
    body.classList.add("dark-background");
  }else if (actionName === "happyMode") {
    happyGif.classList.add("visible");
  }

  
}

const rain = document.getElementById("rain");

// Function to create raindrops
function createRain() {
    rain.innerHTML = ''; // Clear existing rain
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        rain.appendChild(drop);
    }
}



recognition.onresult = function (event) {
  const result = event.results[event.results.length - 1];
  if (!result.isFinal) return;

  const transcript = result[0].transcript;
  const lowerTranscript = cleanText(transcript);

  let matched = false;

  for (const rule of responses) {
    if (rule.phrases.some(p => lowerTranscript.includes(cleanText(p)))) {
      textDisplay.textContent = rule.reply;
      textDisplay.style.color = "orange";
      

      deactivateAllActions();
      if (rule.action) activateAction(rule.action);

      matched = true;
      break;
    }
  }

  if (!matched) {
    textDisplay.textContent = transcript;
    textDisplay.style.color = "white";
    deactivateAllActions();
  }
};

recognition.onerror = (e) => {
  console.error("Speech error:", e.error);
};

startBtn.addEventListener("click", () => {
  recognition.start();
  console.log("Listening...");

  noteContainer.style.opacity = "1";
});



