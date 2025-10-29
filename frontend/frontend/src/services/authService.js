// Authentication service for handling login/logout
// DEMO MODE: Works without backend authentication

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  async login(credentials) {
    // DEMO MODE: Accept any email/password combination
    // In production, this would call your backend API
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, accept any credentials
    this.token = 'demo-token-' + Date.now();
    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify({ 
      email: credentials.email,
      name: credentials.email.split('@')[0] // Use email prefix as name
    }));
    
    return {
      user: { 
        email: credentials.email,
        name: credentials.email.split('@')[0]
      },
      token: this.token
    };
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
}

export const authService = new AuthService();