import { Admin } from "../../domain/Admin";
import { IAdminRepository } from "../repository/IAdminRepository";

export class CreateAdmin {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    execute(username: string, password: string) {
        const admin = new Admin(username, password);
        return this.adminRepository.persist(admin);
    }
}