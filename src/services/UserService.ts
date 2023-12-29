import { HttpError } from 'routing-controllers'
import { UserDTO } from '../dtos/UserDTO'
import { Service } from "typedi"
import { v4 as uuidv4 } from 'uuid'
import NotFoundError from '../errors/notfounderror'
import fs from 'fs';

@Service()
export class UserService {

    // Path of JSON file
    private usersFilePath = __dirname + '/../../db/users.json';
    // Read the JSON file
    private usersRawData = fs.readFileSync(this.usersFilePath, 'utf8');

    private users: UserDTO[] = JSON.parse(this.usersRawData);

    createUser(user: UserDTO): UserDTO {

        const createUser = Object.assign({ id: uuidv4() }, user)
        const dupUser = this.users.filter(user => user.username === createUser.username)
        if (dupUser.length > 0) {

            // http error
            throw new HttpError(400, "duplicate user")
        }

        this.users.push(createUser)

        fs.writeFileSync(this.usersFilePath, JSON.stringify(this.users, null, 2));

        return createUser
    }

    getUsers(): UserDTO[] {
        return this.users
    }

    getUserByID(id: string): UserDTO[] {

        const filterUsers = this.users.filter(user => user.id === id)
        if (filterUsers.length == 0) {

            // custom notfound error
            throw new NotFoundError(`user`)
        }

        return filterUsers
    }
}