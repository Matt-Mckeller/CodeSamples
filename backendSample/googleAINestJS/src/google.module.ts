import { Module, Provider } from '@nestjs/common';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GENERATION_CONFIG, SAFETY_SETTINGS } from './gemini.config';
import GoogleVision, { ImageAnnotatorClient } from '@google-cloud/vision';
import GoogleAIPlatform from '@google-cloud/aiplatform';
import { helpers } from '@google-cloud/aiplatform';
const { PredictionServiceClient } = GoogleAIPlatform.v1;

import {
  GEMINI_TEXT_MODEL,
  GEMINI_VISION_MODEL,
  GOOGLE_AI_FILE_MANAGER,
  GOOGLE_AI_HELPERS,
  GOOGLE_IMAGE_ANNOTATOR,
  GOOGLE_VERTEX_IMAGE_GEN_AI,
} from './gemini.constants';
import { VisionController } from './vision.controller';
import { VisionService } from './vision.service';
import { VertexAIService } from './vertexAI.service';
import { VertexAIController } from './vertexAI.controller';

const GeminiTextModelProvider: Provider<GenerativeModel> = {
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

const GeminiVisionModelProvider: Provider<GenerativeModel> = {
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

const GoogleAIFileManagerProvider: Provider<GoogleAIFileManager> = {
  provide: GOOGLE_AI_FILE_MANAGER,
  useFactory: async (configService: ConfigService) => {
    return new GoogleAIFileManager(configService.get<string>('GEMINI_API_KEY'));
  },
  inject: [ConfigService],
};

const GoogleImageAnnotatorClient: Provider<ImageAnnotatorClient> = {
  provide: GOOGLE_IMAGE_ANNOTATOR,
  useFactory: async () => {
    return new GoogleVision.ImageAnnotatorClient();
  },
};

const GooglePredictionServicesClientProvider: Provider<any> = {
  provide: GOOGLE_VERTEX_IMAGE_GEN_AI,
  useFactory: async (configService: ConfigService) => {
    const location = configService.get<string>('GOOGLE_IMAGE_GEN_LOCATION');
    const clientOptions = {
      apiEndpoint: `${location}-aiplatform.googleapis.com`,
    };

    // Instantiates a client which is used to communicate with the Image Generation AI
    // ( and can be used for other things )
    return new PredictionServiceClient(clientOptions);
  },
  inject: [ConfigService],
};

const GoogleAIHelpersProvider: Provider<any> = {
  provide: GOOGLE_AI_HELPERS,
  useFactory: async () => {
    return helpers;
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        GEMINI_API_KEY: Joi.string().required(),
        GEMINI_TEXT_MODEL: Joi.string().required(),
        GEMINI_VISION_MODEL: Joi.string().required(),
        GOOGLE_IMAGE_GEN_LOCATION: Joi.string().required(),
        GOOGLE_IMAGE_GEN_PROJECT_ID: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GeminiController, VisionController, VertexAIController],
  providers: [
    GeminiService,
    VisionService,
    VertexAIService,
    GeminiTextModelProvider,
    GeminiVisionModelProvider,
    GoogleAIFileManagerProvider,
    GoogleImageAnnotatorClient,
    GooglePredictionServicesClientProvider,
    GoogleAIHelpersProvider,
  ],
})
export class GoogleModule {}
