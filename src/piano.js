import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable} from 'aurelia-framework';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';

@inject(EventAggregator, Music)
export class Piano {
  @bindable firstOctave = 4;
  @bindable noteName = 'C';
  @bindable numberOfNotes = 7

  constructor(eventAggregator, music) {
      this.eventAggregator = eventAggregator;
      this.music = music;
  }

  attached() {
     this.piano = this.buildPiano(this.firstOctave, this.noteName, this.numberOfNotes);
     this.subscription = this.subscribe();
  }

  detached() {
    this.subscription.dispose();
  }

  click(noteNumber, noteName) {
    console.log(noteNumber + '  ' + noteName);
    let ni = new NoteInfo(noteNumber, noteName);
    ni.actions = [Action.picked];
    this.eventAggregator.publish(ni);
  }

  subscribe() {
   return this.eventAggregator.subscribe(NoteInfo, notes => {
     console.log(notes);
     if (notes.actions.includes(Action.activate)) {
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
        if (note.number == activeNote.number) {
          note.active = "f-active";
          console.log(note.name);
          break;
        }
        if (note.flat && note.number-1 == activeNote.number) {
          note.flatactive = "f-active";
          console.log(note.name);
          break;
        }
      }
    }
  }

  buildPiano(firstOctave, noteName, numberOfNotes) {
    let noteNumber = undefined;
    for (var i = 0; i < this.music.octave.length; i++) {
      if (this.music.octave[i].name === noteName) {
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
      let note = { ...this.music.octave[n % 7]};
      if (note.name === 'C' && n != firstNote) {
        firstOctave++;
      }
      note.number += firstOctave * 12 + 12;
      if (note.flat) {
        note.flatName = this.music.octave[(n-1) % 7].name + '#'
      }
      piano.push(note);
    }
    //console.log(piano);
    return piano;
  }
}
