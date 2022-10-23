import { CreateCompleteShift } from "../../usecase/complete_shifts/CreateCompleteShift";
import { DeleteCompleteShift } from "../../usecase/complete_shifts/DeleteCompleteShift";
import { GetCompleteShift } from "../../usecase/complete_shifts/GetCompleteShift";
import { ListCompleteShiftsByAdmin } from "../../usecase/complete_shifts/ListCompleteShiftsByAdmin";
import { ListCompleteShiftsByStaff } from "../../usecase/complete_shifts/ListCompleteShiftsByStaff";
import { UpdateCompleteShift } from "../../usecase/complete_shifts/UpdateCompleteShift";
import { CompleteShiftRepository } from "../database/CompleteShiftRepository";
import { IDBConnection } from "../database/IDBConnection";
import { CompleteShiftSerializer } from "../serializer/CompleteShiftSerializer";

export class CompleteShiftController {
    private completeShiftSerializer: CompleteShiftSerializer;
    private completeShfitRepository: CompleteShiftRepository;

    constructor(dbConnection: IDBConnection) {
        this.completeShiftSerializer = new CompleteShiftSerializer();
        this.completeShfitRepository = new CompleteShiftRepository(dbConnection);
    }

    //admin
    async findAllByAdmin(req: any, res: any) {
        const { start_date, end_date } = req.body;
        const useCase = new ListCompleteShiftsByAdmin(this.completeShfitRepository);
        const results = await useCase.execute(start_date, end_date);
        return this.completeShiftSerializer.serialize(results);
    }

    async findCompleteShift(req: any, res: any) {
        const id: number = req.parans.id;
        const useCase = new GetCompleteShift(this.completeShfitRepository);
        const result = await useCase.execute(id);
        return this.completeShiftSerializer.serialize(result);
    }

    async createCompleteShift(req: any, res: any) {
        const { staff_id, status_id, day } = req.body;
        const useCase = new CreateCompleteShift(this.completeShfitRepository);
        const result = await useCase.execute(staff_id, status_id, day);
        return this.completeShiftSerializer.serialize(result);
    }

    async updateCompleteShit(req: any, res: any) {
        const id: number = req.params.id;
        const { status_id, day } = req.body;
        const useCase = new UpdateCompleteShift(this.completeShfitRepository);
        const result = await useCase.execute(id, status_id, day);
        return this.completeShiftSerializer.serialize(result);
    }

    async deleteCompleteShift(req: any, res: any) {
        const id: number = req.params.id;
        const useCase = new DeleteCompleteShift(this.completeShfitRepository);
        const result = await useCase.execute(id);
        return this.completeShiftSerializer.serialize(result);
    }


    //staff
    async findAllByStaff(req: any, res: any) {
        const { start_date, end_date } = req.body;
        const useCase = new ListCompleteShiftsByStaff(this.completeShfitRepository);
        const results = await useCase.execute(start_date, end_date);
        return this.completeShiftSerializer.serialize(results);
    }
}