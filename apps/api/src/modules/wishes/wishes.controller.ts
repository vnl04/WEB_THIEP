import { Controller, Post, Get, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto';

@Controller('v1/cards/:cardId/wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Post()
  async addWish(@Param('cardId') cardId: string, @Body() dto: CreateWishDto) {
    return this.wishesService.addWish(cardId, dto.authorId || 'anonymous', dto.content);
  }

  @Get()
  async getCardWishes(@Param('cardId') cardId: string, @Query('status') status?: string) {
    return this.wishesService.getCardWishes(cardId, status === 'approved');
  }
}

@Controller('v1/wishes')
export class WishModerationController {
  constructor(private wishesService: WishesService) {}

  @Patch(':wishId/approve')
  @UseGuards(AuthGuard('jwt'))
  async approveWish(@Param('wishId') wishId: string) {
    return this.wishesService.approveWish(wishId);
  }

  @Patch(':wishId/hide')
  @UseGuards(AuthGuard('jwt'))
  async hideWish(@Param('wishId') wishId: string) {
    return this.wishesService.hideWish(wishId);
  }
}
