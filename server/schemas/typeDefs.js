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
        login(email: String!, password: String!): AuthPayload
        adminLogin(email: String!, password: String!): Auth
        createAdmissionAgreement(agreementAcknowledgement: AgreementAcknowledgementInput): AdmissionAgreement
        updateAdmissionAgreement(id: ID!, agreementAcknowledgement: AgreementAcknowledgementInput): AdmissionAgreement
        deleteAdmissionAgreement(id: ID!): Boolean
        createPersonalInformation(personalInfo: PersonalInformationInput!): PersonalInformation!
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

    type AuthPayload {
        token: String!
        user: User
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
        agreementAcknowledgement: AgreementAcknowledgement
    }
    
    type PersonalInformation {
        id: ID!
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
    }
    
    type Education {
        highestGradeCompleted: String
        yearGraduated: String
        collegeHoursCompleted: Int
        degree: String
    }
    
    type Employment {
        currentlyEmployed: Boolean!
        employmentType: String
        employer: String
        occupation: String
        hourlyIncome: String
        paymentFrequency: String
        specialSkills: String
    }
    
    type ProbationOfficerDetails {
        name: String
        contact: String
    }

    type History {
        substanceAbuseTreatment: String
        mentalHealthTreatment: String
        previousHelpFromDSM: Boolean
        suicidalThoughts: Boolean
        arrested: Boolean
        involvedInCriminalJustice: Boolean
        incarcerationDetails: IncarcerationDetails
        upcomingCourtDates: String
        probationOfficerDetails: ProbationOfficerDetails
        alcoholOrDrugUse: Boolean
        preferredSubstance: String
        lastUsed: String
    }
    
    type IncarcerationDetails {
        dateOfIncarceration: String
        charge: String
        location: String
    }
    
    type Medication {
        name: String!
        dosage: String
    }
    
    type MedicalInformation {
        healthCare: String
        terminalIllnesses: String
        currentMedications: [Medication]
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
    }

    input EducationInput {
        highestGradeCompleted: String
        yearGraduated: String
        collegeHoursCompleted: Int
        degree: String
    }

    input EmploymentInput {
        currentlyEmployed: Boolean!
        employmentType: String
        employer: String
        occupation: String
        hourlyIncome: String
        paymentFrequency: String
        specialSkills: String
    }

    input ProbationOfficerDetailsInput {
        name: String
        contact: String
    }

    input HistoryInput {
        substanceAbuseTreatment: String
        mentalHealthTreatment: String
        previousHelpFromDSM: Boolean
        suicidalThoughts: Boolean
        arrested: Boolean
        involvedInCriminalJustice: Boolean
        incarcerationDetails: IncarcerationDetailsInput
        upcomingCourtDates: String
        probationOfficerDetails: ProbationOfficerDetailsInput
        alcoholOrDrugUse: Boolean
        preferredSubstance: String
        lastUsed: String
    }

    input IncarcerationDetailsInput {
        dateOfIncarceration: String
        charge: String
        location: String
    }
    
    input MedicationInput {
        name: String!
        dosage: String
    }

    input MedicalInformationInput {
        healthCare: String
        terminalIllnesses: String
        currentMedications: [MedicationInput!]
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
