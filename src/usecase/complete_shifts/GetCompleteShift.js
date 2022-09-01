"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompleteShift = void 0;
class GetCompleteShift {
    constructor(completeShiftRepositroy) {
        this.completeShiftRepository = completeShiftRepositroy;
    }
    execute(id) {
        return this.completeShiftRepository.find(id);
    }
}
exports.GetCompleteShift = GetCompleteShift;
