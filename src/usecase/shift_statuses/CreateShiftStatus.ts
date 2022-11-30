import { ShiftStatus } from "../../domain/ShiftStatus";
import { IShiftStatusRepository } from "../repository/IShiftStatusRepository";

export class CreateShiftStatus {
    private shiftStatusRepository: IShiftStatusRepository;

    constructor(shiftStatusRepository: IShiftStatusRepository) {
        this.shiftStatusRepository = shiftStatusRepository;
    }

    execute(status: string) {
        const shiftStatus = new ShiftStatus(status);
        return this.shiftStatusRepository.persist(shiftStatus);
    }
}