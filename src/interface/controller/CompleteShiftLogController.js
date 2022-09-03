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
exports.CompleteShiftLogController = void 0;
const dayjs = require("dayjs");
const CreateCompleteShiftLog_1 = require("../../usecase/complete_shift_logs/CreateCompleteShiftLog");
const DeleteCompleteShiftLog_1 = require("../../usecase/complete_shift_logs/DeleteCompleteShiftLog");
const GetCompleteShiftLog_1 = require("../../usecase/complete_shift_logs/GetCompleteShiftLog");
const ListCompleteShiftLogs_1 = require("../../usecase/complete_shift_logs/ListCompleteShiftLogs");
const UpdateCompleteShiftLog_1 = require("../../usecase/complete_shift_logs/UpdateCompleteShiftLog");
const CompleteShiftLogRepository_1 = require("../database/CompleteShiftLogRepository");
const CompleteShiftLogSerializer_1 = require("../serializer/CompleteShiftLogSerializer");
class CompleteShiftLogController {
    constructor(dbConnection) {
        this.completeShiftLogSerializer = new CompleteShiftLogSerializer_1.CompleteShiftLogSerializer();
        this.completeShiftLogRepository = new CompleteShiftLogRepository_1.CompleteShiftLogRepository(dbConnection);
    }
    //admin and staff
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new ListCompleteShiftLogs_1.ListCompleteShiftLogs(this.completeShiftLogRepository);
            const results = yield useCase.execute();
            return this.completeShiftLogSerializer.serialize(results);
        });
    }
    findCompleteShiftLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new GetCompleteShiftLog_1.GetCompleteShiftLog(this.completeShiftLogRepository);
            const result = yield useCase.execute(id);
            return this.completeShiftLogSerializer.serialize(result);
        });
    }
    //admin
    createCompleteShiftLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated_at = dayjs().format("YYYY-MM-DD");
            const info = req.body;
            const useCase = new CreateCompleteShiftLog_1.CreateCompleteShiftLog(this.completeShiftLogRepository);
            const result = yield useCase.execute(info, updated_at);
            return this.completeShiftLogSerializer.serialize(result);
        });
    }
    updateCompleteShiftLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const info = req.body;
            const updated_at = dayjs().format("YYYY-MM-DD");
            const useCase = new UpdateCompleteShiftLog_1.UpdateCompleteShiftLog(this.completeShiftLogRepository);
            const result = yield useCase.execute(id, info, updated_at);
            return this.completeShiftLogSerializer.serialize(result);
        });
    }
    DeleteCompleteShiftLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new DeleteCompleteShiftLog_1.DeleteCompleteShiftLog(this.completeShiftLogRepository);
            const result = yield useCase.execute(id);
            return this.completeShiftLogSerializer.serialize(result);
        });
    }
}
exports.CompleteShiftLogController = CompleteShiftLogController;
