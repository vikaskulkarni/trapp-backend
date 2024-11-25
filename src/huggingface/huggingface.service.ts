import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { loadJsonData } from 'src/export-data';

@Injectable()
export class HuggingFaceService {
  private apiKey: string;
  private apiUrl: string;
  private jsonData: any;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('HUGGINGFACE_API_KEY');
    this.apiUrl = 'https://api-inference.huggingface.co/models/gpt2';
    this.jsonData = loadJsonData('data/export4llm.json');
  }

  private extractRelevantContext(query: string): string {
    const context = [];

    for (const key in this.jsonData) {
      if (Array.isArray(this.jsonData[key])) {
        const filteredItems = this.jsonData[key].filter(
          (item: any) =>
            //   JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
            item,
        );
        context.push(...filteredItems);
      }
    }

    return JSON.stringify(context);
  }

  async generateResponse(query: string): Promise<string> {
    const context = this.extractRelevantContext(query);
    const contextualPrompt = `Context: ${context}\n\nQuery: ${query}`;
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          inputs: contextualPrompt,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (Array.isArray(response.data)) {
        return response.data[0]?.generated_text || 'No response';
      }

      return 'Unexpected response format';
    } catch (error) {
      throw new HttpException(
        error.response ? error.response.data : error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
