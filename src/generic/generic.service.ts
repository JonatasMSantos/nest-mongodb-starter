import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  Scope,
  BadGatewayException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Db, ObjectId } from 'mongodb';

@Injectable({ scope: Scope.REQUEST })
export class GenericService {
  collection;

  constructor(
    @Inject(REQUEST) private request: Request,
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {
    this.collection = request.headers['collection'];
    if (!this.collection) {
      throw new BadGatewayException('collection is required');
    }
  }

  async find(): Promise<any[]> {
    return await this.db.collection(this.collection).find().toArray();
  }

  async findOne(id: string): Promise<any> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const response = await this.db.collection(this.collection).findOne({
      _id: new ObjectId(id),
    });

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  async findAll(data: any): Promise<any> {
    if (!data) {
      throw new BadRequestException('Filter is required');
    }

    const response = await this.db
      .collection(this.collection)
      .find({ ...data })
      .toArray();

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  async create(data: any): Promise<void> {
    if (!data) {
      throw new BadRequestException('Filter is required');
    }

    const sequence = await this.getNextSequence(`${this.collection}_id_seq`);
    console.log(sequence);

    data.id = sequence;

    await this.db.collection(this.collection).insertOne(data);
  }

  async update(id: string, body: any): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    await this.db.collection(this.collection).updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          ...body,
        },
      },
    );
  }

  async delete(id: string): Promise<void> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('Id is required');
    }

    const response = await this.db.collection(this.collection).deleteOne({
      _id: new ObjectId(id),
    });

    if (response.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

  async getNextSequence(name) {
    const ret = await this.db
      .collection('sequences')
      .findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' },
      );
    return ret.seq;
  }
}
