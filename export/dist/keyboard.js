'use strict';

System.register(['aurelia-framework', 'aurelia-event-aggregator', './note-info'], function (_export, _context) {
  var inject, EventAggregator, NoteInfo, Action, _dec, _class, Chords;

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
    }],
    execute: function () {
      _export('Chords', Chords = (_dec = inject(EventAggregator), _dec(_class = function () {
        function Chords(eventAggregator) {
          _classCallCheck(this, Chords);

          this.heading = 'Piano';
          this.instruments = ['Piano', 'Drums'];
          this.selectedInstrument = 0;

          this.eventAggregator = eventAggregator;
        }

        Chords.prototype.attached = function attached() {
          this.subscription = this.subscribe();
        };

        Chords.prototype.detached = function detached() {
          this.subscription.dispose();
        };

        Chords.prototype.setInstrument = function setInstrument(instrument) {
          this.selectedInstrument = instrument;
        };

        Chords.prototype.subscribe = function subscribe() {
          var _this = this;

          return this.eventAggregator.subscribe(NoteInfo, function (notes) {
            if (notes.actions.includes(Action.picked)) {
              notes.actions = [Action.play];
              notes.channel = _this.selectedInstrument;
              _this.eventAggregator.publish(notes);
            }
          });
        };

        return Chords;
      }()) || _class));

      _export('Chords', Chords);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleWJvYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDUSxZLHFCQUFBLE07O0FBQ0EscUIsMkJBQUEsZTs7QUFDQSxjLGFBQUEsUTtBQUFVLFksYUFBQSxNOzs7d0JBR0wsTSxXQURaLE9BQU8sZUFBUCxDO0FBTUMsd0JBQVksZUFBWixFQUE2QjtBQUFBOztBQUFBLGVBSjdCLE9BSTZCLEdBSm5CLE9BSW1CO0FBQUEsZUFIN0IsV0FHNkIsR0FIZixDQUFDLE9BQUQsRUFBVSxPQUFWLENBR2U7QUFBQSxlQUY3QixrQkFFNkIsR0FGUixDQUVROztBQUN6QixlQUFLLGVBQUwsR0FBdUIsZUFBdkI7QUFDSDs7eUJBRUQsUSx1QkFBVztBQUNULGVBQUssWUFBTCxHQUFvQixLQUFLLFNBQUwsRUFBcEI7QUFDRCxTOzt5QkFFRCxRLHVCQUFXO0FBQ1QsZUFBSyxZQUFMLENBQWtCLE9BQWxCO0FBQ0QsUzs7eUJBRUQsYSwwQkFBYyxVLEVBQVk7QUFDeEIsZUFBSyxrQkFBTCxHQUEwQixVQUExQjtBQUNELFM7O3lCQUVELFMsd0JBQVk7QUFBQTs7QUFDVCxpQkFBTyxLQUFLLGVBQUwsQ0FBcUIsU0FBckIsQ0FBK0IsUUFBL0IsRUFBeUMsaUJBQVM7QUFDdkQsZ0JBQUksTUFBTSxPQUFOLENBQWMsUUFBZCxDQUF1QixPQUFPLE1BQTlCLENBQUosRUFBMkM7QUFDekMsb0JBQU0sT0FBTixHQUFnQixDQUFDLE9BQU8sSUFBUixDQUFoQjtBQUNBLG9CQUFNLE9BQU4sR0FBZ0IsTUFBSyxrQkFBckI7QUFDQSxvQkFBSyxlQUFMLENBQXFCLE9BQXJCLENBQTZCLEtBQTdCO0FBQ0Q7QUFDRixXQU5NLENBQVA7QUFPRCxTIiwiZmlsZSI6ImtleWJvYXJkLmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==
