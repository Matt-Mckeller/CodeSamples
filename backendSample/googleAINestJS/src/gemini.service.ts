import { GenerateContentResult, GenerativeModel } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import {
  GEMINI_TEXT_MODEL,
  GEMINI_VISION_MODEL,
  GOOGLE_AI_FILE_MANAGER,
} from './gemini.constants';
import { GoogleAIFileManager } from '@google/generative-ai/server';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GOOGLE_AI_FILE_MANAGER)
    private readonly googleAIFileManager: GoogleAIFileManager,
    @Inject(GEMINI_TEXT_MODEL) private readonly textModel: GenerativeModel,
    @Inject(GEMINI_VISION_MODEL)
    private readonly visionModel: GenerativeModel,
  ) {}

  async sampleTextInteraction(
    prompts: string[],
  ): Promise<GenerateContentResult> {
    const result = await this.textModel.generateContent(prompts);

    return result;
  }

  async sampleImageQuestions(
    imageUrl: string,
    mimeType: string,
  ): Promise<GenerateContentResult> {
    // Very versatile command options when working with gemini vision
    const commandText = `
    How many dogs are in this image?
    What is the bounding box for the dogs?
    What is the bounding box for the dogs face?
    What type of dogs are they?
    What are the dogs doing?

    How many people are in this image?
    What is the bounding box for the people?
    What is the bounding box for the peoples face?
    What are the attributes of the people?
    `;
    const imageResp = await fetch(imageUrl).then((response) =>
      response.arrayBuffer(),
    );

    const result = await this.visionModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString('base64'),
          mimeType,
        },
      },
      commandText,
    ]);
    return result;
  }

  async sampleImageAnalysis(
    imageUrl: string,
    mimeType: string,
  ): Promise<GenerateContentResult> {
    // Likely recommended to use Vision API for more control as opposed to long commands through gemini
    const commandText = `
    Analyze the provided image and respond in json format with the following data. Minimize unnecessary whitespace and newlines in the JSON response.
## Image Visual Analysis JSON Response Requirements

### Core Requirements

* **Image Metadata:**
  * 'image_id': Unique identifier for the image.
  * 'file_name': Original filename of the image.
  * 'file_format': Image format (e.g., JPEG, PNG, BMP).
  * 'width': Image width in pixels.
  * 'height': Image height in pixels.
  * 'size_bytes': Image file size in bytes.
  * 'creation_time': Image creation timestamp.
  * 'modification_time': Image modification timestamp.

* **Visual Analysis Results:**
  * **Object Detection:**
    * 'objects': 
      * 'object_id': Unique identifier for the object.
      * 'class_name': Object class label (e.g., person, car, dog).
      * 'confidence_score': Confidence score for the object detection.
      * 'bounding_box': 
        * 'x': Top-left x-coordinate of the bounding box.
        * 'y': Top-left y-coordinate of the bounding box.
        * 'width': Width of the bounding box.
        * 'height': Height of the bounding box.
  * **Scene Classification:**
    * 'scene_categories': 
      * 'category_name': Scene category label (e.g., indoor, outdoor, kitchen).
      * 'confidence_score': Confidence score for the scene classification.
  * **Image Captioning:**
    * 'captions': 
      * 'caption_text': Generated caption for the image.
      * 'confidence_score': Confidence score for the caption.
  * **Color Analysis:**
    * 'dominant_colors': 
      * 'color_code': Color code in hexadecimal format (e.g., #FF0000).
      * 'percentage': Percentage of the color in the image.
  * **Text Detection and OCR:**
    * 'detected_text': 
      * 'text': Detected text string.
      * 'bounding_box': 
        * 'x': Top-left x-coordinate of the bounding box.
        * 'y': Top-left y-coordinate of the bounding box.
        * 'width': Width of the bounding box.
        * 'height': Height of the bounding box.
  * **Image Description:**
    * 'description': A concise, 100-character or less description of the image.
* **Semantic Segmentation:**
  * 'segmentation_mask': Segmentation mask for each pixel, indicating its semantic class.
* **Face Detection and Analysis:**
  * 'faces': 
    * 'face_id': Unique identifier for the face.
    * 'bounding_box': 
      * 'x': Top-left x-coordinate of the bounding box.
      * 'y': Top-left y-coordinate of the bounding box.
      * 'width': Width of the bounding box.
      * 'height': Height of the bounding box.
    * 'landmarks': 
      * 'landmark_name': Landmark name (e.g., left_eye, right_eye, nose).
      * 'x': x-coordinate of the landmark.
      * 'y': y-coordinate of the landmark.
    * 'attributes': 
      * 'attribute_name': Attribute name (e.g., gender, age, emotion).
      * 'value': Attribute value.
* **Image Quality Assessment:**
  * 'quality_score': Overall image quality score.
  * 'blur_score': Blur level score.
  * 'noise_score': Noise level score.
  * 'exposure_score': Exposure level score.
  * 'contrast_score': Contrast level score.
* **Safe Search Variables and Confidence Interval Scores:**
  * 'safe_search_annotations': 
    * 'adult': Adult content score (0-1).
    * 'racy': Racy content score (0-1).
    * 'spoof': Spoof content score (0-1).
    * 'medical': Medical content score (0-1).
    * 'violence': Violence content score (0-1).
`;

    const imageResp = await fetch(imageUrl).then((response) =>
      response.arrayBuffer(),
    );

    const result = await this.visionModel.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString('base64'),
          mimeType,
        },
      },
      commandText,
    ]);
    return result;
  }
}
