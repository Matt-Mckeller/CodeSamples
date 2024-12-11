import { Controller, Get, Header } from '@nestjs/common';
import { VertexAIService } from './vertexAI.service';

const outputDir = './apps/google/src/output';
// const outputDir = './';
@Controller()
export class VertexAIController {
  constructor(private readonly vertexAIService: VertexAIService) {}

  @Get('/generateImage')
  @Header('Content-Type', 'application/json')
  async generateImage(): Promise<any> {
    // const prompt = `a dog reading a newspaper`;
    const prompt = `
    Generate an image of a happy christmas day
    with presents stacked under a tree and angling up and to the right
    Include a theme of growth

    Utilize anime style for the image
    Utilize a purple tone
    `;

    try {
      const response = await this.vertexAIService.generateImage(prompt);
      return 'Successful!';
    } catch (e) {
      console.log({ e });
      return 'Unsuccessful!';
    }
  }
}
