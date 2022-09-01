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
exports.CompleteShiftController = void 0;
const CreateCompleteShift_1 = require("../../usecase/complete_shifts/CreateCompleteShift");
const DeleteCompleteShift_1 = require("../../usecase/complete_shifts/DeleteCompleteShift");
const GetCompleteShift_1 = require("../../usecase/complete_shifts/GetCompleteShift");
const ListCompleteShiftsByAdmin_1 = require("../../usecase/complete_shifts/ListCompleteShiftsByAdmin");
const ListCompleteShiftsByStaff_1 = require("../../usecase/complete_shifts/ListCompleteShiftsByStaff");
const UpdateCompleteShift_1 = require("../../usecase/complete_shifts/UpdateCompleteShift");
const CompleteShiftRepository_1 = require("../database/CompleteShiftRepository");
const CompleteShiftSerializer_1 = require("../serializer/CompleteShiftSerializer");
class CompleteShiftController {
    constructor(dbConnection) {
        this.completeShiftSerializer = new CompleteShiftSerializer_1.CompleteShiftSerializer();
        this.completeShfitRepository = new CompleteShiftRepository_1.CompleteShiftRepository(dbConnection);
    }
    //admin
    findAllByAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start_date, end_date } = req.body;
            const useCase = new ListCompleteShiftsByAdmin_1.ListCompleteShiftsByAdmin(this.completeShfitRepository);
            const results = yield useCase.execute(start_date, end_date);
            return this.completeShiftSerializer.serialize(results);
        });
    }
    findCompleteShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.parans.id;
            const useCase = new GetCompleteShift_1.GetCompleteShift(this.completeShfitRepository);
            const result = yield useCase.execute(id);
            return this.completeShiftSerializer.serialize(result);
        });
    }
    createCompleteShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { staff_id, status_id, day } = req.body;
            const useCase = new CreateCompleteShift_1.CreateCompleteShift(this.completeShfitRepository);
            const result = yield useCase.execute(staff_id, status_id, day);
            return this.completeShiftSerializer.serialize(result);
        });
    }
    updateCompleteShit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { status_id, day } = req.body;
            const useCase = new UpdateCompleteShift_1.UpdateCompleteShift(this.completeShfitRepository);
            const result = yield useCase.execute(id, status_id, day);
            return this.completeShiftSerializer.serialize(result);
        });
    }
    deleteCompleteShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new DeleteCompleteShift_1.DeleteCompleteShift(this.completeShfitRepository);
            const result = yield useCase.execute(id);
            return this.completeShiftSerializer.serialize(result);
        });
    }
    //staff
    findAllByStaff(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start_date, end_date } = req.body;
            const useCase = new ListCompleteShiftsByStaff_1.ListCompleteShiftsByStaff(this.completeShfitRepository);
            const results = yield useCase.execute(start_date, end_date);
            return this.completeShiftSerializer.serialize(results);
        });
    }
}
exports.CompleteShiftController = CompleteShiftController;
