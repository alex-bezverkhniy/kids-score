
export enum TaskStatus {
    Completed,
    NotStarted
}

export class Task {
    id: number
    title: string
    desc: string
    imgUrl: string

    constructor (init: any) {
        this.id = init?.id;
        this.title = init?.title;
        this.desc = init?.desc;
        this.imgUrl = init?.imgUrl;
    }
}

export class Score {
    id: number
    key: string
    points: number
    taskId: number

    constructor (init: any) {
        this.id = init?.id
        this.key = init?.key;
        this.points = init?.points
        this.taskId = init?.taskId
    }
}

export class TaskScore extends Task {
    status: TaskStatus
    points: number

    constructor (init: any) {
        super(init)
        this.status = init?.status;
        this.points = init?.points;
    }
}

export class UserData {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    role: string

    constructor (init?: any) {
        this.id = init?.id
        this.username = init?.username
        this.email = init?.email
        this.provider = init?.provider
        this.confirmed = init?.confirmed
        this.blocked = init?.blocked
        this.role = init?.role
    }
}