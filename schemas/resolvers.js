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
          getPersonalInformation: async (_, { id }, { user }) => {
            // Check if user exists in the context
            if (!user) throw new Error("Authentication required.");
        
            try {
              // Fetch the personal information only if user is authenticated
              const personalInfo = await PersonalInformation.findById(id);
              if (!personalInfo) throw new Error("Personal information not found.");
              
              // Optionally, check if the personalInfo belongs to the authenticated user
              // if (personalInfo.userId !== user._id) throw new Error("Not authorized to view this personal information.");
        
              return personalInfo;
            } catch (error) {
              throw new Error(error.message);
            }
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
          const hashedPassword = await bcrypt.hash(password, 12);
          const newUser = new User({ username, email, password: hashedPassword });
          await newUser.save();
          return newUser;
        },
        updateUser: async (_, { id, username, email, password }) => {
            const user = await User.findById(id);
            if (!user) {
              throw new Error('User not found');
            }
          
            // Check if the new email is already in use by another user
            if (email && email !== user.email) {
              const existingUser = await User.findOne({ email });
              if (existingUser) {
                throw new Error('Email is already in use');
              }
            }
          
            // Update username if provided
            if (username) {
              user.username = username;
            }
          
            // Update email if provided
            if (email) {
              user.email = email;
            }
          
            // Update password if provided
            if (password) {
              const hashedPassword = await bcrypt.hash(password, 12);
              user.password = hashedPassword;
            }
          
            await user.save();
            return user;
          },
          
        deleteUser: async (_, { id }) => {
          await User.findByIdAndDelete(id);
          return true;
        },
        async register(_, { username, email, password }) {
            console.log(`GraphQL Registration Attempt:`, { username, email }); // Log without password for security
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              throw new Error('User already exists');
            }
            // Directly save the plain password if your model already handles hashing
            const newUser = new User({ username, email, password }); // Do not hash here
            await newUser.save();
            const token = signToken(newUser);
            return { token, user: newUser };
          },
          async login(_, { email, password }) {
            console.log(`GraphQL Login Attempt:`, { email });
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
              throw new Error('User not found');
            }
            console.log(`User found:`, user);
            const isValid = await bcrypt.compare(password, user.password);
            console.log(`Password valid: ${isValid}`);
            if (!isValid) {
              throw new Error('Invalid credentials');
            }
            const token = signToken(user);
            return { token, user }; // Ensure this is what you're returning
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
        createPersonalInformation: async (_, { personalInfo }, { user }) => {
            if (!user) {
              throw new Error("You must be logged in to post personal information.");
            }
            // Now proceed with creating personal information using the user's ID
            // Here, make sure PersonalInformationModel is correctly imported and used
            const newPersonalInfo = await PersonalInformation.create({ ...personalInfo, userId: user._id });
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
