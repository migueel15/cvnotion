import { Client } from '@notionhq/client';
import { CreateNotionEvent, NotionEvent, UpdateNotionEvent } from '../types';
class NotionService {
  private notion: Client;
  private databaseId: string;

  constructor() {
    const notionToken = "secret_omd6MyMBimZxQakZ37KGI2W1nhRhguHuqr5xOib2PlL";
    this.databaseId = "91f37fa9a9614904b34a8668a1b5583e";
    
    if (!notionToken) {
      throw new Error('Notion token not found in environment variables');
    }

    this.notion = new Client({ auth: notionToken });
  }

  private transformNotionToEvent(page: any): NotionEvent {
    const properties = page.properties;
    return {
      id: page.id,
      title: properties["Nombre de tarea"]?.title[0]?.plain_text || '',
      description: properties.Description?.rich_text[0]?.plain_text || '',
      date: properties["Fecha"]?.date?.start || '',
      status: properties["Estado"]?.status?.name || '',
    };
  }

  async getEvents(): Promise<NotionEvent[]> {
    try {
      const response = await this.notion.databases.query({
        database_id: this.databaseId,
      });

      return response.results.map(this.transformNotionToEvent);
    } catch (error) {
      console.error('Error fetching events from Notion:', error);
      throw error;
    }
  }

  async createEvent(event: CreateNotionEvent): Promise<NotionEvent> {
    try {
      const response = await this.notion.pages.create({
        parent: { database_id: this.databaseId },
        properties: {
          Title: {
            title: [{ text: { content: event.title } }],
          },
          ...(event.description && {
            Description: {
              rich_text: [{ text: { content: event.description } }],
            },
          }),
          ...(event.date && {
            Date: {
              date: { start: event.date },
            },
          }),
          ...(event.status && {
            Status: {
              select: { name: event.status },
            },
          }),
        },
      });

      return this.transformNotionToEvent(response);
    } catch (error) {
      console.error('Error creating event in Notion:', error);
      throw error;
    }
  }

  async updateEvent(event: UpdateNotionEvent): Promise<NotionEvent> {
    try {
      const response = await this.notion.pages.update({
        page_id: event.id,
        properties: {
          ...(event.title && {
            Title: {
              title: [{ text: { content: event.title } }],
            },
          }),
          ...(event.description && {
            Description: {
              rich_text: [{ text: { content: event.description } }],
            },
          }),
          ...(event.date && {
            Date: {
              date: { start: event.date },
            },
          }),
          ...(event.status && {
            Status: {
              select: { name: event.status },
            },
          }),
        },
      });

      return this.transformNotionToEvent(response);
    } catch (error) {
      console.error('Error updating event in Notion:', error);
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      await this.notion.pages.update({
        page_id: eventId,
        archived: true,
      });
    } catch (error) {
      console.error('Error deleting event from Notion:', error);
      throw error;
    }
  }
}

export const notionService = new NotionService();
