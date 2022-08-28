import { Admin } from "../../domain/Admin";
import { IAdminRepository } from "../../usecase/repository/IAdminRepository";
import { IDBConnection } from "./IDBConnection";

export class AdminRepository extends IAdminRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: any) {
        const admin = new Admin();
        admin.id = r.id;
        admin.username = r.username;
        admin.password = r.password;
        return admin;
    }

    async find(id: number): Promise<Admin> {
        const result = await this.connection.execute(
            "SELECT * FROM Admins WHERE id = ?",
            id
        );
        return result;
    }

    async findAll(): Promise<Admin[]> {
        const query = await this.connection.execute("SELECT * FROM Admins");
        const results = query.map((result: number | string) => {
            return this.convertModel(result);
        });
        return results;
    }

    async persist(admin: Admin): Promise<Admin> {
        const result = await this.connection.execute(
            "INSERT INTO Admins(username, password) VALUES (?,?)",
            [admin.username, admin.password]
        );
        admin.id = result.id;
        return result;
    }

    async update(admin: Admin): Promise<Admin> {
        const result = await this.connection.execute(
            "UPDATE Admins SET username = ?, password = ? WHERE id = ?",
            [admin.username, admin.password, admin.id]
        );
        return result;
    }

    async delete(id: number): Promise<Admin> {
        const result = await this.connection.execute(
            "DELETE FROM Admins WHERE id = ?",
            id
        );
        return this.convertModel(result);
    }
}