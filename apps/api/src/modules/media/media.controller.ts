import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service';

@Controller('v1/cards/:cardId/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async uploadMedia(@Param('cardId') cardId: string, @Body() data: any) {
    return this.mediaService.uploadMedia(cardId, data);
  }

  @Get()
  async getCardMedia(@Param('cardId') cardId: string) {
    return this.mediaService.getCardMedia(cardId);
  }
}
