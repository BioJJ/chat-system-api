import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { User } from './../../users/entities/user.entity'
import { BaseEntity } from 'src/bases/entities/base.entity'

@Entity('messages')
export class Message extends BaseEntity {
	@Column()
	content: string

	@ManyToOne(() => User, (user) => user.messages)
	@JoinColumn({ name: 'userId' })
	user: User

	@Column()
	userId: number
}
