import * as fs from 'fs';
import * as path from 'path';

export async function updateJsonFile(entityName: string, newData: any) {
  const filePath = path.join('data/export4llm.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      if (!jsonData[entityName]) {
        jsonData[entityName] = [];
      }
      jsonData[entityName].push(newData);
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err);
        }
      });
    } catch (err) {
      console.error('Error parsing JSON data:', err);
    }
  });
}
