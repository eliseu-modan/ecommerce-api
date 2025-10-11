import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class DistanceMatrixService {
  private readonly googleApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('API_GOOGLE_KEY');
    if (!apiKey) {
      throw new Error('API_GOOGLE_KEY is not defined in environment variables');
    }
    this.googleApiKey = apiKey;
  }

  async getDistance(origins: string[], destinations: string[]): Promise<any> {
    const originsParam = origins.join('|');
    const destinationsParam = destinations.join('|');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originsParam}&destinations=${destinationsParam}&key=${this.googleApiKey}`;

    try {
      const response = await this.httpService.axiosRef.get(url);
      return response.data;
    } catch (error) {
      console.error(
        'Erro ao consultar Distance Matrix API:',
        error.response?.data || error.message,
      );
      throw new Error('Erro ao calcular distância');
    }
  }
}
