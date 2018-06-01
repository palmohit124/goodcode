export interface Providers {
  providerId: number;
  name: string;
  enabled: boolean;
}
export interface TagFeatures {
  featureId: number;
  description: string;
  name: string;
  enabled: boolean;
  providers?: Providers[];
}
