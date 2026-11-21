import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mobTheme } from "../mob-theme-data.mjs";

const PPQ = 480;
const outputDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../assets/music");
const instruments = {
  mandolin: { channel: 0, program: 25 },
  guitar: { channel: 1, program: 24 },
  bass: { channel: 2, program: 32 },
  piano: { channel: 3, program: 0 },
  strings: { channel: 4, program: 48 },
  trumpet: { channel: 5, program: 59 },
  accordion: { channel: 6, program: 21 },
  percussion: { channel: 9, program: null }
};

function u32(value) { return [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255]; }
function u16(value) { return [(value >>> 8) & 255, value & 255]; }
function vlq(value) {
  let buffer = value & 0x7f;
  const bytes = [];
  while ((value >>= 7)) buffer = ((buffer << 8) | ((value & 0x7f) | 0x80)) >>> 0;
  while (true) { bytes.push(buffer & 255); if (buffer & 0x80) buffer >>>= 8; else break; }
  return bytes;
}
function chunk(id, bytes) { return [...Buffer.from(id), ...u32(bytes.length), ...bytes]; }
function metaTrack() {
  const micros = Math.round(60000000 / mobTheme.tempo);
  return chunk("MTrk", [
    0, 0xff, 0x03, mobTheme.title.length, ...Buffer.from(mobTheme.title),
    0, 0xff, 0x51, 3, (micros >>> 16) & 255, (micros >>> 8) & 255, micros & 255,
    0, 0xff, 0x58, 4, 4, 2, 24, 8,
    0, 0xff, 0x59, 2, 0xff, 1,
    0, 0xff, 0x2f, 0
  ]);
}
function instrumentTrack(name, notes) {
  const spec = instruments[name];
  const events = [];
  if (spec.program !== null) events.push({ tick: 0, order: 0, data: [0xc0 | spec.channel, spec.program] });
  for (const note of notes) {
    const start = Math.round(note.beat * PPQ);
    const end = Math.round((note.beat + note.duration) * PPQ);
    events.push({ tick: start, order: 2, data: [0x90 | spec.channel, note.pitch, note.velocity] });
    events.push({ tick: end, order: 1, data: [0x80 | spec.channel, note.pitch, 0] });
  }
  events.sort((a, b) => a.tick - b.tick || a.order - b.order);
  const bytes = [];
  let previous = 0;
  for (const event of events) {
    bytes.push(...vlq(event.tick - previous), ...event.data);
    previous = event.tick;
  }
  bytes.push(0, 0xff, 0x2f, 0);
  return chunk("MTrk", bytes);
}
function midi(trackNames) {
  const tracks = [metaTrack(), ...trackNames.map((name) => instrumentTrack(name, mobTheme.tracks[name]))];
  const header = chunk("MThd", [...u16(1), ...u16(tracks.length), ...u16(PPQ)]);
  return Buffer.from([...header, ...tracks.flat()]);
}

await mkdir(outputDir, { recursive: true });
const names = Object.keys(instruments);
await writeFile(path.join(outputDir, "mob_theme.mid"), midi(names));
for (const name of names) await writeFile(path.join(outputDir, `mob_theme_${name}.mid`), midi([name]));
console.log(`Generated ${names.length + 1} MIDI files in ${outputDir}`);
