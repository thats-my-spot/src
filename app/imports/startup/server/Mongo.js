import { Meteor } from 'meteor/meteor';
import { Stalls } from '../../api/stalls/Stalls';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addStall = (stall) => {
  console.log(`  Adding: ${stall.stallId} (${stall.owner})`);
  Stalls.collection.insert(stall);
};

if (Stalls.collection.find().count() === 0) {
  if (Meteor.settings.defaultStalls) {
    console.log('Creating default stalls.');
    Meteor.settings.defaultStalls.forEach(stall => addStall(stall));
  }
}
