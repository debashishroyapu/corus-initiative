import { 
  fallbackMenus, 
  fallbackSolutions, 
  fallbackIndustries, 
  fallbackBlogs, 
  fallbackCaseStudies,
  fallbackProjects,
  fallbackTeamMembers,
  fallbackClients,
  fallbackFinancialData,
  fallbackConsultations,
  fallbackSchedules,
  Subscribers,
  fallbackConsentData
} from './data';

// ========== COMMON INTERFACES ==========

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

// Simulate network delay
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Generic success response
const successResponse = <T>(data: T, message: string = 'Success'): ApiResponse<T> => ({
  success: true,
  message,
  data
});

// Generic error response
const errorResponse = (message: string = 'Error occurred'): ApiResponse => ({
  success: false,
  message
});

// ========== MENU APIs ==========

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
  await simulateDelay();
  return fallbackMenus.map(menu => ({
    ...menu,
    _id: `menu-${menu.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
};

// ========== SOLUTIONS APIs ==========

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
  await simulateDelay();
  return fallbackSolutions.map(solution => ({
    ...solution,
    _id: `solution-${solution.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
};

export const fetchSolutionBySlug = async (slug: string): Promise<Solution> => {
  await simulateDelay();
  const solution = fallbackSolutions.find(s => s.slug === slug);
  if (!solution) {
    throw new Error('Solution not found');
  }
  return {
    ...solution,
    _id: `solution-${solution.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// ========== INDUSTRIES APIs ==========

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
  await simulateDelay();
  return fallbackIndustries.map(industry => ({
    ...industry,
    _id: `industry-${industry.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
};

export const fetchIndustryBySlug = async (slug: string): Promise<Industry> => {
  await simulateDelay();
  const industry = fallbackIndustries.find(i => i.slug === slug);
  if (!industry) {
    throw new Error('Industry not found');
  }
  return {
    ...industry,
    _id: `industry-${industry.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// ========== BLOG APIs ==========

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
  await simulateDelay();
  return fallbackBlogs.map((blog, index) => ({
    ...blog,
    _id: `blog-${blog.slug || index}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: blog.publishedAt || new Date().toISOString()
  }));
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  await simulateDelay();
  const blog = fallbackBlogs.find(b => b.slug === slug);
  if (!blog) {
    throw new Error('Blog not found');
  }
  return {
    ...blog,
    _id: `blog-${blog.slug}`,
    createdAt: new Date().toISOString(),
    publishedAt: blog.publishedAt || new Date().toISOString()
  };
};

// ========== CASE STUDIES APIs ==========

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
  await simulateDelay();
  return fallbackCaseStudies.map((caseStudy, index) => ({
    ...caseStudy,
    _id: `case-study-${caseStudy.slug || index}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
};

export const fetchCaseStudyBySlug = async (slug: string): Promise<CaseStudy> => {
  await simulateDelay();
  const caseStudy = fallbackCaseStudies.find(c => c.slug === slug);
  if (!caseStudy) {
    throw new Error('Case study not found');
  }
  return {
    ...caseStudy,
    _id: `case-study-${caseStudy.slug}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// ========== CONSULTATION APIs ==========

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

export const createConsultation = async (data: CreateConsultationData): Promise<ApiResponse<Consultation>> => {
  await simulateDelay();
  const newConsultation: Consultation = {
    ...data,
    _id: `consult-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Store in fallbackConsultations (simulated)
  fallbackConsultations.push({
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    message: data.message
  });
  
  return successResponse(newConsultation, 'Consultation submitted successfully');
};

// ========== SCHEDULE APIs ==========

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

export const createSchedule = async (data: CreateScheduleData): Promise<ApiResponse<Schedule>> => {
  await simulateDelay();
  const newSchedule: Schedule = {
    ...data,
    _id: `schedule-${Date.now()}`,
    status: 'pending',
    meetingType: (data.meetingType as Schedule['meetingType']) || 'consultation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return successResponse(newSchedule, 'Meeting scheduled successfully');
};

// ========== NEWSLETTER APIs ==========

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

export const subscribeNewsletter = async (data: CreateNewsletterData): Promise<ApiResponse<NewsletterSubscriber>> => {
  await simulateDelay();
  const newSubscriber: NewsletterSubscriber = {
    ...data,
    _id: `subscriber-${Date.now()}`,
    isActive: true,
    subscribedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return successResponse(newSubscriber, 'Subscribed successfully');
};

// ========== CONSENT APIs ==========

export interface ConsentRecord {
  _id?: string;
  consent: boolean;
  timestamp: string;
  userAgent: string;
  ipAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const recordConsent = async (data: {
  consent: boolean;
  timestamp: string;
  userAgent: string;
}): Promise<ApiResponse> => {
  await simulateDelay();
  return successResponse(null, 'Consent recorded');
};

// ========== ADMIN APIs ==========

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

// Simulate admin login (always successful for demo)
export const adminLogin = async (email: string, password: string): Promise<AdminLoginResponse> => {
  await simulateDelay(1000);
  return {
    success: true,
    message: "Admin login successful",
    admin: {
      uid: 'admin-001',
      email: email,
      role: 'admin'
    }
  };
};

export const adminLogout = async (): Promise<ApiResponse> => {
  await simulateDelay();
  return successResponse(null, 'Logout successful');
};

export const verifyAdmin = async (): Promise<{success: boolean; admin: any}> => {
  await simulateDelay();
  return { 
    success: true, 
    admin: {
      uid: 'admin-001',
      email: 'admin@example.com',
      role: 'admin'
    }
  };
};

// ========== DASHBOARD APIs ==========

export interface DashboardSummary {
  totalRevenue: number;
  totalClients: number;
  activeProjects: number;
  pendingConsultations: number;
  upcomingMeetings: number;
  recentActivities: any[];
}

export const fetchDashboardSummary = async (): Promise<ApiResponse<DashboardSummary>> => {
  await simulateDelay();
  
  const summary: DashboardSummary = {
    totalRevenue: 3280000,
    totalClients: fallbackClients.length,
    activeProjects: fallbackProjects.filter(p => p.status === 'active').length,
    pendingConsultations: fallbackConsultations.length,
    upcomingMeetings: fallbackSchedules.filter(s => s.status === 'pending' || s.status === 'confirmed').length,
    recentActivities: []
  };
  
  return successResponse(summary);
};

// ========== PROJECT APIs ==========

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

// Helper function to convert string status to Project status type
const toProjectStatus = (status: string): Project['status'] => {
  const validStatuses: Project['status'][] = ['planning', 'active', 'on-hold', 'completed', 'cancelled'];
  return validStatuses.includes(status as any) ? (status as Project['status']) : 'planning';
};

// Helper function to convert string priority to Project priority type
const toProjectPriority = (priority: string): Project['priority'] => {
  const validPriorities: Project['priority'][] = ['low', 'medium', 'high', 'critical'];
  return validPriorities.includes(priority as any) ? (priority as Project['priority']) : 'medium';
};

export const fetchProjects = async (): Promise<ApiResponse<Project[]>> => {
  await simulateDelay();
  
  const projects: Project[] = fallbackProjects.map(project => ({
    ...project,
    _id: `project-${project.name.toLowerCase().replace(/\s+/g, '-')}`,
    startDate: project.startDate.toISOString(),
    endDate: project.endDate.toISOString(),
    status: toProjectStatus(project.status),
    priority: toProjectPriority(project.priority),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  return successResponse(projects);
};

// ========== CLIENT APIs ==========

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

// Helper function to convert string status to Client status type
const toClientStatus = (status: string): Client['status'] => {
  const validStatuses: Client['status'][] = ['active', 'inactive', 'lead'];
  return validStatuses.includes(status as any) ? (status as Client['status']) : 'lead';
};

export const fetchClients = async (): Promise<ApiResponse<Client[]>> => {
  await simulateDelay();
  
  const clients: Client[] = fallbackClients.map(client => ({
    ...client,
    _id: `client-${client.email.split('@')[0]}`,
    lastContact: client.lastContact.toISOString(),
    joinDate: client.joinDate.toISOString(),
    status: toClientStatus(client.status),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  return successResponse(clients);
};

// ========== TEAM APIs ==========

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

// Helper function to convert string status to TeamMember status type
const toTeamMemberStatus = (status: string): TeamMember['status'] => {
  const validStatuses: TeamMember['status'][] = ['active', 'inactive', 'on-leave'];
  return validStatuses.includes(status as any) ? (status as TeamMember['status']) : 'active';
};

export const fetchTeamMembers = async (): Promise<ApiResponse<TeamMember[]>> => {
  await simulateDelay();
  
  const teamMembers: TeamMember[] = fallbackTeamMembers.map(member => ({
    ...member,
    _id: `team-${member.email.split('@')[0]}`,
    joinDate: member.joinDate.toISOString(),
    status: toTeamMemberStatus(member.status),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  return successResponse(teamMembers);
};

// ========== FINANCIAL APIs ==========

export interface FinancialData {
  period: string;
  dateRange: string;
  summary: {
    totalRevenue: number;
    totalProfit: number;
    activeClients: number;
    newClients: number;
    avgProjectValue: number;
  };
  revenueData: Array<{ month: string; revenue: number; profit: number }>;
  expenseData: Array<{ category: string; amount: number; color: string }>;
  clientAcquisitionData: Array<{ month: string; newClients: number; returning: number }>;
  cashFlow: {
    inflow: number;
    outflow: number;
    netCashFlow: number;
  };
  accountsReceivable: {
    current: number;
    overdue: number;
    total: number;
  };
  profitMargin: number;
}

export const fetchFinancialData = async (dateRange: string = 'monthly'): Promise<ApiResponse<FinancialData>> => {
  await simulateDelay();
  
  // Find the matching data based on dateRange
  let financialData: FinancialData;
  
  switch(dateRange) {
    case 'last30Days':
      financialData = fallbackFinancialData[0]; // Q1
      break;
    case 'last90Days':
      financialData = fallbackFinancialData[1]; // Q2
      break;
    case 'last6Months':
      financialData = fallbackFinancialData[2]; // Q3
      break;
    case 'last12Months':
      financialData = fallbackFinancialData[3]; // Q4
      break;
    default:
      financialData = fallbackFinancialData[0]; // Default to Q1
  }
  
  return successResponse(financialData);
};

// ========== CONSULTATION ADMIN APIs ==========

export const fetchAdminConsultations = async (): Promise<ApiResponse<Consultation[]>> => {
  await simulateDelay();
  const consultations: Consultation[] = fallbackConsultations.map((consult, index) => ({
    name: consult.name,
    email: consult.email,
    phone: consult.phone || '',
    message: consult.message,
    _id: `consult-${index}`,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  return successResponse(consultations);
};

// ========== SCHEDULE ADMIN APIs ==========

// Helper function to convert string meetingType to Schedule meetingType type
const toScheduleMeetingType = (meetingType: string): Schedule['meetingType'] => {
  const validTypes: Schedule['meetingType'][] = ['consultation', 'demo', 'technical', 'sales', 'other'];
  return validTypes.includes(meetingType as any) ? (meetingType as Schedule['meetingType']) : 'consultation';
};

// Helper function to convert string status to Schedule status type
const toScheduleStatus = (status: string): Schedule['status'] => {
  const validStatuses: Schedule['status'][] = ['pending', 'confirmed', 'cancelled', 'completed'];
  return validStatuses.includes(status as any) ? (status as Schedule['status']) : 'pending';
};

export const fetchAdminSchedules = async (status?: string): Promise<ApiResponse<Schedule[]>> => {
  await simulateDelay();
  
  let schedules: Schedule[] = fallbackSchedules.map(schedule => ({
    ...schedule,
    _id: `schedule-${schedule.name.toLowerCase().replace(/\s+/g, '-')}`,
    preferredDate: schedule.preferredDate.toISOString(),
    meetingType: toScheduleMeetingType(schedule.meetingType),
    status: toScheduleStatus(schedule.status),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  if (status && status !== 'all') {
    schedules = schedules.filter(s => s.status === status);
  }
  
  return successResponse(schedules);
};

// ========== NEWSLETTER ADMIN APIs ==========

export const getSubscribers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<ApiResponse<NewsletterSubscriber[]>> => {
  await simulateDelay();
  
  let subscribers: NewsletterSubscriber[] = Subscribers.map(sub => ({
    ...sub,
    _id: `subscriber-${sub.email}`,
    subscribedAt: sub.subscribedAt.toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  if (search) {
    subscribers = subscribers.filter(s => 
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
    );
  }
  
  return successResponse(subscribers);
};

// ========== CONSENT ADMIN APIs ==========

export interface ConsentStats {
  total: number;
  accepted: number;
  declined: number;
  acceptanceRate: string;
}

export const fetchConsentStats = async (range: string = 'all'): Promise<ApiResponse<ConsentStats>> => {
  await simulateDelay();
  
  const stats: ConsentStats = {
    total: fallbackConsentData.length,
    accepted: fallbackConsentData.filter(c => c.consent).length,
    declined: fallbackConsentData.filter(c => !c.consent).length,
    acceptanceRate: `${((fallbackConsentData.filter(c => c.consent).length / fallbackConsentData.length) * 100).toFixed(1)}%`
  };
  
  return successResponse(stats);
};

// ========== STATS APIs ==========

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

export const getStats = async (): Promise<ApiResponse<StatsData>> => {
  await simulateDelay();
  
  const stats: StatsData = {
    happyClients: 150,
    projectsDone: 85,
    clientSatisfaction: 98,
    totalRevenue: 3280000,
    lastUpdated: new Date().toISOString(),
    _id: 'stats-001',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return successResponse(stats);
};

// ========== ACTIVITY APIs ==========

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

export const fetchRecentActivities = async (): Promise<ApiResponse<Activity[]>> => {
  await simulateDelay();
  
  const activities: Activity[] = [
    {
      id: 'activity-1',
      type: 'project',
      title: 'New Project Started',
      description: 'E-commerce website development project has started',
      timestamp: new Date().toISOString(),
      icon: '🚀',
      color: 'blue',
      user: 'John Doe',
      priority: 'high',
      isRead: false
    },
    {
      id: 'activity-2',
      type: 'client',
      title: 'New Client Onboarded',
      description: 'TechCorp Inc. has become a new client',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      icon: '👥',
      color: 'green',
      user: 'Sarah Smith',
      priority: 'medium',
      isRead: true
    },
    {
      id: 'activity-3',
      type: 'finance',
      title: 'Payment Received',
      description: 'Payment of $25,000 received from RetailPro',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      icon: '💰',
      color: 'purple',
      user: 'Finance Team',
      priority: 'high',
      isRead: false
    }
  ];
  
  return successResponse(activities);
};

// ========== EXPORT/REPORT APIs ==========

// Export data (simulated)
export const exportData = async (type: string, format: string): Promise<Blob> => {
  await simulateDelay(1000);
  
  // Create a dummy blob
  const content = `Exported ${type} data in ${format} format`;
  return new Blob([content], { type: 'text/plain' });
};

// Send report (simulated)
export const sendWeeklyReport = async (): Promise<ApiResponse> => {
  await simulateDelay(1500);
  return successResponse(null, 'Weekly report sent successfully');
};

export const sendMonthlyReport = async (): Promise<ApiResponse> => {
  await simulateDelay(1500);
  return successResponse(null, 'Monthly report sent successfully');
};

// ========== CONTENT MANAGEMENT APIs ==========

// For admin content management - using fallback data
export const fetchAdminSolutions = async (): Promise<ApiResponse<Solution[]>> => {
  await simulateDelay();
  return successResponse(await fetchSolutions());
};

export const fetchAdminIndustries = async (): Promise<ApiResponse<Industry[]>> => {
  await simulateDelay();
  return successResponse(await fetchIndustries());
};

export const fetchAdminBlogs = async (): Promise<ApiResponse<Blog[]>> => {
  await simulateDelay();
  return successResponse(await fetchBlogs());
};

export const fetchAdminCaseStudies = async (): Promise<ApiResponse<CaseStudy[]>> => {
  await simulateDelay();
  return successResponse(await fetchCaseStudies());
};

// Note: Create, update, and delete operations are simulated and don't persist
// In a real app, these would modify the fallback data arrays

// Simulate success responses for admin operations
export const createSolution = async (data: any): Promise<ApiResponse<Solution>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `solution-${Date.now()}` }, 'Solution created successfully');
};

export const updateSolution = async (id: string, data: any): Promise<ApiResponse<Solution>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Solution updated successfully');
};

export const deleteSolution = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Solution deleted successfully');
};

// Same pattern for other entities...
export const createIndustry = async (data: any): Promise<ApiResponse<Industry>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `industry-${Date.now()}` }, 'Industry created successfully');
};

export const createBlogPost = async (data: any): Promise<ApiResponse<Blog>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `blog-${Date.now()}` }, 'Blog post created successfully');
};

export const createCaseStudy = async (data: any): Promise<ApiResponse<CaseStudy>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `case-study-${Date.now()}` }, 'Case study created successfully');
};

export const createProject = async (data: any): Promise<ApiResponse<Project>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `project-${Date.now()}` }, 'Project created successfully');
};

export const createClient = async (data: any): Promise<ApiResponse<Client>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `client-${Date.now()}` }, 'Client created successfully');
};

export const createTeamMember = async (data: any): Promise<ApiResponse<TeamMember>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: `team-${Date.now()}` }, 'Team member created successfully');
};

// Update operations
export const updateIndustry = async (id: string, data: any): Promise<ApiResponse<Industry>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Industry updated successfully');
};

export const updateBlogPost = async (id: string, data: any): Promise<ApiResponse<Blog>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Blog post updated successfully');
};

export const updateCaseStudy = async (id: string, data: any): Promise<ApiResponse<CaseStudy>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Case study updated successfully');
};

export const updateProject = async (id: string, data: any): Promise<ApiResponse<Project>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Project updated successfully');
};

export const updateClient = async (id: string, data: any): Promise<ApiResponse<Client>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Client updated successfully');
};

export const updateTeamMember = async (id: string, data: any): Promise<ApiResponse<TeamMember>> => {
  await simulateDelay(1000);
  return successResponse({ ...data, _id: id }, 'Team member updated successfully');
};

// Delete operations
export const deleteIndustry = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Industry deleted successfully');
};

export const deleteBlogPost = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Blog post deleted successfully');
};

export const deleteCaseStudy = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Case study deleted successfully');
};

export const deleteProject = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Project deleted successfully');
};

export const deleteClient = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Client deleted successfully');
};

export const deleteTeamMember = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Team member deleted successfully');
};

// For consultation and schedule admin operations
export const updateConsultationStatus = async (id: string, status: string): Promise<ApiResponse<Consultation>> => {
  await simulateDelay(1000);
  return successResponse({
    _id: id,
    status: status as 'new' | 'contacted' | 'in-progress' | 'completed',
    name: 'Sample Client',
    email: 'client@example.com',
    message: 'Test consultation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, 'Consultation status updated');
};

export const deleteConsultation = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Consultation deleted');
};

export const updateAdminScheduleStatus = async (id: string, data: any): Promise<ApiResponse<Schedule>> => {
  await simulateDelay(1000);
  return successResponse({
    _id: id,
    ...data,
    name: 'Sample User',
    email: 'user@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as Schedule, 'Schedule updated');
};

export const deleteAdminSchedule = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Schedule deleted');
};

export const deleteSubscriber = async (id: string): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'Subscriber deleted');
};

export const markActivityAsRead = async (id: string): Promise<ApiResponse<Activity>> => {
  await simulateDelay(1000);
  return successResponse({
    id,
    type: 'project',
    title: 'Activity',
    description: 'Test activity',
    timestamp: new Date().toISOString(),
    icon: '📝',
    color: 'blue',
    isRead: true,
    priority: 'medium'
  }, 'Activity marked as read');
};

export const markAllActivitiesAsRead = async (): Promise<ApiResponse> => {
  await simulateDelay(1000);
  return successResponse(null, 'All activities marked as read');
};

export const simulateNewOrder = async (): Promise<ApiResponse<StatsData>> => {
  await simulateDelay(1000);
  const stats = await getStats();
  return stats;
};

// Export all APIs for use in the application
export default {
  // Public APIs
  fetchMenus,
  fetchSolutions,
  fetchSolutionBySlug,
  fetchIndustries,
  fetchIndustryBySlug,
  fetchBlogs,
  fetchBlogBySlug,
  fetchCaseStudies,
  fetchCaseStudyBySlug,
  createConsultation,
  createSchedule,
  subscribeNewsletter,
  recordConsent,
  getStats,
  
  // Admin Auth
  adminLogin,
  adminLogout,
  verifyAdmin,
  
  // Admin Dashboard
  fetchDashboardSummary,
  fetchProjects,
  fetchClients,
  fetchTeamMembers,
  fetchFinancialData,
  fetchAdminConsultations,
  fetchAdminSchedules,
  getSubscribers,
  fetchConsentStats,
  fetchRecentActivities,
  
  // Admin Content Management
  fetchAdminSolutions,
  fetchAdminIndustries,
  fetchAdminBlogs,
  fetchAdminCaseStudies,
  
  // CRUD Operations
  createSolution,
  updateSolution,
  deleteSolution,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  createProject,
  updateProject,
  deleteProject,
  createClient,
  updateClient,
  deleteClient,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  
  // Other admin operations
  updateConsultationStatus,
  deleteConsultation,
  updateAdminScheduleStatus,
  deleteAdminSchedule,
  deleteSubscriber,
  markActivityAsRead,
  markAllActivitiesAsRead,
  
  // Export/Report
  exportData,
  sendWeeklyReport,
  sendMonthlyReport,
  simulateNewOrder
};