import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERSONAL_INFORMATION_BY_ID } from '../utils/queries';
import client from '../utils/api'; 

const PersonalInformation = ({ personalInfoId }) => {
    // Ensure the Apollo Client instance is being used here
    const { loading, error, data } = useQuery(GET_PERSONAL_INFORMATION_BY_ID, {
      variables: { infoId: personalInfoId },
      skip: !personalInfoId, // Skip the query if personalInfoId is falsy
      client: client, // Explicitly pass the Apollo Client instance if not globally available via ApolloProvider
    });

  // Log to see if the query is being executed and with what variable
  console.log(`Querying for personalInfoId: ${personalInfoId}`);

  // Log the loading state
  if (loading) {
    console.log('Loading personal information...');
    return <div>Loading...</div>;
  }

  // Log any errors encountered during the query
  if (error) {
    console.error('Error fetching personal information:', error.message);
    return <div>Error! {error.message}</div>;
  }

  // Log the received data
  console.log('Received data:', data);

  return (
    <div>
      {data && data.getPersonalInformation ? (
        <div>
          {/* Display the personal information */}
          <h3>Personal Information</h3>
          <p>Name: {data.getPersonalInformation.firstName} {data.getPersonalInformation.middleName} {data.getPersonalInformation.lastName}</p>
          <p>Date of Birth: {data.getPersonalInformation.dateOfBirth}</p>
          <p>Age: {data.getPersonalInformation.age}</p>
          <p>SSN: {data.getPersonalInformation.ssn}</p>
          <p>Driver's License or ID Number: {data.getPersonalInformation.dlOrIdNumber}</p>
          <p>State Issued: {data.getPersonalInformation.stateIssued}</p>
          <p>Revoked or Suspended Date: {data.getPersonalInformation.revokedOrSuspendedDate}</p>
          <p>Address: {data.getPersonalInformation.address}</p>
          <p>City, State, Zip: {data.getPersonalInformation.cityStateZip}</p>
          <p>Home Phone: {data.getPersonalInformation.homePhone}</p>
          <p>Work Phone: {data.getPersonalInformation.workPhone}</p>
          <p>Gender: {data.getPersonalInformation.gender}</p>
          <p>Race: {data.getPersonalInformation.race}</p>
          <p>Nationality: {data.getPersonalInformation.nationality}</p>
          <p>Marital Status: {data.getPersonalInformation.maritalStatus}</p>
          <p>US Citizen: {data.getPersonalInformation.usCitizen}</p>
          <p>Residency Number: {data.getPersonalInformation.residencyNumber}</p>
          <p>Primary Language Spoken: {data.getPersonalInformation.primaryLanguageSpoken}</p>
          <p>Referred By: {data.getPersonalInformation.referredBy}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div>No personal information found.</div>
      )}
    </div>
  );
  
};

export default PersonalInformation;
