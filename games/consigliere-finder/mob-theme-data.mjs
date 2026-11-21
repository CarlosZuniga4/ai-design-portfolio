export const mobTheme = (() => {
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
