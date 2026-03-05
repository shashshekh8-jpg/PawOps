const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include', // Mandated to resolve SameSite cookie drop [cite: 2, 3]
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error("API call failed");
    return res.json();
  },
  post: async (endpoint: string, data: any) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include', // Ensures session tokens are transmitted cross-domain [cite: 2, 3]
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("POST failed");
    return res.json();
  }
};

export default api;

