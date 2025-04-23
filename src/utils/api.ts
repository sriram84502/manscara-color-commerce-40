
const BASE_URL = "https://mascara-api.onrender.com";

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const token = localStorage.getItem("manscara_token");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return apiCall("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },
    signup: async (userData: { name: string; email: string; phone: string; password: string }) => {
      return apiCall("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });
    },
    resetPasswordSendOTP: async (phone: string) => {
      return apiCall("/api/auth/reset/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
      });
    },
    resetPasswordVerifyOTP: async (phone: string, otp: string, newPassword: string) => {
      return apiCall("/api/auth/reset/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp, newPassword }),
      });
    },
  },
  orders: {
    create: async (orderData: any) => {
      return apiCall("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });
    },
    getHistory: async () => {
      return apiCall("/api/orders/history");
    },
    getById: async (orderId: string) => {
      return apiCall(`/api/orders/${orderId}`);
    },
  },
  payments: {
    createOrder: async (amount: number, currency = "INR") => {
      return apiCall("/api/payments/create-order", {
        method: "POST",
        body: JSON.stringify({ amount, currency }),
      });
    },
    verifyPayment: async (paymentData: any) => {
      return apiCall("/api/payments/verify", {
        method: "POST",
        body: JSON.stringify(paymentData),
      });
    },
  },
};

export default api;
