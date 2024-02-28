const mongoose = require('mongoose');

const personalInformationSchema = new mongoose.Schema({
  date: String,
  lastName: String,
  firstName: String,
  middleName: String,
  dateOfBirth: String,
  age: String,
  ssn: String,
  dlOrIdNumber: String,
  stateIssued: String,
  revokedOrSuspendedDate: String,
  address: String,
  cityStateZip: String,
  homePhone: String,
  workPhone: String,
  gender: String,
  race: String,
  nationality: String,
  maritalStatus: String,
  usCitizen: String,
  residencyNumber: String,
  primaryLanguageSpoken: String,
  referredBy: String,
});
personalInformationSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
  });
const PersonalInformation = mongoose.model('PersonalInformation', personalInformationSchema);
module.exports = PersonalInformation;
