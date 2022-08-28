"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShift = void 0;
const Shift_1 = require("../../domain/Shift");
class CreateShift {
    constructor(shiftRepository) {
        this.shiftRepository = shiftRepository;
    }
    execute(staff_id, status_id, day) {
        const shift = new Shift_1.Shift(staff_id, status_id, day);
        return this.shiftRepository.persist(shift);
    }
}
exports.CreateShift = CreateShift;
