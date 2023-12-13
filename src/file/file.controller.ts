import {
  Controller,
  Post,
  Req,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileService } from './file.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  uploadFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): StreamableFile {
    return this.fileService.uploadAndParseFile(req, res);
  }
}
