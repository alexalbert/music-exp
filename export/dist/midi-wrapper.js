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
          MIDI.chordOn(notes.channel, numbers, velocity, delay);
          MIDI.chordOff(notes.channel, numbers, delay + 0.75);
        };

        MidiWrapper.prototype.playNotes = function playNotes(notes) {
          var delay = 0;
          var velocity = 127;
          MIDI.setVolume(0, 127);
          for (var i = 0; i < notes.notes.length; i++) {
            var note = notes.notes[i];
            MIDI.noteOn(notes.channel, note.number, velocity, note.start ? note.start : delay);
            MIDI.noteOff(notes.channel, note.number, note.end ? note.end : delay + 0.75);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGktd3JhcHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQVEsWSxxQkFBQSxNOztBQUNBLHFCLDJCQUFBLGU7O0FBQ0MsYyxhQUFBLFE7QUFBVSxZLGFBQUEsTTs7QUFDWCxlLCtCQUFBLFM7Ozs2QkFHSyxXLFdBRFosT0FBTyxlQUFQLEM7QUFHQyw2QkFBWSxlQUFaLEVBQTZCO0FBQUE7O0FBQzNCLGVBQUssZUFBTCxHQUF1QixlQUF2QjtBQUNBLGVBQUssU0FBTDtBQUNEOzs4QkFFRCxTLHdCQUFZO0FBQUE7O0FBQ1QsZUFBSyxlQUFMLENBQXFCLFNBQXJCLENBQStCLFFBQS9CLEVBQXlDLGlCQUFTO0FBQ2hELGdCQUFJLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBdUIsT0FBTyxTQUE5QixDQUFKLEVBQThDO0FBQzVDLG9CQUFLLFNBQUwsQ0FBZSxLQUFmO0FBQ0Q7QUFDRCxnQkFBSSxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQXVCLE9BQU8sSUFBOUIsQ0FBSixFQUF5QztBQUN2QyxvQkFBSyxTQUFMLENBQWUsS0FBZjtBQUNEO0FBQ0YsV0FQRDtBQVFELFM7OzhCQUVELFMsc0JBQVUsSyxFQUFPO0FBQ2YsY0FBSSxRQUFRLENBQVo7QUFDQSxjQUFJLFdBQVcsR0FBZjtBQUNBLGVBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsR0FBbEI7QUFDQSxjQUFJLFVBQVUsTUFBTSxLQUFOLENBQVksR0FBWixDQUFnQixhQUFLO0FBQUUsbUJBQU8sRUFBRSxNQUFUO0FBQWtCLFdBQXpDLENBQWQ7QUFDQSxlQUFLLE9BQUwsQ0FBYSxNQUFNLE9BQW5CLEVBQTRCLE9BQTVCLEVBQXFDLFFBQXJDLEVBQStDLEtBQS9DO0FBQ0EsZUFBSyxRQUFMLENBQWMsTUFBTSxPQUFwQixFQUE2QixPQUE3QixFQUFzQyxRQUFRLElBQTlDO0FBQ0QsUzs7OEJBRUQsUyxzQkFBVSxLLEVBQU87QUFDZixjQUFJLFFBQVEsQ0FBWjtBQUNBLGNBQUksV0FBVyxHQUFmO0FBQ0EsZUFBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixHQUFsQjtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLEtBQU4sQ0FBWSxNQUFoQyxFQUF3QyxHQUF4QyxFQUE2QztBQUMzQyxnQkFBSSxPQUFPLE1BQU0sS0FBTixDQUFZLENBQVosQ0FBWDtBQUNBLGlCQUFLLE1BQUwsQ0FBWSxNQUFNLE9BQWxCLEVBQTJCLEtBQUssTUFBaEMsRUFBd0MsUUFBeEMsRUFBa0QsS0FBSyxLQUFMLEdBQWEsS0FBSyxLQUFsQixHQUEwQixLQUE1RTtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxNQUFNLE9BQW5CLEVBQTRCLEtBQUssTUFBakMsRUFBeUMsS0FBSyxHQUFMLEdBQVcsS0FBSyxHQUFoQixHQUFzQixRQUFRLElBQXZFO0FBQ0E7QUFDSCxTOzs7Ozs7O0FBSUEsZSxHQUFZLFVBQVUsUTtBQUN0QixRLEdBQUssVUFBVSxHQUFWLENBQWMsV0FBZCxDIiwiZmlsZSI6Im1pZGktd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
