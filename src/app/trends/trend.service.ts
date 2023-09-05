import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { DeleteTrendResponse } from './models/delete-trend-response.model';
import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { Trend } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { UpdateTrendRequest } from './models/update-trend-request.model';
import { UpdateTrendResponse } from './models/update-trend-response.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.production
    ? environment.avantioAPIHost
    : '';
  private readonly getAllUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public createOne(trend: Trend): Observable<any> {
    return this.httpClient.post<GetOneTrendResponse>(this.getAllUrl, trend);
  }

  public updateOne(trend: Trend): Observable<boolean> {
    const url = `${this.getAllUrl}/${trend.id}`;
    return this.httpClient
      .put<UpdateTrendResponse>(url, this.mapToUpdateTrendRequest(trend))
      .pipe(map(modified => Boolean(modified)));
  }

  public deleteOne(trendIdToDelete: string): Observable<any> {
    const url = `${this.getAllUrl}/${trendIdToDelete}`;
    return this.httpClient.delete<DeleteTrendResponse>(url);
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }

  private mapToUpdateTrendRequest(trend: Trend): UpdateTrendRequest {
    return {
      title: trend.title,
      body: trend.body[0],
      url: trend.url,
      image: trend.image,
      provider: trend.provider,
    };
  }
}
