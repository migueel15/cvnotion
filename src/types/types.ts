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
export type NotionColumns = {
  title: {columnName:string, type:"title"}
  description: {columnName:string, type:"rich_text"}
  cvId: {columnName:string, type:"rich_text"}
  subject: {columnName:string, type:"select"}
  status: {columnName:string, type:"status"}
  type: {columnName:string, type:"select"}
  start_date: {columnName:string, type:"date"}
  end_date: {columnName:string, type:"date"}
  last_modified: {columnName:string, type:"last_edited_time"}
};

/**
 * Represents a Notion database with its associated properties.
 */
export type NotionDatabase = {
  id: UUID;
  name: string;
  icon?: string;
  calendar_url?: string;
  columns: NotionColumns;
};

export type User = {
  id: UUID;
  name: string;
  image?: string;
  email: string;
  databases?: NotionDatabase[];
};
