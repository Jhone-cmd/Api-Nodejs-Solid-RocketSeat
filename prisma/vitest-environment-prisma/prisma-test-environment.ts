import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) throw new Error('Please provide DATABASE_URL environment variable');

    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID();
        const databaseUrl =generateDatabaseUrl(schema);
           
        process.env.DATABASE_URL = databaseUrl;
        execSync('yarn prisma migrate deploy');
        
        return {
           async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
           },
        }
    },
}