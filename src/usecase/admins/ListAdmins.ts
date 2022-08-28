import { IAdminRepository } from "../repository/IAdminRepository";

export class ListAdmins {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    execute(){
        return this.adminRepository.findAll();
    }
}