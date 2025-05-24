import {
  NotionColumns,
  NotionDatabase,
  NotionEvent,
  UUID,
} from "@/types/types";

import {
  Client,
  DatabaseObjectResponse,
  isFullDatabase,
} from "@notionhq/client";

interface NotionServiceInterface {
  initialize(token: string): void;
  isInitialized(): boolean;
  reset(): void;
  getDatabase(databaseId: string): Promise<DatabaseObjectResponse | null>;
  // getDatabases(): Promise<NotionDatabase[]>;
  getDatabaseProperties(
    databaseId: UUID
  ): Promise<DatabaseObjectResponse["properties"] | null>;
  // addDatabaseProperty(
  //   databaseId: UUID,
  //   property: Partial<NotionColumns>
  // ): Promise<void>;
  // getDatabaseEvents(databaseId: UUID): Promise<NotionEvent[]>;
  // getDatabaseEventsFiltered(
  //   databaseId: UUID,
  //   filter: any
  // ): Promise<NotionEvent[]>;
  // createEvent(databaseId: UUID, event: NotionEvent): Promise<void>;
  // updateEvent(event: NotionEvent): Promise<void>;
  // deleteEvent(event: NotionEvent): Promise<void>;
}

let client: Client | null = null;

function initialize(token: string): void {
  client = new Client({ auth: token });
}

function isInitialized(): boolean {
  return !!client;
}

function reset(): void {
  client = null;
}

function checkClient() {
  if (!client) {
    throw new Error(
      "Notion client is not initialized. Call initialize() first."
    );
  }
}

async function getDatabase(
  databaseId: string
): Promise<DatabaseObjectResponse | null> {
  checkClient();
  const database = await client!.databases.retrieve({
    database_id: databaseId,
  });
  if (isFullDatabase(database)) {
    return database;
  }
  return null;
}

async function getDatabaseProperties(
  databaseId: string
): Promise<DatabaseObjectResponse["properties"] | null> {
  checkClient();
  const database = await client!.databases.retrieve({
    database_id: databaseId,
  });
  if (isFullDatabase(database)) {
    return database.properties;
  }
  return null;
}

const NotionService: NotionServiceInterface = {
  initialize,
  isInitialized,
  reset,
  getDatabase,
  getDatabaseProperties,
};

export default NotionService;
