import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo} from '../messages';
import {Container} from 'aurelia-dependency-injection';


@inject(EventAggregator)
export class MidiWrapper {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();
  }

  subscribe() {
     this.eventAggregator.subscribe(NoteInfo, notes => {
       if (notes.actions.includes('playChord')) {
         this.playChord(notes);
       }
       if (notes.actions.includes('play')) {
         this.playNotes(notes);
       }
     });
   }

   playChord(notes) {
     var delay = 0; // play one note every quarter second
     var velocity = 127; // how hard the note hits
     // play the note
     MIDI.setVolume(0, 127);
     let numbers = notes.notes.map(n => { return n.number; })
     MIDI.chordOn(0, numbers, velocity, delay);
     MIDI.chordOff(0, numbers, delay + 0.75);
   }

   playNotes(notes) {
     var delay = 0; // play one note every quarter second
     var velocity = 127; // how hard the note hits
     // play the note
     MIDI.setVolume(0, 127);
     console.log("-----------------------------------");
     for (var i = 0; i < notes.notes.length; i++) {
       let note = notes.notes[i];
       console.log(note.start + " " + note.end);
       MIDI.noteOn(0, note.number, velocity, note.start ? note.start : delay);
       MIDI.noteOff(0, note.number, note.end ? note.end : delay + 0.75);
      }
   }
}

let container = Container.instance;
var mw = container.get(MidiWrapper);
