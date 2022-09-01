"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompleteShift = void 0;
const CompleteShift_1 = require("../../domain/CompleteShift");
class CreateCompleteShift {
    constructor(completeShiftRepositroy) {
        this.completeShiftRepository = completeShiftRepositroy;
    }
    execute(staff_id, status_id, day) {
        const completeShift = new CompleteShift_1.CompleteShift(staff_id, status_id, day);
        return this.completeShiftRepository.persist(completeShift);
    }
}
exports.CreateCompleteShift = CreateCompleteShift;
