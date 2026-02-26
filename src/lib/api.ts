/**
 * Public API client for Imvision frontend.
 * Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:5000 for backend).
 */

const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginatedData<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

/** Content item shape from backend (inspirations, rentals, sales, services) */
export type ContentItem = {
  _id: string;
  heading: { en: string; sv: string };
  subHeading: { en: string; sv: string };
  media: string;
  mediaType: "image" | "video";
  createdAt?: string;
  updatedAt?: string;
};

export const api = {
  baseUrl: getBaseUrl(),

  async submitContact(body: {
    company: string;
    name: string;
    email: string;
    countryCode?: string;
    phone: string;
    message: string;
    contactType?: "SALES" | "RENTALS" | "SUPPORT" | "OTHER";
  }): Promise<ApiResponse<unknown>> {
    const res = await fetch(`${this.baseUrl}/api/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Contact submission failed");
    return data;
  },

  async submitSupport(formData: FormData): Promise<ApiResponse<unknown>> {
    const res = await fetch(`${this.baseUrl}/api/public/support`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Support ticket submission failed");
    return data;
  },

  async getInspirations(params?: { page?: number; limit?: number }) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    const res = await fetch(`${this.baseUrl}/api/public/inspirations?${q}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch inspirations");
    return data as ApiResponse<PaginatedData<ContentItem>>;
  },

  async getRentals(params?: { page?: number; limit?: number }) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    const res = await fetch(`${this.baseUrl}/api/public/rentals?${q}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch rentals");
    return data as ApiResponse<PaginatedData<ContentItem>>;
  },

  async getSales(params?: { page?: number; limit?: number }) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    const res = await fetch(`${this.baseUrl}/api/public/sales?${q}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch sales");
    return data as ApiResponse<PaginatedData<ContentItem>>;
  },

  async getServices(params?: { page?: number; limit?: number }) {
    const q = new URLSearchParams();
    if (params?.page != null) q.set("page", String(params.page));
    if (params?.limit != null) q.set("limit", String(params.limit));
    const res = await fetch(`${this.baseUrl}/api/public/services?${q}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch services");
    return data as ApiResponse<PaginatedData<ContentItem>>;
  },
};
