export interface Chat {
    id: number | null,
    text: string | null,
    userId: number | null,
    members: any[] | null,
    roomId: number | null
}