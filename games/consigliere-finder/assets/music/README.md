# Quiet Family Business — Consigliere Finder theme

This folder contains a completely original, code-generated instrumental cue written for the chit-chat stages of *Consigliere Finder*. It does not quote, interpolate, or intentionally imitate any existing film, television, game, or commercial composition.

## Musical specification

- Tempo: 80 BPM
- Meter: 4/4
- Key center: D minor
- Length: 16 bars / 48 seconds before looping
- Mood: restrained, melancholic crime-noir tension with a subtle old-world Italian color
- Progression: `Dm(add9) | Bbmaj7 | Gm6 | A7(b9) | Dm/C | Bbmaj7 | Em7(b5) | A7 | Gm(add9) | Dm/F | Bbmaj7 | A7sus4-A7 | Dm(add9) | C#dim7 | Gm/A | Dm(add9)`

The mandolin carries a sparse original melody. Nylon-string guitar supplies quiet arpeggios; upright bass and occasional low piano notes anchor the harmony; warm strings provide sustained tension; muted trumpet answers the melody; brushed percussion stays deliberately light. Accordion appears only in three short passages.

## Files

- `mob_theme.mid` — complete multitrack arrangement
- `mob_theme_mandolin.mid`
- `mob_theme_guitar.mid`
- `mob_theme_bass.mid`
- `mob_theme_piano.mid`
- `mob_theme_strings.mid`
- `mob_theme_trumpet.mid`
- `mob_theme_percussion.mid`
- `mob_theme_accordion.mid` — extra stem for the sparse accordion part

Each instrument is on its own MIDI track and channel in the complete file, so sounds can be replaced independently in a DAW. Percussion uses General MIDI channel 10.

## Regenerating the MIDI

From the game folder, run:

```bash
node tools/generate-mob-theme.mjs
```

The composition lives in `mob-theme-data.mjs`; the generator writes standard MIDI files into this folder without third-party packages.

## Rendering to WAV or OGG

Import `mob_theme.mid` into a DAW such as Reaper, Logic, Ableton Live, FL Studio, or GarageBand, assign higher-quality instruments to each track, and render a stereo WAV. Keep the render exactly 48 seconds if you want the current seamless loop timing.

For a quick command-line reference render with FluidSynth and a legally obtained SoundFont:

```bash
fluidsynth -ni /path/to/your-soundfont.sf2 mob_theme.mid -F mob_theme.wav -r 48000
```

Then create a game-ready OGG with FFmpeg:

```bash
ffmpeg -i mob_theme.wav -c:a libvorbis -q:a 5 mob_theme.ogg
```

Before shipping, audition the loop boundary, normalize conservatively, and verify that the SoundFont or virtual instruments you use permit distribution in a commercial or public portfolio project.
