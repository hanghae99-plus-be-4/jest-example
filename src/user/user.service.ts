import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  emptyUserDatabase = [];
  mockUserDatabase = [
    {
      name: 'Ho',
    },
    {
      name: 'Gwon',
    },
  ];

  createName(name: string): string {
    this.emptyUserDatabase.push({ name });
    return name;
  }

  createUserAge(age: number): number {
    this.emptyUserDatabase.push({ age });
    return age;
  }

  findAll() {
    return this.emptyUserDatabase;
  }
}
