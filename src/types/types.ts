export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type NotionTaskStatus = "Todo" | "In Progress" | "Done";
export type NotionTaskType = "Tarea" | "Personal";

export type CampusEvent = {
  id: string;
  title: string;
  description: string;
  subject: string;
  start_date: Date;
  end_date: Date;
  last_modified: Date;
};

/**
 * Represents an event in Notion with its associated properties.
 */
export type NotionEvent = {
  id: UUID;
  databaseId: UUID;
  cvId?: string;
  title: string;
  description?: string;
  subject?: string;
  status: NotionTaskStatus;
  type: NotionTaskType;
  start_date: Date;
  end_date: Date;
  last_modified: Date;
};

/*
 * Nombres de las columnas en la base de datos
 */

export type NotionType =
  | "title"
  | "rich_text"
  | "select"
  | "status"
  | "date"
  | "last_edited_time"
  | "multi_select"
  | "people"
  | "email"
  | "url"
  | "phone_number"
  | "number"
  | "checkbox"
  | "created_time"
  | "created_by"
  | "created_by_user"
  | "relation";

export type NotionProperty = {
  id: string;
  columnName: string;
  type: NotionType;
  options?: {
    id: string;
    name: string;
    color: string | null;
    description: string | null;
  }[];
};

export type DatabaseColumns = {
  [K in Exclude<
    keyof NotionEvent,
    "id" | "databaseId" | "start_date" | "end_date"
  >]: NotionProperty;
} & {
  date: NotionProperty;
};

/**
 * Represents a Notion database with its associated properties.
 */
export type NotionDatabase = {
  id: UUID;
  name: string;
  icon?: string;
  calendar_url?: string;
  columns: DatabaseColumns | null;
};

export type User = {
  id: UUID;
  name: string;
  image?: string;
  email: string;
  databases?: NotionDatabase[];
};
