import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GuestsService } from './guests.service';

@Controller('v1/cards/:cardId/guests')
export class GuestsController {
  constructor(private guestsService: GuestsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addGuest(@Param('cardId') cardId: string, @Request() req: any, @Body() data: any) {
    return this.guestsService.addGuest(cardId, req.user.id, data);
  }

  @Get()
  async getCardGuests(@Param('cardId') cardId: string) {
    return this.guestsService.getCardGuests(cardId);
  }
}

@Controller('v1/guests')
export class GuestTrackingController {
  constructor(private guestsService: GuestsService) {}

  @Post(':guestId/track-view')
  async trackView(@Param('guestId') guestId: string) {
    return this.guestsService.trackGuestView(guestId);
  }

  @Post(':guestId/rsvp')
  async submitRsvp(@Param('guestId') guestId: string, @Body() data: any) {
    return this.guestsService.submitRsvp(guestId, data.status, data.count);
  }
}
