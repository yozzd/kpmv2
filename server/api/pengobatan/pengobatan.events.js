/**
 * Pengobatan model events
 */

'use strict';

import {EventEmitter} from 'events';
var Pengobatan = require('./pengobatan.model');
var PengobatanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PengobatanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Pengobatan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PengobatanEvents.emit(event + ':' + doc._id, doc);
    PengobatanEvents.emit(event, doc);
  }
}

export default PengobatanEvents;
