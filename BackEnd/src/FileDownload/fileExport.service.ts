import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FileSaveService implements OnModuleInit {
  fs = require('fs');
  dir = './ExportsFiles';
  onModuleInit() {
    if (!this.fs.existsSync(this.dir)) {
      this.fs.mkdirSync(this.dir);
    }
  }

  async exportFile(data): Promise<any> {
    console.log('file saving started');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json2csv = require('json2csv');
    return json2csv
      .parseAsync({
        data: data,
        fields: [
          'id',
          'v_id',
          'first_name',
          'last_name',
          'email',
          'car_make',
          'car_model',
          'vin_number',
          'manufactured_date',
          'age_of_vehicle',
        ],
      })
      .then((csv) => {
        this.fs.writeFile(
          `./ExportsFiles/${Date.now()}.csv`,
          csv,
          function (err) {
            if (err) throw err;
            console.log('File Saved!');
          },
        );
      });
  }
}
