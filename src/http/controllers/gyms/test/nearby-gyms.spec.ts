import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it,  } from "vitest";

describe('Nearby Gyms (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able list nearby gyms', async () => {
        const { token }  = await createAndAuthenticateUser(app, true);
        
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Gym for JavaScript',
                phone: '1199999999',
                latitude: -16.0366592,
                longitude: -48.0509952
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Gym for JavaScript',
                phone: '1199999999',
                latitude: -15.8269972,
                longitude: -48.1397165
                
        });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({ 
                latitude: -16.0366592,
                longitude: -48.0509952
             })
            .set('Authorization', `Bearer ${token}`)
            .send()
            
        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([expect.objectContaining({
            title: 'JavaScript Gym',
        })]);
    });
});