//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';

@inject(EventAggregator)
export class Chords {
  keys = [
    {name: 'Major', notes: [2, 4, 5, 7, 9, 11]},
    {name: 'Minor', notes: [2, 3, 5, 7, 8, 10]},
  ];

  playNotes = false;

  heading = 'Keys';

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.selectedKey = this.keys[0];
    this.keys[0].selected = true;
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
        this.root = notes.notes[0];
        this.showKey(this.root);
        if (this.playNotes) {
          this.playComposition(this.root);
        }
      }
    });
  }

  onTypeChange(index) {
    this.selectedKey.selected = false;
    this.selectedKey = this.keys[index];
    this.selectedKey.selected = true;
    this.showKey(this.root);
  }

  playComposition(root) {
    let notes = this.compose(16);
    let noteInfo = new NoteInfo();
    noteInfo.notes = notes;
    noteInfo.actions = [Action.play];
    this.eventAggregator.publish(noteInfo);
  }

  showKey(root) {
    let notes = this.getKeyNotes(root);
    notes.actions = [Action.activate];
    this.eventAggregator.publish(notes);
  }

  getKeyNotes(root) {
    let notes = new NoteInfo(root.number, root.name);
    for (let n of this.selectedKey.notes) {
      notes.push(root.number+n);
    }
    return notes;
  }

  getRandomNote(notes) {
    return notes[Math.floor(Math.random() * 7)];
  }

  compose(length) {
    let key = this.getKeyNotes(this.root);
    let notes = [{...key.notes[0]}];
    for (let i = 0; i < length-2; i++) {
      let note = {...this.getRandomNote(key.notes)};
      notes.push(note);
    }
    notes.push({...key.notes[0]});
    let delay = 0;
    let len = 0.25;
    for (var i = 0; i < notes.length; i++) {
      let note = notes[i]
      note.start = delay;
      delay += len;
      note.end = delay;
    }
    return notes;
  }
}
