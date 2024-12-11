import { GenerateContentResult } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_IMAGE_ANNOTATOR } from './gemini.constants';
import { ImageAnnotatorClient } from '@google-cloud/vision';

import GoogleVision from '@google-cloud/vision';

@Injectable()
export class VisionService {
  /*
  https://cloud.google.com/vision/docs/reference/rest/v1/AnnotateImageRequest
  */

  constructor(
    @Inject(GOOGLE_IMAGE_ANNOTATOR)
    private readonly googleImageAnnotator: ImageAnnotatorClient,
  ) {}

  async sampleLabels(imageUrl: string): Promise<any> {
    const [result] = await this.googleImageAnnotator.annotateImage({
      image: { source: { imageUri: imageUrl } },
      features: [{ type: 'LABEL_DETECTION', maxResults: 21 }], // Set max results to 21, actually get 11 due to confidence value
    });
    console.log({ result });
    const labels = result.labelAnnotations;
    const faceAnnotations = result.faceAnnotations;
    console.log({ faceAnnotations });
    console.log({ landmarkAnnotations: result.landmarkAnnotations });
    console.log('Labels:');
    labels.forEach((label) => console.log(label.description));

    return labels;
  }

  async sampleFullAnnotation(imageUrl: string): Promise<any> {
    const [result] = await this.googleImageAnnotator.annotateImage({
      image: { source: { imageUri: imageUrl } },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 21 }, // Set max results to 21, may receive less
        { type: 'FACE_DETECTION' },
        { type: 'LANDMARK_DETECTION' },
        { type: 'LOGO_DETECTION' },
        { type: 'LABEL_DETECTION' },
        { type: 'TEXT_DETECTION' },
        // { type: 'DOCUMENT_TEXT_DETECTION' },
        { type: 'SAFE_SEARCH_DETECTION' },
        { type: 'IMAGE_PROPERTIES' },
        { type: 'CROP_HINTS' },
        { type: 'WEB_DETECTION' },
        { type: 'PRODUCT_SEARCH' },
        { type: 'OBJECT_LOCALIZATION' },
      ],
    });
    console.log({ result });

    return result;
  }
}

/*
Buffer example
// const imageResp = await fetch(imageUrl).then((response) =>
//   response.arrayBuffer(),
// );
// const imageBuffer = Buffer.from(imageResp).toString('base64')
// console.log(imageResp);
*/
