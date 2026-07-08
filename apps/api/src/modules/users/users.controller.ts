import { Controller, Get, Patch, Body, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateProfileDto, UpdateBankAccountDto } from './dto';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Post('bank-account')
  @UseGuards(AuthGuard('jwt'))
  async updateBankAccount(@Request() req: any, @Body() dto: UpdateBankAccountDto) {
    return this.usersService.updateBankAccount(req.user.id, dto);
  }
}
