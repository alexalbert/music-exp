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
          this.progressions = [];
          this.selectedProgression = [];

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

        Chords.prototype.leadingClick = function leadingClick(sequence, triadIndex) {
          console.log(sequence + " " + triadIndex);
          var chord = this.triads[this.progressions[sequence][triadIndex]];
          chord.notes.actions = [Action.play];
          this.eventAggregator.publish(chord.notes);
          this.selectedProgression.splice(sequence);
          this.selectedProgression.push({ triadIndex: triadIndex });

          if (sequence < 5) {
            this.nextLeading(sequence, triadIndex);
          }
        };

        Chords.prototype.resetLeading = function resetLeading(index) {
          this.progressions = [];
          this.progressions.push([index]);
          this.nextLeading(0, index);
          this.selectedProgression = [{ triadIndex: index }];
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
              chord.notes.actions = [Action.playChord];
              _this2.eventAggregator.publish(chord.notes);
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

        Chords.prototype.nextLeading = function nextLeading(sequenceNo, triadIndex) {
          var nextChordNumbers = this.music.getNextTriadNumbers(triadIndex);
          var nextChords = [];
          for (var _iterator2 = nextChordNumbers, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i3 >= _iterator2.length) break;
              _ref2 = _iterator2[_i3++];
            } else {
              _i3 = _iterator2.next();
              if (_i3.done) break;
              _ref2 = _i3.value;
            }

            var chordIndex = _ref2;

            nextChords.push(chordIndex - 1);
          }
          this.progressions.splice(sequenceNo + 1);
          this.progressions.push(nextChords);
        };

        Chords.prototype.playTriad = function playTriad(root, chord) {
          var notes = this.music.getChordNotes(root, chord);
          notes.actions = [Action.activate, Action.play];
          this.eventAggregator.publish(notes);
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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LEVBQUMsWUFBWSxVQUFiLEVBQTlCOztBQUdBLGNBQUksV0FBVyxDQUFmLEVBQWtCO0FBQ2hCLGlCQUFLLFdBQUwsQ0FBaUIsUUFBakIsRUFBMkIsVUFBM0I7QUFDRjtBQUNGLFM7O3lCQUVELFkseUJBQWEsSyxFQUFPO0FBQ2xCLGVBQUssWUFBTCxHQUFvQixFQUFwQjtBQUNBLGVBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixDQUFDLEtBQUQsQ0FBdkI7QUFDQSxlQUFLLFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0IsS0FBcEI7QUFDQSxlQUFLLG1CQUFMLEdBQTJCLENBQUMsRUFBQyxZQUFZLEtBQWIsRUFBRCxDQUEzQjtBQUNELFM7O3lCQUVELHVCLHNDQUEwQjtBQUFBOztBQUN4QixjQUFJLFVBQVUsRUFBZDs7QUFEd0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUVmLEtBRmU7O0FBR3BCLGdCQUFJLFFBQVEsT0FBSyxNQUFMLENBQVksTUFBTSxVQUFsQixDQUFaO0FBQ0EsdUJBQVcsWUFBTTtBQUNmLG9CQUFNLE1BQU4sR0FBZSxJQUFmO0FBQ0Esb0JBQU0sS0FBTixDQUFZLE9BQVosR0FBc0IsQ0FBQyxPQUFPLFNBQVIsQ0FBdEI7QUFDQSxxQkFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLE1BQU0sS0FBbkM7QUFDRCxhQUpELEVBSUcsT0FKSDtBQUtBLHVCQUFXLElBQVg7QUFDQSx1QkFBVyxZQUFNO0FBQ2Ysb0JBQU0sTUFBTixHQUFlLEtBQWY7QUFDRCxhQUZELEVBRUcsT0FGSDtBQVZvQjs7QUFFeEIsK0JBQWtCLEtBQUssbUJBQXZCLG1IQUE0QztBQUFBOztBQUFBOztBQUFBO0FBVzNDO0FBQ0YsUzs7eUJBRUQsVyx3QkFBWSxVLEVBQVksVSxFQUFZO0FBQ2xDLGNBQUksbUJBQW1CLEtBQUssS0FBTCxDQUFXLG1CQUFYLENBQStCLFVBQS9CLENBQXZCO0FBQ0EsY0FBSSxhQUFhLEVBQWpCO0FBQ0EsZ0NBQXVCLGdCQUF2Qix5SEFBeUM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUFoQyxVQUFnQzs7QUFDdkMsdUJBQVcsSUFBWCxDQUFnQixhQUFXLENBQTNCO0FBQ0Q7QUFDRCxlQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBeUIsYUFBVyxDQUFwQztBQUNBLGVBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixVQUF2QjtBQUNELFM7O3lCQUVELFMsc0JBQVUsSSxFQUFNLEssRUFBTztBQUNyQixjQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixJQUF6QixFQUErQixLQUEvQixDQUFaO0FBQ0EsZ0JBQU0sT0FBTixHQUFnQixDQUFDLE9BQU8sUUFBUixFQUFrQixPQUFPLElBQXpCLENBQWhCO0FBQ0EsZUFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLEtBQTdCO0FBQ0QsUyIsImZpbGUiOiJrZXlzLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
