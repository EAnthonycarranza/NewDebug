import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERSONAL_INFORMATION_BY_ID } from '../utils/queries';

const PersonalInformation = () => {
  const [personalInfoId, setPersonalInfoId] = useState(localStorage.getItem('personalInfoId'));

  useEffect(() => {
    // Update component state if the ID in localStorage changes
    const handleStorageChange = () => {
      const updatedId = localStorage.getItem('personalInfoId');
      setPersonalInfoId(updatedId);
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Use the personalInfoId state for the query, ensuring it's not undefined
  const { loading, error, data } = useQuery(GET_PERSONAL_INFORMATION_BY_ID, {
    variables: { infoId: personalInfoId },
    skip: !personalInfoId, // Skip the query if personalInfoId is falsy
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div>
      {data && data.getPersonalInformation ? (
        <div>
          {/* Display the personal information */}
          <p>Name: {data.getPersonalInformation.firstName} {data.getPersonalInformation.lastName}</p>
          {/* Display other personal information fields */}
        </div>
      ) : (
        <div>No personal information found.</div>
      )}
    </div>
  );
};

export default PersonalInformation;
