import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto';

@Controller('v1/cards/:cardId/media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async uploadMedia(@Param('cardId') cardId: string, @Body() dto: CreateMediaDto) {
    return this.mediaService.uploadMedia(cardId, dto);
  }

  @Get()
  async getCardMedia(@Param('cardId') cardId: string) {
    return this.mediaService.getCardMedia(cardId);
  }
}
