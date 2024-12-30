import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequestException, Body, ConflictException, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiQuery, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { AttributeService } from "../../../repositories/attribute/attribute.service.js";
import {
  AttributeCreateDto, attributeDboToAttributeDto,
  AttributeDto, BooleanAttributeCreateDto, JsonAttributeCreateDto, ListAttributeCreateDto,
  NumberAttributeCreateDto,
  TextAttributeCreateDto
} from "../../../models/attribute.model.js";
import { AttributeType } from "../../../constants/attribute-type.enum.js";
import { Public } from "../../../fsarch/auth/decorators/public.decorator.js";
import { AttributeLocalizationDto, AttributeLocalizationSetDto } from "../../../models/attribute-localization.model.js";
import {
  AttributeLocalizationService
} from "../../../repositories/attribute-localization/attribute-localization.service.js";

@ApiTags('attribute')
@Controller({
  path: 'catalogs/:catalogId/attributes',
  version: '1',
})
@ApiBearerAuth()
@ApiExtraModels(NumberAttributeCreateDto)
@ApiExtraModels(TextAttributeCreateDto)
@ApiExtraModels(JsonAttributeCreateDto)
@ApiExtraModels(BooleanAttributeCreateDto)
@ApiExtraModels(ListAttributeCreateDto)
export class AttributesController {
  constructor(
    private readonly attributeService: AttributeService,
    private readonly attributeLocalizationService: AttributeLocalizationService,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      oneOf: [{
        $ref: getSchemaPath(NumberAttributeCreateDto),
      }, {
        $ref: getSchemaPath(TextAttributeCreateDto),
      }, {
        $ref: getSchemaPath(JsonAttributeCreateDto),
      }, {
        $ref: getSchemaPath(BooleanAttributeCreateDto),
      }, {
        $ref: getSchemaPath(ListAttributeCreateDto),
      }],
    },
  })
  public async Post(
    @Param('catalogId') catalogId: string,
    @Body() attributeCreateDto: NumberAttributeCreateDto | TextAttributeCreateDto | JsonAttributeCreateDto | BooleanAttributeCreateDto | ListAttributeCreateDto,
  ) {
    let type: NumberAttributeCreateDto | TextAttributeCreateDto | JsonAttributeCreateDto | BooleanAttributeCreateDto | ListAttributeCreateDto;
    if (attributeCreateDto.attributeTypeId === AttributeType.NUMBER) {
      type = plainToInstance(NumberAttributeCreateDto, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.TEXT) {
      type = plainToInstance(TextAttributeCreateDto, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.JSON) {
      type = plainToInstance(JsonAttributeCreateDto, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.BOOLEAN) {
      type = plainToInstance(BooleanAttributeCreateDto, attributeCreateDto);
    } else if (attributeCreateDto.attributeTypeId === AttributeType.LIST) {
      type = plainToInstance(ListAttributeCreateDto, attributeCreateDto);
    } else {
      type = plainToInstance(AttributeCreateDto, attributeCreateDto);
    }

    const errors = await validate(type);
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    const existingAttribute = await this.attributeService.getByName(catalogId, attributeCreateDto.name);
    if (existingAttribute) {
      throw new ConflictException();
    }

    const createdAttribute = await this.attributeService.create(catalogId, type);

    return {
      id: createdAttribute.id,
    };
  }

  @Get()
  @ApiQuery({
    name: 'include',
    required: false,
  })
  public async List(
    @Param('catalogId') catalogId: string,
    @Query('include') include?: Array<string>,
  ) {
    const attributes = await this.attributeService.list(catalogId);

    return Promise.all(attributes.map(async (attribute) => {
      const mappedAttribute = attributeDboToAttributeDto(attribute);

      if (include?.includes('localizations')) {
        const localizations = await this.attributeLocalizationService.listLocalizationsByAttributeId(attribute.id);

        mappedAttribute.localizations = localizations.map(AttributeLocalizationDto.FromDbo);
      }

      return mappedAttribute;
    }));
  }

  @Get(':attributeId')
  @ApiQuery({
    name: 'include',
    required: false,
  })
  public async Get(
    @Param('attributeId') attributeId: string,
    @Query('include') include?: Array<string>,
  ) {
    const attribute = await this.attributeService.get(attributeId);

    const mappedAttribute = attributeDboToAttributeDto(attribute);

    if (include?.includes('localizations')) {
      const localizations = await this.attributeLocalizationService.listLocalizationsByAttributeId(attribute.id);

      mappedAttribute.localizations = localizations.map(AttributeLocalizationDto.FromDbo);
    }

    return mappedAttribute;
  }

  @Put(':attributeId/localizations/:localizationId')
  public async SetLocalization(
    @Param('attributeId') attributeId: string,
    @Param('localizationId') localizationId: string,
    @Body() attributeLocalizationSetDto: AttributeLocalizationSetDto,
  ) {
    const attributeLocalization = await this.attributeLocalizationService.setLocalization(attributeId, localizationId, attributeLocalizationSetDto);

    return AttributeLocalizationDto.FromDbo(attributeLocalization);
  }
}
