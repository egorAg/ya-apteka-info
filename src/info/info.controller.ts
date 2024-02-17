import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
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
  @Get('version')
  public async getActualVersion(@Query('platform') platform: PlatformType) {
    return this.infoService.getActualVersion(platform);
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
  @Get('link')
  public async getActualLink(@Query('platform') platform: PlatformType) {
    return this.infoService.getActualLinks(platform);
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
}
