import { mobTheme } from "./mob-theme-data.mjs";

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

export const mobThemePlayer = new MobThemePlayer();
