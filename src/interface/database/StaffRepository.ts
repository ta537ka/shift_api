import { Staff } from "../../domain/Staff";
import { IStaffRepository } from "../../usecase/repository/IStaffReposiroty";
import { IDBConnection } from "./IDBConnection";

export class StaffRepository extends IStaffRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private converModel(r: any) {
        const staff = new Staff();
        staff.id = r.id;
        staff.username = r.username;
        staff.password = r.password;
        return staff;
    }

    async find(id: number): Promise<Staff> {
        const result = await this.connection.execute(
            "SELECT * FROM Staffs WHERE id = ?",
            id
        );
        return result;
    }

    async findAll(): Promise<Staff[]> {
        const query = await this.connection.execute("SELECT * FROM Staffs");
        const results = query.map((result: number | string) => {
            return this.converModel(result);
        });
        return results;
    }

    async persist(staff: Staff): Promise<Staff> {
        const result = await this.connection.execute(
            "INSERT INTO Staffs(username, password) VALUES(?,?)",
            [staff.username, staff.password]
        );
        return result;
    }

    async update(staff: Staff): Promise<Staff> {
        const result = await this.connection.execute(
            "UPDATE Staffs SET username = ?, password = ? WHERE id = ?",
            [staff.username, staff.password, staff.id]
        );
        staff.id = result.id;
        return result;
    }

    async delete(id: number): Promise<Staff> {
        const result = await this.connection.execute(
            "DELETE FROM Staffs WHERE id = ?",
            id
        );
        return this.converModel(result);
    }
}