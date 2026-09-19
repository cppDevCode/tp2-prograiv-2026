import { describe, beforeEach, it, expect } from "vitest";
import { NoteServiceImpl, NoteService } from "../../src/services/NoteService";
import { createDb } from "../../src/db/connection";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository";
import { Note } from "../../src/models/Note";
import { Database } from "better-sqlite3";

// ALB: Se opto por explicitar los tipos de declaraciones a fin de facilitar la legibilidad y evitar en algunos casos que TS 
// infiera al tipo ANY

describe("NoteService - updateNote (Ejercicio 4)", () => {
    let servicio: NoteService;

    beforeEach(() => {
        const db: Database = createDb(':memory:');
        const repositorio: SqliteNoteRepository = new SqliteNoteRepository(db);
        servicio = new NoteServiceImpl(repositorio);
    });

    it('Actualiza solo Title', () => {
        const nota: Note = servicio.createNote({ title: 'Farenheit 451', content: 'Lo siento ya fue quemado ;-)', pinned: true });
        const notaUpdate: Note | undefined = servicio.updateNote(1, { title: '1984 Is Now' }); 
        expect(notaUpdate).toBeDefined()
        expect(notaUpdate?.title).toBe('1984 Is Now');
        expect(notaUpdate?.content).toBe(nota.content);
        expect(notaUpdate?.pinned).toBe(nota.content);
    });

    it('Actualiza solo Content', () => {
      const nota: Note = servicio.createNote({ title: 'Farenheit 451', content: 'Lo siento ya fue quemado ;-)', pinned: true });
      const notaUpdate: Note | undefined = servicio.updateNote(1, { content: 'Ups! modifique el contenido Solamente ;-)' });
      expect(notaUpdate).toBeDefined();
      expect(notaUpdate?.title).toBe(nota.title);
      expect(notaUpdate?.content).toBe('Ups! modifique el contenido Solamente ;-)');
      expect(notaUpdate?.pinned).toBe(nota.title);
    });

    it('Actualiza solo pinned', () => {
        const nota: Note = servicio.createNote({ title: 'Farenheit 451', content: 'Lo siento ya fue quemado ;-)', pinned: true });
        const notaUpdate: Note | undefined = servicio.updateNote(1, { pinned: false });
        expect(notaUpdate).toBeDefined();
        expect(notaUpdate?.pinned).toBe('false');
        expect(notaUpdate?.title).toBe(nota.title);
        expect(nota.content).toBe(nota.content);
    });

    it('Actualizacion con Id Inexistente', () => {
        const notaUpdate: Note | undefined = servicio.updateNote(999, { title: 'Un nuevo mundo Felix' });
        expect(notaUpdate).toBeUndefined();
    });

    it('Actualizacion con Objeto Note Vacio', () => {
        const nota: Note = servicio.createNote({ title: 'I Robot', content: 'habla de un robot XD', pinned: false });
        const notaUpdate: Note | undefined = servicio.updateNote(1, {});
        expect(notaUpdate).toBeUndefined();
    });

});
