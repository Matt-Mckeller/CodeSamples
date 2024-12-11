import { Inject, Injectable } from '@nestjs/common';
import {
  GOOGLE_AI_HELPERS,
  GOOGLE_VERTEX_IMAGE_GEN_AI,
} from './gemini.constants';
import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { ConfigService } from '@nestjs/config';

import * as fs from 'fs';

/*
  Note that the PredictionServiceClient is utilized to generate images here instead of 
  directly calling the API. It also has other uses but it is used to make requests to the
  generative AI because:

  1. Abstraction and Simplification:
  The PredictionServiceClient abstracts the underlying API calls, providing a more user-friendly and consistent interface for prediction requests.
  It handles tasks like formatting the request parameters and decoding the response into a usable format.
  
  2. Authentication and Error Handling:
  The library takes care of authentication by leveraging your Google Cloud project credentials.
  It provides built-in error handling mechanisms to simplify exception handling and debugging.
  
  3. Security:
  The PredictionServiceClient ensures secure communication with the Vertex AI API.
  
  4. Future Proofing:
  Using the client library ensures compatibility with potential future changes in the API, as the library will automatically adapt to those changes.
  
  5. Consistency and Readability:
  The library promotes a consistent way of interacting with Vertex AI, improving code readability and maintainability.
  */

@Injectable()
export class VertexAIService {
  constructor(
    @Inject(GOOGLE_VERTEX_IMAGE_GEN_AI)
    private readonly googleVertexPredictionServiceClient: PredictionServiceClient,
    @Inject(GOOGLE_AI_HELPERS)
    private readonly googleAIHelpers: any, // From Google AI package
    private configService: ConfigService,
  ) {}

  async generateImage(prompt: string): Promise<any> {
    const projectId = this.configService.get<string>(
      'GOOGLE_IMAGE_GEN_PROJECT_ID',
    );
    const location = this.configService.get<string>(
      'GOOGLE_IMAGE_GEN_LOCATION',
    );
    const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

    const promptText = {
      prompt: prompt, // The text prompt describing what you want to see
    };
    const instanceValue = this.googleAIHelpers.toValue(promptText);
    const instances = [instanceValue];

    const parameter = {
      sampleCount: 1,
      // You can't use a seed value and watermark at the same time.
      // seed: 100,
      // addWatermark: false,
      aspectRatio: '1:1',
      safetyFilterLevel: 'block_some',
      // personGeneration: 'allow_adult',
      // personGeneration: 'block_explicit',
    };

    const parameters = this.googleAIHelpers.toValue(parameter);
    const request = {
      endpoint,
      instances,
      parameters,
    };

    // Predict request
    const [response] =
      await this.googleVertexPredictionServiceClient.predict(request);
    const predictions = response.predictions;
    if (predictions.length === 0) {
      const unsuccessfulMessage =
        'No image was generated. Check the request parameters and prompt.';
      console.log(unsuccessfulMessage);
      throw Error(unsuccessfulMessage);
    } else {
      let i = 1;
      for (const prediction of predictions) {
        const buff = Buffer.from(
          prediction.structValue.fields.bytesBase64Encoded.stringValue,
          'base64',
        );

        // Write image content to the output file
        const outputDir = './apps/google/src/output'; // todo env variable
        const filename = `${outputDir}/generatedImage${i}.png`;
        fs.writeFileSync(filename, buff);

        console.log(`Saved image ${filename}`);
        i++;
      }
    }
    return true;
  }
}
