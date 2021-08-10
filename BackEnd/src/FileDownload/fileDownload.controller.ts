import { Controller, Get, Query } from '@nestjs/common';
// import {DownloadService} from './download.service';
import { SocketclusterService } from './socketCulster.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class FileDownloadController {
  constructor(
    @InjectQueue('dowloadFiles') private dowloandFile: Queue,
    private socketclusterService: SocketclusterService,
  ) {
    this.socketclusterService.connectToSocketCluster('300');
  }

  @Get('Download')
  async download(@Query() query) {
    console.log(query);

    return await this.dowloandFile.add('dowloadFiles', query, { delay: 1000 });
  }
}
