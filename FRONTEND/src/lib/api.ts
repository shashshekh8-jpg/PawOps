const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Intercept unauthorized requests and force logout
    if (res.status === 401 || res.status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pawzz_auth');
        window.location.href = '/login';
      }
      throw new Error("Unauthorized");
    }
    
    if (!res.ok) throw new Error("API call failed");
    return res.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Intercept unauthorized requests and force logout
    if (res.status === 401 || res.status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pawzz_auth');
        window.location.href = '/login';
      }
      throw new Error("Unauthorized");
    }

    if (!res.ok) throw new Error("POST failed");
    return res.json();
  }
};

export default api;
