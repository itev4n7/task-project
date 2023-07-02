import { UserBuilder } from './user-builder'

export class UserSamples {

    static getBaseUser() {
        return new UserBuilder()
            .setEmail(process.env.USER_EMAIL as string)
            .setPassword(process.env.USER_PASSWORD as string)
            .build()
    }
}