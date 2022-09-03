"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompleteShiftLog = void 0;
class GetCompleteShiftLog {
    constructor(completeShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }
    execute(id) {
        return this.completeShiftLogRepository.find(id);
    }
}
exports.GetCompleteShiftLog = GetCompleteShiftLog;
