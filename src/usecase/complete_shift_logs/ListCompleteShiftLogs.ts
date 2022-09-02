import { ICompleteShiftLogRepository } from "../repository/ICompleteShiftLogRepository";

export class ListCompleteShiftLogs {
    private completeShiftLogRepository: ICompleteShiftLogRepository;

    constructor(completeShiftLogRepository: ICompleteShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }

    execute() {
        return this.completeShiftLogRepository.findAll();
    }
}