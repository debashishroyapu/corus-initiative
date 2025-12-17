// api.ts - Complete version with all APIs (Fixed)
import axios from "axios";
import { 
  fallbackMenus, 
  fallbackSolutions, 
  fallbackIndustries, 
  fallbackBlogs, 
  fallbackCaseStudies 
} from './data';

// ✅ Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
  timeout: 30000,
});

// ✅ Request interceptor
api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    try {
      // Only use Firebase token for authenticated requests
      if (config.url?.includes('/admin')) {
        const { auth } = await import("./firebase");
        const currentUser = auth.currentUser;
        
        if (currentUser) {
          const token = await currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.error("Failed to attach token:", err);
    }
  }
  return config;
});

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();
    
    console.error(`API Error - ${method} ${url}:`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    if (error.response?.status === 401) {
      console.log("Unauthorized - Check authentication");
    }

    return Promise.reject(error);
  }
);

// ✅ Safe API helpers
async function safeGet<T>(url: string): Promise<T> {
  try {
    const res = await api.get<T>(url);
    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    console.error(`GET ${url} failed:`, errorMessage);
    throw new Error(errorMessage);
  }
}

async function safePost<T>(url: string, data?: any): Promise<T> {
  try {
    const res = await api.post<T>(url, data);
    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    console.error(`POST ${url} failed:`, errorMessage);
    throw new Error(errorMessage);
  }
}

async function safePut<T>(url: string, data?: any): Promise<T> {
  try {
    const res = await api.put<T>(url, data);
    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    console.error(`PUT ${url} failed:`, errorMessage);
    throw new Error(errorMessage);
  }
}

async function safeDelete<T>(url: string): Promise<T> {
  try {
    const res = await api.delete<T>(url);
    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    console.error(`DELETE ${url} failed:`, errorMessage);
    throw new Error(errorMessage);
  }
}

async function safePatch<T>(url: string, data?: any): Promise<T> {
  try {
    const res = await api.patch<T>(url, data);
    return res.data;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    console.error(`PATCH ${url} failed:`, errorMessage);
    throw new Error(errorMessage);
  }
}

// ========== PUBLIC APIS ==========

// -------- Common Interfaces --------
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// -------- Menu APIs --------
export interface MenuItem {
  label: string;
  href: string;
  slug: string;
  description?: string;
}

export interface MenuGroup {
  _id?: string;
  slug: string;
  title: string;
  items: MenuItem[];
  createdAt?: string;
  updatedAt?: string;
}

export const fetchMenus = async (): Promise<MenuGroup[]> => {
  try {
    const response = await safeGet<any>("/api/menus");
    
    // Handle different response formats
    let menusData: MenuGroup[] = [];
    
    if (Array.isArray(response)) {
      menusData = response;
    } else if (response?.success && response?.data) {
      menusData = response.data;
    } else if (response?.menus) {
      menusData = response.menus;
    }
    
    if (menusData.length === 0) {
      console.log('Using fallback menus data');
      return fallbackMenus.map(menu => ({
        ...menu,
        _id: `menu-${menu.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    return menusData;
  } catch (error) {
    console.error('Error fetching menus, using fallback:', error);
    return fallbackMenus.map(menu => ({
      ...menu,
      _id: `menu-${menu.slug}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
};

// -------- Solutions APIs --------
export interface SolutionStep {
  title: string;
  description: string;
}

export interface Solution {
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  workflow?: SolutionStep[];
  expertise?: SolutionStep[];
  deliverables?: { item: string; description: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export const fetchSolutions = async (): Promise<Solution[]> => {
  try {
    const response = await safeGet<any>("/api/menus/solutions/items");
    
    let solutionsData: Solution[] = [];
    
    if (Array.isArray(response)) {
      solutionsData = response;
    } else if (response?.success && response?.data) {
      solutionsData = response.data;
    } else if (response?.solutions) {
      solutionsData = response.solutions;
    }
    
    if (solutionsData.length === 0) {
      console.log('Using fallback solutions data');
      return fallbackSolutions.map(solution => ({
        ...solution,
        _id: `solution-${solution.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    return solutionsData;
  } catch (error) {
    console.error('Error fetching solutions, using fallback:', error);
    return fallbackSolutions.map(solution => ({
      ...solution,
      _id: `solution-${solution.slug}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
};

export const fetchSolutionBySlug = async (slug: string): Promise<Solution> => {
  try {
    const response = await safeGet<any>(`/api/menus/solutions/items/${slug}`);
    
    if (response?.success && response?.data) {
      return response.data;
    }
    // Find in fallback
    const fallbackSolution = fallbackSolutions.find(s => s.slug === slug);
    if (fallbackSolution) {
      return {
        ...fallbackSolution,
        _id: `solution-${fallbackSolution.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw new Error('Solution not found');
  } catch (error) {
    console.error(`Error fetching solution ${slug}, checking fallback:`, error);
    const fallbackSolution = fallbackSolutions.find(s => s.slug === slug);
    if (fallbackSolution) {
      return {
        ...fallbackSolution,
        _id: `solution-${fallbackSolution.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw error;
  }
};

// -------- Industries APIs --------
export interface Industry {
  _id?: string;
  slug: string;
  title: string;
  overview?: string;
  challenges?: { title: string; description: string }[];
  solutions?: { title: string; description: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export const fetchIndustries = async (): Promise<Industry[]> => {
  try {
    const response = await safeGet<any>("/api/menus/industries/items");
    
    let industriesData: Industry[] = [];
    
    if (Array.isArray(response)) {
      industriesData = response;
    } else if (response?.success && response?.data) {
      industriesData = response.data;
    } else if (response?.industries) {
      industriesData = response.industries;
    }
    
    if (industriesData.length === 0) {
      console.log('Using fallback industries data');
      return fallbackIndustries.map(industry => ({
        ...industry,
        _id: `industry-${industry.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    return industriesData;
  } catch (error) {
    console.error('Error fetching industries, using fallback:', error);
    return fallbackIndustries.map(industry => ({
      ...industry,
      _id: `industry-${industry.slug}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
};

export const fetchIndustryBySlug = async (slug: string): Promise<Industry> => {
  try {
    const response = await safeGet<any>(`/api/menus/industries/items/${slug}`);
    
    if (response?.success && response?.data) {
      return response.data;
    }
    // Find in fallback
    const fallbackIndustry = fallbackIndustries.find(i => i.slug === slug);
    if (fallbackIndustry) {
      return {
        ...fallbackIndustry,
        _id: `industry-${fallbackIndustry.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw new Error('Industry not found');
  } catch (error) {
    console.error(`Error fetching industry ${slug}, checking fallback:`, error);
    const fallbackIndustry = fallbackIndustries.find(i => i.slug === slug);
    if (fallbackIndustry) {
      return {
        ...fallbackIndustry,
        _id: `industry-${fallbackIndustry.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw error;
  }
};

// -------- Blog APIs --------
export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  author?: string;
  createdAt?: string;
  publishedAt?: string;
  image?: string;
  contentHtml?: string;
  category?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  readTime?: number;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await safeGet<any>("/api/blogs");
    
    let blogsData: Blog[] = [];
    
    if (Array.isArray(response)) {
      blogsData = response;
    } else if (response?.success && response?.data) {
      blogsData = response.data;
    } else if (response?.blogs) {
      blogsData = response.blogs;
    }
    
    if (blogsData.length === 0) {
      console.log('Using fallback blogs data');
      return fallbackBlogs.map((blog, index) => ({
        ...blog,
        _id: `blog-${blog.slug || index}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: blog.publishedAt || new Date().toISOString()
      }));
    }
    
    return blogsData;
  } catch (error) {
    console.error('Error fetching blogs, using fallback:', error);
    return fallbackBlogs.map((blog, index) => ({
      ...blog,
      _id: `blog-${blog.slug || index}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: blog.publishedAt || new Date().toISOString()
    }));
  }
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  try {
    const response = await safeGet<any>(`/api/blogs/${slug}`);
    
    if (response?.success && response?.data) {
      return response.data;
    }
    // Find in fallback
    const fallbackBlog = fallbackBlogs.find(b => b.slug === slug);
    if (fallbackBlog) {
      return {
        ...fallbackBlog,
        _id: `blog-${fallbackBlog.slug}`,
        createdAt: new Date().toISOString(),
        publishedAt: fallbackBlog.publishedAt || new Date().toISOString()
      };
    }
    throw new Error('Blog not found');
  } catch (error) {
    console.error(`Error fetching blog ${slug}, checking fallback:`, error);
    const fallbackBlog = fallbackBlogs.find(b => b.slug === slug);
    if (fallbackBlog) {
      return {
        ...fallbackBlog,
        _id: `blog-${fallbackBlog.slug}`,
        createdAt: new Date().toISOString(),
        publishedAt: fallbackBlog.publishedAt || new Date().toISOString()
      };
    }
    throw error;
  }
};

// -------- Case Studies APIs --------
export interface CaseStudy {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  results?: string;
  image?: string;
  industry?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  status?: 'draft' | 'published';
  projectDuration?: string;
  teamSize?: number;
  budget?: number;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export const fetchCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const response = await safeGet<any>("/api/case-studies");
    
    let caseStudiesData: CaseStudy[] = [];
    
    if (Array.isArray(response)) {
      caseStudiesData = response;
    } else if (response?.success && response?.data) {
      caseStudiesData = response.data;
    } else if (response?.caseStudies) {
      caseStudiesData = response.caseStudies;
    }
    
    if (caseStudiesData.length === 0) {
      console.log('Using fallback case studies data');
      return fallbackCaseStudies.map((caseStudy, index) => ({
        ...caseStudy,
        _id: `case-study-${caseStudy.slug || index}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    return caseStudiesData;
  } catch (error) {
    console.error('Error fetching case studies, using fallback:', error);
    return fallbackCaseStudies.map((caseStudy, index) => ({
      ...caseStudy,
      _id: `case-study-${caseStudy.slug || index}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
};

export const fetchCaseStudyBySlug = async (slug: string): Promise<CaseStudy> => {
  try {
    const response = await safeGet<any>(`/api/case-studies/${slug}`);
    
    if (response?.success && response?.data) {
      return response.data;
    }
    // Find in fallback
    const fallbackCaseStudy = fallbackCaseStudies.find(c => c.slug === slug);
    if (fallbackCaseStudy) {
      return {
        ...fallbackCaseStudy,
        _id: `case-study-${fallbackCaseStudy.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw new Error('Case study not found');
  } catch (error) {
    console.error(`Error fetching case study ${slug}, checking fallback:`, error);
    const fallbackCaseStudy = fallbackCaseStudies.find(c => c.slug === slug);
    if (fallbackCaseStudy) {
      return {
        ...fallbackCaseStudy,
        _id: `case-study-${fallbackCaseStudy.slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    throw error;
  }
};

// -------- Consultation APIs (Public) --------
export interface Consultation {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateConsultationData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export const createConsultation = (data: CreateConsultationData): Promise<ApiResponse<Consultation>> => 
  safePost("/api/consultations", data);

// -------- Schedule APIs (Public) --------
export interface Schedule {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meetingType: 'consultation' | 'demo' | 'technical' | 'sales' | 'other';
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  meetingLink?: string;
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateScheduleData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meetingType: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
}

export const createSchedule = (data: CreateScheduleData): Promise<ApiResponse<Schedule>> => 
  safePost("/api/schedules", data);

// -------- Newsletter Subscription --------
export interface NewsletterSubscriber {
  _id?: string;
  email: string;
  name?: string;
  isActive: boolean;
  subscribedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNewsletterData {
  email: string;
  name?: string;
}

export interface SubscriberStats {
  totalSubscribers: number;
  activeSubscribers: number;
  todaySubscribers: number;
}

// Public newsletter subscription
export const subscribeNewsletter = (data: CreateNewsletterData): Promise<ApiResponse<NewsletterSubscriber>> => 
  safePost("/api/newsletter/subscribe", data);

// -------- Consent APIs (Public) --------
export interface ConsentRecord {
  _id?: string;
  consent: boolean;
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsentStats {
  total: number;
  accepted: number;
  declined: number;
  acceptanceRate: string;
  dailyBreakdown: {
    _id: string;
    accepted: number;
    declined: number;
    total: number;
  }[];
}

export interface ConsentPagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
}

// Public Consent API
export const recordConsent = (data: {
  consent: boolean;
  timestamp: string;
  userAgent: string;
}): Promise<ApiResponse> =>
  safePost("/api/consent", data);

// ========== ADMIN APIS ==========

// -------- Admin Auth --------
export interface AdminUser {
  uid: string;
  email: string;
  role: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  admin?: AdminUser;
}

export const adminLogin = async (email: string, password: string): Promise<AdminLoginResponse> => {
  try {
    const { auth } = await import("./firebase");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    
    // Verify admin role with backend
    const response = await api.post("/api/auth/login", { idToken: token });
    const result = response.data;
    
    if (!result.success) {
      throw new Error(result.message || 'Admin access denied');
    }

    return {
      success: true,
      message: "Admin login successful",
      admin: result.admin
    };
  } catch (error: any) {
    console.error("Admin login error:", error);
    return {
      success: false,
      message: error.message || "Login failed"
    };
  }
};

export const adminLogout = async (): Promise<ApiResponse> => {
  try {
    const { auth } = await import("./firebase");
    const { signOut } = await import("firebase/auth");
    
    await signOut(auth);
    
    return {
      success: true,
      message: "Logout successful"
    };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: error.message || "Logout failed"
    };
  }
};

export const verifyAdmin = async (): Promise<{success: boolean; admin: any}> => {
  try {
    const { auth } = await import("./firebase");
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return { success: false, admin: null };
    }
    
    const token = await currentUser.getIdToken();
    const response = await api.post("/api/auth/verify", { idToken: token });
    return response.data;
  } catch (error) {
    console.error("Verify admin error:", error);
    return { success: false, admin: null };
  }
};

// -------- Dashboard Summary --------
export interface DashboardSummary {
  totalRevenue: number;
  totalClients: number;
  activeProjects: number;
  pendingConsultations: number;
  upcomingMeetings: number;
  recentActivities: any[];
}

export const fetchDashboardSummary = (): Promise<ApiResponse<DashboardSummary>> => 
  safeGet("/api/admin/dashboard/summary");

// -------- Project Management --------
export interface Project {
  _id?: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  team: string[];
  description: string;
  technologies: string[];
  deliverables: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectData {
  name: string;
  client: string;
  status?: string;
  priority?: string;
  startDate: string;
  endDate: string;
  budget?: number;
  spent?: number;
  progress?: number;
  team?: string[];
  description?: string;
  technologies?: string[];
  deliverables?: string[];
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export const fetchProjects = (): Promise<ApiResponse<Project[]>> => 
  safeGet("/api/admin/projects");

export const fetchProjectById = (id: string): Promise<ApiResponse<Project>> => 
  safeGet(`/api/admin/projects/${id}`);

export const createProject = (data: CreateProjectData): Promise<ApiResponse<Project>> => 
  safePost("/api/admin/projects", data);

export const updateProject = (id: string, data: UpdateProjectData): Promise<ApiResponse<Project>> => 
  safePut(`/api/admin/projects/${id}`, data);

export const deleteProject = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/projects/${id}`);

// -------- Client Management --------
export interface Client {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  status: 'active' | 'inactive' | 'lead';
  totalProjects: number;
  totalRevenue: number;
  lastContact: string;
  joinDate: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClientData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  status?: string;
  totalProjects?: number;
  totalRevenue?: number;
  notes?: string;
}

export interface UpdateClientData extends Partial<CreateClientData> {}

export const fetchClients = (): Promise<ApiResponse<Client[]>> => 
  safeGet("/api/admin/clients");

export const fetchClientById = (id: string): Promise<ApiResponse<Client>> => 
  safeGet(`/api/admin/clients/${id}`);

export const createClient = (data: CreateClientData): Promise<ApiResponse<Client>> => 
  safePost("/api/admin/clients", data);

export const updateClient = (id: string, data: UpdateClientData): Promise<ApiResponse<Client>> => 
  safePut(`/api/admin/clients/${id}`, data);

export const deleteClient = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/clients/${id}`);

// -------- Team Management --------
export interface TeamMember {
  _id?: string;
  name: string;
  email: string;
  role: string;
  department: string;
  position: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  skills: string[];
  projects: string[];
  performance: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeamMemberData {
  name: string;
  email: string;
  role: string;
  department: string;
  position: string;
  phone?: string;
  avatar?: string;
  status?: string;
  skills?: string[];
  projects?: string[];
  performance?: number;
}

export interface UpdateTeamMemberData extends Partial<CreateTeamMemberData> {}

export const fetchTeamMembers = (): Promise<ApiResponse<TeamMember[]>> => 
  safeGet("/api/admin/team");

export const fetchTeamMemberById = (id: string): Promise<ApiResponse<TeamMember>> => 
  safeGet(`/api/admin/team/${id}`);

export const createTeamMember = (data: CreateTeamMemberData): Promise<ApiResponse<TeamMember>> => 
  safePost("/api/admin/team", data);

export const updateTeamMember = (id: string, data: UpdateTeamMemberData): Promise<ApiResponse<TeamMember>> => 
  safePut(`/api/admin/team/${id}`, data);

export const deleteTeamMember = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/team/${id}`);

// -------- Financial Analytics --------
export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalClients: number;
  activeProjects: number;
  completedProjects: number;
  profitMargin: number;
}

export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export interface ExpenseBreakdown {
  category: string;
  amount: number;
}

export interface ClientGrowth {
  month: string;
  count: number;
}

export interface TopClient {
  client: string;
  revenue: number;
}

export interface ProjectPerformance {
  status: string;
  count: number;
}

export interface FinancialData {
  summary: FinancialSummary;
  revenueByMonth: RevenueByMonth[];
  expenseBreakdown: ExpenseBreakdown[];
  clientGrowth: ClientGrowth[];
  topClients: TopClient[];
  projectPerformance: ProjectPerformance[];
}

export const fetchFinancialData = (dateRange: string = 'monthly'): Promise<ApiResponse<FinancialData>> => 
  safeGet(`/api/admin/financial?dateRange=${dateRange}`);

// -------- Consent Admin APIs --------
export const fetchConsentStats = (range: string = 'all'): Promise<ApiResponse<ConsentStats>> =>
  safeGet(`/api/admin/consent/stats?range=${range}`);

export const fetchConsentRecords = (
  page: number = 1, 
  limit: number = 20
): Promise<ApiResponse<{
  records: ConsentRecord[];
  pagination: ConsentPagination;
}>> =>
  safeGet(`/api/admin/consent/records?page=${page}&limit=${limit}`);

export const deleteConsentRecord = (id: string): Promise<ApiResponse> =>
  safeDelete(`/api/admin/consent/records/${id}`);

export const exportConsentData = (format: 'csv' | 'excel' = 'csv'): Promise<Blob> =>
  api.get(`/api/admin/consent/export?format=${format}`, { responseType: 'blob' });

// -------- Consultation Admin APIs --------
export const fetchAdminConsultations = (): Promise<ApiResponse<Consultation[]>> =>
  safeGet("/api/admin/consultations");

export const updateConsultationStatus = (id: string, status: string): Promise<ApiResponse<Consultation>> =>
  safePut(`/api/admin/consultations/${id}`, { status });

export const deleteConsultation = (id: string): Promise<ApiResponse> =>
  safeDelete(`/api/admin/consultations/${id}`);

// -------- Schedule Admin APIs --------
export interface UpdateScheduleData {
  status: string;
  meetingLink?: string;
  adminNotes?: string;
}

export const fetchAdminSchedules = (status?: string): Promise<ApiResponse<Schedule[]>> => {
  const url = status && status !== 'all' 
    ? `/api/admin/schedules?status=${status}`
    : '/api/admin/schedules';
  return safeGet(url);
};

export const updateAdminScheduleStatus = (id: string, data: UpdateScheduleData): Promise<ApiResponse<Schedule>> => 
  safePut(`/api/admin/schedules/${id}`, data);

export const deleteAdminSchedule = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/schedules/${id}`);

// -------- Newsletter Admin APIs --------
export const getSubscribers = (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<ApiResponse<NewsletterSubscriber[]>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search })
  });
  
  return safeGet(`/api/admin/newsletter/subscribers?${params}`);
};

export const deleteSubscriber = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/newsletter/subscribers/${id}`);

export const getSubscriberStats = (): Promise<ApiResponse<SubscriberStats>> => 
  safeGet('/api/admin/newsletter/subscribers/stats');

// -------- Activity APIs --------
export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
  user?: string;
  priority: string;
  isRead: boolean;
}

export const fetchRecentActivities = (): Promise<ApiResponse<Activity[]>> => 
  safeGet("/api/admin/activities/recent");

export const fetchAllActivities = (
  page: number = 1, 
  limit: number = 20, 
  type?: string
): Promise<ApiResponse<Activity[]>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(type && type !== 'all' && { type })
  });
  
  return safeGet(`/api/admin/activities?${params}`);
};

export const fetchUnreadActivitiesCount = (): Promise<ApiResponse<{ count: number }>> => 
  safeGet("/api/admin/activities/unread/count");

export const markActivityAsRead = (id: string): Promise<ApiResponse<Activity>> => 
  safePut(`/api/admin/activities/${id}/read`, {});

export const markAllActivitiesAsRead = (): Promise<ApiResponse> => 
  safePut("/api/admin/activities/read-all", {});

// -------- Content Management (Solutions Admin) --------
export interface CreateSolutionData {
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  workflow?: SolutionStep[];
  expertise?: SolutionStep[];
  deliverables?: { item: string; description: string }[];
}

export interface UpdateSolutionData extends Partial<CreateSolutionData> {}

export const fetchAdminSolutions = (): Promise<ApiResponse<Solution[]>> => 
  safeGet("/api/admin/solutions");

export const createSolution = (data: CreateSolutionData): Promise<ApiResponse<Solution>> => 
  safePost("/api/admin/solutions", data);

export const updateSolution = (id: string, data: UpdateSolutionData): Promise<ApiResponse<Solution>> => 
  safePut(`/api/admin/solutions/${id}`, data);

export const deleteSolution = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/solutions/${id}`);

// -------- Content Management (Industries Admin) --------
export interface CreateIndustryData {
  title: string;
  slug: string;
  overview?: string;
  challenges?: { title: string; description: string }[];
  solutions?: { title: string; description: string }[];
}

export interface UpdateIndustryData extends Partial<CreateIndustryData> {}

export const fetchAdminIndustries = (): Promise<ApiResponse<Industry[]>> => 
  safeGet("/api/admin/industries");

export const createIndustry = (data: CreateIndustryData): Promise<ApiResponse<Industry>> => 
  safePost("/api/admin/industries", data);

export const updateIndustry = (id: string, data: UpdateIndustryData): Promise<ApiResponse<Industry>> => 
  safePut(`/api/admin/industries/${id}`, data);

export const deleteIndustry = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/industries/${id}`);

// -------- Blog Admin APIs --------
export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentHtml: string;
  image?: string;
  author?: string;
  category?: string;
  status?: 'draft' | 'published';
  tags?: string[];
}

export interface UpdateBlogData extends Partial<CreateBlogData> {}

export const fetchAdminBlogs = (): Promise<ApiResponse<Blog[]>> => 
  safeGet("/api/admin/blogs");

export const createBlogPost = (data: CreateBlogData): Promise<ApiResponse<Blog>> => 
  safePost("/api/admin/blogs", data);

export const updateBlogPost = (id: string, data: UpdateBlogData): Promise<ApiResponse<Blog>> => 
  safePut(`/api/admin/blogs/${id}`, data);

export const deleteBlogPost = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/blogs/${id}`);

// -------- Case Study Admin APIs --------
export interface CreateCaseStudyData {
  title: string;
  slug: string;
  description?: string;
  results?: string;
  image?: string;
  industry?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
  status?: 'draft' | 'published';
  projectDuration?: string;
  teamSize?: number;
  budget?: number;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  gallery?: string[];
}

export interface UpdateCaseStudyData extends Partial<CreateCaseStudyData> {}

export const fetchAdminCaseStudies = (): Promise<ApiResponse<CaseStudy[]>> => 
  safeGet("/api/admin/case-studies");

export const createCaseStudy = (data: CreateCaseStudyData): Promise<ApiResponse<CaseStudy>> => 
  safePost("/api/admin/case-studies", data);

export const updateCaseStudy = (id: string, data: UpdateCaseStudyData): Promise<ApiResponse<CaseStudy>> => 
  safePut(`/api/admin/case-studies/${id}`, data);

export const deleteCaseStudy = (id: string): Promise<ApiResponse> => 
  safeDelete(`/api/admin/case-studies/${id}`);

// -------- Export Management APIs --------
export const exportData = (type: 'projects' | 'clients' | 'financial' | 'blogs' | 'case-studies', format: 'pdf' | 'csv' | 'excel'): Promise<Blob> => 
  api.get(`/api/admin/export/${type}?format=${format}`, { responseType: 'blob' });

// -------- Report APIs --------
export const sendWeeklyReport = (): Promise<ApiResponse> => 
  safePost("/api/admin/reports/weekly", {});

export const sendMonthlyReport = (): Promise<ApiResponse> => 
  safePost("/api/admin/reports/monthly", {});

// -------- Stats APIs --------
export interface StatsData {
  _id?: string;
  happyClients: number;
  projectsDone: number;
  clientSatisfaction: number;
  totalRevenue: number;
  lastUpdated: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateStatsData {
  happyClients?: number;
  projectsDone?: number;
  clientSatisfaction?: number;
  totalRevenue?: number;
}

// Get stats (Public)
export const getStats = (): Promise<ApiResponse<StatsData>> => 
  safeGet("/api/stats");

// Update stats (Admin only)
export const updateStats = (data: UpdateStatsData): Promise<ApiResponse<StatsData>> => 
  safePut("/api/admin/stats/update", data);

// Simulate new order (Admin only) - For testing
export const simulateNewOrder = (): Promise<ApiResponse<StatsData>> => 
  safePost("/api/admin/stats/simulate-order", {});

// Export the safe functions
export { safeGet, safePost, safePut, safeDelete, safePatch };

export default api;