import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

//Mutations for user logins
export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;


// Mutation for creating a new admission agreement
export const CREATE_ADMISSION_AGREEMENT = gql`
  mutation CreateAdmissionAgreement($agreementAcknowledgement: AgreementAcknowledgementInput!) {
    createAdmissionAgreement(agreementAcknowledgement: $agreementAcknowledgement) {
      id
      agreementAcknowledgement {
        studentSignature
        witnessSignature
        dateSigned
      }
    }
  }
`;

// Mutation for updating an admission agreement
export const UPDATE_ADMISSION_AGREEMENT = gql`
  mutation UpdateAdmissionAgreement($id: ID!, $agreementAcknowledgement: AgreementAcknowledgementInput!) {
    updateAdmissionAgreement(id: $id, agreementAcknowledgement: $agreementAcknowledgement) {
      id
      agreementAcknowledgement {
        studentSignature
        witnessSignature
        dateSigned
      }
    }
  }
`;

// Mutation for deleting an admission agreement
export const DELETE_ADMISSION_AGREEMENT = gql`
  mutation DeleteAdmissionAgreement($id: ID!) {
    deleteAdmissionAgreement(id: $id)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String, $password: String) {
    updateUser(id: $id, username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

export const CREATE_PERSONAL_INFORMATION = gql`
  mutation CreatePersonalInformation($personalInfo: PersonalInformationInput!) {
    createPersonalInformation(personalInfo: $personalInfo) {
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

export const UPDATE_PERSONAL_INFORMATION = gql`
  mutation UpdatePersonalInformation($id: ID!, $personalInfo: PersonalInformationInput!) {
    updatePersonalInformation(id: $id, personalInfo: $personalInfo) {
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

export const DELETE_PERSONAL_INFORMATION = gql`
  mutation DeletePersonalInformation($deletePersonalInformationId: ID!) {
    deletePersonalInformation(id: $deletePersonalInformationId)
  }
`;

export const CREATE_MEDICAL_INFORMATION = gql`
mutation CreateMedicalInformation($medicalInfo: MedicalInformationInput) {
    createMedicalInformation(medicalInfo: $medicalInfo) {
      healthCare
      terminalIllnesses
      currentMedications {
        name
        dosage
      }
    }
  }
`;

export const UPDATE_MEDICAL_INFORMATION = gql`
mutation UpdateMedicalInformation($updateMedicalInformationId: ID!, $medicalInfo: MedicalInformationInput) {
    updateMedicalInformation(id: $updateMedicalInformationId, medicalInfo: $medicalInfo) {
      healthCare
      terminalIllnesses
      currentMedications {
        name
        dosage
      }
    }
  }
`;

export const DELETE_MEDICAL_INFORMATION = gql`
  mutation DeleteMedicalInformation($deleteMedicalInformationId: ID!) {
    deleteMedicalInformation(id: $deleteMedicalInformationId)
  }
`;

export const CREATE_HISTORY = gql`
mutation CreateHistory($history: HistoryInput) {
    createHistory(history: $history) {
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

export const UPDATE_HISTORY = gql`
mutation UpdateHistory($updateHistoryId: ID!, $history: HistoryInput) {
    updateHistory(id: $updateHistoryId, history: $history) {
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

export const DELETE_HISTORY = gql`
  mutation DeleteHistory($deleteHistoryId: ID!) {
    deleteHistory(id: $deleteHistoryId)
  }
`;

export const CREATE_EDUCATION = gql`
mutation CreateEducation($education: EducationInput) {
    createEducation(education: $education) {
      highestGradeCompleted
      yearGraduated
      collegeHoursCompleted
      degree
    }
  }
`;

export const UPDATE_EDUCATION = gql`
mutation UpdateEducation($updateEducationId: ID!, $education: EducationInput) {
    updateEducation(id: $updateEducationId, education: $education) {
      highestGradeCompleted
      yearGraduated
      collegeHoursCompleted
      degree
    }
  }
`;

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($deleteEducationId: ID!) {
    deleteEducation(id: $deleteEducationId)
  }
`;

export const CREATE_EMPLOYMENT = gql`
  mutation CreateEmployment($employment: EmploymentInput!) {
    createEmployment(employment: $employment) {
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

export const UPDATE_EMPLOYMENT = gql`
  mutation UpdateEmployment($id: ID!, $employment: EmploymentInput!) {
    updateEmployment(id: $id, employment: $employment) {
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

export const DELETE_EMPLOYMENT = gql`
  mutation DeleteEmployment($deleteEmploymentId: ID!) {
    deleteEmployment(id: $deleteEmploymentId)
  }
`;
