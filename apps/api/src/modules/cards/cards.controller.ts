import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';

@Controller('v1/cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCard(@Request() req: any, @Body() data: any) {
    return this.cardsService.createCard(req.user.id, data.templateId, data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMyCards(@Request() req: any) {
    return this.cardsService.getMyCards(req.user.id);
  }

  @Get(':id')
  async getCard(@Param('id') id: string) {
    return this.cardsService.getCard(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateCard(@Param('id') id: string, @Body() data: any) {
    return this.cardsService.updateCard(id, data);
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard('jwt'))
  async publishCard(@Param('id') id: string) {
    return this.cardsService.publishCard(id);
  }
}
