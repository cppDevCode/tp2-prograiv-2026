import { beforeEach, describe, expect, it } from "vitest";
import { NoteService, NoteServiceImpl } from "../../src/services/NoteService";
import { Database } from "better-sqlite3";
import { createDb } from "../../src/db/connection";
import { Note } from "../../src/models/Note";
import { SqliteNoteRepository } from "../../src/repositories/NoteRepository";

describe('NoteService - deleteNote (Ejercicio 5)', () => {
    let servicio: NoteService;

    beforeEach(() => {
        const db: Database = createDb(':memory:');
        const repositorio: SqliteNoteRepository = new SqliteNoteRepository(db);
        servicio = new NoteServiceImpl(repositorio); 
    });

    it ('Eliminacion de un registro Valido', () => {
       const nota: Note = servicio.createNote({ title: 'Compras', content: '1kg de Harina', pinned: true });
       const registroBorrado = servicio.deleteNote(nota.id);
       expect(registroBorrado).toBe(true);
    });

    it ('Eliminacion de un registro con id inexistente', () =>{
        const registroBorrado = servicio.deleteNote(1991);
        expect(registroBorrado).toBe(false);
    });
});
