import { Controller, Get, Header } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import * as fs from 'fs';
import { GenerateContentResult } from '@google/generative-ai';

// const outputDir = './apps/gemini/src/output';
const outputDir = './';
@Controller()
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async sampleTextInteraction(): Promise<GenerateContentResult> {
    const prompts = [
      'Tell me a story about happiness. Keep it 100 words or less.',
      'Also tell me a story about the chiefs football team. Keep it 100 words or less.',
    ];
    const result = await this.geminiService.sampleTextInteraction(prompts);
    const textBodyResponse = result.response.text();
    console.log({ textBodyResponse });

    try {
      fs.writeFileSync(`${outputDir}/geminiTextOutput.txt`, textBodyResponse);
    } catch (err) {
      console.error('Error writing to file:', err);
    }
    return result;
  }

  @Get('/sampleImageQuestions')
  @Header('Content-Type', 'application/json')
  async sampleImageQuestions(): Promise<string> {
    const imageUrl =
      'https://storage.googleapis.com/expanse-public-assets/aiSamples/girl-and-dog-ai-analysis-sample.jpg';
    const result = await this.geminiService.sampleImageQuestions(
      imageUrl,
      'image/jpeg',
    );
    const textBodyResponse = result.response.text();
    console.log({ textBodyResponse });

    try {
      fs.writeFileSync(
        `${outputDir}/geminiVisionQuestionsOutput.txt`,
        textBodyResponse,
      );
    } catch (err) {
      console.error('Error writing to file:', err);
    }
    return textBodyResponse.replace('```json', '').replace('```', '');
  }

  @Get('/sampleImageAnalysis')
  @Header('Content-Type', 'application/json')
  async sampleImageAnalysis(): Promise<string> {
    const imageUrl =
      'https://storage.googleapis.com/expanse-public-assets/aiSamples/girl-and-dog-ai-analysis-sample.jpg';
    const result = await this.geminiService.sampleImageAnalysis(
      imageUrl,
      'image/jpeg',
    );
    const textBodyResponse = result.response
      .text()
      .replace('```json', '')
      .replace('```', '');
    console.log({ textBodyResponse });

    try {
      fs.writeFileSync(
        `${outputDir}/geminiVisionAnalysisOutput.txt`,
        textBodyResponse,
      );
    } catch (err) {
      console.error('Error writing to file:', err);
    }
    return textBodyResponse;
  }
}
