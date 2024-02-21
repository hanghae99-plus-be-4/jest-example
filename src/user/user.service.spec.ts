import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  // it
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);

    console.log('mock 데이터 삽입');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findALl', () => {
    it('should return not empty array', () => {
      service.createName('Ho');
      service.createName('Gwon');
      expect(service.findAll()).toEqual([{ name: 'Ho' }, { name: 'Gwon' }]);
    });

    it('should return empty array', () => {
      expect(service.findAll()).toEqual([]);
    });

    test('should return empty array', () => {
      expect(service.findAll()).toEqual([]);
    });
  });

  afterEach(() => {
    console.log('데이터베이스 비우기');
  });
});
