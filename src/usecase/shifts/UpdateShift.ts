import { IShiftRepository } from "../repository/IShiftRepository";

export class UpdateShift {
    private shiftRepository: IShiftRepository;

    constructor(shiftRepository: IShiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    async execute(id: number, status_id: number, day: Date) {
        const shift = await this.shiftRepository.find(id);
        shift.id = id;
        shift.status_id = status_id;
        shift.day = day;
        return this.shiftRepository.update(shift);
    }
}