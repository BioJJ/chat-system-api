import { Column, Entity, BeforeInsert, OneToMany } from 'typeorm'
import { hashSync } from 'bcrypt'
import { BaseEntity } from 'src/bases/entities/base.entity'
import { Message } from 'src/message/entities/message.entity'

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ default: true })
	status: boolean

	@OneToMany(() => Message, (message) => message.user)
	messages: Message[]

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}
