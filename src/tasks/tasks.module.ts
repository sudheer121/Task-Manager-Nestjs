import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([TaskRepository]),  // for dependency injection 
  ], 
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
