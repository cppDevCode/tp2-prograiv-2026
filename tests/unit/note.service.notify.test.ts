import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));

describe('NoteService - createNote + notify (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();

    const db = createDb(':memory:');
    const repositorio = new SqliteNoteRepository(db);

    service = new NoteServiceImpl(repositorio);
  });

  it('crea una nota y llama a notify si está pinned', () => {
    const note = service.createNote({
      title: 'Importante',
      content: 'Urgente',
      pinned: true,
    });

    expect(note.title).toBe('Importante');
    expect(note.content).toBe('Urgente');
    expect(note.pinned).toBe(true);

    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(note);
  });

  it('crea una nota pero no llama a notify si no está pinned', () => {
    const note = service.createNote({
      title: 'Normal',
      content: 'Sin urgencia',
    });

    expect(note.title).toBe('Normal');
    expect(note.content).toBe('Sin urgencia');

    expect(notify).not.toHaveBeenCalled();
  });
});