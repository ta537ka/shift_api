import { CompleteShift } from "../../domain/CompleteShift";
import { ICompleteShiftRepository } from "../repository/ICompleteShiftRepository";

export class DeleteCompleteShift {
    private completeShiftRepository: ICompleteShiftRepository;

    constructor(completeShiftRepositroy: ICompleteShiftRepository) {
        this.completeShiftRepository = completeShiftRepositroy;
    }

    async execute(id: number) {
        const completeShift = await this.completeShiftRepository.delete(id);
        return completeShift;
    }
}