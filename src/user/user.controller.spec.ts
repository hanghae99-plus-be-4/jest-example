import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    // nest는 jest를 기본으로 제공.
    // 테스트용 모둘을 생성해 진행한다.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    // toBeUndefined()
    expect(undefined).toBeUndefined();
    // toBeNull()
    expect(null).toBeNull();
  });

  describe('create', () => {
    it('should create a user', () => {
      const user = 'Gwonyeong';
      // 자주 사용하는 matcher
      expect(controller.createName(user)).toEqual(user);
      expect(controller.createName(user)).toBe('Gwonyeong');

      const arr = [1, 2, 3];
      expect(arr).toBe(arr);
      // 실패케이스
      // expect(arr).toBe([1, 2, 3]);
      expect(arr).toEqual([1, 2, 3]);
      expect(arr).toEqual(arr);
      // toBe는 === 의 느낌
      // toEqual은 객체의 값을 비교 (메모리의 위치가 달라도 값만 같으면 된다.)

      expect(controller.createName(user)).toMatch(new RegExp(/G/));
    });

    it('should throw an error if name is not a string', () => {
      const user = 123;
      // 에러를 던지는지 확인
      expect(() => controller.createName(user)).toThrow(
        'name must be a string',
      );
    });
  });

  describe('mock create', () => {
    it('should create a user', () => {
      // 새로운 인스턴스를 만들어서 그 안의 메소드를 모킹하기
      const user = 'Jeng';
      const userService = new UserService();
      const createName = jest.fn().mockImplementation(() => user);
      userService.createName = createName;
      const userController = new UserController(userService);
      expect(userController.createName(user)).toEqual(user);
    });

    it('should create a user', async () => {
      /**
       * 영화에서 스파이가 '몰래' 정보를 캐내는 것처럼
       * jest.spyOn은 기존 메소드를 가로채서
       * mockReturnValue로 설정한 값으로 대체합니다.
       *
       * mockReturnValue가 없으면 기본적으로 원래의 메소드가 실행되며
       * mockReturValue가 있다면 그 값으로 대체됩니다.
       */
      jest.spyOn(UserService.prototype, 'createName').mockReturnValue('jj');

      const user = 'jj';
      expect(controller.createName(user)).toEqual('jj');

      /**
       * jest.fn은 함수를 대체하고 싶을 때 많이 사용한다.
       * 예를 들어 결제 모듈을 테스트할 때 실제 결제를 진행하기는 부담스럽기 때문에
       * 결제 모듈처럼 동작하는 함수를 만들어서 대체할 수 있습니다.
       */
      const mockFn = jest
        .fn()
        .mockImplementationOnce(() => 'one')
        .mockImplementationOnce(() => 'two');

      // 순서를 바꾸면 에러
      expect(mockFn()).toBe('one');
      expect(mockFn()).toBe('two');

      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
