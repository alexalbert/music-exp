//import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NoteInfo, Action} from './note-info';
import {Music} from './music';

@inject(EventAggregator, Music)
export class Chords {
  playNotes = false;

  heading = 'Keys';

  constructor(eventAggregator, music) {
    this.eventAggregator = eventAggregator;
    this.music = music;
    this.keys = music.keys;

    this.selectedKey = 'Major';
    this.keyNames = Object.keys(this.keys);
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

  onTypeChange(key) {
    this.selectedKey = key;
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
    let notes = this.music.getKeyNotes(root, this.selectedKey);
    notes.actions = [Action.activate];
    this.eventAggregator.publish(notes);
  }

  getRandomNote(notes) {
    return notes[Math.floor(Math.random() * 7)];
  }

  compose(length) {
    let key = this.music.getKeyNotes(this.root, this.selectedKey);
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
