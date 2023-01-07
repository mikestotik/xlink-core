import * as bcrypt from 'bcrypt';


export class CryptoUtils {
  public static hash(value: string): string {
    return bcrypt.hashSync(value, Number(process.env.CRYPTO_SALT_OR_ROUNDS) || 10);
  }


  public static compareHashes(data: string | Buffer, encrypted: string): boolean {
    return bcrypt.compareSync(data, encrypted);
  }
}