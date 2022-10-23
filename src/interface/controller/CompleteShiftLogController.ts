const dayjs = require("dayjs");
import { CreateCompleteShiftLog } from "../../usecase/complete_shift_logs/CreateCompleteShiftLog";
import { DeleteCompleteShiftLog } from "../../usecase/complete_shift_logs/DeleteCompleteShiftLog";
import { GetCompleteShiftLog } from "../../usecase/complete_shift_logs/GetCompleteShiftLog";
import { ListCompleteShiftLogs } from "../../usecase/complete_shift_logs/ListCompleteShiftLogs";
import { UpdateCompleteShiftLog } from "../../usecase/complete_shift_logs/UpdateCompleteShiftLog";
import { CompleteShiftLogRepository } from "../database/CompleteShiftLogRepository";
import { IDBConnection } from "../database/IDBConnection";
import { CompleteShiftLogSerializer } from "../serializer/CompleteShiftLogSerializer";

export class CompleteShiftLogController {
    private completeShiftLogSerializer: CompleteShiftLogSerializer;
    private completeShiftLogRepository: CompleteShiftLogRepository;

    constructor(dbConnection: IDBConnection) {
        this.completeShiftLogSerializer = new CompleteShiftLogSerializer();
        this.completeShiftLogRepository = new CompleteShiftLogRepository(dbConnection);
    }

    //admin and staff
    async findAll(req: any, res: any) {
        const useCase = new ListCompleteShiftLogs(this.completeShiftLogRepository);
        const results = await useCase.execute();
        return this.completeShiftLogSerializer.serialize(results);
    }

    async findCompleteShiftLog(req: any, res: any) {
        const id: number = req.params.id;
        const useCase = new GetCompleteShiftLog(this.completeShiftLogRepository);
        const result = await useCase.execute(id);
        return this.completeShiftLogSerializer.serialize(result);
    }

    //admin
    async createCompleteShiftLog(req: any, res: any) {
        const updated_at: Date = dayjs().format("YYYY-MM-DD");
        const info: string = req.body;
        const useCase = new CreateCompleteShiftLog(this.completeShiftLogRepository);
        const result = await useCase.execute(info, updated_at);
        return this.completeShiftLogSerializer.serialize(result);
    }

    async updateCompleteShiftLog(req: any, res: any) {
        const id: number = req.params.id;
        const info: string = req.body;
        const updated_at: Date = dayjs().format("YYYY-MM-DD");
        const useCase = new UpdateCompleteShiftLog(this.completeShiftLogRepository);
        const result = await useCase.execute(id, info, updated_at);
        return this.completeShiftLogSerializer.serialize(result);
    }

    async DeleteCompleteShiftLog(req: any, res: any) {
        const id: number = req.params.id;
        const useCase = new DeleteCompleteShiftLog(this.completeShiftLogRepository);
        const result = await useCase.execute(id);
        return this.completeShiftLogSerializer.serialize(result);
    }
}