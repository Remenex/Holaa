import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { InvitesController } from './controllers/invite.controller';
import { Invite, InviteSchema } from './entities/invite.entity';
import { InvitesGateway } from './invites.gateway';
import { InvitesService } from './services/invites.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Invite.name,
        schema: InviteSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [InvitesService, InvitesGateway],

  exports: [InvitesService],
  controllers: [InvitesController],
})
export class InvitesModule {}
