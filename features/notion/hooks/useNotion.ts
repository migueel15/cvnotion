import { useState, useCallback } from 'react';
import { notionService } from '../services/notionService';
import { CreateNotionEvent, NotionEvent, UpdateNotionEvent } from '../types';

export const useNotion = () => {
  const [events, setEvents] = useState<NotionEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedEvents = await notionService.getEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching events');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: CreateNotionEvent) => {
    try {
      setLoading(true);
      setError(null);
      const newEvent = await notionService.createEvent(event);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (event: UpdateNotionEvent) => {
    try {
      setLoading(true);
      setError(null);
      const updatedEvent = await notionService.updateEvent(event);
      setEvents(prev => prev.map(e => e.id === event.id ? updatedEvent : e));
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      await notionService.deleteEvent(eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting event');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
