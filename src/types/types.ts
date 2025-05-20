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
  /**
   * The unique identifier for the event.
   */
  id: UUID;

  /**
   * The unique identifier for the database containing the event.
   */
  databaseId: UUID;

  /**
   * An optional identifier for the CV associated with the event.
   */
  cvId?: string;

  /**
   * The title of the event.
   */
  title: string;

  /**
   * An optional description of the event.
   */
  description?: string;

  /**
   * An optional subject related to the event.
   */
  subject?: string;

  /**
   * The current status of the event.
   */
  status: NotionTaskStatus;

  /**
   * The type of the event.
   */
  type: NotionTaskType;

  /**
   * The start date and time of the event.
   */
  start_date: Date;

  /**
   * The end date and time of the event.
   */
  end_date: Date;

  /**
   * The date and time when the event was last modified.
   */
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

/**
 * Represents a Notion database with its associated properties.
 */
export type NotionDatabase = {
  /**
   * The unique identifier for the database.
   */
  id: UUID;

  /**
   * The name of the database.
   */
  name: string;

  /**
   * An optional icon representing the database.
   */
  icon?: string;

  /**
   * An optional URL for the campus virutal calendar associated with the database.
   */
  calendar_url?: string;

  /**
   * The columns present in the database.
   */
  columns: NotionColumns;
};

export type User = {
  /**
   * The unique identifier for the user.
   */
  id: UUID;

  /**
   * The name of the user.
   */
  name: string;

  /**
   * The list of Notion databases associated with the user.
   */
  databases: NotionDatabase[];
};
