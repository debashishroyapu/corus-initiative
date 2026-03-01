import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// =============================================================================
// CORE RESPONSE TYPES
// =============================================================================

/**
 * Standard envelope returned by every backend endpoint.
 * The `data` field is unwrapped automatically by ApiClient's HTTP methods.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =============================================================================
// ENTITY TYPES
// =============================================================================

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  isPublished?: boolean;
  views?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogFilters {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface MenuItem {
  label: string;
  href: string;
  slug: string;
}

export interface Menu {
  _id: string;
  slug: string;
  title: string;
  items: MenuItem[];
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface ExpertiseItem {
  title: string;
  description: string;
  points?: string[];
}

export interface Deliverable {
  item: string;
  description: string;
}

export interface Solution {
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  workflow?: WorkflowStep[];
  expertise?: ExpertiseItem[];
  deliverables?: Deliverable[];
  icon?: string;
  image?: string;
  isActive?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustrySolution {
  title: string;
  description: string;
}

export interface Industry {
  _id: string;
  slug: string;
  title: string;
  overview: string;
  challenges: IndustryChallenge[];
  solutions: IndustrySolution[];
  icon?: string;
  image?: string;
  isActive?: boolean;
  order?: number;
}

export interface CaseStudy {
  _id: string;
  slug: string;
  title: string;
  industry: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  image: string;
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  _id: string;
  yearsOfExperience: number;
  projectsCompleted: number;
  happyClients: number;
  teamMembers: number;
  countriesServed: number;
  awards: number;
  updatedAt: string;
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface NewsletterData {
  email: string;
  name?: string;
}

export interface NewsletterSubscriber extends NewsletterData {
  _id: string;
  isActive: boolean;
  subscribedAt: string;
  preferences?: string[];
}

export type ConsultationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ConsultationData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  status?: ConsultationStatus;
}

export type MeetingType = 'consultation' | 'demo' | 'technical' | 'sales' | 'other';
export type ScheduleStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ScheduleData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meetingType: MeetingType;
  preferredDate: string;
  preferredTime: string;
  timezone?: string;
  message?: string;
}

export interface Schedule extends ScheduleData {
  _id: string;
  status: ScheduleStatus;
  meetingLink?: string;
  adminNotes?: string;
}

export interface RecordConsentInput {
  consent: boolean;
  type?: string;
  email?: string;
  timestamp?: string;
  userAgent?: string;
}

export interface ConsentData {
  consent: boolean;
  type: string;
  email?: string;
  timestamp: string;
  userAgent: string;
}

// =============================================================================
// AUTH TYPES
// =============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthUser {
  _id?: string; // present when Mongoose toJSON transform is absent
  id?: string;  // present when Mongoose toJSON virtuals transform is enabled
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  user: AuthUser;
}

export interface User extends AuthUser {
  permissions?: string[];
}

// =============================================================================
// ADMIN TYPES
// =============================================================================

export type TeamMemberStatus = 'active' | 'inactive' | 'on-leave';

export interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  position: string;
  phone?: string;
  status: TeamMemberStatus;
  joinDate: string;
  skills: string[];
  projects: string[];
  performance?: number;
  avatar?: string;
}

export type ProjectStatus = 'active' | 'planning' | 'completed' | 'on-hold';
export type ProjectPriority = 'high' | 'medium' | 'low';

export interface Project {
  _id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  progress: number;
  team: string[];
  description: string;
  technologies: string[];
  deliverables: string[];
}

export type ClientStatus = 'active' | 'inactive' | 'lead';

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry: string;
  status: ClientStatus;
  totalProjects: number;
  totalRevenue: number;
  lastContact: string;
  joinDate: string;
  notes?: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalProfit: number;
  activeClients: number;
  newClients: number;
  avgProjectValue: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  profit: number;
}

export interface ExpenseDataPoint {
  category: string;
  amount: number;
  color: string;
}

export interface ClientAcquisitionDataPoint {
  month: string;
  newClients: number;
  returning: number;
}

export interface CashFlow {
  inflow: number;
  outflow: number;
  netCashFlow: number;
}

export interface AccountsReceivable {
  current: number;
  overdue: number;
  total: number;
}

export interface Financial {
  _id: string;
  period: string;
  dateRange: string;
  summary: FinancialSummary;
  revenueData: RevenueDataPoint[];
  expenseData: ExpenseDataPoint[];
  clientAcquisitionData: ClientAcquisitionDataPoint[];
  cashFlow: CashFlow;
  accountsReceivable: AccountsReceivable;
  profitMargin: number;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  timestamp: string;
  environment: string;
  version: string;
  uptime: number;
}

export interface ConsentStats {
  summary: {
    totalConsent: number;
    acceptedConsent: number;
    declinedConsent: number;
    acceptanceRate: number;
  };
  trends: Array<{
    date: string;
    accepted: number;
    declined: number;
    total: number;
    acceptanceRate: number;
  }>;
}

export interface SubscriberStats {
  total: number;
  active: number;
  inactive: number;
  recent: number;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

// =============================================================================
// INTERNAL TYPES
// =============================================================================

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

interface QueuedRequest {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}

// =============================================================================
// API CLIENT
// =============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'NEXT_PUBLIC_API_URL=https://corusinitiative.com/api/';

class ApiClient {
  private readonly client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 30_000,
      withCredentials: true,
    });

    this.initInterceptors();
  }

  // ---------------------------------------------------------------------------
  // INTERCEPTORS
  // ---------------------------------------------------------------------------

  private initInterceptors(): void {
  this.client.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        config.params = { ...config.params, _t: Date.now() };
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  this.client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequest;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const isAuthRoute = originalRequest.url?.includes('/auth/');
        if (isAuthRoute) {
          return Promise.reject(this.normalizeError(error));
        }

        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login';
        }
        return Promise.reject(this.normalizeError(error));
      }

      return Promise.reject(this.normalizeError(error));
    },
  );
}
  // ---------------------------------------------------------------------------
  // PRIVATE HELPERS
  // ---------------------------------------------------------------------------

  private async refreshToken(): Promise<void> {
    try {
      await this.client.post<ApiResponse>('/auth/refresh');
    } catch {
      throw new Error('Session expired. Please log in again.');
    }
  }

  private normalizeError(error: AxiosError): Error {
    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      const message =
        (data?.message as string) ||
        (data?.error as string) ||
        `Request failed with status ${error.response.status}`;
      return new Error(message);
    }
    if (error.request) {
      return new Error('Network error. Please check your connection.');
    }
    return new Error(error.message || 'An unexpected error occurred.');
  }

  // ---------------------------------------------------------------------------
  // GENERIC HTTP METHODS
  //
  // All backend responses follow: { success, message, data: <payload> }
  // These methods unwrap response.data.data so callers get the plain payload.
  // ---------------------------------------------------------------------------

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.get<ApiResponse<T>>(url, config);
    return res.data.data as T;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.post<ApiResponse<T>>(url, data, config);
    return res.data.data as T;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.put<ApiResponse<T>>(url, data, config);
    return res.data.data as T;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.patch<ApiResponse<T>>(url, data, config);
    return res.data.data as T;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.client.delete<ApiResponse<T>>(url, config);
    return res.data.data as T;
  }

  // ---------------------------------------------------------------------------
  // SAFE HTTP METHODS — swallow errors, return fallback ?? null
  // ---------------------------------------------------------------------------

  async safeGet<T>(url: string, fallback?: T, config?: AxiosRequestConfig): Promise<T | null> {
    try { return await this.get<T>(url, config); } catch { return fallback ?? null; }
  }

  async safePost<T>(url: string, data?: unknown, fallback?: T, config?: AxiosRequestConfig): Promise<T | null> {
    try { return await this.post<T>(url, data, config); } catch { return fallback ?? null; }
  }

  async safePut<T>(url: string, data?: unknown, fallback?: T, config?: AxiosRequestConfig): Promise<T | null> {
    try { return await this.put<T>(url, data, config); } catch { return fallback ?? null; }
  }

  async safePatch<T>(url: string, data?: unknown, fallback?: T, config?: AxiosRequestConfig): Promise<T | null> {
    try { return await this.patch<T>(url, data, config); } catch { return fallback ?? null; }
  }

  async safeDelete<T>(url: string, fallback?: T, config?: AxiosRequestConfig): Promise<T | null> {
    try { return await this.delete<T>(url, config); } catch { return fallback ?? null; }
  }

  // ---------------------------------------------------------------------------
  // SERVER-SIDE COOKIE INJECTION
  // ---------------------------------------------------------------------------

  setCookie(cookie: string): void {
    this.client.defaults.headers.Cookie = cookie;
  }

  // ---------------------------------------------------------------------------
  // HEALTH CHECK
  // ---------------------------------------------------------------------------

  healthCheck(): Promise<HealthCheckResponse> {
    return this.get<HealthCheckResponse>('/health');
  }

  // ---------------------------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------------------------

  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/login', credentials);
  }

  register(data: RegisterData): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth/register', data);
  }

  async logout(): Promise<void> {
    try { await this.post('/auth/logout'); } catch { /* noop */ }
  }

  getCurrentUser(): Promise<User> {
    return this.get<User>('/auth/me');
  }

  forgotPassword(email: string): Promise<MessageResponse> {
    return this.post<MessageResponse>('/auth/forgot-password', { email });
  }

  resetPassword(token: string, password: string): Promise<MessageResponse> {
    return this.post<MessageResponse>('/auth/reset-password', { token, password });
  }

  async isAuthenticated(): Promise<boolean> {
    try { await this.getCurrentUser(); return true; } catch { return false; }
  }

  // ---------------------------------------------------------------------------
  // MENUS  →  GET /api/menus
  //
  // menuController must send payload directly (not wrapped):
  //   ✅  ApiResponse.success('...', menus)     → data = Menu[]
  //   ❌  ApiResponse.success('...', { menus }) → data = { menus: [] }  ← breaks unwrap
  // ---------------------------------------------------------------------------

  getMenus(): Promise<Menu[]> {
    return this.get<Menu[]>('/menus');
  }

  getMenuBySlug(slug: string): Promise<Menu> {
    return this.get<Menu>(`/menus/${slug}`);
  }

  getSolutions(): Promise<Solution[]> {
    return this.get<Solution[]>('/solutions');
  }

  getSolutionBySlug(slug: string): Promise<Solution> {
    return this.get<Solution>(`/menus/solutions/items/${slug}`);
  }

  getIndustries(): Promise<Industry[]> {
    return this.get<Industry[]>('/industries');
  }

  getIndustryBySlug(slug: string): Promise<Industry> {
    return this.get<Industry>(`/menus/industries/items/${slug}`);
  }

  // ---------------------------------------------------------------------------
  // BLOGS
  // ---------------------------------------------------------------------------
getBlogs(filters?: BlogFilters): Promise<Blog[]> {
  return this.get<{ blogs: Blog[]; pagination: any }>('/blogs', { params: filters })
    .then(res => res.blogs);
}

getBlogBySlug(slug: string): Promise<Blog> {
  return this.get<{ blog: Blog }>(`/blogs/${slug}`)
    .then(res => res.blog);
}
  getRelatedBlogs(blogId: string, limit = 3): Promise<Blog[]> {
    return this.get<Blog[]>(`/blogs/${blogId}/related`, { params: { limit } });
  }

  searchBlogs(query: string): Promise<Blog[]> {
    return this.get<Blog[]>('/blogs/search', { params: { q: query } });
  }

  // ---------------------------------------------------------------------------
  // CASE STUDIES
  // ---------------------------------------------------------------------------

getCaseStudies(): Promise<CaseStudy[]> {
  return this.get<{ caseStudies: CaseStudy[]; pagination: any }>('/case-studies')
    .then(res => res.caseStudies);
}

getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  return this.get<{ caseStudy: CaseStudy }>(`/case-studies/${slug}`)
    .then(res => res.caseStudy);
}
    getCaseStudiesByIndustry(industry: string): Promise<CaseStudy[]> {
  return this.get<{ caseStudies: CaseStudy[] }>(`/case-studies/industry/${industry}`)
    .then(res => res.caseStudies);
}
  // ---------------------------------------------------------------------------
  // STATS
  // ---------------------------------------------------------------------------



// ✅ এখন
getStats(): Promise<Stats> {
  return this.get<Stats>('/stats/website');
}

  updateStats(data: Partial<Stats>): Promise<Stats> {
    return this.put<Stats>('/stats', data);
  }
  getDashboardStats(): Promise<any> {
  return this.get<any>('/stats/dashboard');
}

  // ---------------------------------------------------------------------------
  // NEWSLETTER
  // ---------------------------------------------------------------------------

  subscribeNewsletter(data: NewsletterData): Promise<MessageResponse> {
    return this.post<MessageResponse>('/newsletter/subscribe', data);
  }

  unsubscribeNewsletter(email: string): Promise<MessageResponse> {
    return this.post<MessageResponse>('/newsletter/unsubscribe', { email });
  }

  getSubscribers(
    filters?: { isActive?: boolean; page?: number; limit?: number },
  ): Promise<PaginatedResponse<NewsletterSubscriber>> {
    return this.get<PaginatedResponse<NewsletterSubscriber>>('/newsletter/subscribers', { params: filters });
  }

  deleteSubscriber(email: string): Promise<MessageResponse> {
    return this.delete<MessageResponse>(`/newsletter/subscriber/${email}`);
  }

  getSubscriberStats(): Promise<SubscriberStats> {
    return this.get<SubscriberStats>('/newsletter/stats');
  }

  // ---------------------------------------------------------------------------
  // CONSULTATIONS
  // ---------------------------------------------------------------------------

  createConsultation(data: ConsultationData): Promise<MessageResponse> {
    return this.post<MessageResponse>('/consultations', data);
  }

  getConsultations(): Promise<ConsultationData[]> {
    return this.get<ConsultationData[]>('/consultations');
  }

  // ---------------------------------------------------------------------------
  // SCHEDULES
  // ---------------------------------------------------------------------------

  createSchedule(data: ScheduleData): Promise<MessageResponse & { data?: Schedule }> {
    return this.post<MessageResponse & { data?: Schedule }>('/schedules', data);
  }

  getSchedules(type?: string): Promise<Schedule[]> {
    return this.get<Schedule[]>('/schedules', { params: { type } });
  }

  getAvailableTimeSlots(date: string): Promise<string[]> {
    return this.get<string[]>(`/schedules/available/${date}`);
  }

  updateScheduleStatus(id: string, status: ScheduleStatus, meetingLink?: string): Promise<Schedule> {
    return this.patch<Schedule>(`/schedules/${id}/status`, { status, meetingLink });
  }

  deleteSchedule(id: string): Promise<MessageResponse> {
    return this.delete<MessageResponse>(`/schedules/${id}`);
  }

  // ---------------------------------------------------------------------------
  // CONSENT
  // ---------------------------------------------------------------------------

  recordConsent(input: RecordConsentInput): Promise<MessageResponse> {
    const payload: ConsentData = {
      consent:   input.consent,
      type:      input.type      ?? 'cookies',
      email:     input.email,
      timestamp: input.timestamp ?? new Date().toISOString(),
      userAgent: input.userAgent ?? (typeof window !== 'undefined' ? window.navigator.userAgent : 'server-side'),
    };
    return this.post<MessageResponse>('/consent', payload);
  }

  getConsents(
    filters?: { type?: string; email?: string; startDate?: string; endDate?: string },
  ): Promise<PaginatedResponse<ConsentData>> {
    return this.get<PaginatedResponse<ConsentData>>('/admin/consent', { params: filters });
  }

  getConsentStats(): Promise<ConsentStats> {
    return this.get<ConsentStats>('/admin/consent/stats');
  }

  deleteConsent(id: string): Promise<MessageResponse> {
    return this.delete<MessageResponse>(`/admin/consent/${id}`);
  }

  // ---------------------------------------------------------------------------
  // ADMIN
  // ---------------------------------------------------------------------------

  readonly admin = {
    team: {
      getAll:  ():                                        Promise<TeamMember[]>    => this.get('/admin/team'),
      getById: (id: string):                             Promise<TeamMember>      => this.get(`/admin/team/${id}`),
      create:  (data: Partial<TeamMember>):              Promise<TeamMember>      => this.post('/admin/team', data),
      update:  (id: string, data: Partial<TeamMember>): Promise<TeamMember>      => this.put(`/admin/team/${id}`, data),
      delete:  (id: string):                             Promise<MessageResponse> => this.delete(`/admin/team/${id}`),
    },

    projects: {
      getAll:       ():                                         Promise<Project[]>       => this.get('/admin/projects'),
      getById:      (id: string):                              Promise<Project>         => this.get(`/admin/projects/${id}`),
      create:       (data: Partial<Project>):                  Promise<Project>         => this.post('/admin/projects', data),
      update:       (id: string, data: Partial<Project>):     Promise<Project>         => this.put(`/admin/projects/${id}`, data),
      delete:       (id: string):                              Promise<MessageResponse> => this.delete(`/admin/projects/${id}`),
      updateStatus: (id: string, status: ProjectStatus):      Promise<Project>         => this.patch(`/admin/projects/${id}/status`, { status }),
    },

    clients: {
      getAll:  ():                                       Promise<Client[]>        => this.get('/admin/clients'),
      getById: (id: string):                            Promise<Client>          => this.get(`/admin/clients/${id}`),
      create:  (data: Partial<Client>):                 Promise<Client>          => this.post('/admin/clients', data),
      update:  (id: string, data: Partial<Client>):    Promise<Client>          => this.put(`/admin/clients/${id}`, data),
      delete:  (id: string):                            Promise<MessageResponse> => this.delete(`/admin/clients/${id}`),
    },

    financial: {
      getAll:      ():                                            Promise<Financial[]>     => this.get('/admin/financial'),
      getById:     (id: string):                                 Promise<Financial>       => this.get(`/admin/financial/${id}`),
      getByPeriod: (period: string):                             Promise<Financial>       => this.get(`/admin/financial/period/${period}`),
      create:      (data: Partial<Financial>):                   Promise<Financial>       => this.post('/admin/financial', data),
      update:      (id: string, data: Partial<Financial>):      Promise<Financial>       => this.put(`/admin/financial/${id}`, data),
      delete:      (id: string):                                 Promise<MessageResponse> => this.delete(`/admin/financial/${id}`),
    },

    simulateNewOrder: (): Promise<unknown> => this.post('/admin/simulate/order'),
  } as const;
}

// =============================================================================
// SINGLETON
// =============================================================================

export const api = new ApiClient();

// =============================================================================
// SAFE METHOD SHORTCUTS
// =============================================================================

export const safeGet    = <T>(url: string, fallback?: T) => api.safeGet<T>(url, fallback);
export const safePost   = <T>(url: string, data?: unknown, fallback?: T) => api.safePost<T>(url, data, fallback);
export const safePut    = <T>(url: string, data?: unknown, fallback?: T) => api.safePut<T>(url, data, fallback);
export const safePatch  = <T>(url: string, data?: unknown, fallback?: T) => api.safePatch<T>(url, data, fallback);
export const safeDelete = <T>(url: string, fallback?: T) => api.safeDelete<T>(url, fallback);

// =============================================================================
// PUBLIC ENDPOINT SHORTCUTS
// =============================================================================

export const getMenus                 = ()                               => api.getMenus();
export const getMenuBySlug            = (slug: string)                   => api.getMenuBySlug(slug);

export const getSolutions             = ()                               => api.getSolutions();
export const getSolutionBySlug        = (slug: string)                   => api.getSolutionBySlug(slug);

export const getIndustries            = ()                               => api.getIndustries();
export const getIndustryBySlug        = (slug: string)                   => api.getIndustryBySlug(slug);

export const getBlogs                 = (filters?: BlogFilters)          => api.getBlogs(filters);
export const getBlogBySlug            = (slug: string)                   => api.getBlogBySlug(slug);
export const getRelatedBlogs          = (blogId: string, limit?: number) => api.getRelatedBlogs(blogId, limit);
export const searchBlogs              = (query: string)                  => api.searchBlogs(query);

export const getCaseStudies           = ()                               => api.getCaseStudies();
export const getCaseStudyBySlug       = (slug: string)                   => api.getCaseStudyBySlug(slug);
export const getCaseStudiesByIndustry = (industry: string)               => api.getCaseStudiesByIndustry(industry);

export const getStats                 = ()                               => api.getStats();
export const updateStats              = (data: Partial<Stats>)           => api.updateStats(data);
export const getDashboardStats = () => api.getDashboardStats();

// =============================================================================
// FORM ENDPOINT SHORTCUTS
// =============================================================================

export const subscribeNewsletter   = (data: NewsletterData)              => api.subscribeNewsletter(data);
export const unsubscribeNewsletter = (email: string)                     => api.unsubscribeNewsletter(email);
export const getSubscribers        = (filters?: { isActive?: boolean; page?: number; limit?: number }) => api.getSubscribers(filters);
export const deleteSubscriber      = (email: string)                     => api.deleteSubscriber(email);
export const getSubscriberStats    = ()                                  => api.getSubscriberStats();

export const createConsultation    = (data: ConsultationData)            => api.createConsultation(data);
export const getConsultations      = ()                                  => api.getConsultations();

export const createSchedule        = (data: ScheduleData)                => api.createSchedule(data);
export const getSchedules          = (type?: string)                     => api.getSchedules(type);
export const getAvailableTimeSlots = (date: string)                      => api.getAvailableTimeSlots(date);
export const updateScheduleStatus  = (id: string, status: ScheduleStatus, meetingLink?: string) => api.updateScheduleStatus(id, status, meetingLink);
export const deleteSchedule        = (id: string)                        => api.deleteSchedule(id);

export const recordConsent         = (data: RecordConsentInput)          => api.recordConsent(data);
export const getConsents           = (filters?: { type?: string; email?: string; startDate?: string; endDate?: string }) => api.getConsents(filters);
export const getConsentStats       = ()                                  => api.getConsentStats();
export const deleteConsent         = (id: string)                        => api.deleteConsent(id);

// =============================================================================
// AUTH SHORTCUTS
// =============================================================================

export const login           = (credentials: LoginCredentials)           => api.login(credentials);
export const register        = (data: RegisterData)                      => api.register(data);
export const logout          = ()                                        => api.logout();
export const getCurrentUser  = ()                                        => api.getCurrentUser();
export const forgotPassword  = (email: string)                          => api.forgotPassword(email);
export const resetPassword   = (token: string, password: string)        => api.resetPassword(token, password);
export const isAuthenticated = ()                                        => api.isAuthenticated();
export const healthCheck     = ()                                        => api.healthCheck();

// =============================================================================
// ADMIN SHORTCUTS
// =============================================================================

export const admin            = api.admin;
export const simulateNewOrder = ()                                       => api.admin.simulateNewOrder();

// =============================================================================
// SERVER-SIDE HELPER
// =============================================================================
@example

export const createServerApi = (cookie?: string): ApiClient => {
  const serverApi = new ApiClient();
  if (cookie) serverApi.setCookie(cookie);
  return serverApi;
};

// =============================================================================
// AUTH STATE HELPER
// =============================================================================

export const checkAuth = async (): Promise<{ isAuthenticated: boolean; user: User | null }> => {
  try {
    const user = await api.getCurrentUser();
    return { isAuthenticated: true, user };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};

// =============================================================================
// REACT HOOK
// =============================================================================

export const useApi = (): ApiClient => api;

export default api;