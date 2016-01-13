/**
 * Kontrol model events
 */

'use strict';

import {EventEmitter} from 'events';
var Kontrol = require('./kontrol.model');
var KontrolEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KontrolEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Kontrol.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KontrolEvents.emit(event + ':' + doc._id, doc);
    KontrolEvents.emit(event, doc);
  }
}

export default KontrolEvents;
