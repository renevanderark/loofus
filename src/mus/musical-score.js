/* @flow */
const durations = {
    "w": 2000,
    "h": 1000,
    "q": 500,
    "i": 250,
    "s": 125,
    "t": 64,
    "x": 32,
    "o": 16
};

class MusicalScore {
  soundbank : string;

  constructor(soundbank : string) {

    this.soundbank = soundbank;
  }

  playNote(instrument : string, n : string) {
    //$FlowFixMe
    new Audio(this.soundbank + instrument + "/" + encodeURIComponent(n) + ".ogg").play();
  }

  play(instrument : string, notes : string, loop : boolean = false) {
    let tm = 0;
    notes.split(" ").forEach((n) => {
        setTimeout(() => this.playNote(instrument, n), tm);
        tm += durations[n[n.length - 1]];
    });

    if (loop) {
        setTimeout(() => this.play(instrument, notes, true), tm);
    }
}
}

export default MusicalScore;
