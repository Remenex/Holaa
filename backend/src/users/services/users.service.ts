import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import {
  CreateUser,
  MainUserInfo,
  UpdatePassword,
  UpdateUser,
  User,
} from '../dtos/user';
import { UserRepository } from '../repository/user.repository';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  findOne(username: string): Observable<MainUserInfo | undefined> {
    return from(this.userRepository.findUser(username)).pipe(
      map((result) => {
        if (result) {
          const newMainUserInfo: MainUserInfo = {
            userId: result.user_id,
            username: result.email,
            password: result.password,
          };
          return newMainUserInfo;
        }
        return null;
      }),
    );
  }

  createOne(userData: CreateUser): Observable<User> {
    return this.userRepository.createOne(userData);
  }

  getUsers(): Observable<User[]> {
    return this.userRepository.getUsers();
  }

  updateUser(
    uuid: UUID,
    userData: UpdateUser,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userRepository.updateUser(uuid, userData)).pipe(
      map((result) => {
        if (result)
          return { success: true, message: 'Korisnik je uspesno azuriran' };
        else
          throw new HttpException(
            'Ažuriranje korisnika nije uspelo.',
            HttpStatus.BAD_REQUEST,
          );
      }),
      catchError((error) => {
        throw new HttpException(
          `Greška prilikom ažuriranja korisnika: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }

  updatePassword(
    uuid: UUID,
    passwords: UpdatePassword,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userRepository.getUserPasswordById(uuid)).pipe(
      switchMap((existingPassword) => {
        if (!existingPassword) {
          throw new HttpException(
            'Korisnik nije pronađen.',
            HttpStatus.NOT_FOUND,
          );
        }

        return from(
          bcrypt.compare(passwords.old_password, existingPassword),
        ).pipe(
          switchMap((isPasswordValid) => {
            if (!isPasswordValid) {
              throw new HttpException(
                'Stara lozinka nije tačna.',
                HttpStatus.BAD_REQUEST,
              );
            }

            return from(bcrypt.hash(passwords.new_password, 10)).pipe(
              switchMap((hashedPassword) =>
                this.userRepository.updatePassword(uuid, hashedPassword),
              ),
            );
          }),
        );
      }),
      map(() => {
        return {
          success: true,
          message: 'Lozinka je uspesno azurirana',
        };
      }),
      catchError((error) => {
        throw new HttpException(
          `Greška prilikom promene lozinke: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }),
    );
  }
}
