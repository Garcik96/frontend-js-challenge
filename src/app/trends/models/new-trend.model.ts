import { TrendProvider } from './trend-provider.model';

export interface NewTrend {
  title: string;
  body: string;
  provider: TrendProvider;
  image: string;
  url: string;
}
