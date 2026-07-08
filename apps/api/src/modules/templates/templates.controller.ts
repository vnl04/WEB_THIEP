import { Controller, Get, Param, Query } from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Controller('v1/templates')
export class TemplatesController {
  constructor(private templatesService: TemplatesService) {}

  @Get()
  async getAllTemplates(@Query() query: any) {
    return this.templatesService.getAllTemplates(query);
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string) {
    return this.templatesService.getTemplate(id);
  }
}
