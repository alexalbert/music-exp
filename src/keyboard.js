//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo} from './messages';

@inject(EventAggregator)
export class Chords {
  heading = 'Piano';

  constructor(eventAggregator) {
      this.eventAggregator = eventAggregator;
      this.subscribe();
  }

  subscribe() {
     this.eventAggregator.subscribe(NoteInfo, notes => {
       console.log("dddddd");
       if (notes.actions.includes('picked')) {
         notes.actions = ['play'];
         this.eventAggregator.publish(notes);
       }
     });
   }
}
