import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/api-key.guard';
import { InfoService, PlatformType } from './info.service';

@ApiSecurity('x-api-key')
@UseGuards(AuthGuard)
@Controller('info')
@ApiTags('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @ApiOperation({
    description: 'Get actual application version',
    summary: 'Actual version',
  })
  @ApiQuery({
    name: 'platform',
    enum: ['ios', 'android'],
    required: true,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
          example: '1',
        },
      },
    },
  })
  @Get('version')
  public async getActualVersion(@Query('platform') platform: PlatformType) {
    return this.infoService.getActualVersion(platform);
  }

  @ApiOperation({
    description: 'Get store links by platform',
    summary: 'Actual store links',
  })
  @ApiQuery({
    name: 'platform',
    enum: ['ios', 'android'],
    required: true,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        store_name: {
          nullable: false,
          example: 'https://google.com/',
          description: 'Actual link for platform',
          title: 'link',
        },
      },
    },
  })
  @Get('link')
  public async getActualLink(@Query('platform') platform: PlatformType) {
    return this.infoService.getActualLinks(platform);
  }

  @ApiOperation({
    description: 'Set actual application version',
    summary: 'Set actual version',
  })
  @ApiQuery({
    name: 'platform',
    enum: ['ios', 'android'],
    required: true,
  })
  @ApiQuery({
    name: 'version',
    required: true,
    type: 'string',
  })
  @Get('version/set')
  public async setVersion(
    @Query('platform') platform: PlatformType,
    @Query('version') version: string,
  ) {
    return this.infoService.setActualVersion(platform, version);
  }

  @ApiOperation({
    description: 'Set a link for a store',
    summary: 'Set link',
  })
  @ApiQuery({
    name: 'store',
    enum: ['appStore', 'playMarket'],
    required: true,
  })
  @ApiQuery({
    name: 'link',
    type: 'string',
    required: false,
  })
  @Get('link/set')
  public async setLink(
    @Query('store') store: string,
    @Query('link') link: string,
  ) {
    await this.infoService.setLink(store, link);
  }
}
