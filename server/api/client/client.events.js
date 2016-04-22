/**
 * Client model events
 */

'use strict';

import {EventEmitter} from 'events';
import Client from './client.model';
var ClientEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClientEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Client.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ClientEvents.emit(event + ':' + doc._id, doc);
    ClientEvents.emit(event, doc);
  }
}

export default ClientEvents;
