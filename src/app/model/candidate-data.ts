import { User } from './user';
import { Location } from 'src/app/model/location';
import { Institution } from './institution';
export interface CandidateData{
    candidateId: number,
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    feedback: string,
    skillSet: object,
    location: Location,
    institution: Institution,
    user: User,
    isActive: boolean
}
