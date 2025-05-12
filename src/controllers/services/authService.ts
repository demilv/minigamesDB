import bcrypt from 'bcryptjs';
import { UserModel } from '../../Schemas/UserS';

export class AuthService {
  static async authenticateUser(name: string, pass: string): Promise<boolean> {
    try {
      const user = await UserModel.findOne({ name:name }).exec();   
      if (!user) {
        console.log('Usuario no encontrado');
        return false;
      }
      console.log("pass normal" + pass + "y pass de usuario" + user.pass)
      const isPasswordMatch = await bcrypt.compare(pass, user.pass);
      
      if (isPasswordMatch) {
        console.log('Autenticación exitosa sisi!');
        return true;
      } else {
        console.log('Contraseña incorrecta');
        return false;
      }
    } catch (error) {
      console.error('Error al autenticar al usuario:', error);
      return false;
    }
  }
}
