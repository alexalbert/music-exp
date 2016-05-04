//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './messages';

@inject(EventAggregator)
export class Chords {
  heading = 'Piano';

  constructor(eventAggregator) {
      this.eventAggregator = eventAggregator;
  }

  attached() {
    this.subscription = this.subscribe();
  }

  detached() {
    this.subscription.dispose();
  }

  subscribe() {
     return this.eventAggregator.subscribe(NoteInfo, notes => {
       if (notes.actions.includes(Action.picked)) {
         notes.actions = [Action.play];
         this.eventAggregator.publish(notes);
       }
     });
   }
}
