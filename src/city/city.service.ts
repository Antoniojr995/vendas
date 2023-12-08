import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CityEntity } from './entities/city.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ){}

async getAllCityByStateId(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheManager.get(`state_${stateId}`);

    if (citiesCache) {
        console.log('Cities retrieved from cache');
        return citiesCache;
    }

    const cities = await this.cityRepository.find({
        where: {
            stateId,
        },
    });

    console.log('Cities fetched from the database');
    await this.cacheManager.set(`state_${stateId}`, cities, 9000000);

    return cities;
}
}