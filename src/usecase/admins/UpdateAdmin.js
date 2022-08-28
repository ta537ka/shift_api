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
exports.UpdateAdmin = void 0;
class UpdateAdmin {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    execute(id, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.find(id);
            admin.id = id;
            admin.username = username;
            admin.password = password;
            return this.adminRepository.update(admin);
        });
    }
}
exports.UpdateAdmin = UpdateAdmin;
