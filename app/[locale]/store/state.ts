export interface FeatureFlags {
    id: string;
    name: string;
    description: string;
    isEnabled: boolean;
}

export interface FeatureFlagsState {
    featureFlags: {
        data: FeatureFlags[] | null;
        loading: boolean;
        error: string | null;
    }
}