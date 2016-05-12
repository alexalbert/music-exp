'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', 'note-info', 'aurelia-dependency-injection'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, Container, _dec, _class, MidiWrapper, container, mw;

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
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }],
    execute: function () {
      _export('MidiWrapper', MidiWrapper = (_dec = inject(EventAggregator), _dec(_class = function () {
        function MidiWrapper(eventAggregator) {
          _classCallCheck(this, MidiWrapper);

          this.eventAggregator = eventAggregator;
          this.subscribe();
        }

        MidiWrapper.prototype.subscribe = function subscribe() {
          var _this = this;

          this.eventAggregator.subscribe(NoteInfo, function (notes) {
            if (notes.actions.includes(Action.playChord)) {
              _this.playChord(notes);
            }
            if (notes.actions.includes(Action.play)) {
              _this.playNotes(notes);
            }
          });
        };

        MidiWrapper.prototype.playChord = function playChord(notes) {
          var delay = 0;
          var velocity = 127;
          MIDI.setVolume(0, 127);
          var numbers = notes.notes.map(function (n) {
            return n.number;
          });
          MIDI.chordOn(0, numbers, velocity, delay);
          MIDI.chordOff(0, numbers, delay + 0.75);
        };

        MidiWrapper.prototype.playNotes = function playNotes(notes) {
          var delay = 0;
          var velocity = 127;
          MIDI.setVolume(0, 127);
          for (var i = 0; i < notes.notes.length; i++) {
            var note = notes.notes[i];
            MIDI.noteOn(0, note.number, velocity, note.start ? note.start : delay);
            MIDI.noteOff(0, note.number, note.end ? note.end : delay + 0.75);
          }
        };

        return MidiWrapper;
      }()) || _class));

      _export('MidiWrapper', MidiWrapper);

      container = Container.instance;
      mw = container.get(MidiWrapper);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGktd3JhcHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVEsWSxxQkFBQSxNOztBQUNBLHFCLDJCQUFBLGU7O0FBQ0MsYyxhQUFBLFE7QUFBVSxZLGFBQUEsTTs7QUFDWCxlLCtCQUFBLFM7Ozs2QkFHSyxXLFdBRFosT0FBTyxlQUFQLEM7QUFHQyw2QkFBWSxlQUFaLEVBQTZCO0FBQUE7O0FBQzNCLGVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGVBQUssU0FBTDtBQUNEOzs4QkFFRCxTLHdCQUFZO0FBQUE7O0FBQ1QsZUFBSyxlQUFMLENBQXFCLFNBQXJCLENBQStCLFFBQS9CLEVBQXlDLGlCQUFTO0FBQ2hELGdCQUFJLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBdUIsT0FBTyxTQUE5QixDQUFKLEVBQThDO0FBQzVDLG9CQUFLLFNBQUwsQ0FBZSxLQUFmO0FBQ0Q7QUFDRCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQXVCLE9BQU8sSUFBOUIsQ0FBSixFQUF5QztBQUN2QyxvQkFBSyxTQUFMLENBQWUsS0FBZjtBQUNEO0FBQ0YsV0FQRDtBQVFELFM7OzhCQUVELFMsc0JBQVUsSyxFQUFPO0FBQ2YsY0FBSSxRQUFRLENBQVo7QUFDQSxjQUFJLFdBQVcsR0FBZjtBQUNBLGVBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsR0FBbEI7QUFDQSxjQUFJLFVBQVUsTUFBTSxLQUFOLENBQVksR0FBWixDQUFnQixhQUFLO0FBQUUsbUJBQU8sRUFBRSxNQUFUO0FBQWtCLFdBQXpDLENBQWQ7QUFDQSxlQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLE9BQWhCLEVBQXlCLFFBQXpCLEVBQW1DLEtBQW5DO0FBQ0EsZUFBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixPQUFqQixFQUEwQixRQUFRLElBQWxDO0FBQ0QsUzs7OEJBRUQsUyxzQkFBVSxLLEVBQU87QUFDZixjQUFJLFFBQVEsQ0FBWjtBQUNBLGNBQUksV0FBVyxHQUFmO0FBQ0EsZUFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixHQUFsQjtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLEtBQU4sQ0FBWSxNQUFoQyxFQUF3QyxHQUF4QyxFQUE2QztBQUMzQyxnQkFBSSxPQUFPLE1BQU0sS0FBTixDQUFZLENBQVosQ0FBWDtBQUNBLGlCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsS0FBSyxNQUFwQixFQUE0QixRQUE1QixFQUFzQyxLQUFLLEtBQUwsR0FBYSxLQUFLLEtBQWxCLEdBQTBCLEtBQWhFO0FBQ0EsaUJBQUssT0FBTCxDQUFhLENBQWIsRUFBZ0IsS0FBSyxNQUFyQixFQUE2QixLQUFLLEdBQUwsR0FBVyxLQUFLLEdBQWhCLEdBQXNCLFFBQVEsSUFBM0Q7QUFDQTtBQUNILFM7Ozs7Ozs7QUFJQSxlLEdBQVksVUFBVSxRO0FBQ3RCLFEsR0FBSyxVQUFVLEdBQVYsQ0FBYyxXQUFkLEMiLCJmaWxlIjoibWlkaS13cmFwcGVyLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
