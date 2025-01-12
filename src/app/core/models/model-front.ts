export interface AppConfigModel {
    baseUrl: string;
    keyCloakUrl: string;
    keyCloakRealm: string;
    keyCloakClientId: string;
}

export interface NavigationItem {
    label: string;
    path: string;
    icon: string;
    type: 'public' | 'private';
}

export interface PieChartReasonData {
    reason: string;
    Count: number;
}

export interface PieChartStatusData {
    Status: string;
    Count: number;
}