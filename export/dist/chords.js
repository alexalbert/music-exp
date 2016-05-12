'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info', './music'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, Music, _dec, _class, Chords;

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
      _export('Chords', Chords = (_dec = inject(EventAggregator, Music), _dec(_class = function () {
        function Chords(eventAggregator, music) {
          _classCallCheck(this, Chords);

          this.heading = 'Chords';

          this.eventAggregator = eventAggregator;
          this.chordTypes = music.chordTypes;;

          this.selectedChord = this.chordTypes[0];
          this.chordTypes[0].selected = true;
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
              _this.root = notes.notes[0];
              _this.playChord(_this.root);
            }
          });
        };

        Chords.prototype.onTypeChange = function onTypeChange(index) {
          console.log(index);
          this.selectedChord.selected = false;
          this.selectedChord = this.chordTypes[index];
          this.selectedChord.selected = true;
          this.playChord(this.root);
        };

        Chords.prototype.playChord = function playChord(root) {
          var notes = new NoteInfo();
          for (var _iterator = this.selectedChord.notes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var n = _ref;

            notes.push(root.number + n);
          }
          notes.actions = [Action.playChord, Action.activate];
          this.eventAggregator.publish(notes);
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNob3Jkcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ1EsWSxxQkFBQSxNOztBQUNBLHFCLDJCQUFBLGU7O0FBQ0EsYyxhQUFBLFE7QUFBVSxZLGFBQUEsTTs7QUFDVixXLFVBQUEsSzs7O3dCQUdLLE0sV0FEWixPQUFPLGVBQVAsRUFBd0IsS0FBeEIsQztBQUlDLHdCQUFZLGVBQVosRUFBNkIsS0FBN0IsRUFBb0M7QUFBQTs7QUFBQSxlQUZwQyxPQUVvQyxHQUYxQixRQUUwQjs7QUFDaEMsZUFBSyxlQUFMLEdBQXVCLGVBQXZCO0FBQ0EsZUFBSyxVQUFMLEdBQWtCLE1BQU0sVUFBeEIsQ0FBbUM7O0FBRW5DLGVBQUssYUFBTCxHQUFxQixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBckI7QUFDQSxlQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsR0FBOEIsSUFBOUI7QUFDSDs7eUJBRUQsUSx1QkFBVztBQUNULGVBQUssWUFBTCxHQUFvQixLQUFLLFNBQUwsRUFBcEI7QUFDRCxTOzt5QkFFRCxRLHVCQUFXO0FBQ1AsZUFBSyxZQUFMLENBQWtCLE9BQWxCO0FBQ0gsUzs7eUJBRUQsUyx3QkFBWTtBQUFBOztBQUNULGlCQUFPLEtBQUssZUFBTCxDQUFxQixTQUFyQixDQUErQixRQUEvQixFQUF5QyxpQkFBUztBQUN2RCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQXVCLE9BQU8sTUFBOUIsQ0FBSixFQUEyQztBQUMxQyxvQkFBSyxJQUFMLEdBQVksTUFBTSxLQUFOLENBQVksQ0FBWixDQUFaO0FBQ0Esb0JBQUssU0FBTCxDQUFlLE1BQUssSUFBcEI7QUFDQTtBQUNGLFdBTE0sQ0FBUDtBQU1ELFM7O3lCQUVELFkseUJBQWEsSyxFQUFPO0FBQ2xCLGtCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsZUFBSyxhQUFMLENBQW1CLFFBQW5CLEdBQThCLEtBQTlCO0FBQ0EsZUFBSyxhQUFMLEdBQXFCLEtBQUssVUFBTCxDQUFnQixLQUFoQixDQUFyQjtBQUNBLGVBQUssYUFBTCxDQUFtQixRQUFuQixHQUE4QixJQUE5QjtBQUNBLGVBQUssU0FBTCxDQUFlLEtBQUssSUFBcEI7QUFDRCxTOzt5QkFFRCxTLHNCQUFVLEksRUFBTTtBQUNkLGNBQUksUUFBUSxJQUFJLFFBQUosRUFBWjtBQUNBLCtCQUFjLEtBQUssYUFBTCxDQUFtQixLQUFqQyxrSEFBd0M7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUEvQixDQUErQjs7QUFDdEMsa0JBQU0sSUFBTixDQUFXLEtBQUssTUFBTCxHQUFZLENBQXZCO0FBQ0Q7QUFDRCxnQkFBTSxPQUFOLEdBQWdCLENBQUMsT0FBTyxTQUFSLEVBQW1CLE9BQU8sUUFBMUIsQ0FBaEI7QUFDQSxlQUFLLGVBQUwsQ0FBcUIsT0FBckIsQ0FBNkIsS0FBN0I7QUFDRCxTIiwiZmlsZSI6ImNob3Jkcy5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
