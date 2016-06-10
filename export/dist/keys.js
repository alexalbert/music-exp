'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info', './music'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, Music, computedFrom, _extends, _dec, _class, Chords;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      computedFrom = _aureliaFramework.computedFrom;
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
          this.heading = 'Chord progression';
          this.harmonicProgression = true;
          this.noteColors = {
            'A': 'red',
            'B': 'green',
            'C': 'blue',
            'D': 'purple',
            'E': 'lime',
            'F': 'magenta',
            'G': 'black',
            'C#': 'brown',
            'F#': 'maroon',
            'G#': 'cyan',
            'A#': 'olive'
          };
          this.extensionNames = [null, '7', '9', '11', '13'];
          this.extensions = ['', '', '', '', '', '', '', '', '', '', '', '', '', ''];
          this.progressions = [];
          this.selectedProgression = [];

          this.eventAggregator = eventAggregator;
          this.music = music;
          this.keys = music.keys;

          this.selectedKey = 'Major';
          this.keyNames = Object.keys(this.keys);
          this.selectedNotes = new Map();
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

        Chords.prototype.onKeyChange = function onKeyChange(key) {
          this.selectedKey = key;
          this.setKeyAndRoot();
        };

        Chords.prototype.onTriadChange = function onTriadChange(root, chord, index) {
          this.playTriad(root, chord);
          this.resetLeading(index);
        };

        Chords.prototype.onProgressionTypeChange = function onProgressionTypeChange() {
          this.resetLeading(0);
          return true;
        };

        Chords.prototype.onExtensionChange = function onExtensionChange(index) {
          this.updateSelectedChordNotes(index);
          this.updateSelectedNotes();
        };

        Chords.prototype.updateSelectedChordNotes = function updateSelectedChordNotes(index) {
          var chord = this.triads[this.selectedProgression[index].triadIndex];
          var notes = this.music.extendChord(chord, this.extensions[index]);
          this.selectedProgression[index].notes = notes;
        };

        Chords.prototype.updateAllSelectedChordNotes = function updateAllSelectedChordNotes() {
          for (var i = 0; i < this.selectedProgression.length; i++) {
            this.updateSelectedChordNotes(i);
          }
        };

        Chords.prototype.setKeyAndRoot = function setKeyAndRoot() {
          this.triads = this.music.getTriads(this.root, this.selectedKey);
          this.triadSymbols = this.music.triadSymbols[this.selectedKey];
          this.updateAllSelectedChordNotes();
          this.updateSelectedNotes();
          this.showKey(this.root);
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

        Chords.prototype.playTriad = function playTriad(root, chord) {
          var notes = this.music.getChordNotes(root, chord);
          notes.actions = [Action.activate, Action.play];
          this.eventAggregator.publish(notes);
        };

        Chords.prototype.playSelectedProgression = function playSelectedProgression() {
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

            var triad = _ref;

            var chord = _this2.triads[triad.triadIndex];
            setTimeout(function () {
              triad.active = true;
              var chordNotes = new NoteInfo();
              chordNotes.actions = [Action.playChord];
              chordNotes.notes = triad.notes;
              _this2.eventAggregator.publish(chordNotes);
            }, timeout);
            timeout += 1000;
            setTimeout(function () {
              triad.active = false;
            }, timeout);
          };

          for (var _iterator = this.selectedProgression, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            var _ret = _loop();

            if (_ret === 'break') break;
          }
        };

        Chords.prototype.leadingClick = function leadingClick(sequence, clickIndex) {
          console.log(sequence + " " + triadIndex);
          var triadIndex = this.progressions[sequence][clickIndex];
          var chord = this.triads[triadIndex];
          var notes = this.music.extendChord(chord, this.extensions[sequence]);

          var chordNotes = new NoteInfo();
          chordNotes.actions = [Action.play];
          chordNotes.notes = notes;
          this.eventAggregator.publish(chordNotes);

          this.selectedProgression.splice(sequence);
          this.selectedProgression.push({
            triadIndex: triadIndex,
            notes: notes
          });

          if (sequence < 5) {
            this.nextLeading(sequence, triadIndex);
          }

          this.updateSelectedNotes();
        };

        Chords.prototype.updateSelectedNotes = function updateSelectedNotes() {
          this.selectedNotes.clear();
          for (var _iterator2 = this.selectedProgression, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i3 >= _iterator2.length) break;
              _ref2 = _iterator2[_i3++];
            } else {
              _i3 = _iterator2.next();
              if (_i3.done) break;
              _ref2 = _i3.value;
            }

            var _triad = _ref2;

            for (var _iterator3 = _triad.notes, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i4 >= _iterator3.length) break;
                _ref3 = _iterator3[_i4++];
              } else {
                _i4 = _iterator3.next();
                if (_i4.done) break;
                _ref3 = _i4.value;
              }

              var note = _ref3;

              if (this.selectedNotes.has(note.name)) {
                var n = this.selectedNotes.get(note.name);
                this.selectedNotes.set(note.name, n + 1);
              } else {
                this.selectedNotes.set(note.name, 1);
              }
            }
          }

          this.selectedNotes = this.sortMap(this.selectedNotes);
        };

        Chords.prototype.resetLeading = function resetLeading(index) {
          this.progressions = [];
          this.progressions.push([index]);
          this.selectedProgression = [{
            triadIndex: index,
            notes: this.music.extendChord(this.triads[index])
          }];
          this.nextLeading(0, index);
        };

        Chords.prototype.nextLeading = function nextLeading(sequenceNo, triadIndex) {
          var nextChordNumbers = this.music.getNextTriadNumbers(this.harmonicProgression ? triadIndex : 0);
          var nextChords = [];
          for (var _iterator4 = nextChordNumbers, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
              if (_i5 >= _iterator4.length) break;
              _ref4 = _iterator4[_i5++];
            } else {
              _i5 = _iterator4.next();
              if (_i5.done) break;
              _ref4 = _i5.value;
            }

            var chordIndex = _ref4;

            nextChords.push(chordIndex - 1);
          }
          this.progressions.splice(sequenceNo + 1);
          this.progressions.push(nextChords);
        };

        Chords.prototype.sortMap = function sortMap(map) {
          var newMap = new Map();
          Array.from(map.keys()).sort(function (a, b) {
            return map.get(b) - map.get(a);
          }).map(function (k) {
            return { key: k, value: map.get(k) };
          }).reduce(function (prev, curr) {
            newMap.set(curr.key, curr.value);
          }, newMap);

          return newMap;
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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eUJBRUQsWSx5QkFBYSxLLEVBQU87QUFDakIsZUFBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsZUFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLENBQUMsS0FBRCxDQUF2QjtBQUNBLGVBQUssbUJBQUwsR0FBMkIsQ0FBQztBQUMxQix3QkFBWSxLQURjO0FBRTFCLG1CQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsS0FBSyxNQUFMLENBQVksS0FBWixDQUF2QjtBQUZtQixXQUFELENBQTNCO0FBSUEsZUFBSyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLEtBQXBCO0FBQ0QsUzs7eUJBRUQsVyx3QkFBWSxVLEVBQVksVSxFQUFZO0FBQ2xDLGNBQUksbUJBQW1CLEtBQUssS0FBTCxDQUFXLG1CQUFYLENBQ3JCLEtBQUssbUJBQUwsR0FBMkIsVUFBM0IsR0FBd0MsQ0FEbkIsQ0FBdkI7QUFFQSxjQUFJLGFBQWEsRUFBakI7QUFDQSxnQ0FBdUIsZ0JBQXZCLHlIQUF5QztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQWhDLFVBQWdDOztBQUN2Qyx1QkFBVyxJQUFYLENBQWdCLGFBQVcsQ0FBM0I7QUFDRDtBQUNELGVBQUssWUFBTCxDQUFrQixNQUFsQixDQUF5QixhQUFXLENBQXBDO0FBQ0EsZUFBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLFVBQXZCO0FBQ0QsUzs7eUJBRUQsTyxvQkFBUSxHLEVBQUs7QUFDWCxjQUFJLFNBQVMsSUFBSSxHQUFKLEVBQWI7QUFDQSxnQkFBTSxJQUFOLENBQVcsSUFBSSxJQUFKLEVBQVgsRUFDQyxJQURELENBQ00sVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFTO0FBQUUsbUJBQU8sSUFBSSxHQUFKLENBQVEsQ0FBUixJQUFhLElBQUksR0FBSixDQUFRLENBQVIsQ0FBcEI7QUFBZ0MsV0FEakQsRUFFQyxHQUZELENBRUssYUFBSztBQUFFLG1CQUFPLEVBQUUsS0FBSyxDQUFQLEVBQVUsT0FBTyxJQUFJLEdBQUosQ0FBUSxDQUFSLENBQWpCLEVBQVA7QUFBcUMsV0FGakQsRUFHQyxNQUhELENBR1EsVUFBQyxJQUFELEVBQU8sSUFBUCxFQUFnQjtBQUN0QixtQkFBTyxHQUFQLENBQVcsS0FBSyxHQUFoQixFQUFxQixLQUFLLEtBQTFCO0FBQ0EsV0FMRixFQUtJLE1BTEo7O0FBT0EsaUJBQU8sTUFBUDtBQUNELFMiLCJmaWxlIjoia2V5cy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
