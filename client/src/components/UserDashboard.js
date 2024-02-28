import React from 'react';
import PersonalInformation from './PersonalInformation';

const UserDashboard = () => {
    return (
        <div>
            <h1>User Dashboard</h1>
            <PersonalInformation userId={'your-user-id-here'} />
        </div>
    );
};

export default UserDashboard;
