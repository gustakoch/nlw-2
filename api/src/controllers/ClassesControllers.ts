import { Request, Response } from 'express'
import db from '../database/connection'
import convertHourInMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
	week_day: number
	from: string
	to: string
}

export default class ClassesControllers {
	async create(request: Request, response: Response) {
	const {
		name,
		avatar,
		whatsapp,
		bio,
		subject,
		cost,
		schedule
	} = request.body

	const insertedUsersIds = await db('users').insert({
		name,
		avatar,
		whatsapp,
		bio
	})

	const insertedClassesIds = await db('classes').insert({
		subject,
		cost,
		user_id: insertedUsersIds[0]
	})

	const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
		return {
			class_id: insertedClassesIds[0],
			week_day: scheduleItem.week_day,
			from: convertHourInMinutes(scheduleItem.from),
			to: convertHourInMinutes(scheduleItem.to)
		}
	})

	await db('class_schedule').insert(classSchedule)

	return response.json({ ok: true })
}
}