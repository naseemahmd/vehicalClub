import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ExportService } from './exportServer.service';

@Controller()
export class FileController {
  constructor(private exportService: ExportService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './importFiles',
        filename: async (_req, file, cb) => {
          console.log('herere');
          const randomName = Array(15)
            .fill(null)
            .map(() => Math.round(Math.random() * 8).toString(8))
            .join('');
          console.log(randomName, 'name');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new NotFoundException();
    }
    console.log(file, file);
    this.exportService.saveDataToPostgres(file);
  }
}
