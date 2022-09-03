"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCompleteShiftLogs = void 0;
class ListCompleteShiftLogs {
    constructor(completeShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }
    execute() {
        return this.completeShiftLogRepository.findAll();
    }
}
exports.ListCompleteShiftLogs = ListCompleteShiftLogs;
