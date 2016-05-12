'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info', './music'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, Music, _extends, _dec, _class, Chords;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_noteInfo) {
      NoteInfo = _noteInfo.NoteInfo;
      Action = _noteInfo.Action;
    }, function (_music) {
      Music = _music.Music;
    }],
    execute: function () {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      _export('Chords', Chords = (_dec = inject(EventAggregator, Music), _dec(_class = function () {
        function Chords(eventAggregator, music) {
          _classCallCheck(this, Chords);

          this.playNotes = false;
          this.heading = 'Keys';
          this.leading = [];
          this.leadingSelected = [];

          this.eventAggregator = eventAggregator;
          this.music = music;
          this.keys = music.keys;

          this.selectedKey = 'Major';
          this.keyNames = Object.keys(this.keys);
        }

        Chords.prototype.attached = function attached() {
          this.subscription = this.subscribe();
        };

        Chords.prototype.detached = function detached() {
          this.subscription.dispose();
        };

        Chords.prototype.subscribe = function subscribe() {
          var _this = this;

          return this.eventAggregator.subscribe(NoteInfo, function (notes) {
            if (notes.actions.includes(Action.picked)) {
              _this.root = _extends({}, notes.notes[0]);
              _this.setKeyAndRoot();
              if (_this.playNotes) {
                _this.playComposition(_this.root);
              }
            }
          });
        };

        Chords.prototype.onTypeChange = function onTypeChange(key) {
          this.selectedKey = key;
          this.setKeyAndRoot();
        };

        Chords.prototype.setKeyAndRoot = function setKeyAndRoot() {
          this.triads = this.music.getTriads(this.root, this.selectedKey);
          this.triadSymbols = this.music.triadSymbols[this.selectedKey];
          this.showKey(this.root);
          this.leading = [];
          this.leadingSelected = [];
        };

        Chords.prototype.playComposition = function playComposition(root) {
          var notes = this.compose(16);
          var noteInfo = new NoteInfo();
          noteInfo.notes = notes;
          noteInfo.actions = [Action.play];
          this.eventAggregator.publish(noteInfo);
        };

        Chords.prototype.showKey = function showKey(root) {
          var notes = this.music.getKeyNotes(root.number, this.selectedKey);
          notes.actions = [Action.activate];
          this.eventAggregator.publish(notes);
        };

        Chords.prototype.getRandomNote = function getRandomNote(notes) {
          return notes[Math.floor(Math.random() * 7)];
        };

        Chords.prototype.compose = function compose(length) {
          var key = this.music.getKeyNotes(this.root.number, this.selectedKey);
          var notes = [_extends({}, key.notes[0])];
          for (var _i = 0; _i < length - 2; _i++) {
            var note = _extends({}, this.getRandomNote(key.notes));
            notes.push(note);
          }
          notes.push(_extends({}, key.notes[0]));
          var delay = 0;
          var len = 0.25;
          for (var i = 0; i < notes.length; i++) {
            var _note = notes[i];
            _note.start = delay;
            delay += len;
            _note.end = delay;
          }
          return notes;
        };

        Chords.prototype.clickedTriad = function clickedTriad(root, chord, index) {
          this.playTriad(root, chord);
          this.resetLeading(index);
        };

        Chords.prototype.leadingClick = function leadingClick(index1, index2) {
          console.log(index1 + " " + index2);
          var chord = this.leading[index1][index2];
          chord.notes.actions = [Action.play];
          this.eventAggregator.publish(chord.notes);
          this.leadingSelected.splice(index1);
          this.leadingSelected.push(_extends({}, chord));

          if (index1 < 5) {
            this.nextLeading(index1, index2);
          }
        };

        Chords.prototype.resetLeading = function resetLeading(index) {
          this.leading = [];
          this.leading.push([this.triads[index]]);
          this.nextLeading(0, index);
          this.leadingSelected = [_extends({}, this.triads[index])];
        };

        Chords.prototype.playSelectedLeading = function playSelectedLeading() {
          var _this2 = this;

          var timeout = 10;

          var _loop = function _loop() {
            if (_isArray) {
              if (_i2 >= _iterator.length) return 'break';
              _ref = _iterator[_i2++];
            } else {
              _i2 = _iterator.next();
              if (_i2.done) return 'break';
              _ref = _i2.value;
            }

            var chord = _ref;

            var ch = chord;
            setTimeout(function () {
              ch.active = true;
              ch.notes.actions = [Action.playChord];
              _this2.eventAggregator.publish(ch.notes);
            }, timeout);
            timeout += 1000;
            setTimeout(function () {
              ch.active = false;
            }, timeout);
          };

          for (var _iterator = this.leadingSelected, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            var _ret = _loop();

            if (_ret === 'break') break;
          }
        };

        Chords.prototype.nextLeading = function nextLeading(index1, index2) {
          var nextChordNumbers = this.music.getNextTriadNumbers(index2);
          var nextChords = [];
          for (var chordIndex in nextChordNumbers) {
            nextChords.push(this.triads[chordIndex]);
          }
          this.leading.splice(index1 + 1);
          this.leading.push(nextChords);
        };

        Chords.prototype.playTriad = function playTriad(root, chord) {
          var notes = this.music.getChordNotes(root, chord);
          notes.actions = [Action.activate, Action.play];
          this.eventAggregator.publish(notes);
        };

        Chords.prototype.getChordLeading = function getChordLeading(triadNumber) {
          nextTriads = [];
          nextTriadNumbers = this.music.getNextTriadNumbers(triad);
          for (var _iterator2 = nextTriadNumbers, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            if (_isArray2) {
              if (_i3 >= _iterator2.length) break;
              i = _iterator2[_i3++];
            } else {
              _i3 = _iterator2.next();
              if (_i3.done) break;
              i = _i3.value;
            }

            nextTriads.push(this.triads[i + 1]);
          }
          return nextTriad;
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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
