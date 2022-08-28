import { ShiftStatus } from "../../domain/ShiftStatus";
import { IShiftStatusRepository } from "../../usecase/repository/IShiftStatusRepository";
import { IDBConnection } from "./IDBConnection";

export class ShiftStatusRepository extends IShiftStatusRepository {
    private connection: any;

    constructor(connection: IDBConnection) {
        super();
        this.connection = connection;
    }

    private convertModel(r: any) {
        const shiftStatus = new ShiftStatus();
        shiftStatus.id = r.id;
        shiftStatus.status = r.status;
        return shiftStatus;
    }

    async find(id: number): Promise<ShiftStatus> {
        const result = await this.connection.execute(
            "SELECT * FROM Shift_Statuses WHERE id = ?",
            id
        );
        return result;
    }

    async findAll(): Promise<ShiftStatus[]> {
        const query = await this.connection.execute("SELECT * FROM Shift_Statuses");
        const results = query.map((result: any) => {
            return this.convertModel(result);
        })
        return results;
    }

    async persist(shiftStatus: ShiftStatus): Promise<ShiftStatus> {
        const result = await this.connection.execute(
            "INSERT INTO Shift_Statuses(status) VALUES(?)",
            shiftStatus.status
        )
        shiftStatus.id = result.id;
        return result;
    }

    async update(shiftStatus: ShiftStatus): Promise<ShiftStatus> {
        const result = await this.connection.execute(
            'UPDATE Shift_Statuses SET status = ? WHERE id = ?',
            [shiftStatus.status, shiftStatus.id]
        )
        return result;
    }

    async delete(id: number): Promise<ShiftStatus> {
        const result = await this.connection.execute(
            "DELETE FROM Shift_Statuses WHERE id = ?",
            id
        )
        return result;
    }
}