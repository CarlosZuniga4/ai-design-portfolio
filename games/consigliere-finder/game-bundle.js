"use strict";
(() => {
const candidates = [
  {
    id: "arturo",
    name: "Arturo “Playboy” Poparelli",
    hometown: "Queens, NY",
    weapon: "Glock 17 w/ silencer",
    strengths: "Slyness",
    weaknesses: "Lady problems",
    portrait: "assets/candidates/arturo.png",
    initialPortrait: "assets/candidates/arturo-roster.png",
    interviewScene: "assets/scenes/interview-arturo.png",
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
    initialPortrait: "assets/candidates/giovanni-roster.png",
    interviewScene: "assets/scenes/interview-giovanni.png",
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
    portrait: "assets/candidates/enzo-roster-hd.png",
    initialPortrait: "assets/candidates/enzo-roster-hd.png",
    interviewScene: "assets/scenes/interview-enzo.png",
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
    portrait: "assets/candidates/ramon-roster-hd.png",
    initialPortrait: "assets/candidates/ramon-roster-hd.png",
    interviewScene: "assets/scenes/interview-ramon.png",
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
    portrait: "assets/candidates/carmine-roster-hd.png",
    initialPortrait: "assets/candidates/carmine-roster-hd.png",
    interviewScene: "assets/scenes/interview-carmine.png",
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
    initialPortrait: "assets/candidates/stevey-roster.png",
    interviewScene: "assets/scenes/interview-stevey.png",
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
    initialPortrait: "assets/candidates/bobby-roster.png",
    interviewScene: "assets/scenes/interview-bobby.png",
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

const mobTheme = (() => {
  const tempo = 80;
  const beatsPerBar = 4;
  const progression = [
    { name: "Dm(add9)", root: 38, chord: [62, 65, 69, 76] },
    { name: "Bbmaj7", root: 34, chord: [58, 62, 65, 69] },
    { name: "Gm6", root: 31, chord: [55, 58, 62, 64] },
    { name: "A7(b9)", root: 33, chord: [57, 61, 64, 67, 70] },
    { name: "Dm/C", root: 36, chord: [57, 62, 65, 69] },
    { name: "Bbmaj7", root: 34, chord: [58, 62, 65, 69] },
    { name: "Em7(b5)", root: 40, chord: [64, 67, 70, 74] },
    { name: "A7", root: 33, chord: [57, 61, 64, 67] },
    { name: "Gm(add9)", root: 31, chord: [55, 58, 62, 69] },
    { name: "Dm/F", root: 41, chord: [57, 62, 65, 69] },
    { name: "Bbmaj7", root: 34, chord: [58, 62, 65, 69] },
    { name: "A7sus4-A7", root: 33, chord: [57, 62, 64, 67] },
    { name: "Dm(add9)", root: 38, chord: [62, 65, 69, 76] },
    { name: "C#dim7", root: 37, chord: [61, 64, 67, 70] },
    { name: "Gm/A", root: 33, chord: [55, 58, 62, 69] },
    { name: "Dm(add9)", root: 38, chord: [62, 65, 69, 76] }
  ];

  const note = (beat, duration, pitch, velocity = 72) => ({ beat, duration, pitch, velocity });
  const tracks = { mandolin: [], guitar: [], bass: [], piano: [], strings: [], trumpet: [], accordion: [], percussion: [] };

  progression.forEach((harmony, bar) => {
    const start = bar * beatsPerBar;
    tracks.strings.push(...harmony.chord.map((pitch) => note(start, 3.8, pitch, 43)));
    const arp = [0, 1, 2, 1, 3, 2, 1, 2];
    arp.forEach((index, step) => tracks.guitar.push(note(start + step * 0.5, 0.42, harmony.chord[index % harmony.chord.length] - 12, step % 2 ? 50 : 58)));
    tracks.bass.push(note(start, 1.8, harmony.root, 68), note(start + 2, 1.7, harmony.root + 7, 57));
    if ([0, 3, 7, 11, 13, 15].includes(bar)) tracks.piano.push(note(start, 1.3, harmony.root - 12, 50));
    for (let beat = 0; beat < 4; beat += 1) {
      tracks.percussion.push(note(start + beat, 0.08, beat % 2 ? 38 : 36, beat === 0 ? 54 : 39));
      tracks.percussion.push(note(start + beat + 0.5, 0.05, 42, 24));
    }
  });

  [
    [0, 1.5, 69], [1.5, .5, 72], [2, 1, 74], [3, 1, 69],
    [4, 1, 70], [5, .5, 69], [5.5, .5, 65], [6, 2, 62],
    [8, 1.5, 67], [9.5, .5, 70], [10, 1, 69], [11, 1, 64],
    [12, .75, 61], [12.75, .75, 64], [13.5, .5, 67], [14, 2, 65],
    [24, 1, 64], [25, .5, 67], [25.5, .5, 70], [26, 1, 74], [27, 1, 70],
    [28, 1.5, 69], [29.5, .5, 67], [30, 2, 64],
    [48, 1, 69], [49, .5, 72], [49.5, .5, 74], [50, 1, 77], [51, 1, 76],
    [52, 1, 73], [53, 1, 70], [54, 2, 67],
    [56, 1, 70], [57, .5, 69], [57.5, .5, 65], [58, 1, 64], [59, 1, 61],
    [60, 1.5, 62], [61.5, .5, 65], [62, 2, 69]
  ].forEach(([beat, duration, pitch]) => tracks.mandolin.push(note(beat, duration, pitch, 69)));

  [
    [16, 2, 69], [18, 1, 65], [19, 1, 62], [20, 2, 70], [22, 2, 69],
    [32, 1.5, 67], [33.5, .5, 69], [34, 2, 70], [36, 1, 69], [37, 1, 65], [38, 2, 64],
    [44, 1, 62], [45, 1, 64], [46, 2, 61]
  ].forEach(([beat, duration, pitch]) => tracks.trumpet.push(note(beat, duration, pitch, 55)));

  [5, 10, 14].forEach((bar) => {
    const harmony = progression[bar];
    harmony.chord.slice(0, 3).forEach((pitch) => tracks.accordion.push(note(bar * 4, 3.6, pitch, 34)));
  });

  return {
    title: "Quiet Family Business",
    tempo,
    key: "D minor",
    timeSignature: [4, 4],
    beatsPerBar,
    bars: progression.length,
    durationBeats: progression.length * beatsPerBar,
    progression: progression.map(({ name }) => name),
    tracks
  };
})();


class MobThemePlayer {
  constructor() {
    this.context = null;
    this.master = null;
    this.loopTimer = null;
    this.nodes = new Set();
    this.token = 0;
  }

  async start() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
    }
    await this.context.resume();
    this.stopImmediately();
    const token = ++this.token;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(0, now);
    this.master.gain.linearRampToValueAtTime(0.18, now + 0.65);
    this.scheduleLoop(now + 0.06, token);
  }

  fadeOut(seconds = 1) {
    if (!this.context || !this.master) return;
    window.clearTimeout(this.loopTimer);
    this.loopTimer = null;
    const token = ++this.token;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + seconds);
    window.setTimeout(() => { if (token === this.token) this.stopImmediately(); }, seconds * 1000 + 40);
  }

  stopImmediately() {
    window.clearTimeout(this.loopTimer);
    this.loopTimer = null;
    this.nodes.forEach((node) => { try { node.stop(); } catch {} });
    this.nodes.clear();
  }

  scheduleLoop(startTime, token) {
    if (token !== this.token) return;
    const secondsPerBeat = 60 / mobTheme.tempo;
    Object.entries(mobTheme.tracks).forEach(([trackName, notes]) => {
      notes.forEach((event) => this.scheduleNote(trackName, event, startTime, secondsPerBeat));
    });
    const duration = mobTheme.durationBeats * secondsPerBeat;
    this.loopTimer = window.setTimeout(() => this.scheduleLoop(startTime + duration, token), Math.max(0, (duration - 0.4) * 1000));
  }

  scheduleNote(track, event, loopStart, secondsPerBeat) {
    const start = loopStart + event.beat * secondsPerBeat;
    const duration = Math.max(0.04, event.duration * secondsPerBeat);
    if (track === "percussion") return this.schedulePercussion(event, start, duration);
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    const settings = {
      mandolin: ["triangle", 0.12, 2600, 0.012], guitar: ["triangle", 0.075, 1800, 0.025],
      bass: ["sine", 0.12, 520, 0.02], piano: ["triangle", 0.085, 900, 0.018],
      strings: ["sawtooth", 0.025, 1050, 0.35], trumpet: ["sawtooth", 0.04, 1300, 0.08],
      accordion: ["square", 0.012, 850, 0.2]
    }[track];
    oscillator.type = settings[0];
    oscillator.frequency.value = 440 * (2 ** ((event.pitch - 69) / 12));
    filter.type = "lowpass";
    filter.frequency.value = settings[2];
    filter.Q.value = track === "trumpet" ? 2.5 : 0.7;
    const level = settings[1] * (event.velocity / 100);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), start + settings[3]);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(filter).connect(gain).connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
    this.trackNode(oscillator);
  }

  schedulePercussion(event, start, duration) {
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = event.pitch === 36 ? "sine" : "square";
    oscillator.frequency.value = event.pitch === 36 ? 72 : event.pitch === 38 ? 180 : 1900;
    const level = (event.velocity / 100) * (event.pitch === 42 ? 0.018 : 0.04);
    gain.gain.setValueAtTime(level, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + Math.min(duration, 0.11));
    oscillator.connect(gain).connect(this.master);
    oscillator.start(start);
    oscillator.stop(start + Math.min(duration, 0.12));
    this.trackNode(oscillator);
  }

  trackNode(node) {
    this.nodes.add(node);
    node.addEventListener("ended", () => this.nodes.delete(node), { once: true });
  }
}

const mobThemePlayer = new MobThemePlayer();


const game = document.querySelector("#game");
const curtain = document.querySelector("#curtain");
const curtainLabel = document.querySelector("#curtain-label");
const confirmDialog = document.querySelector("#confirm-dialog");
const confirmTitle = document.querySelector("#confirm-title");
const confirmBio = document.querySelector("#confirm-bio");

let state = createInitialState();
let pendingSelection = null;
let curtainTimers = [];
const SLIDE_DURATION_MS = 500;
const REACTION_HOLD_MS = 2000;
const FINAL_SELECTION_BADGE_DELAY_MS = 400;
const reactionPreloads = new Set();

function reactionScene(candidate, sentiment) {
  if (sentiment === "neutral") return candidate.interviewScene;
  return `assets/scenes/reactions/interview-${candidate.id}-${sentiment}.png`;
}

function preloadReactionScenes(ids) {
  ids.forEach((id) => ["positive", "negative"].forEach((sentiment) => {
    const src = reactionScene(candidateById[id], sentiment);
    if (reactionPreloads.has(src)) return;
    reactionPreloads.add(src);
    const image = new Image();
    image.src = src;
  }));
}

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
  const isInitialRoster = state.phase === "select-initial";
  game.innerHTML = `
    <section class="screen selection-screen ${isInitialRoster ? "initial-roster" : ""}">
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
            const portrait = candidate.initialPortrait || candidate.portrait;
            return `
              <button class="candidate-card ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}"
                data-candidate="${id}" ${disabled || selected ? "disabled" : ""}
                aria-label="${candidate.name}${selected ? `, selected number ${selectedIndex + 1}` : ""}">
                <span class="candidate-portrait">
                  <img src="${portrait}" alt="${candidate.name}" />
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
        <img id="interview-art" src="${candidate.interviewScene}" alt="${candidate.name} sitting at the bar with the boss" />
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
  if (entering) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => document.querySelector("#interview-scene")?.classList.remove("enter-right"));
    });
  }
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

function runCurtain(label, updateScene, audioTransition = "none") {
  state.locked = true;
  curtainLabel.textContent = label;
  curtain.classList.add("is-active");
  curtain.setAttribute("aria-hidden", "false");
  if (audioTransition === "enter-chat") void mobThemePlayer.start().catch(() => {});
  if (audioTransition === "leave-chat") {
    curtainTimers.push(window.setTimeout(() => mobThemePlayer.fadeOut(1), 500));
  }
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

function finishSelection(label, updateScene, audioTransition = "none") {
  state.locked = true;
  renderSelection();
  curtainTimers.push(window.setTimeout(() => runCurtain(label, updateScene, audioTransition), FINAL_SELECTION_BADGE_DELAY_MS));
}

function confirmSelection(candidateId) {
  if (state.phase === "select-initial") {
    state.firstRound = addUniqueSelection(state.firstRound, candidateId, 3);
    if (state.firstRound.length === 3) {
      preloadReactionScenes(state.firstRound);
      return finishSelection("Chit Chat", () => { state.phase = "chat1"; state.chatIndex = 0; }, "enter-chat");
    }
  } else if (state.phase === "select-shortlist") {
    state.finalists = addUniqueSelection(state.finalists, candidateId, 2);
    if (state.finalists.length === 2) {
      preloadReactionScenes(state.finalists);
      return finishSelection("Chit Chat", () => { state.phase = "chat2"; state.chatIndex = 0; }, "enter-chat");
    }
  } else {
    state.winner = candidateId;
    return finishSelection("Your Consigliere", () => { state.phase = "ending"; });
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
  document.querySelectorAll(".response").forEach((button) => { button.disabled = true; });
  const reactionImage = document.querySelector("#interview-art");
  if (reactionImage) {
    reactionImage.src = reactionScene(candidateById[candidateId], sentiment);
    reactionImage.alt = `${candidateById[candidateId].name} and the boss reacting ${sentiment === "positive" ? "positively" : sentiment === "negative" ? "angrily" : "with straight faces"}`;
  }

  if (state.chatIndex === ids.length - 1) {
    const nextPhase = round === 1 ? "select-shortlist" : "select-final";
    const label = round === 1 ? "Choose two captains" : "Choose your Consigliere";
    curtainTimers.push(window.setTimeout(() => {
      runCurtain(label, () => { state.phase = nextPhase; state.chatIndex = 0; }, "leave-chat");
    }, REACTION_HOLD_MS));
    return;
  }

  curtainTimers.push(window.setTimeout(() => {
    document.querySelector("#interview-scene")?.classList.add("exit-left");
    curtainTimers.push(window.setTimeout(() => {
      state.chatIndex += 1;
      renderInterview(true);
      curtainTimers.push(window.setTimeout(() => { state.locked = false; }, SLIDE_DURATION_MS));
    }, SLIDE_DURATION_MS));
  }, REACTION_HOLD_MS));
}

function replay() {
  curtainTimers.forEach(window.clearTimeout);
  curtainTimers = [];
  mobThemePlayer.fadeOut(0.15);
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

})();
