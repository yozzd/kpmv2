/**
 * Anamnesa model events
 */

'use strict';

import {EventEmitter} from 'events';
var Anamnesa = require('./anamnesa.model');
var AnamnesaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AnamnesaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Anamnesa.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AnamnesaEvents.emit(event + ':' + doc._id, doc);
    AnamnesaEvents.emit(event, doc);
  }
}

export default AnamnesaEvents;
