const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    substanceAbuseTreatment: String,
    mentalHealthTreatment: String,
    previousHelpFromDSM: Boolean,
    suicidalThoughts: Boolean,
    arrested: Boolean,
    involvedInCriminalJustice: Boolean,
    incarcerationDetails: {
      dateOfIncarceration: String,
      charge: String,
      location: String
    },
    upcomingCourtDates: String,
    probationOfficerDetails: {
      name: String,
      contact: String
    },
    alcoholOrDrugUse: Boolean,
    preferredSubstance: String,
    lastUsed: String
});

const History = mongoose.model('History', historySchema);
module.exports = History;
