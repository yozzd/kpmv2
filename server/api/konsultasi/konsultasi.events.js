/**
 * Konsultasi model events
 */

'use strict';

import {EventEmitter} from 'events';
var Konsultasi = require('./konsultasi.model');
var KonsultasiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KonsultasiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Konsultasi.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KonsultasiEvents.emit(event + ':' + doc._id, doc);
    KonsultasiEvents.emit(event, doc);
  }
}

export default KonsultasiEvents;
