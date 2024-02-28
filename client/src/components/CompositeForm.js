import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PERSONAL_INFORMATION } from '../utils/mutations';

const CompositeForm = () => {
  const [formState, setFormState] = useState({
    date: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    age: '',
    ssn: '',
    dlOrIdNumber: '',
    stateIssued: '',
    revokedOrSuspendedDate: '',
    address: '',
    cityStateZip: '',
    homePhone: '',
    workPhone: '',
    gender: '',
    race: '',
    nationality: '',
    maritalStatus: '',
    usCitizen: '',
    residencyNumber: '',
    primaryLanguageSpoken: '',
    referredBy: ''
  });

  const [createPersonalInformation, { error }] = useMutation(CREATE_PERSONAL_INFORMATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPersonalInformation({
        variables: { ...formState }
      });
      console.log(data);
    } catch (e) {
      console.error('Error creating personal information:', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CompositeForm;
