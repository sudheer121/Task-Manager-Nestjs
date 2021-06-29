import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
    ) {}

    async getTasks(filterDto : GetTasksFilterDto) : Promise<Task[]>{  
        return this.taskRepository.getTasks(filterDto); 
    }
    // getAllTasks() : Task[] {
    //     return this.tasks; 
    // }

    // getTasksWithFilters( filterDto : GetTasksFilterDto ) : Task[] { 
    //     const { status, search } = filterDto; 
    //     let tasks = this.getAllTasks();

    //     if(status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search)); 
    //     }
    //     return tasks; 
    // }

    async getTaskById(id : number) : Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`);
        }   
        return found; 
    }

    // getTaskById(id : string) : Task {
    //     const found = this.tasks.find((task) => task.id === id);
    //     if(!found){
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }   
    //     return found; 
    // }

    
    async createTask(createTaskDto : CreateTaskDto ) : Promise<Task> {
        return this.taskRepository.createTask(createTaskDto); 
    }

    async deleteTask(id: number) : Promise<void> {
        const task = await this.getTaskById(id);
        await this.taskRepository.delete(task.id);
    }

    async updateTask(id : number, status : TaskStatus ) : Promise<Task> {
        const task = await this.getTaskById(id); 
        task.status = status; //reference
        await task.save(); 
        return task;     
    }
}
 