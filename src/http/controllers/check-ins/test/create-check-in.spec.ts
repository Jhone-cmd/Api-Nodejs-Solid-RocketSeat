import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it,  } from "vitest";

describe('Create Check-In (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create a check-in', async () => {
        const { token }  = await createAndAuthenticateUser(app);

       const gymId = await prisma.gym.create({
        data: {
            title: 'JavaScript Gym',
            latitude: -16.0366592,
            longitude: -48.0509952
        }
       })
        
        const response = await request(app.server)
            .post(`/gyms/${gymId.id}/check-in`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -16.0366592,
                longitude: -48.0509952
            });

        expect(response.statusCode).toEqual(201);
    });
});