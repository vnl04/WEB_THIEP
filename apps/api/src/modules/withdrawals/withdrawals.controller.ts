import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WithdrawalsService } from './withdrawals.service';

@Controller('v1/withdrawals')
export class WithdrawalsController {
  constructor(private withdrawalsService: WithdrawalsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createWithdrawal(@Request() req: any, @Body() data: any) {
    return this.withdrawalsService.createWithdrawal(
      req.user.id,
      data.amount,
      data.bankAccountId,
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getWithdrawalHistory(@Request() req: any) {
    return this.withdrawalsService.getWithdrawalHistory(req.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getWithdrawal(@Param('id') id: string) {
    return this.withdrawalsService.getWithdrawal(id);
  }
}

@Controller('v1/admin/withdrawals')
export class AdminWithdrawalsController {
  constructor(private withdrawalsService: WithdrawalsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllWithdrawals() {
    return this.withdrawalsService.getAllWithdrawals();
  }

  @Get('pending')
  @UseGuards(AuthGuard('jwt'))
  async getPendingWithdrawals() {
    return this.withdrawalsService.getPendingWithdrawals();
  }

  @Patch(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  async approveWithdrawal(@Param('id') id: string) {
    return this.withdrawalsService.approveWithdrawal(id);
  }

  @Patch(':id/complete')
  @UseGuards(AuthGuard('jwt'))
  async completeWithdrawal(@Param('id') id: string) {
    return this.withdrawalsService.completeWithdrawal(id);
  }

  @Patch(':id/reject')
  @UseGuards(AuthGuard('jwt'))
  async rejectWithdrawal(@Param('id') id: string, @Body() data: any) {
    return this.withdrawalsService.rejectWithdrawal(id, data.reason);
  }
}
