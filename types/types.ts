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
  title: string;
  description: string;
  cvId: string;
  subject: string;
  status: string;
  type: string;
  start_date: string;
  end_date: string;
  last_modified: string;
};

export type NotionDatabase = {
  id: UUID;
  name: string;
  icon?: string;
  columns: NotionColumns;
};

export type User = {
  id: UUID;
  name: string;
  databases: NotionDatabase[];
};
