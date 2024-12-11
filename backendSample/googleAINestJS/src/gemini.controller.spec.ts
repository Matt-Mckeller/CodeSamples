import { Test, TestingModule } from '@nestjs/testing';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';

describe('GeminiController', () => {
  let geminiController: GeminiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GeminiController],
      providers: [GeminiService],
    }).compile();

    geminiController = app.get<GeminiController>(GeminiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(geminiController.getHello()).toBe('Hello World!');
    });
  });
});
