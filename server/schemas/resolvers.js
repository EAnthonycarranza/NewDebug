const { User, AdmissionAgreement, PersonalInformation, MedicalInformation, History, Education, Employment } = require('../api/models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');

const resolvers = {
        Query: {
          async users() {
            return await User.find({});
          },
          async getAdmissionAgreement(_, { id }) {
            return await AdmissionAgreement.findById(id);
          },
          async getAllAdmissionAgreements() {
            return await AdmissionAgreement.find({});
          },
          async getPersonalInformation(_, { id }) {
            return await PersonalInformation.findById(id);
          },
          async getAllPersonalInformation() {
            return await PersonalInformation.find({});
          },
          async getMedicalInformation(_, { id }) {
            return await MedicalInformation.findById(id);
          },
          async getAllMedicalInformation() {
            return await MedicalInformation.find({});
          },
          async getHistory(_, { id }) {
            return await History.findById(id);
          },
          async getAllHistory() {
            return await History.find({});
          },
          async getEducation(_, { id }) {
            return await Education.findById(id);
          },          
          async getAllEducation() {
            return await Education.find({});
          },
          async getEmployment(_, { id }) {
            return await Employment.findById(id);
          },
          async getAllEmployment() {
            return await Employment.find({});
          },
        },
    Mutation: {
        addUser: async (_, { username, email, password }) => {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ username, email, password: hashedPassword });
          await newUser.save();
          return newUser;
        },
        updateUser: async (_, { id, username, email, password }) => {
          const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
          return updatedUser;
        },
        deleteUser: async (_, { id }) => {
          await User.findByIdAndDelete(id);
          return true;
        },
        register: async (_, { username, email, password }) => {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({ username, email, password: hashedPassword });
          await newUser.save();
          const token = signToken(newUser);
          return { token, user: newUser };
        },
        login: async (_, { email, password }) => {
          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AuthenticationError('Invalid credentials');
          }
          const token = signToken(user);
          return { token, user };
        },
        adminLogin: async (_, { email, password }) => {
          const user = await User.findOne({ email, isAdmin: true });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AuthenticationError('Invalid credentials');
          }
          const token = signToken(user);
          return { token, user };
        },
        createAdmissionAgreement: async (_, { agreementAcknowledgement }) => {
            const newAgreement = new AdmissionAgreement({
              agreementAcknowledgement: agreementAcknowledgement
            });
            await newAgreement.save();
            return newAgreement;
          },
          updateAdmissionAgreement: async (_, { id, agreementAcknowledgement }) => {
            const updatedAgreement = await AdmissionAgreement.findByIdAndUpdate(
              id,
              { $set: { agreementAcknowledgement: agreementAcknowledgement } }, // Use $set to correctly apply the nested object update
              { new: true }
            );
            return updatedAgreement;
          },
          
        deleteAdmissionAgreement: async (_, { id }) => {
          await AdmissionAgreement.findByIdAndDelete(id);
          return true;
        },
        createPersonalInformation: async (_, { personalInfo }) => {
          const newPersonalInfo = new PersonalInformation(personalInfo);
          await newPersonalInfo.save();
          return newPersonalInfo;
        },
        updatePersonalInformation: async (_, { id, personalInfo }) => {
          const updatedPersonalInfo = await PersonalInformation.findByIdAndUpdate(id, personalInfo, { new: true });
          return updatedPersonalInfo;
        },
        deletePersonalInformation: async (_, { id }) => {
          await PersonalInformation.findByIdAndDelete(id);
          return true;
        },
        createMedicalInformation: async (_, { medicalInfo }) => {
          const newMedicalInfo = new MedicalInformation(medicalInfo);
          await newMedicalInfo.save();
          return newMedicalInfo;
        },
        updateMedicalInformation: async (_, { id, medicalInfo }) => {
          const updatedMedicalInfo = await MedicalInformation.findByIdAndUpdate(id, medicalInfo, { new: true });
          return updatedMedicalInfo;
        },
        deleteMedicalInformation: async (_, { id }) => {
          await MedicalInformation.findByIdAndDelete(id);
          return true;
        },
        createHistory: async (_, { history }) => {
          const newHistory = new History(history);
          await newHistory.save();
          return newHistory;
        },
        updateHistory: async (_, { id, history }) => {
          const updatedHistory = await History.findByIdAndUpdate(id, history, { new: true });
          return updatedHistory;
        },
        deleteHistory: async (_, { id }) => {
          await History.findByIdAndDelete(id);
          return true;
        },
        createEducation: async (_, { education }) => {
          const newEducation = new Education(education);
          await newEducation.save();
          return newEducation;
        },
        updateEducation: async (_, { id, education }) => {
          const updatedEducation = await Education.findByIdAndUpdate(id, education, { new: true });
          return updatedEducation;
        },
        deleteEducation: async (_, { id }) => {
          await Education.findByIdAndDelete(id);
          return true;
        },
        createEmployment: async (_, { employment }) => {
          const newEmployment = new Employment(employment);
          await newEmployment.save();
          return newEmployment;
        },
        updateEmployment: async (_, { id, employment }) => {
          const updatedEmployment = await Employment.findByIdAndUpdate(id, employment, { new: true });
          return updatedEmployment;
        },
        deleteEmployment: async (_, { id }) => {
          await Employment.findByIdAndDelete(id);
          return true;
        },
      }
    };
    
module.exports = resolvers;