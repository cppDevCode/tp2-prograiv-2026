import {describe, it, expect, beforeEach} from 'vitest';
import {notify, _getSentNotifications, _clearSentNotifications} from '../../src/services/notificationService';
import {Note} from '../../src/models/Note';

describe('notificationService', () => {
  beforeEach(() => {
    _clearSentNotifications();
  });

  const makeNote = (overrides: Partial<Note> = {}): Note => ({
    id: 1,
    title: 'Comprar azúcar',
    content: 'Antes de las 11hs',
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  });

  it('notify () agrega la nota a la lista de notificaciones enviadas', () => {
    const note = makeNote();
    notify(note);
    const sent = _getSentNotifications();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toEqual(note);

  });

  it ( 'notify() puede acumular varias notas en orden', () => {
    const note1 = makeNote({id: 1, title: 'Primera'});
    const note2 = makeNote({id: 2, title: 'Segunda'});

    notify(note1);
    notify(note2);

    const sent = _getSentNotifications();
    expect(sent).toHaveLength(2);
    expect(sent[0].title).toBe('Primera');
    expect(sent[1].title).toBe('Segunda');
  });

  it('_clearSentNotifications() borra todas las notificaciones enviadas', () => {
    notify(makeNote());
    expect(_getSentNotifications()).toHaveLength(1);

    _clearSentNotifications();

    expect(_getSentNotifications()).toHaveLength(0);
    });
});
