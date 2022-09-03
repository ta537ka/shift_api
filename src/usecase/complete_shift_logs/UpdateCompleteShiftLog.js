"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompleteShiftLog = void 0;
class UpdateCompleteShiftLog {
    constructor(completeShiftLogRepository) {
        this.completeShiftLogRepository = completeShiftLogRepository;
    }
    execute(id, info, updated_at) {
        return __awaiter(this, void 0, void 0, function* () {
            const completeShiftLog = yield this.completeShiftLogRepository.find(id);
            completeShiftLog.id = id;
            completeShiftLog.info = info;
            completeShiftLog.updated_at = updated_at;
            return this.completeShiftLogRepository.update(completeShiftLog);
        });
    }
}
exports.UpdateCompleteShiftLog = UpdateCompleteShiftLog;
