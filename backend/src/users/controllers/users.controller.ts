import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { from, Observable } from 'rxjs';
import { UpdatePassword, UpdateUser, User } from '../dtos/user';
import { UUID } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Express } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }

  @Get('/user/:email')
  getUserData(@Param('email') email: string): Observable<User> {
    return from(this.userService.getUserData(email));
  }

  @Put('/update/:id')
  updateUser(
    @Param('id') id: UUID,
    @Body() userData: UpdateUser,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userService.updateUser(id, userData));
  }

  @Put('/changePassword/:id')
  changePassword(
    @Param('id') id: UUID,
    @Body() passwords: UpdatePassword,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userService.updatePassword(id, passwords));
  }

  @Put('/updateProfileImage/:id')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads/users',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  @UseInterceptors()
  updateProfileImage(
    @Param('id') id: UUID,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<{ success: boolean; message: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded!');
    }
    const picturePath = file.path;
    return from(this.userService.updateProfileImage(id, picturePath));
  }

  @Delete('/delete/:id')
  deleteProfile(
    @Param('id') id: UUID,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userService.deleteProfile(id));
  }
}
