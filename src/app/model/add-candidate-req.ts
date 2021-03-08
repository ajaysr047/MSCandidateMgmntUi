export interface AddCandidateReq {
    candidateId: number,
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    feedback: string,
    skillSet: string[],
    joiningLocationId: number,
    institutionId: number,
    createdUserId: number,
    isActive: boolean
}
