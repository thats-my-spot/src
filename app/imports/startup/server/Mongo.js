import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Stalls } from '../../api/stalls/Stalls';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the database with a default data document.
const addStall = (stall) => {
  console.log(`  Adding: ${stall.stallId} (${stall.owner})`);
  Stalls.collection.insert(stall);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Stalls.collection.find().count() === 0) {
  if (Meteor.settings.defaultStalls) {
    console.log('Creating default stalls.');
    Meteor.settings.defaultStalls.forEach(stall => addStall(stall));
  }
}
