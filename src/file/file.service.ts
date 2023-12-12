import { Logger, StreamableFile } from '@nestjs/common';
import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import * as Busboy from 'busboy';
import { Request, Response } from 'express';
import { parse } from 'csv-parse';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  uploadAndParseFile(req: Request, res: Response) {
    // mock.json emty file needs to supress nestjs errror: ERROR [StreamableFile] ENOENT: no such file or directory, open
    const stream = createReadStream(resolve('mock.json'));

    const parserOptions = {
      delimiter: ';',
      skip_empty_lines: true,
      columns: true,
      trim: true,
      cast: true,
    };

    const busboy = Busboy({ headers: req.headers });

    res.set({
      'Content-Type': 'application/json',
    });

    busboy.on('file', async (_filename, file) => {
      const parser = file.pipe(parse(parserOptions));

      parser.on('readable', function () {
        let record;
        while ((record = parser.read()) !== null) {
          stream.push(JSON.stringify(record));
        }
      });

      file.on('end', async () => {
        this.logger.log('File successfully uploaded');
      });
    });

    req.pipe(busboy);

    return new StreamableFile(stream);
  }
}
