import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JsonDataService {
  private data: any;

  constructor() {
    const filePath = path.join('data/export4llm.json');
    this.data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  queryData(query: string): any {
    return this.data.filter((item) => JSON.stringify(item).includes(query));
  }
}
