/**
 * Rehabilitasi model events
 */

'use strict';

import {EventEmitter} from 'events';
var Rehabilitasi = require('./rehabilitasi.model');
var RehabilitasiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RehabilitasiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rehabilitasi.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RehabilitasiEvents.emit(event + ':' + doc._id, doc);
    RehabilitasiEvents.emit(event, doc);
  }
}

export default RehabilitasiEvents;
