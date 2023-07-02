import { User } from '../../common/types'

export class UserBuilder {
    private email!: string
    private password!: string

    setEmail(email: string) {
        this.email = email
        return this
    }

    setPassword(email: string) {
        this.password = email
        return this
    }

    build() {
        if (!this.email) throw new Error('User email is missing')
        if (!this.password) throw new Error('User password is missing')
        return {
            ...this
        } as unknown as User
    }
}