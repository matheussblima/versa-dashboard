export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    message?: string;
    status?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: any;
}
