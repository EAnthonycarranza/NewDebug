import { gql } from '@apollo/client';

// Query to fetch all users
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      username
      email
    }
  }
`;

// Query to fetch a single user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
    }
  }
`;

// Query to fetch all admission agreements
export const GET_ALL_ADMISSION_AGREEMENTS = gql`
  query GetAllAdmissionAgreements {
    getAllAdmissionAgreements {
      id
      agreementAcknowledgement {
        studentSignature
        witnessSignature
        dateSigned
      }
    }
  }
`;

// Query to fetch a single admission agreement by ID
export const GET_ADMISSION_AGREEMENT_BY_ID = gql`
  query GetAdmissionAgreementById($agreementId: ID!) {
    getAdmissionAgreement(id: $agreementId) {
      id
      agreementAcknowledgement {
        studentSignature
        witnessSignature
        dateSigned
      }
    }
  }
`;

// Query to fetch all personal information entries
export const GET_ALL_PERSONAL_INFORMATION = gql`
  query GetAllPersonalInformation {
    getAllPersonalInformation {
        id
        date
        lastName
        firstName
        middleName
        dateOfBirth
        age
        ssn
        dlOrIdNumber
        stateIssued
        revokedOrSuspendedDate
        address
        cityStateZip
        homePhone
        workPhone
        gender
        race
        nationality
        maritalStatus
        usCitizen
        residencyNumber
        primaryLanguageSpoken
        referredBy
    }
  }
`;

// Query to fetch a single personal information entry by ID
export const GET_PERSONAL_INFORMATION_BY_ID = gql`
query GetPersonalInformationById($infoId: ID!) {
    getPersonalInformation(id: $infoId) {
        id
        date
        lastName
        firstName
        middleName
        dateOfBirth
        age
        ssn
        dlOrIdNumber
        stateIssued
        revokedOrSuspendedDate
        address
        cityStateZip
        homePhone
        workPhone
        gender
        race
        nationality
        maritalStatus
        usCitizen
        residencyNumber
        primaryLanguageSpoken
        referredBy
    }
  }
`;

// Query to fetch all medical information entries
export const GET_ALL_MEDICAL_INFORMATION = gql`
  query GetAllMedicalInformation {
    getAllMedicalInformation {
      healthCare
      terminalIllnesses
      currentMedications {
        name
        dosage
      }
    }
  }
`;

// Query to fetch a single medical information entry by ID
export const GET_MEDICAL_INFORMATION_BY_ID = gql`
  query GetMedicalInformationById($infoId: ID!) {
    getMedicalInformation(id: $infoId) {
      healthCare
      terminalIllnesses
      currentMedications {
        name
        dosage
      }
    }
  }
`;

// Query to fetch all history entries
export const GET_ALL_HISTORY = gql`
  query GetAllHistory {
    getAllHistory {
      substanceAbuseTreatment
      mentalHealthTreatment
      previousHelpFromDSM
      suicidalThoughts
      arrested
      involvedInCriminalJustice
      incarcerationDetails {
        dateOfIncarceration
        charge
        location
      }
      upcomingCourtDates
      probationOfficerDetails {
        name
        contact
      }
      alcoholOrDrugUse
      preferredSubstance
      lastUsed
    }
  }
`;

// Query to fetch a single history entry by ID
export const GET_HISTORY_BY_ID = gql`
  query GetHistoryById($historyId: ID!) {
    getHistory(id: $historyId) {
      substanceAbuseTreatment
      mentalHealthTreatment
      previousHelpFromDSM
      suicidalThoughts
      arrested
      involvedInCriminalJustice
      incarcerationDetails {
        dateOfIncarceration
        charge
        location
      }
      upcomingCourtDates
      probationOfficerDetails {
        name
        contact
      }
      alcoholOrDrugUse
      preferredSubstance
      lastUsed
    }
  }
`;

// Query to fetch all education entries
export const GET_ALL_EDUCATION = gql`
  query GetAllEducation {
    getAllEducation {
      highestGradeCompleted
      yearGraduated
      collegeHoursCompleted
      degree
    }
  }
`;

// Query to fetch a single education entry by ID
export const GET_EDUCATION_BY_ID = gql`
  query GetEducationById($educationId: ID!) {
    getEducation(id: $educationId) {
      highestGradeCompleted
      yearGraduated
      collegeHoursCompleted
      degree
    }
  }
`;

// Query to fetch all employment entries
export const GET_ALL_EMPLOYMENT = gql`
  query GetAllEmployment {
    getAllEmployment {
      currentlyEmployed
      employmentType
      employer
      occupation
      hourlyIncome
      paymentFrequency
      specialSkills
    }
  }
`;

// Query to fetch a single employment entry by ID
export const GET_EMPLOYMENT_BY_ID = gql`
  query GetEmploymentById($employmentId: ID!) {
    getEmployment(id: $employmentId) {
      currentlyEmployed
      employmentType
      employer
      occupation
      hourlyIncome
      paymentFrequency
      specialSkills
    }
  }
`;
