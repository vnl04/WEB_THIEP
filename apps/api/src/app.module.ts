import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { CardsModule } from './modules/cards/cards.module';
import { MediaModule } from './modules/media/media.module';
import { GuestsModule } from './modules/guests/guests.module';
import { WishesModule } from './modules/wishes/wishes.module';
import { GiftsModule } from './modules/gifts/gifts.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { SecurityMiddleware } from './middleware/security.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TemplatesModule,
    CardsModule,
    MediaModule,
    GuestsModule,
    WishesModule,
    GiftsModule,
    PaymentsModule,
    SubscriptionsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware, RateLimitMiddleware)
      .forRoutes('*');
  }
}
