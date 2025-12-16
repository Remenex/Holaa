import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  // findOne(username: string): Observable<MainUserInfo | undefined> {
  //   return from(this.userRepository.findUser(username)).pipe(
  //     map((result) => {
  //       if (result) {
  //         const newMainUserInfo: MainUserInfo = {
  //           userId: result.user_id,
  //           username: result.email,
  //           password: result.password,
  //         };
  //         return newMainUserInfo;
  //       }
  //       return null;
  //     }),
  //   );
  // }

  // createOne(userData: CreateUser): Observable<User> {
  //   return from(this.userRepository.createOne(userData));
  // }

  // getUsers(): Observable<User[]> {
  //   return from(this.userRepository.getUsers());
  // }

  // getUserData(email: string): Observable<User> {
  //   return from(this.userRepository.findUser(email)).pipe(
  //     map((result) => {
  //       const res = result;
  //       res.password = null;
  //       return res;
  //     }),
  //   );
  // }

  // updateUser(
  //   uuid: UUID,
  //   userData: UpdateUser,
  // ): Observable<{ success: boolean; message: string }> {
  //   return from(this.userRepository.updateUser(uuid, userData)).pipe(
  //     map((result) => {
  //       if (result)
  //         return { success: true, message: 'Korisnik je uspesno azuriran' };
  //       else
  //         throw new HttpException(
  //           'Ažuriranje korisnika nije uspelo.',
  //           HttpStatus.BAD_REQUEST,
  //         );
  //     }),
  //     catchError((error) => {
  //       throw new HttpException(
  //         `Greška prilikom ažuriranja korisnika: ${error.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }),
  //   );
  // }

  // updatePassword(
  //   uuid: UUID,
  //   passwords: UpdatePassword,
  // ): Observable<{ success: boolean; message: string }> {
  //   return from(this.userRepository.getUserPasswordById(uuid)).pipe(
  //     switchMap((existingPassword) => {
  //       if (!existingPassword) {
  //         throw new HttpException(
  //           'Korisnik nije pronađen.',
  //           HttpStatus.NOT_FOUND,
  //         );
  //       }

  //       return from(
  //         bcrypt.compare(passwords.old_password, existingPassword),
  //       ).pipe(
  //         switchMap((isPasswordValid) => {
  //           if (!isPasswordValid) {
  //             throw new HttpException(
  //               'Stara lozinka nije tačna.',
  //               HttpStatus.BAD_REQUEST,
  //             );
  //           }

  //           return from(bcrypt.hash(passwords.new_password, 10)).pipe(
  //             switchMap((hashedPassword) =>
  //               this.userRepository.updatePassword(uuid, hashedPassword),
  //             ),
  //           );
  //         }),
  //       );
  //     }),
  //     map(() => {
  //       return {
  //         success: true,
  //         message: 'Lozinka je uspesno azurirana',
  //       };
  //     }),
  //     catchError((error) => {
  //       throw new HttpException(
  //         `Greška prilikom promene lozinke: ${error.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }),
  //   );
  // }

  // updateProfileImage(
  //   uuid: UUID,
  //   imagePath: string,
  // ): Observable<{ success: boolean; message: string }> {
  //   return from(this.userRepository.updateProfileImage(uuid, imagePath)).pipe(
  //     map((result) => {
  //       if (result)
  //         return { success: true, message: 'Uspesno azurirana slika' };
  //       return {
  //         success: false,
  //         message: 'Doslo je do greske prilikom azuriranja profilne slike',
  //       };
  //     }),
  //     catchError((error) => {
  //       throw new HttpException(
  //         `Greška prilikom ažuriranja korisnika: ${error.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }),
  //   );
  // }

  // deleteProfile(uuid: UUID): Observable<{ success: boolean; message: string }> {
  //   return from(this.userRepository.deleteProfile(uuid)).pipe(
  //     map((result) => {
  //       if (result) return { success: true, message: 'Uspesno obrisan profil' };
  //       return {
  //         success: false,
  //         message: 'Doslo je do greske prilikom brisanja profila',
  //       };
  //     }),
  //     catchError((error) => {
  //       throw new HttpException(
  //         `Greska prilikom brisanja profila: ${error.message}`,
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }),
  //   );
  // }
}
