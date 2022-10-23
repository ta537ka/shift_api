import { Admin } from "../../domain/Admin";
import { Staff } from "../../domain/Staff";
import { ILoginRepository } from "../../usecase/repository/ILoginRepository";
import { IDBConnection } from "./IDBConnection";

export class LoginRepository extends ILoginRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    async findUserByAdmin(username: string, password: string): Promise<Admin> {
        const result = await this.connection.execute(
            "SELECT * FROM Admins WHERE username = ? and password = ?",
            [username, password]
        );
        return result;
    }

    async findUserByStaff(username: string, password: string): Promise<Staff> {
        const result = await this.connection.execute(
            "SELECT * FROM Staffs WHERE username = ? AND password = ?",
            [username, password]
        );
        return result;
    }
}