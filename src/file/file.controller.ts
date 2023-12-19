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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.dto';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file with delimiter ";"',
    type: FileUploadDto,
  })
  @ApiOperation({
    summary:
      'Upload CSV file with delimiter ";" and return chunked parsed json response',
  })
  uploadFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): StreamableFile {
    return this.fileService.uploadAndParseFile(req, res);
  }
}
