// import { Injectable, OnModuleInit } from '@nestjs/common';

// import { InjectQueue } from '@nestjs/bull';
// import { Queue } from 'bull';
// @Injectable()
// export class DownloadService {
    
//     constructor( 
//         @InjectQueue('dowloadFiles') private dowloandFile: Queue
//         ) {
//     }
//     async saveCsvToServer(fileInfo):Promise<Boolean>{
//         console.log(JSON.stringify(fileInfo) + '  received query');
//         try {
//             console.log("object");
//             const y = await this.dowloandFile.add('dowloadFiles',{
//                 fileInfo
//             }, { delay: 1000 }).then((res) => {
//                 return y
//             });
            
            
//         } catch (error) {
//             return false
//         }
        
        
        
//     }

    
   

// }
