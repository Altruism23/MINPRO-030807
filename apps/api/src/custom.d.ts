type User = {
    id: number
    isOrganizer: boolean
    username: string
    referralCode: string
    email: string
}

type Organizer = {
    id: number
    organizerName: string
    isUser: boolean
    email: string
}

type Events = {
    id: number
    name: string
    description: string
    location: string 
}

declare namespace Express {
    export interface Request {
        user?: User
        organizer?: Organizer
        event?: Events
    }
}