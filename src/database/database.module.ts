import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          const client = await MongoClient.connect(
            'mongodb+srv://admin:YPNUpbYX9GAuH3Cr@cluster0.mjxezyu.mongodb.net',
          );

          return client.db('reporteme');
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
