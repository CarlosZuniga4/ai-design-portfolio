export const createInitialState = () => ({
  phase: "opening",
  firstRound: [],
  finalists: [],
  winner: null,
  responses: {},
  chatIndex: 0,
  locked: false
});

export function addUniqueSelection(current, candidateId, limit) {
  if (current.includes(candidateId) || current.length >= limit) return current;
  return [...current, candidateId];
}

export function recordResponse(responses, candidateId, round, sentiment) {
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

export function getEndingType(responses, winnerId) {
  const winnerResponses = responses[winnerId] || {};
  return winnerResponses[1] === "negative" && winnerResponses[2] === "negative"
    ? "hostile"
    : "good";
}
