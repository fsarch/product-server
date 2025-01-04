import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ItemAttributeService } from "../../../../repositories/item-attribute/item-attribute.service.js";

@ApiTags('items')
@Controller({
  path: 'catalogs/:catalogId/items/:itemId/attributes',
  version: '1',
})
@ApiBearerAuth()
export class AttributesController {
  constructor(
    private readonly itemAttributeService: ItemAttributeService,
  ) {
  }

  @Get()
  public async Get(
    @Param('catalogId') catalogId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.itemAttributeService.ListCompleteByItemId(catalogId, itemId);
  }
}
