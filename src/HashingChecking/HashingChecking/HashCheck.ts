import { UserModel } from "../../Schemas/UserS";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw new Error('Error en la generación del hash de la contraseña');
    }
  }
  
  