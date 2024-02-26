const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    users: [User]
    getAdmissionAgreement(id: ID!): AdmissionAgreement
    getAllAdmissionAgreements: [AdmissionAgreement]
    getPersonalInformation(id: ID!): PersonalInformation
    getMedicalInformation(id: ID!): MedicalInformation
    getHistory(id: ID!): History
    getEducation(id: ID!): Education
    getEmployment(id: ID!): Employment
    getAllPersonalInformation: [PersonalInformation]
    getAllMedicalInformation: [MedicalInformation]
    getAllHistory: [History]
    getAllEducation: [Education]
    getAllEmployment: [Employment]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String, password: String): User
    deleteUser(id: ID!): Boolean
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth

    createAdmissionAgreement(personalInformation: PersonalInformationInput, agreementAcknowledgement: AgreementAcknowledgementInput): AdmissionAgreement
    updateAdmissionAgreement(id: ID!, personalInformation: PersonalInformationInput, agreementAcknowledgement: AgreementAcknowledgementInput): AdmissionAgreement
    deleteAdmissionAgreement(id: ID!): Boolean

    createPersonalInformation(personalInfo: PersonalInformationInput): PersonalInformation
    updatePersonalInformation(id: ID!, personalInfo: PersonalInformationInput): PersonalInformation
    deletePersonalInformation(id: ID!): Boolean

    createMedicalInformation(medicalInfo: MedicalInformationInput): MedicalInformation
    updateMedicalInformation(id: ID!, medicalInfo: MedicalInformationInput): MedicalInformation
    deleteMedicalInformation(id: ID!): Boolean

    createHistory(history: HistoryInput): History
    updateHistory(id: ID!, history: HistoryInput): History
    deleteHistory(id: ID!): Boolean

    createEducation(education: EducationInput): Education
    updateEducation(id: ID!, education: EducationInput): Education
    deleteEducation(id: ID!): Boolean

    createEmployment(employment: EmploymentInput): Employment
    updateEmployment(id: ID!, employment: EmploymentInput): Employment
    deleteEmployment(id: ID!): Boolean
  }
  
  

  type User {
    _id: ID
    username: String
    email: String
    isAdmin: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type AdmissionAgreement {
    id: ID
    personalInformation: PersonalInformation
    agreementAcknowledgement: AgreementAcknowledgement
  }
  
  type PersonalInformation {
    date: String
    lastName: String
    firstName: String
    middleName: String
    dateOfBirth: String
    age: String
    ssn: String
    dlOrIdNumber: String
    stateIssued: String
    revokedOrSuspendedDate: String
    address: String
    cityStateZip: String
    homePhone: String
    workPhone: String
    gender: String
    race: String
    nationality: String
    maritalStatus: String
    usCitizen: String
    residencyNumber: String
    primaryLanguageSpoken: String
    referredBy: String
    education: Education
    employment: Employment
    history: History
    medicalInformation: MedicalInformation
    reasonForSeekingAdmission: String
    goals: String
    talentsAndGifts: String
    emergencyContacts: [EmergencyContact]
  }
  
  type Education {
    highestGradeCompleted: String
    yearGraduated: String
    collegeHoursCompleted: String
    degree: String
  }
  
  type Employment {
    currentlyEmployed: String
    employmentType: String
    employer: String
    occupation: String
    hourlyIncome: String
    paymentFrequency: String
    specialSkills: String
  }
  
  type History {
    substanceAbuseTreatment: String
    mentalHealthTreatment: String
    previousHelpFromDSM: String
    suicidalThoughts: String
    arrested: String
    involvedInCriminalJustice: String
    incarcerationDetails: IncarcerationDetails
    upcomingCourtDates: String
    probationOfficerDetails: String
    alcoholOrDrugUse: String
    preferredSubstance: String
    lastUsed: String
  }
  
  type IncarcerationDetails {
    dateOfIncarceration: String
    charge: String
    location: String
  }
  
  type MedicalInformation {
    healthCare: String
    terminalIllnesses: String
    currentMedications: String
  }
  
  type EmergencyContact {
    name: String
    fullAddress: String
    phone: String
    alternatePhone: String
    relationship: String
  }
  
  type AgreementAcknowledgement {
    studentSignature: String
    witnessSignature: String
    dateSigned: String
  }

  input PersonalInformationInput {
    date: String
    lastName: String
    firstName: String
    middleName: String
    dateOfBirth: String
    age: String
    ssn: String
    dlOrIdNumber: String
    stateIssued: String
    revokedOrSuspendedDate: String
    address: String
    cityStateZip: String
    homePhone: String
    workPhone: String
    gender: String
    race: String
    nationality: String
    maritalStatus: String
    usCitizen: String
    residencyNumber: String
    primaryLanguageSpoken: String
    referredBy: String
    education: EducationInput
    employment: EmploymentInput
    history: HistoryInput
    medicalInformation: MedicalInformationInput
    reasonForSeekingAdmission: String
    goals: String
    talentsAndGifts: String
    emergencyContacts: [EmergencyContactInput]
  }

  input EducationInput {
    highestGradeCompleted: String
    yearGraduated: String
    collegeHoursCompleted: String
    degree: String
  }

  input EmploymentInput {
    currentlyEmployed: String
    employmentType: String
    employer: String
    occupation: String
    hourlyIncome: String
    paymentFrequency: String
    specialSkills: String
  }

  input HistoryInput {
    substanceAbuseTreatment: String
    mentalHealthTreatment: String
    previousHelpFromDSM: String
    suicidalThoughts: String
    arrested: String
    involvedInCriminalJustice: String
    incarcerationDetails: IncarcerationDetailsInput
    upcomingCourtDates: String
    probationOfficerDetails: String
    alcoholOrDrugUse: String
    preferredSubstance: String
    lastUsed: String
  }

  input IncarcerationDetailsInput {
    dateOfIncarceration: String
    charge: String
    location: String
  }

  input MedicalInformationInput {
    healthCare: String
    terminalIllnesses: String
    currentMedications: String
  }

  input EmergencyContactInput {
    name: String
    fullAddress: String
    phone: String
    alternatePhone: String
    relationship: String
  }

  input AgreementAcknowledgementInput {
    studentSignature: String
    witnessSignature: String
    dateSigned: String
  }
`;

module.exports = typeDefs;
