//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';

@inject(EventAggregator)
export class Chords {
  heading = 'Piano';
  instruments = ['Piano', 'Drums'];
  selectedInstrument = 0;

  constructor(eventAggregator) {
      this.eventAggregator = eventAggregator;
  }

  attached() {
    this.subscription = this.subscribe();
  }

  detached() {
    this.subscription.dispose();
  }

  setInstrument(instrument) {
    this.selectedInstrument = instrument;
  }

  subscribe() {
     return this.eventAggregator.subscribe(NoteInfo, notes => {
       if (notes.actions.includes(Action.picked)) {
         notes.actions = [Action.play];
         notes.channel = this.selectedInstrument;
         this.eventAggregator.publish(notes);
       }
     });
   }
}
