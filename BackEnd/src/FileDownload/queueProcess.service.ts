import {
  Processor,
  Process,
  OnQueueCompleted,
  OnQueueActive,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { FileSaveService } from './fileExport.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { Logger } from '@nestjs/common';
import { SocketclusterService } from './socketCulster.service';
@Processor('dowloadFiles')
export class DowloandConsumer {
  constructor(
    private fileExport: FileSaveService,
    private gqlR: VehicleService,
    private socketclusterService: SocketclusterService,
  ) {}
  private readonly logger = new Logger(DowloandConsumer.name);
  @Process('dowloadFiles')
  async exportFile(job: Job) {
    console.log('inside eport');
    const exportFile = this.fileExport;
    const gqlR = this.gqlR;

    try {
      const socketServer = this.socketclusterService;
      console.log('inside eport');

      const result = await gqlR.getDetailsFile(
        job.data.minAge,
        job.data.maxAge,
      );

      await exportFile.exportFile(result);
      await socketServer.sendMessage(job.data.uidChannel, job.data);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log('inside Active ort');

    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    console.log('complete');

    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }
}
