/* Browser bundle for file:// and hosted portfolio use. Source modules remain alongside this file. */

const candidates = [
  {
    id: "arturo",
    name: "Arturo “Playboy” Poparelli",
    hometown: "Queens, NY",
    weapon: "Glock 17 w/ silencer",
    strengths: "Slyness",
    weaknesses: "Lady problems",
    portrait: "assets/candidates/arturo.png",
    chat1: "Ugh… Starla was her name… the thighs on that woman could crush a watermelon… Anyways, word got out about us, and now her husband is tracking me down as we speak.",
    chat2: "Hey boss, thanks for moving me on to the next round. I was talking to this girl last night, and one thing led to another. Long story short, I stayed the night at her place and stole some money from her purse on my way out in the morning. It’s all yours!"
  },
  {
    id: "giovanni",
    name: "Giovanni “Gabagool” DeMarco",
    hometown: "Bayonne, NJ",
    weapon: "AK-47",
    strengths: "Strength/Loyalty",
    weaknesses: "Physical activity/Gabagool",
    portrait: "assets/candidates/giovanni.png",
    chat1: "Boss, you been to Jersey Mike’s recently? They did something to their gabagool; it tastes tremendous! If only their subs were bigger…",
    chat2: "To express my appreciation for your consideration of my being second-in-command, here’s one of the new hot honey gabagool subs from Jersey Mike's. It may or may not have a couple of bites taken out of it — I was kinda hungry on the drive here."
  },
  {
    id: "enzo",
    name: "Enzo “The Executioner” Colombo",
    hometown: "Hoboken, NJ",
    weapon: "Karambit knives",
    strengths: "Caring nature",
    weaknesses: "Caring nature",
    portrait: "assets/candidates/enzo.png",
    chat1: "Boss, between you and me… I named myself the executioner to seem tough. In reality, I’m a really chill guy, level-headed and a good decision-maker. I think a lot of our problems can be solved without bloodshed and instead, sometimes a hug!",
    chat2: "Sorry I was late — just broke up a fight between two of the capos. Thankfully, I calmed them down and they agreed to my compromise that conveniently puts 2 G’s a week into both of our pockets. You're welcome…"
  },
  {
    id: "ramon",
    name: "Ramon “Rage” Romano",
    hometown: "Rome, Italy",
    weapon: "Louisville Slugger",
    strengths: "Unstoppable killer",
    weaknesses: "English",
    portrait: "assets/candidates/ramon.png",
    chat1: "[Thick Italian accent] Boss, I no bad guy. Trust me and family will regain strong. Regain? Retain? Re… Baccala! Whatever…",
    chat2: "[Thick Italian accent] Boss, thanks moving me on. For this, I give you the head of your high school bully. It’s on ice in urinal."
  },
  {
    id: "carmine",
    name: "Carmine “C4” Marino",
    hometown: "Hackensack, NJ",
    weapon: "Explosives",
    strengths: "Decision-making/strategy",
    weaknesses: "Alcohol addiction",
    portrait: "assets/candidates/carmine.png",
    chat1: "Boss, what’s your favorite drink? Mine? Well, it depends… beer-wise, I like Pabst cuz it’s crisp and easy to drink. If I’m taking shots, it’s gotta be tequila; it wakes you right up! Mixed drinks are tough, but I’ll have to go with either a Moscow Mule or a Greyhound.",
    chat2: "[Slurred speech] I got a little uh um special prize for ya for moving me on hehe ha… Last week I blew up a safe and got some blue bills for ya. Here they are *BIRRRRPPP*…"
  },
  {
    id: "stevey",
    name: "Stevey “Knuckles” Cornelli",
    hometown: "Long Island, NY",
    weapon: "Brass knuckles",
    strengths: "Strength",
    weaknesses: "Intelligence",
    portrait: "assets/candidates/stevey.png",
    chat1: "You know what I’m always confused about: We’re always trying to get money, right? Why not just start printing our own? Would solve a lot of problems…",
    chat2: "Thanks for promoting me to Consigliere boss. I won’t let you down! Wait… you’re still doing chit chats… oh…"
  },
  {
    id: "bobby",
    name: "Bobby “The Builder” Beccorino",
    hometown: "East Rutherford, NJ",
    weapon: "Nailgun",
    strengths: "Blue-collar work ethic",
    weaknesses: "Can’t stop talking",
    portrait: "assets/candidates/bobby.png",
    chat1: "Ayeeee! Ohhhh! Name’s Bobby Beccorino from around the way. How’s it hangin? I’m a whole plate of pancakes pal, name’s Bobby Beccorino, you know, from around the way. Come over to the site where I do all my construction stuff, have you seen it? It’s around the way. Just hop in your car, drive down the road, and when you get to the way — go around it.",
    chat2: "Boss, remember me? Name’s Bobby Beccorino from around the way. People around the way are questioning why I moved on to the second round but I had to remind them: ‘Hey there, pal, Bobby Beccorino has been laying drywall since you were in diapers! Yeah, laying drywall instead of hanging it. That’s how much of a plate of pancakes I am, pal!’"
  }
];

const candidateById = Object.fromEntries(candidates.map((candidate) => [candidate.id, candidate]));

const openingCopy = "It’s New York City, 1988. You are a mob boss for the Gabagool crime family. As informants plague the ranks, loyal soldiers are being murdered, and more and more are put in the can each year, you have to find a new Consigliere, or second-in-command, to help you turn the family around.";

const endings = {
  good: "Thanks for the promotion, boss. Now let’s get to work and make this city ours. But first… Gabagool!",
  hostile: "I can’t take your orders for another second. With the way you treat me, I should’ve done this a long time ago. Look who’s the boss now haha!"
};


const createInitialState = () => ({
  phase: "opening",
  firstRound: [],
  finalists: [],
  winner: null,
  responses: {},
  chatIndex: 0,
  locked: false
});

function addUniqueSelection(current, candidateId, limit) {
  if (current.includes(candidateId) || current.length >= limit) return current;
  return [...current, candidateId];
}

function recordResponse(responses, candidateId, round, sentiment) {
  if (!candidateId || ![1, 2].includes(round)) throw new Error("Invalid response target");
  if (!["positive", "neutral", "negative"].includes(sentiment)) throw new Error("Invalid sentiment");
  return {
    ...responses,
    [candidateId]: {
      ...(responses[candidateId] || {}),
      [round]: sentiment
    }
  };
}

function getEndingType(responses, winnerId) {
  const winnerResponses = responses[winnerId] || {};
  return winnerResponses[1] === "negative" && winnerResponses[2] === "negative"
    ? "hostile"
    : "good";
}



const game = document.querySelector("#game");
const curtain = document.querySelector("#curtain");
const curtainLabel = document.querySelector("#curtain-label");
const confirmDialog = document.querySelector("#confirm-dialog");
const confirmTitle = document.querySelector("#confirm-title");
const confirmBio = document.querySelector("#confirm-bio");

let state = createInitialState();
let pendingSelection = null;
let curtainTimers = [];

function candidateBio(candidate) {
  return `
    <dl>
      <div><dt>Hometown</dt><dd>${candidate.hometown}</dd></div>
      <div><dt>Weapon of choice</dt><dd>${candidate.weapon}</dd></div>
      <div><dt>Strengths</dt><dd>${candidate.strengths}</dd></div>
      <div><dt>Weaknesses</dt><dd>${candidate.weaknesses}</dd></div>
    </dl>`;
}

function renderOpening() {
  game.innerHTML = `
    <section class="screen opening-screen">
      <div class="brand-mark"><span>1988 · New York City</span><h1>Consigliere Finder</h1></div>
      <div class="opening-scene" role="img" aria-label="The boss sitting alone at the family bar"></div>
      <div class="textbox dialogue-box opening-textbox">
        <span class="speaker">The Boss</span>
        <p>${openingCopy}</p>
        <div class="response-row">
          <button class="response response-neutral" data-action="start">See candidates</button>
        </div>
      </div>
    </section>`;
}

function selectionConfig() {
  if (state.phase === "select-initial") {
    return { ids: candidates.map((c) => c.id), selected: state.firstRound, limit: 3, title: "Choose three captains", note: "Your choices will be interviewed in this exact order." };
  }
  if (state.phase === "select-shortlist") {
    return { ids: state.firstRound, selected: state.finalists, limit: 2, title: "Choose two finalists", note: "Who earned another conversation?" };
  }
  return { ids: state.finalists, selected: state.winner ? [state.winner] : [], limit: 1, title: "Choose your Consigliere", note: "Make the choice that feels right for your family." };
}

function renderSelection() {
  const config = selectionConfig();
  const remaining = config.limit - config.selected.length;
  game.innerHTML = `
    <section class="screen selection-screen">
      <header class="selection-header">
        <p class="eyebrow">Gabagool crime family</p>
        <h1>${config.title}</h1>
        <p>${config.note} <strong>${remaining} choice${remaining === 1 ? "" : "s"} remaining.</strong></p>
      </header>
      <div class="selection-layout">
        <aside id="bio-panel" class="bio-panel" aria-live="polite">
          <p class="eyebrow">Candidate file</p>
          <h2>Inspect the captains</h2>
          <p>Hover, focus, or tap a portrait to read the candidate’s file.</p>
        </aside>
        <div class="candidate-grid ${config.ids.length < 7 ? "candidate-grid-short" : ""}">
          ${config.ids.map((id, index) => {
            const candidate = candidateById[id];
            const selectedIndex = config.selected.indexOf(id);
            const selected = selectedIndex >= 0;
            const disabled = !selected && config.selected.length >= config.limit;
            return `
              <button class="candidate-card ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}"
                data-candidate="${id}" ${disabled || selected ? "disabled" : ""}
                aria-label="${candidate.name}${selected ? `, selected number ${selectedIndex + 1}` : ""}">
                <span class="candidate-portrait">
                  <img src="${candidate.portrait}" alt="${candidate.name}" />
                </span>
                ${selected ? `<span class="selection-order" aria-hidden="true">✓ ${selectedIndex + 1}</span>` : ""}
              </button>`;
          }).join("")}
        </div>
      </div>
    </section>`;

  document.querySelectorAll(".candidate-card").forEach((card) => {
    const showBio = () => updateBioPanel(card.dataset.candidate);
    card.addEventListener("mouseenter", showBio);
    card.addEventListener("focus", showBio);
    card.addEventListener("pointerdown", showBio);
  });
}

function updateBioPanel(candidateId) {
  const panel = document.querySelector("#bio-panel");
  const candidate = candidateById[candidateId];
  if (!panel || !candidate) return;
  panel.innerHTML = `<p class="eyebrow">Candidate file</p><h2>${candidate.name}</h2>${candidateBio(candidate)}`;
}

function currentInterviewIds() {
  return state.phase === "chat1" ? state.firstRound : state.finalists;
}

function renderInterview(entering = false) {
  const ids = currentInterviewIds();
  const candidate = candidateById[ids[state.chatIndex]];
  const round = state.phase === "chat1" ? 1 : 2;
  const dialogue = candidate[`chat${round}`];
  game.innerHTML = `
    <section class="screen interview-screen">
      <header class="interview-header">
        <span>Chit Chat ${round}</span>
        <span>${state.chatIndex + 1} / ${ids.length}</span>
      </header>
      <div id="interview-scene" class="interview-scene ${entering ? "enter-right" : ""}">
        <img src="assets/scenes/interview-${candidate.id}.png" alt="${candidate.name} sitting at the bar with the boss" />
      </div>
      <div class="textbox dialogue-box">
        <span class="speaker">${candidate.name}</span>
        <p>“${dialogue}”</p>
        <div class="response-row" aria-label="Choose your response">
          <button class="response response-positive" data-sentiment="positive">I value you</button>
          <button class="response response-neutral" data-sentiment="neutral">Okay</button>
          <button class="response response-negative" data-sentiment="negative">Get out!</button>
        </div>
      </div>
    </section>`;
  if (entering) window.setTimeout(() => document.querySelector("#interview-scene")?.classList.remove("enter-right"), 1000);
}

function renderEnding() {
  const winner = candidateById[state.winner];
  const endingType = getEndingType(state.responses, state.winner);
  game.innerHTML = `
    <section class="screen ending-screen ${endingType}">
      <header class="ending-header">
        <p class="eyebrow">The family has spoken</p>
        <h1>${winner.name} is your Consigliere</h1>
      </header>
      <img class="ending-image" src="assets/endings/${endingType}-${winner.id}.png" alt="${winner.name} in the ${endingType === "good" ? "cooperative" : "hostile"} ending" />
      <div class="textbox ending-textbox">
        <span class="speaker">${winner.name}</span>
        <p>“${endings[endingType]}”</p>
        <button class="button button-primary" data-action="replay">Replay</button>
      </div>
    </section>`;
}

function render() {
  if (state.phase === "opening") return renderOpening();
  if (state.phase.startsWith("select")) return renderSelection();
  if (state.phase.startsWith("chat")) return renderInterview();
  return renderEnding();
}

function runCurtain(label, updateScene) {
  state.locked = true;
  curtainLabel.textContent = label;
  curtain.classList.add("is-active");
  curtain.setAttribute("aria-hidden", "false");
  curtainTimers.push(window.setTimeout(() => {
    updateScene();
    render();
  }, 1500));
  curtainTimers.push(window.setTimeout(() => {
    curtain.classList.remove("is-active");
    curtain.setAttribute("aria-hidden", "true");
    state.locked = false;
  }, 3000));
}

function openConfirmation(candidateId) {
  const candidate = candidateById[candidateId];
  pendingSelection = candidateId;
  confirmTitle.textContent = `Select ${candidate.name}?`;
  confirmBio.innerHTML = candidateBio(candidate);
  confirmDialog.showModal();
}

function confirmSelection(candidateId) {
  if (state.phase === "select-initial") {
    state.firstRound = addUniqueSelection(state.firstRound, candidateId, 3);
    if (state.firstRound.length === 3) return runCurtain("Chit Chat", () => { state.phase = "chat1"; state.chatIndex = 0; });
  } else if (state.phase === "select-shortlist") {
    state.finalists = addUniqueSelection(state.finalists, candidateId, 2);
    if (state.finalists.length === 2) return runCurtain("Chit Chat", () => { state.phase = "chat2"; state.chatIndex = 0; });
  } else {
    state.winner = candidateId;
    return runCurtain("Your Consigliere", () => { state.phase = "ending"; });
  }
  renderSelection();
}

function handleResponse(sentiment) {
  if (state.locked) return;
  const ids = currentInterviewIds();
  const candidateId = ids[state.chatIndex];
  const round = state.phase === "chat1" ? 1 : 2;
  state.responses = recordResponse(state.responses, candidateId, round, sentiment);
  state.locked = true;

  if (state.chatIndex === ids.length - 1) {
    const nextPhase = round === 1 ? "select-shortlist" : "select-final";
    const label = round === 1 ? "Choose two captains" : "Choose your Consigliere";
    return runCurtain(label, () => { state.phase = nextPhase; state.chatIndex = 0; });
  }

  document.querySelector("#interview-scene")?.classList.add("exit-left");
  document.querySelectorAll(".response").forEach((button) => { button.disabled = true; });
  window.setTimeout(() => {
    state.chatIndex += 1;
    renderInterview(true);
    window.setTimeout(() => { state.locked = false; }, 1000);
  }, 1000);
}

function replay() {
  curtainTimers.forEach(window.clearTimeout);
  curtainTimers = [];
  state = createInitialState();
  pendingSelection = null;
  render();
}

game.addEventListener("click", (event) => {
  if (state.locked) return;
  const start = event.target.closest('[data-action="start"]');
  if (start) return runCurtain("Choose your captains", () => { state.phase = "select-initial"; });
  const replayButton = event.target.closest('[data-action="replay"]');
  if (replayButton) return replay();
  const candidateCard = event.target.closest("[data-candidate]");
  if (candidateCard && !candidateCard.disabled) return openConfirmation(candidateCard.dataset.candidate);
  const response = event.target.closest("[data-sentiment]");
  if (response && !response.disabled) handleResponse(response.dataset.sentiment);
});

confirmDialog.addEventListener("close", () => {
  if (confirmDialog.returnValue === "confirm" && pendingSelection) confirmSelection(pendingSelection);
  pendingSelection = null;
});

render();

