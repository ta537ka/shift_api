import { CompleteShift } from "../../domain/CompleteShift";
import { ICompleteShiftRepository } from "../repository/ICompleteShiftRepository";

export class UpdateCompleteShift {
    private completeShiftRepository: ICompleteShiftRepository;

    constructor(completeShiftRepositroy: ICompleteShiftRepository) {
        this.completeShiftRepository = completeShiftRepositroy;
    }

    async execute(id: number, status_id: number, day: Date) {
        const completeShift = await this.completeShiftRepository.find(id);
        completeShift.id = id;
        completeShift.status_id = status_id;
        completeShift.day = day;
        return this.completeShiftRepository.update(completeShift);
    }
}