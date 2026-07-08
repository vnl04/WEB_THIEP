import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { GiftsService } from './gifts.service';

@Controller('v1/cards/:cardId/gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  @Post()
  async recordGift(@Param('cardId') cardId: string, @Body() data: any) {
    return this.giftsService.recordGift(cardId, data);
  }

  @Get()
  async getCardGifts(@Param('cardId') cardId: string) {
    return this.giftsService.getCardGifts(cardId);
  }

  @Get('total')
  async getTotalGifts(@Param('cardId') cardId: string) {
    const total = await this.giftsService.getTotalGifts(cardId);
    return { total };
  }
}
