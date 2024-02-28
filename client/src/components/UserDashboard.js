import React from 'react';
import PersonalInformation from './PersonalInformaion'; // Ensure the correct file name
import { useParams } from 'react-router-dom';

function UserDashboard() {
    // Use useParams to dynamically get the userId from the route parameters
    const { userId } = useParams();
    // Use the userId value here for fetching data or any other purposes
    console.log(userId); // This will log the dynamic userId to the console
  
    return (
      <div>
        {/* Display the dashboard content using the dynamic userId */}
        Dashboard content for user ID: {userId}
        <PersonalInformation personalInfoId={userId} />

      </div>
    );
}

export default UserDashboard;
