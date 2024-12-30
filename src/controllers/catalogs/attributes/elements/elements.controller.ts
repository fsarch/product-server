import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Public } from "../../../../fsarch/auth/decorators/public.decorator.js";
import {
  ListAttributeElementCreateDto,
  ListAttributeElementDto
} from "../../../../models/list-attribute-element.model.js";
import { AttributeService } from "../../../../repositories/attribute/attribute.service.js";
import { AttributeType } from "../../../../constants/attribute-type.enum.js";
import {
  ListAttributeElementLocalizationDto,
  ListAttributeElementLocalizationSetDto
} from "../../../../models/list-attribute-element-localization.model.js";
import {
  AttributeLocalizationService
} from "../../../../repositories/attribute-localization/attribute-localization.service.js";

@ApiTags('attribute')
@Controller({
  path: 'catalogs/:catalogId/attributes/:attributeId/elements',
  version: '1',
})
@ApiBearerAuth()
export class ElementsController {
  constructor(
    private readonly attributeService: AttributeService,
    private readonly attributeLocalizationService: AttributeLocalizationService,
  ) {
  }

  @Post()
  public async Post(
    @Param('attributeId') attributeId: string,
    @Body() listAttributeElementCreateDto: ListAttributeElementCreateDto,
  ) {
    const attribute = await this.attributeService.get(attributeId);
    if (attribute.attributeTypeId !== AttributeType.LIST) {
      throw new NotFoundException();
    }

    const createdAttribute = await this.attributeService.createListElement(attributeId, listAttributeElementCreateDto);

    return {
      id: createdAttribute.id,
    };
  }

  @Get()
  @ApiQuery({
    name: 'include',
    isArray: true,
    required: false,
  })
  public async List(
    @Param('attributeId') attributeId: string,
    @Query('include') include: Array<string>,
  ) {
    const attributeElements = await this.attributeService.listElementsByAttributeId(attributeId);

    return Promise.all(attributeElements.map(async (attributeElement) => {
      const attributeElementDto = ListAttributeElementDto.FromDbo(attributeElement);

      if (include?.includes('localizations')) {
        const localizations = await this.attributeLocalizationService.listElementLocalizations(attributeElementDto.id);
        attributeElementDto.localizations = localizations.map(ListAttributeElementLocalizationDto.FromDbo);
      }

      return attributeElementDto;
    }));
  }

  @Put(':elementId/localizations/:localizationId')
  public async Put(
    @Param('attributeId') attributeId: string,
    @Param('elementId') elementId: string,
    @Param('localizationId') localizationId: string,
    @Body() listAttributeElementLocalizationSetDto: ListAttributeElementLocalizationSetDto,
  ) {
    const attribute = await this.attributeService.get(attributeId);
    if (attribute.attributeTypeId !== AttributeType.LIST) {
      throw new NotFoundException();
    }

    const createdAttribute = await this.attributeLocalizationService.setElementLocalization(elementId, localizationId, listAttributeElementLocalizationSetDto);

    return {
      id: createdAttribute.id,
    };
  }

  @Get(':elementId/localizations')
  public async ListLocalizations(
    @Param('attributeId') attributeId: string,
    @Param('elementId') elementId: string,
  ) {
    const attribute = await this.attributeService.get(attributeId);
    if (attribute.attributeTypeId !== AttributeType.LIST) {
      throw new NotFoundException();
    }

    const elementLocalizations = await this.attributeLocalizationService.listElementLocalizations(elementId);

    return elementLocalizations.map(ListAttributeElementLocalizationDto.FromDbo);
  }
}
