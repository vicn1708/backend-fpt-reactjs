import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashingProvider {
  hashing(value: string): string {
    const salt = bcrypt.genSaltSync();
    const password = value;

    return bcrypt.hashSync(password, salt);
  }

  compare(value: string, valueHash: string): boolean {
    const isMatch = bcrypt.compareSync(value, valueHash);

    if (isMatch) {
      return true;
    } else {
      return false;
    }
  }
}
