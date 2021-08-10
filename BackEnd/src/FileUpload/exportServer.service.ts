/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExportService {
  csv = require('csv-parser');
  fs = require('fs');
  Queue = require('bull');

  constructor(private vehicleService: VehicleService) {}

  async saveDataToPostgres(fileRecived) {
    console.log(JSON.stringify(fileRecived));
    console.log(fileRecived, 'on post');
    const vehicalService = this.vehicleService;

    const exportPostgresQueue = new this.Queue(
      'exportPostgres',
      'redis://127.0.0.1:6379',
    );

    exportPostgresQueue.process(async function (job, done) {
      console.log(job.data, 'queue file');
      try {
        const fs = require('fs');
        const getStream = require('get-stream');
        const parse = require('csv-parse');

        const readCSVData = async (filePath): Promise<any> => {
          console.log(filePath, 'reading csv');
          const data = await getStream.array(
            fs.createReadStream(filePath).pipe(parse({ delimiter: ',' })),
          );
          console.log(data, 'ssss');
          return data;
        };
        console.log('here');
        readCSVData(job.data.path)
          .then(async (result) => {
            console.log('ready to export');
            result = result.slice(1);

            await result.map(async (result) => {
              const vdatail = {
                v_id: result[0],
                first_name: result[1],
                last_name: result[2],
                email: result[3],
                car_make: result[4],
                car_model: result[5],
                vin_number: result[6],
                manufactured_date: result[7],
                age_of_vehicle: '',
              };

              console.log(vdatail, 'sdasd');
              const sned = await vehicalService.create(vdatail);
              console.log(sned, 'ss');
            });

            done(null, { status: 'finished' /* etc... */ });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error, 'herer');
      }
    });
    console.log(fileRecived);
    const myJob = await exportPostgresQueue.add(fileRecived, { delay: 5000 });
    const status = await myJob.finished();
    console.log(status);
  }
}
