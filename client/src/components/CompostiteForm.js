import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_PERSONAL_INFORMATION } from '../utils/mutations';

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

    const [createPersonalInformation, { error }] = useMutation(CREATE_PERSONAL_INFORMATION, {
        onCompleted: (data) => {
            // Assuming your schema exposes the MongoDB _id as id
            const createdId = data.createPersonalInformation.id; 
            navigate(`/personalinformation/${createdId}`);
        },
        onError: (error) => {
            console.error("Error creating personal information:", error);
        }
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
