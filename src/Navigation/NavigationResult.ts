export interface NavigationResult {
    [source: string]: {
        [method: string]: ({
            path?: string;
            param?: string;
        } | string)[];
    };
}
