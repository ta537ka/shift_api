"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompleteShiftLog = void 0;
const CompleteShiftLog_1 = require("../../domain/CompleteShiftLog");
class CreateCompleteShiftLog {
    constructor(completeShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }
    execute(info, updated_at) {
        const completeShiftLog = new CompleteShiftLog_1.CompleteShiftLog(info, updated_at);
        return this.completeShiftLogRepository.persist(completeShiftLog);
    }
}
exports.CreateCompleteShiftLog = CreateCompleteShiftLog;
