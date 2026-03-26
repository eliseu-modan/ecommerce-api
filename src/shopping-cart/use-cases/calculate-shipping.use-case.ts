import { Injectable } from '@nestjs/common';
import { DistanceMatrixService } from 'src/services/distance-matrix.service';

@Injectable()
export class CalculateShippingUseCase {
  constructor(
    private readonly distanceMatrixService: DistanceMatrixService,
  ) {}

  async execute(
    origins: string[] | string,
    destinations: string[] | string,
    userId: string,
  ) {
    const originsArray = Array.isArray(origins) ? origins : [origins];
    const destinationsArray = Array.isArray(destinations)
      ? destinations
      : [destinations];

    const distanceResponse = await this.distanceMatrixService.getDistance(
      originsArray,
      destinationsArray,
    );

    if (
      !distanceResponse.rows?.length ||
      !distanceResponse.rows[0]?.elements?.length
    ) {
      throw new Error(
        distanceResponse.error_message || 'Erro ao calcular a distância.',
      );
    }

    const element = distanceResponse.rows[0].elements[0];

    if (element.status !== 'OK') {
      throw new Error(
        'Não foi possível calcular o frete para os endereços informados.',
      );
    }

    const distanceInMeters = element.distance.value;
    const durationInSeconds = element.duration.value;
    const distanceInKm = distanceInMeters / 1000;
    const freightCost = distanceInKm * 2;

    return {
      userId,
      distance: {
        text: element.distance.text,
        value: distanceInMeters,
      },
      duration: {
        text: element.duration.text,
        value: durationInSeconds,
      },
      freightCost: freightCost.toFixed(2),
    };
  }
}
