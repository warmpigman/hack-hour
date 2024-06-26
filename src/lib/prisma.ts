import { PrismaClient } from '@prisma/client';
import cuid2 from '@paralleldrive/cuid2';

declare global {
    namespace PrismaJson {
        type SessionMetadata = {
            work: string,
            slack: {
                template: string,
                controllerTemplate: string,
                attachment?: string,
            },
            airtable?: {
                id: string,
                status: string,
                reason: string
            },
            firstTime?: {
                step: number
            }
            banked: boolean, 
        }
        type UserMetadata = {
            airtable?: {
                id: string
            },
            ships: {
                [shipTs: string]: string
            },
            firstTime: boolean,
        }
        type LogData = {
            // TODO
        }
        type ScrapbookMetadata = {
            record: string,
            attachments: string[]
        }
    }
}

export const prisma = new PrismaClient().$extends({
    query: {
        async $allOperations({ model, operation, args, query }) {
            const before = Date.now()
            const result = await query(args)
            const after = Date.now()
            console.log(`Query ${model}.${operation} took ${after - before}ms`)
            return result
        },
    },
});

cuid2.init();

export const uid = () => { return cuid2.createId() };