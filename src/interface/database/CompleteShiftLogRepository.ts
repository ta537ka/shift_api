const dayjs = require('dayjs');
import { CompleteShiftLog } from "../../domain/CompleteShiftLog";
import { ICompleteShiftLogRepository } from "../../usecase/repository/ICompleteShiftLogRepository";
import { IDBConnection } from "./IDBConnection";

export class CompleteShiftLogRepository extends ICompleteShiftLogRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: any) {
        const completeShiftLog = new CompleteShiftLog();
        completeShiftLog.id = r.id;
        completeShiftLog.info = r.info;
        completeShiftLog.updated_at = r.updated_at;
        return completeShiftLog;
    }

    //admin and staff
    async findAll(): Promise<CompleteShiftLog[]> {
        const query = await this.connection.execute(
            "SELECT * FROM Complete_Shift_Logs ORDER BY updated_at DESC"
        );
        const results = query.map((result: any) => {
            return this.convertModel(result);
        });
        return results;
    }

    async find(id: number): Promise<CompleteShiftLog> {
        const result = await this.connection.execute(
            "SELECT * FROM Complete_Shift_Logs WHERE id = ?",
            id
        );
        return result;
    }

    //admin
    async persist(completeShiftLog: CompleteShiftLog): Promise<CompleteShiftLog> {
        completeShiftLog.updated_at = dayjs().format("YYYY-MM-DD");
        const result = await this.connection.execute(
            "INSERT INTO Complete_Shift_Logs(info, updated_at) VALUES(?,?)",
            [completeShiftLog.info, completeShiftLog.updated_at]
        );
        return result;
    }

    async update(completeShiftLog: CompleteShiftLog): Promise<CompleteShiftLog> {
        completeShiftLog.updated_at = dayjs().format("YYYY-MM-DD");
        const result = await this.connection.execute(
            "UPDATE Complete_Shift_Logs SET info = ?, updated_at = ? WHERE id = ?",
            [completeShiftLog.info, completeShiftLog.updated_at, completeShiftLog.id]
        );
        return result;
    }

    async delete(id: number): Promise<CompleteShiftLog> {
        const result = await this.connection.execute(
            "DELETE FROM Complete_Shift_Logs WHERE id = ?",
            id
        );
        return this.convertModel(result);
    }
}