import { candidates, candidateById, endings, openingCopy } from "./game-data.js";
import { addUniqueSelection, createInitialState, getEndingType, recordResponse } from "./game-logic.js";

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
