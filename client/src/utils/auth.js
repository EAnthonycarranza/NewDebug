import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    let decoded = null; // Define decoded here with a default value

    try {
        
      const token = this.getToken();
      console.log("Token:", token); // Add this line for debugging
      if (!token) return null;

      decoded = jwtDecode(token);// Assign a value to decoded
      console.log("Decoded Token:", decoded); // Add this line for debugging
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }

    return decoded; // Return the decoded token
  }
  
  isAdmin() {
    const profile = this.getProfile();
    return profile?.isAdmin || false; // Assuming the token includes an 'isAdmin' field
  }
  
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const decoded = jwtDecode(token); // Use 'decoded' here
      const currentTime = Date.now() / 1000;
  
      if (decoded.exp && decoded.exp < currentTime) { // Use 'decoded' instead of 'decodedToken'
        console.log("Token has expired");
        return false;
      } else {
        console.log("Token is valid");
        return true;
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return false;
    }
  }  

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();