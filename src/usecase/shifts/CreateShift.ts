import { Shift } from "../../domain/Shift";
import { IShiftRepository } from "../repository/IShiftRepository";

export class CreateShift {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    execute(staff_id: number, status_id: number, day: Date) {
        const shift = new Shift(staff_id, status_id, day);
        return this.shiftRepository.persist(shift);
    }
}