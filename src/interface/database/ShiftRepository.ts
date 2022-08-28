import { Shift } from "../../domain/Shift";
import { IShiftRepository } from "../../usecase/repository/IShiftRepository";
import { IDBConnection } from "./IDBConnection";

export class ShiftRepository extends IShiftRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: any) {
        const shift = new Shift();
        shift.id = r.id;
        shift.staff_id = r.staff_id;
        shift.status_id = r.status_id;
        shift.day = r.day;
        return shift;
    }

    async find(id: number): Promise<Shift> {
        const result = await this.connection.execute(
            "SELECT * FROM Shifts WHERE id = ?",
            id
        );
        return result;
    }

    //全取得
    // async findAll(): Promise<Shift[]> {
    //     const query = await this.connection.execute("SELECT * FROM Shifts");
    //     const results = query.map((result: number | string | Date) => {
    //         return this.convertModel(result);
    //     });
    //     return results;
    // }

    //期間指定
    async findAll(start_date: Date, end_date: Date): Promise<Shift[]> {
        const query = await this.connection.execute(
            "SELECT * FROM Shifts WHERE day BETWEEN ? AND ?",
            [start_date, end_date]
        );
        const results = query.map((result: number | string | Date) => {
            return this.convertModel(result);
        });
        return results;
    }

    async findByUser(staff_id: number): Promise<Shift[]> {
        const query = await this.connection.execute(
            "SELECT * FROM Shifts WHERE staff_id = ?",
            staff_id
        );
        const results = query.map((result: number | string | Date) => {
            return this.convertModel(result);
        });
        return results;
    }

    async persist(shift: Shift): Promise<Shift> {
        const result = await this.connection.execute(
            "INSERT INTO Shifts(staff_id, status_id, day) VALUES(?,?,?)",
            [shift.staff_id, shift.status_id, shift.day]
        );
        shift.id = result.id;
        return result;
    }

    async update(shift: Shift): Promise<Shift> {
        const result = await this.connection.execute(
            "UPDATE Shifts SET status_id = ?, day = ? WHERE id = ?",
            [shift.status_id, shift.day, shift.id]
        );
        return result;
    }

    async delete(id: number): Promise<Shift> {
        const result = await this.connection.execute(
            "DELETE FROM Shifts WHERE id = ?",
            id
        );
        return this.convertModel(result);
    }

}