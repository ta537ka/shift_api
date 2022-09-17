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

    //全取得
    // async findAll(): Promise<Shift[]> {
    //     const query = await this.connection.execute("SELECT * FROM Shifts");
    //     const results = query.map((result: number | string | Date) => {
    //         return this.convertModel(result);
    //     });
    //     return results;
    // }

    //admin

    //期間指定
    async findAll(start_date: string, end_date: string): Promise<Shift[]> {
        var query;
        if (start_date == '' && end_date == '') {
            query = await this.connection.execute(
                "SELECT * FROM Shifts"
            );
        } else if (start_date == '') {
            const dt = new Date(end_date);
            query = await this.connection.execute(
                // `SELECT * FROM Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Shifts WHERE day <= ?",
                [dt]
            );
        } else if (end_date == '') {
            const dt = new Date(start_date);
            query = await this.connection.execute(
                "SELECT * FROM Shifts WHERE ? <= day",
                [dt]
                // `SELECT * FROM Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`
            );
        } else {
            const start_dt = new Date(start_date);
            const end_dt = new Date(end_date);
            query = await this.connection.execute(
                "SELECT * FROM Shifts WHERE day BETWEEN ? AND ?",
                // `SELECT * FROM Shifts WHERE day BETWEEN STR_TO_DATE(${start_date}, '%Y-%m-%d') AND STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                [start_dt, end_dt]
            );
        }
        const results = query.map((result: number | string | Date) => {
            return this.convertModel(result);
        });
        return results;
    }

    //staff
    async find(id: number): Promise<Shift> {
        const result = await this.connection.execute(
            "SELECT * FROM Shifts WHERE id = ?",
            id
        );
        return result;
    }

    async findAllByUser(staff_id: number): Promise<Shift[]> {
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