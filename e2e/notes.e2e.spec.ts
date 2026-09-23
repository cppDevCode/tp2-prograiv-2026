import {test, expect} from '@playwright/test';
import {resetAndSeed} from './helpers';

test.describe('Notas - Flujo E2E (Ejercicio 7)', () => {
    test.beforeEach(async ({ baseURL}) => {
        await resetAndSeed(baseURL!);
    });

    test('Happy path: Crear una nota, leerla, editarla y borrarla', async ({ request }) => {
        //Crear una nota
        const createRes = await request.post('/notes', {
            data: {
                title: 'Comprar yerba',
                content: 'Antes de las 16hs'}
        });
        expect(createRes.status()).toBe(201);
        const created = await createRes.json();
        expect(created.id).toBeDefined();

        //Leer nota 
        const getRes = await request.get(`/notes/${created.id}`);
        expect(getRes.status()).toBe(200);
        const fetched = await getRes.json();
        expect(fetched.title).toBe('Comprar yerba');

        //Editar nota
        const patchRes = await request.patch(`/notes/${created.id}`, {
            data: {
                content: 'Antes de las 16hs'}
        });
        expect(patchRes.status()).toBe(200);
        const updated = await patchRes.json();
        expect(updated.content).toBe('Antes de las 16hs');
        expect(updated.title).toBe('Comprar yerba');

        //Borrar nota
        const deleteRes = await request.delete(`/notes/${created.id}`);
        expect(deleteRes.status()).toBe(204);

        //Verificar que la nota fue borrada
        const getAfterDeleteRes = await request.get(`/notes/${created.id}`);
        expect(getAfterDeleteRes.status()).toBe(404);
    });


    test('caso de error: GET con id inexistente', async ({ request }) => {
        const res = await request.get('/notes/999');
        expect(res.status()).toBe(404);
        const body = await res.json();
        expect(body.error).toBe('NotFound');
    });
});