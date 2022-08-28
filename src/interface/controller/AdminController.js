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
exports.AdminController = void 0;
const CreateAdmin_1 = require("../../usecase/admins/CreateAdmin");
const DeleteAdmin_1 = require("../../usecase/admins/DeleteAdmin");
const GetAdmin_1 = require("../../usecase/admins/GetAdmin");
const ListAdmins_1 = require("../../usecase/admins/ListAdmins");
const UpdateAdmin_1 = require("../../usecase/admins/UpdateAdmin");
const AdminRepository_1 = require("../database/AdminRepository");
const AdminSerializer_1 = require("../serializer/AdminSerializer");
class AdminController {
    constructor(dbConnection) {
        this.adminSerializer = new AdminSerializer_1.AdminSerializer();
        this.adminRepository = new AdminRepository_1.AdminRepository(dbConnection);
    }
    findAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new GetAdmin_1.GetAdmin(this.adminRepository);
            const result = yield useCase.execute(id);
            return this.adminSerializer.serialize(result);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new ListAdmins_1.ListAdmins(this.adminRepository);
            const results = yield useCase.execute();
            return this.adminSerializer.serialize(results);
        });
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const useCase = new CreateAdmin_1.CreateAdmin(this.adminRepository);
            const result = yield useCase.execute(username, password);
            return this.adminSerializer.serialize(result);
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { username, password } = req.body;
            const useCase = new UpdateAdmin_1.UpdateAdmin(this.adminRepository);
            const result = yield useCase.execute(id, username, password);
            return this.adminSerializer.serialize(result);
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const useCase = new DeleteAdmin_1.DeleteAdmin(this.adminRepository);
            const result = yield useCase.execute(id);
            return this.adminSerializer.serialize(result);
        });
    }
}
exports.AdminController = AdminController;
