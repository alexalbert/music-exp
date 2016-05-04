import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable} from 'aurelia-framework';
import {NoteInfo} from './messages';

@inject(EventAggregator)
export class Piano {
  octave = [
    { note: 'C', number: 0,  flat: false},
    { note: 'D', number: 2,  flat: true},
    { note: 'E', number: 4,  flat: true},
    { note: 'F', number: 5,  flat: false},
    { note: 'G', number: 7,  flat: true},
    { note: 'A', number: 9,  flat: true},
    { note: 'B', number: 11, flat: true},
  ];

  @bindable firstOctave = 4;
  @bindable noteName = 'C';
  @bindable numberOfNotes = 7

  constructor(eventAggregator) {
      this.eventAggregator = eventAggregator;
  }

  attached() {
     this.piano = this.buildPiano(this.firstOctave, this.noteName, this.numberOfNotes);
     this.subscribe();
  }

  // noteName(noteNumber) {
  //   let number = noteNumber % 12;
  //   for (note of octave) {
  //     if (note.number == number) {
  //       return note.note;
  //     }
  //     if (note.number > number) {
  //       return note.note + '#';
  //     }
  //   }
  // }

  click(noteNumber, noteName) {
    console.log(noteNumber + '  ' + noteName);
    let ni = new NoteInfo(noteNumber, noteName);
    ni.actions = ['picked'];
    this.eventAggregator.publish(ni);
  }

  subscribe() {
   this.eventAggregator.subscribe(NoteInfo, notes => {
     console.log(notes);
     if (notes.actions.includes('activate')) {
       this.deactivateAll();
       this.activate(notes);
     }
    });
  }

  deactivateAll() {
    for (let note of this.piano) {
      note.active = undefined;
      note.flatactive = undefined;
    }
  }

  activate(notes) {
    for (let activeNote of notes.notes) {
      for (let note of this.piano) {
        //console.log(number + "  " + note.number);
        if (note.number == activeNote.number) {
          note.active = "f-active";
          console.log(note.note);
          break;
        }
        if (note.flat && note.number-1 == activeNote.number) {
          note.flatactive = "f-active";
          console.log(note.note);
          break;
        }
      }
    }
  }

  buildPiano(firstOctave, noteName, numberOfNotes) {
    let noteNumber = undefined;
    for (var i = 0; i < this.octave.length; i++) {
      if (this.octave[i].note === noteName) {
        noteNumber = i;
        break;
      }
    }
    if (noteNumber === undefined) {
      console.log("Invalid note name " + noteName);
    }
    if (firstOctave > 8 || firstOctave < 0) {
      console.log("Octave number mst be between 0 and 8");
    }

    const firstNote = 7 * firstOctave + noteNumber;
    const lastNote = firstNote + numberOfNotes - 1;

    let piano = [];

    for (let n = firstNote; n <= lastNote; n++) {
      let note = { ...this.octave[n % 7]};
      if (note.note === 'C' && n != firstNote) {
        firstOctave++;
      }
      note.number += firstOctave * 12 + 12;
      if (note.flat) {
        note.flatNote = this.octave[(n-1) % 7].note + '#'
      }
      piano.push(note);
    }
    //console.log(piano);
    return piano;
  }
}
