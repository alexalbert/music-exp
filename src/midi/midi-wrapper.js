import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MidiWrapper {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();
  }

  subscribe() {
     this.eventAggregator.subscribe('playNotes', notes => {
       var delay = 0; // play one note every quarter second
       var velocity = 127; // how hard the note hits
       // play the note
       MIDI.setVolume(0, 127);
       for (let note of notes) {
         MIDI.noteOn(0, note, velocity, delay);
         MIDI.noteOff(0, note, delay + 0.75);
       }
     });
   }
}
