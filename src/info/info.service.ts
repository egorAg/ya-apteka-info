import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfoService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  private readonly links: Map<string, string> = new Map<string, string>();
  onModuleInit() {
    this.links.set('appStore', this.configService.get('LINK_APPSTORE'));
    this.links.set('playMarket', this.configService.get('LINK_GPLAY'));
  }

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
        if (this.links.has('appStore')) {
          return { appStore: this.links.get('appStore') };
        } else {
          return { appStore: '' };
        }
      case 'android':
        if (this.links.has('playMarket')) {
          return { playMarket: this.links.get('playMarket') };
        } else {
          return { playMarket: '' };
        }
    }
  }

  public async setLink(store: string, link: string) {
    console.log(store, link);

    if (store === 'appStore' || store === 'playMarket') {
      if (link === null) {
        this.links.set(store, '');
      } else {
        this.links.set(store, link);
      }
    } else {
      throw new BadRequestException('Invalid platform');
    }
  }
}

export type PlatformType = 'ios' | 'android';
