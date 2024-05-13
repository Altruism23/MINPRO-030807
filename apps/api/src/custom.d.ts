type User = {
    id: number
    isOrganizer: boolean
    username: string
    referralCode: string
}

type Organizer = {
    id: number
    organizername: string
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