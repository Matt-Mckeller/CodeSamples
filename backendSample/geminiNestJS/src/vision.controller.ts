import { Controller, Get, Header } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import * as fs from 'fs';
import { GenerateContentResult } from '@google/generative-ai';
import { GOOGLE_SAMPLE_IMAGES } from './gemini.config';
import { VisionService } from './vision.service';

const outputDir = './apps/google/src/output';
// const outputDir = './';
@Controller()
export class VisionController {
  constructor(private readonly visionService: VisionService) {}

  @Get('/sampleVisionLabels')
  @Header('Content-Type', 'application/json')
  async sampleVisionLabels(): Promise<GenerateContentResult> {
    const imageUrl = GOOGLE_SAMPLE_IMAGES.GIRL_AND_DOG;
    const labels = await this.visionService.sampleLabels(imageUrl);

    try {
      fs.writeFileSync(
        `${outputDir}/sampleVisionLabels.txt`,
        JSON.stringify(labels, null, 2),
      );
    } catch (err) {
      console.error('Error writing to file:', err);
    }
    return labels;
  }

  @Get('/sampleFullVisionAnnotation')
  @Header('Content-Type', 'application/json')
  async sampleFullVisionAnnotation(): Promise<GenerateContentResult> {
    const imageUrl = GOOGLE_SAMPLE_IMAGES.GIRL_AND_DOG;
    const labels = await this.visionService.sampleFullAnnotation(imageUrl);

    try {
      fs.writeFileSync(
        `${outputDir}/sampleFullVisionAnnotation.txt`,
        JSON.stringify(labels, null, 2),
      );
    } catch (err) {
      console.error('Error writing to file:', err);
    }
    return labels;
  }
}
