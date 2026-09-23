import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repositorio = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repositorio);
  });

  it('dvuelve una lista vacía si no hay notas', () => {
    const notes = service.listNotes();

    expect(notes).toEqual([]);
  });

  it('devuelve todas las notas creadas', () => {
    service.createNote({
      title: 'Nota 1',
      content: 'Contenido 1',
    });

    service.createNote({
      title: 'Nota 2',
      content: 'Contenido 2',
    });

    const notes = service.listNotes();

    expect(notes).toHaveLength(2);
    expect(notes[0].title).toBe('Nota 1');
    expect(notes[0].content).toBe('Contenido 1');
    expect(notes[1].title).toBe('Nota 2');
    expect(notes[1].content).toBe('Contenido 2');
  });
});