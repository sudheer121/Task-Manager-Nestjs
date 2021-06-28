import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto  } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto  : GetTasksFilterDto) : Task[] { 
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);   
        }
        return this.tasksService.getAllTasks()
    }
 
    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task {
        return this.tasksService.getTaskById(id); 
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO : CreateTaskDto) : Task {
        return this.tasksService.createTask(createTaskDTO); 
    }
     
    @Delete('/:id') 
    deleteTask(@Param('id') id : string ){
        return this.tasksService.deleteTask(id); 
    }
    
    @Patch('/:id/status') 
    updateTask(
        @Param('id') id : string, 
        @Body('status', TaskStatusValidationPipe) status : TaskStatus
    ) : Task { 
        return this.tasksService.updateTask(id, status); 
    }
}
 