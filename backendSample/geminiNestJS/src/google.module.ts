import { Module, Provider } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from './gemini.config';
import {
  GEMINI_TEXT_MODEL,
  GEMINI_VISION_MODEL,
  GOOGLE_AI_FILE_MANAGER,
} from './gemini.constants';

export const GeminiTextModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_TEXT_MODEL,
  useFactory: async (configService: ConfigService) => {
    const genAI = new GoogleGenerativeAI(
      configService.get<string>('GEMINI_API_KEY'),
    );
    return genAI.getGenerativeModel({
      model: configService.get<string>('GEMINI_TEXT_MODEL'),
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
  inject: [ConfigService],
};

export const GeminiVisionModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_VISION_MODEL,
  useFactory: async (configService: ConfigService) => {
    const genAI = new GoogleGenerativeAI(
      configService.get<string>('GEMINI_API_KEY'),
    );
    return genAI.getGenerativeModel({
      model: configService.get<string>('GEMINI_VISION_MODEL'),
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
  inject: [ConfigService],
};

export const GoogleAIFileManagerProvider: Provider<GoogleAIFileManager> = {
  provide: GOOGLE_AI_FILE_MANAGER,
  useFactory: async (configService: ConfigService) => {
    return new GoogleAIFileManager(configService.get<string>('GEMINI_API_KEY'));
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GEMINI_API_KEY: Joi.string().required(),
        GEMINI_TEXT_MODEL: Joi.string().required(),
        GEMINI_VISION_MODEL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GeminiController],
  providers: [
    GeminiService,
    GeminiTextModelProvider,
    GeminiVisionModelProvider,
    GoogleAIFileManagerProvider,
  ],
})
export class GoogleModule {}
