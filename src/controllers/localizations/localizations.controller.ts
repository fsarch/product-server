import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  LocalizationCreateDto,
  LocalizationDto,
} from '../../models/localization.model.js';
import { LocalizationService } from '../../repositories/localization/localization.service.js';

@ApiTags('localization')
@Controller({
  path: 'localizations',
  version: '1',
})
@ApiBearerAuth()
export class LocalizationsController {
  constructor(private readonly localizationService: LocalizationService) {}

  @Post()
  public async Post(@Body() localizationCreateDto: LocalizationCreateDto) {
    const createdLocalization = await this.localizationService.create(
      localizationCreateDto,
    );

    return {
      id: createdLocalization.id,
    };
  }

  @Get()
  public async List() {
    const localizations = await this.localizationService.list();

    return localizations.map(LocalizationDto.FromDbo);
  }
}
