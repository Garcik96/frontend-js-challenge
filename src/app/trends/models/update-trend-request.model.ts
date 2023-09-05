import { TrendProvider } from './trend-provider.model';

export interface UpdateTrendRequest {
  title?: string;
  body?: string;
  url?: string;
  image?: string;
  provider?: TrendProvider;
}
