/**
 * Satuan model events
 */

'use strict';

import {EventEmitter} from 'events';
var Satuan = require('./satuan.model');
var SatuanEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SatuanEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Satuan.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SatuanEvents.emit(event + ':' + doc._id, doc);
    SatuanEvents.emit(event, doc);
  }
}

export default SatuanEvents;
