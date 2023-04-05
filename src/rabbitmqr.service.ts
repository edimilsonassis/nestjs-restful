import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'new_user_queue',
      },
    });
  }

  async sendNewUserMessage(message: string) {
    console.log(`Sending a Rabbit: '${message}'`);

    await this.client.connect();
    await this.client.send('my_pattern', message).toPromise();
  }
}
