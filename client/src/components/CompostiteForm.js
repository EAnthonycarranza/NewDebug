import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_PERSONAL_INFORMATION } from '../utils/mutations';
import client from '../utils/api'; // Import the Apollo Client instance

const CompositeForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        // Initial form state setup
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

    // This useEffect is fine for logging purposes but it doesn't impact your mutation
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token upon component mount:", token);
    }, []);

    const [createPersonalInformation, { error }] = useMutation(CREATE_PERSONAL_INFORMATION, {
        onCompleted: (data) => {
            // Navigate or perform actions after the mutation completes
            navigate(`/personalinformation/${data.createPersonalInformation.id}`);
        },
        onError: (error) => {
            console.error("Error creating personal information:", error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Log the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Token before making mutation call:", token);
    
        // Proceed with the mutation
        createPersonalInformation({ variables: { personalInfo: formState } });
    };
    

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(formState).map((key) => (
                <div key={key} className="form-group">
                    <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</label>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        value={formState[key]}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
            {error && <p className="text-danger">An error occurred.</p>}
        </form>
    );
};

export default CompositeForm;
