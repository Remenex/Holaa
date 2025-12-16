import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUser } from '../dtos/user';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }

  async create(userData: CreateUser) {
    if ((await this.userModel.findOne({ email: userData.email })) !== null) {
      throw new ConflictException('Email already exists');
    }

    userData.password = await this.hashPassword(userData.password);

    return (await this.userModel.create(userData)).toObject();
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 6);
  }

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
