import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfoService {
  constructor(private readonly configService: ConfigService) {}

  public async getActualVersion(platform: PlatformType) {
    const key = `VER_${platform.toUpperCase()}`;

    return {
      version: this.configService.get(key),
    };
  }

  public async setActualVersion(platform: PlatformType, version: string) {
    const key = `VER_${platform.toUpperCase()}`;
    this.configService.set(key, version);
  }

  public async getActualLinks(platform: PlatformType) {
    switch (platform) {
      case 'ios':
        return { appStore: this.configService.get('LINK_APPSTORE') };
      case 'android':
        return { playMarket: this.configService.get('LINK_GPLAY') };
    }
  }
}

export type PlatformType = 'ios' | 'android';
