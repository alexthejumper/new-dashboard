export interface VisitCountRequest {
    week: number;
    totalVisits: number;
}

export interface ReasonCountRequest {
    reason: string;
    count: number;
}