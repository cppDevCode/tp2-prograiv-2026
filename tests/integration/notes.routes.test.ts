import request from "supertest";
import { Application } from "express";
import { makeApp } from "../../src/app";
import { describe, expect, it } from "vitest";

describe('PATCH /notes/:id', () => {
    it ('Responde 200 (ok) y actualiza parcialmente una nota', async() => {
        const app: Application = makeApp(':memory:');

        const postNota = await request(app).post('/notes')
        .send({ title: 'Recital Billy Joel - 30/12', content: 'Comprar Entradas'});
        const id: number = postNota.body.id;

        const updateNota = await request(app).patch(`/notes/${id}`).send({ title: 'Recital Silvio Rodriguez - 30/1'});        
        expect(updateNota.status).toBe(200);
        expect(updateNota.body?.title).toBe('Recital Silvio Rodriguez - 30/1');
        expect(updateNota.body?.content).toBe('Comprar Entradas');
    });

    it ('Responde 404 (No encontrado) si el ID no existe', async () => {
        const app: Application = makeApp(':memory:');

        const updateNota = await request(app).patch('/notes/1991').send({ title: 'Recital de Queen - 28/2'});
        expect(updateNota.status).toBe(404);
    });

    it ('Responde 400 si mandamos titulo vacio', async () => {
        const app: Application = makeApp(':memory:');
        
        const postNota= await request(app).post('/notes').send({ title: 'Recital de Roger Waters - 30/11', content: 'Us + Them Tour'});
        const id: number = postNota.body.id;

        const updateNota = await request(app).patch(`/notes/${id}`).send({ title: '' });
        expect(updateNota.status).toBe(400);
    });
});
