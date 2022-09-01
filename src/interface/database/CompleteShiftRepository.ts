import { CompleteShift } from "../../domain/CompleteShift";
import { ICompleteShiftRepository } from "../../usecase/repository/ICompleteShiftRepository";
import { IDBConnection } from "./IDBConnection";

export class CompleteShiftRepository extends ICompleteShiftRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: any) {
        const completeShift = new CompleteShift();
        completeShift.id = r.id;
        completeShift.staff_id = r.staff_id;
        completeShift.status_id = r.status_id;
        completeShift.day = r.day;
        return completeShift;
    }

    //admin
    async findAllByAdmin(start_date: string, end_date: string): Promise<CompleteShift[]> {
        var query;
        if (start_date == '' && end_date == '') {
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts"
            );
        } else if (start_date == '') {
            const dt = new Date(end_date);
            query = await this.connection.execute(
                // `SELECT * FROM Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Complete_Shifts WHERE day <= ?",
                [dt]
            );
        } else if (end_date == '') {
            const dt = new Date(start_date);
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts WHERE ? <= day",
                [dt]
                // `SELECT * FROM Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`
            );
        } else {
            const start_dt = new Date(start_date);
            const end_dt = new Date(end_date);
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts WHERE day BETWEEN ? AND ?",
                // [start_date, end_date]
                [start_dt, end_dt]
            );
        }
        const results = query.map((result: number | string | Date) => {
            return this.convertModel(result);
        });
        return results;
    }

    async find(id: number): Promise<CompleteShift> {
        const result = await this.connection.execute(
            "SELECT * FROM Complete_Shifts WHERE id = ?",
            id
        );
        return result;
    }

    async persist(completeShift: CompleteShift): Promise<CompleteShift> {
        const result = await this.connection.execute(
            "INSERT INTO Complete_Shifts(staff_id, status_id, day) VALUES(?,?,?)",
            [completeShift.staff_id, completeShift.status_id, completeShift.day]
        );
        completeShift.id = result.id;
        return completeShift;
    }

    async update(completeShift: CompleteShift): Promise<CompleteShift> {
        const result = await this.connection.execute(
            "UPDATE Complete_Shifts SET status_id = ?, day = ? WHERE id = ?",
            [completeShift.status_id, completeShift.day, completeShift.id]
        );
        return result;
    }

    async delete(id: number): Promise<CompleteShift> {
        const result = await this.connection.execute(
            "DELETE FROM Complete_Shifts WHERE id = ?",
            id
        );
        return result;
    }

    //staff
    async findAllByStaff(start_date: string, end_date: string): Promise<CompleteShift[]> {
        var query;
        if (start_date == '' && end_date == '') {
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts"
            );
        } else if (start_date == '') {
            const dt = new Date(end_date);
            query = await this.connection.execute(
                // `SELECT * FROM Shifts WHERE day <= STR_TO_DATE(${end_date}, '%Y-%m-%d')`
                "SELECT * FROM Complete_Shifts WHERE day <= ?",
                [dt]
            );
        } else if (end_date == '') {
            const dt = new Date(start_date);
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts WHERE ? <= day",
                [dt]
                // `SELECT * FROM Shifts WHERE STR_TO_DATE(${start_date}, '%Y-%m-%d') <= day`
            );
        } else {
            const start_dt = new Date(start_date);
            const end_dt = new Date(end_date);
            query = await this.connection.execute(
                "SELECT * FROM Complete_Shifts WHERE day BETWEEN ? AND ?",
                // [start_date, end_date]
                [start_dt, end_dt]
            );
        }
        const results = query.map((result: number | string | Date) => {
            return this.convertModel(result);
        });
        return results;
    }
}