import {NoteInfo} from './note-info';

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
      {name: 'Major', symbol: '', notes: [0, 4, 7], ext: ''},
      {name: 'Minor', symbol: 'm', notes: [0, 3, 7], ext: ''},
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

    triadSymbols = {
      "Major" : ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii' + '\u02DA'],
      "Minor" : ['i', 'ii' + '\u02DA', 'III', 'iv', 'v', 'VI', 'VII'],
    };

    chordLeading = {
      1: [1,2,3,4,5,6,7],
      2: [4,5,7],
      3: [2,4,6],
      4: [1,3,5,7],
      5: [1],
      6: [1,2,4,5],
      7: [1,3]
    }

    noteName(noteNumber) {
      let number = noteNumber % 12;
      let name = '';
      for (let note of this.octave) {
        if (note.number == number) {
          name = note.name;
          break;
        }
        if (note.number > number) {
          name = prevName + '#'; // '\u266D';
          break;
        }
        let prevName = note.name;
      }
      return name;
    }

    getChord(symbol) {
      for (let chord of this.chordTypes) {
        if (chord.symbol === symbol) {
          return chord;
        }
      }
      return undefined;
  }

    getKeyNotes(rootNumber, key) {
      let notes = new NoteInfo();
      for (let n of this.keys[key]) {
        notes.push(rootNumber+n);
      }
      return notes;
    }

    getChordNotes(rootNumber, chordSymbol) {
      let notes = new NoteInfo();
      let chord = this.getChord(chordSymbol);
      for (let n of chord.notes) {
        notes.push(rootNumber+n);
      }
      return notes;
    }

    // Returns [{name:, number;, chord:, notes}]
    getTriads(triadRoot, key) {
      let notes = this.getKeyNotes(triadRoot.number, key).notes;
      let triads = [];
      for (let i = 0; i < notes.length; i++) {
        let chordRoot = notes[i];
        let chordSymbol =this.triads[key][i];
        let chord = this.getChord(chordSymbol);
        let chordNotes = new NoteInfo();
        for (let n of chord.notes) {
          let number = chordRoot.number + n;
          let name = this.noteName(number);
          chordNotes.push(number, name);
        }

        triads.push({name: this.noteName(chordRoot.number),
                     number: chordRoot.number,
                     chord: chordSymbol,
                     notes: chordNotes});
      }
      return triads;
    }

    getNextTriadNumbers(triadNumber) {
      return this.chordLeading[triadNumber+1];
    }

    extendChord(chord, extension) {
      //let newChord = this.clone(chord);
      // Remove extra notes
      //newChord.notes.notes.splice(3);
      let rootNumber = chord.notes.notes[0].number;

      let extraNotes = undefined;
      switch(extension) {
        case '7':
          extraNotes = [10];
          break;
        case '9':
          extraNotes = [10,14];
          break;
        case '11':
          extraNotes = [10,17];
          break;
        case '13':
          extraNotes = [10,21];
          break;
    }

    let notes = [...chord.notes.notes];
    if (extraNotes) {
      for (let noteInterval of extraNotes) {
        let noteNumber = rootNumber + noteInterval;
        notes.push({number: noteNumber, name: this.noteName(noteNumber)});
      }
    }

    return notes;
  }

  clone(obj) {
        return JSON.parse(JSON.stringify(obj))
      }
  }
