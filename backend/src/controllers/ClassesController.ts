import { Request, Response } from 'express'
import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}
export default class ClassesController{

    async create(req:Request, res:Response){
    
        const trx = await db.transaction();
    
        const {name, avatar, whatsapp, bio, subject, cost, schedule} = req.body;
    
        try{
            const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio })
    
            const user_id = insertedUsersIds[0]
        
            const insertedClassesId = await trx('classes').insert({ subject, cost, user_id })
        
            const class_id = insertedClassesId[0]
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
        
                }
            }) 
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit()
            
            return res.status(201).send();
        }
        catch(err){
            await trx.rollback()
            return res.status(400).json({error:"Unexpected error while creating new class"})
        }
    }

    async index(req:Request, res:Response){
        const filters = req.query;

        const subject = filters.subject as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({error:"Missing filters to search classes"})
        }

        const timeInMinutes = convertHourToMinutes(time)

        //const classes = await db('classes').where('classes.subject', '=', filters.subject as string)
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')             //verificação de existencia de profissional
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])   //verificação de existencia de dia da semana
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])         //para nao aceitar horarios antes do periodo (class_schedule.from)
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])            //para nao aceitar horarios apos o periodo (class_schedule.to)
            })
            .where('classes.subject', '=', subject)                                     //verificação de matéria
            .join('users', 'classes.user_id', '=', 'users.id')                          //inner join para que o frontend tenha acesso aos dados do profissional
            .select(['classes.*', 'users.*'])

        return res.json({classes})
    }

}