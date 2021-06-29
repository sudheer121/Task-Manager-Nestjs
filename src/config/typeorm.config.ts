import {  } from '@nestjs/typeorm'
export const typeOrmConfig : any  = {
    type : 'postgres',
    host : 'localhost',
    port : 5432, 
    username : 'postgres',
    password : 'postgres', 
    database : 'taskmanager',
    autoLoadEntities: true,
    synchronize : true 
}