import { CompleteShift } from "../../domain/CompleteShift";
import { ICompleteShiftRepository } from "../repository/ICompleteShiftRepository";

export class CreateCompleteShift {
    private completeShiftRepository: ICompleteShiftRepository;

    constructor(completeShiftRepositroy: ICompleteShiftRepository) {
        this.completeShiftRepository = completeShiftRepositroy;
    }

    execute(staff_id: number, status_id: number, day: Date) {
        const completeShift = new CompleteShift(staff_id, status_id, day);
        return this.completeShiftRepository.persist(completeShift);
    }
}