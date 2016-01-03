/**
 * Fisik model events
 */

'use strict';

import {EventEmitter} from 'events';
var Fisik = require('./fisik.model');
var FisikEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FisikEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Fisik.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FisikEvents.emit(event + ':' + doc._id, doc);
    FisikEvents.emit(event, doc);
  }
}

export default FisikEvents;
