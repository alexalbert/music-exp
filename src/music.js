export class Music {
    // number - relative position to C in half-notes
    octave = [
      { name: 'C', number: 0,  flat: false},
      { name: 'D', number: 2,  flat: true},
      { name: 'E', number: 4,  flat: true},
      { name: 'F', number: 5,  flat: false},
      { name: 'G', number: 7,  flat: true},
      { name: 'A', number: 9,  flat: true},
      { name: 'B', number: 11, flat: true},
    ];

    // notes - offsets of notes except root note in half-notes from
    // the root
    chordTypes = [
      {name: 'Major', symbol: '', notes: [0, 4, 7]},
      {name: 'Minor', symbol: 'm', notes: [0, 3, 7]},
      {name: 'Diminished', symbol: 'dim', notes: [0, 3, 6]},
      {name: 'Augmented', symbol: 'aug', notes: [0, 4, 8]},
      {name: 'Suspended 4th', symbol: 'sus4', notes: [0, 5, 7]},
      {name: 'Major Seventh', symbol: 'maj7', notes: [0, 4, 7, 11]},
      {name: 'Dominant 7', symbol: '7', notes: [0, 4, 7, 10]},
      {name: 'Minor Seventh', symbol: 'min7', notes: [0, 3, 7, 10]},
      {name: 'Minor 7 b5', symbol: 'min7b5', notes: [0, 3, 6, 10]},
      {name: 'Diminished 7', symbol: 'dim7', notes: [0, 3, 6, 9]}
    ];

    // notes - offsets of notes in the half-notes from the root.
    keys = {
      'Major':  [0, 2, 4, 5, 7, 9, 11],
      'Minor':  [0, 2, 3, 5, 7, 8, 10]
    };

    // match note from key to type of chord by position
    triads = {
      "Major" : ['', 'm', 'm', '', '', 'm', 'dim'],
      "Minor" : ['m', 'dim', '', 'm', 'm', '', ''],
    };

    noteName(noteNumber) {
      let number = noteNumber % 12;
      for (note of this.octave) {
        if (note.number == number) {
          return note.note;
        }
        if (note.number > number) {
          return note.note + '#';
        }
      }
    }
}
