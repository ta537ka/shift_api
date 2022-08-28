import { CreateShift } from "../../usecase/shifts/CreateShift";
import { DeleteShift } from "../../usecase/shifts/DeleteShift";
import { GetShift } from "../../usecase/shifts/GetShift";
import { ListShifts } from "../../usecase/shifts/ListShifts";
import { ListShiftsByUser } from "../../usecase/shifts/ListShiftsByUser";
import { UpdateShift } from "../../usecase/shifts/UpdateShift";
import { IDBConnection } from "../database/IDBConnection";
import { ShiftRepository } from "../database/ShiftRepository";
import { ShiftSerializer } from "../serializer/ShiftSerializer";

export class ShiftController {
    private shiftSerializer: ShiftSerializer;
    private shiftRepository: ShiftRepository;

    constructor(dbConnection: IDBConnection) {
        this.shiftSerializer = new ShiftSerializer();
        this.shiftRepository = new ShiftRepository(dbConnection);
    }

    async findAll(req: any, res: any) {
        const { start_date, end_date } = req.body
        const useCase = new ListShifts(this.shiftRepository);
        const results = await useCase.execute(start_date, end_date);
        return results;
    }

    async findShift(req: any, res: any) {
        const id = req.params.id;
        const useCase = new GetShift(this.shiftRepository);
        const result = await useCase.execute(id);
        return result;
    }

    async findShiftByUser(req: any, res: any) {
        const user_id = req.params.user_id;
        const useCase = new ListShiftsByUser(this.shiftRepository);
        const results = await useCase.execute(user_id);
        return results;
    }

    async createShift(req: any, res: any){
        const {user_id, status_id, day} = req.body;
        const useCase = new CreateShift(this.shiftRepository);
        const result = await useCase.execute(user_id,status_id, day);
        return result;
    }

    async updateShift(req: any, res: any){
        const id = req.params.id;
        const {status_id, day} = req.body;
        const useCase = new UpdateShift(this.shiftRepository);
        const result = await useCase.execute(id,status_id,day);
        return result;
    }

    async deleteShift(req: any, res: any){
        const id = req.params.id;
        const useCase = new DeleteShift(this.shiftRepository);
        const result = await useCase.execute(id);
        return result;
    }
}