export interface NotionEvent {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: string;
  // Add any other fields you need from your Notion database
}

export interface CreateNotionEvent {
  title: string;
  description?: string;
  date?: string;
  status?: string;
}

export interface UpdateNotionEvent extends Partial<CreateNotionEvent> {
  id: string;
}