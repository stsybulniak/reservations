import { Controller, Post, Req, Res, StreamableFile } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  uploadFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): StreamableFile {
    return this.fileService.uploadAndParseFile(req, res);
  }
}
