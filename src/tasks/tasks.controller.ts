import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto  } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    @UsePipes(ValidationPipe)
    async getTasks(@Query() filterDto  : GetTasksFilterDto) : Promise<Task[]> { 
        return this.tasksService.getTasks(filterDto)
    }
 
    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
        return await this.tasksService.getTaskById(id); 
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(@Body() createTaskDTO : CreateTaskDto) : Promise<Task> {
        return await this.tasksService.createTask(createTaskDTO); 
    }
     
    @Delete('/:id') 
    async deleteTask(@Param('id', ParseIntPipe) id : number ){
        return this.tasksService.deleteTask(id); 
    }
    
    @Patch('/:id/status') 
    async updateTask(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', TaskStatusValidationPipe) status : TaskStatus
    ) : Promise<Task> { 
        return this.tasksService.updateTask(id, status); 
    }
}
 