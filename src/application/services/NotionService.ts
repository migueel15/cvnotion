import {
  DatabaseColumns,
  type NotionDatabase,
  NotionEvent,
  NotionProperty,
  type UUID,
} from "@/types/types";

import {
  Client,
  type DatabaseObjectResponse,
  isFullDatabase,
} from "@notionhq/client";

interface NotionServiceInterface {
  initialize(token: string): void;
  isInitialized(): boolean;
  reset(): void;
  getDatabase(databaseId: string): Promise<DatabaseObjectResponse | null>;
  getDatabases(): Promise<NotionDatabase[]>;
  getDatabaseProperties(databaseId: UUID): Promise<NotionProperty[] | null>;
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
      "Notion client is not initialized. Call initialize() first.",
    );
  }
}

async function getDatabase(
  databaseId: string,
): Promise<DatabaseObjectResponse | null> {
  checkClient();
  const database = await client?.databases.retrieve({
    database_id: databaseId,
  });
  if (isFullDatabase(database)) {
    return database;
  }
  return null;
}

async function getDatabases(): Promise<NotionDatabase[]> {
  checkClient();
  const databases = await client?.search({
    filter: {
      property: "object",
      value: "database",
    },
  });
  if (!databases) return [];

  const databasesList = databases.results
    .filter(isFullDatabase)
    .map((database): NotionDatabase => {
      try {
        return {
          id: database.id as UUID,
          name: database.title[0].plain_text,
          icon:
            database.icon?.type === "emoji" ? database.icon.emoji : undefined,
          calendar_url: undefined,
          columns: null,
        };
      } catch (error) {
        return {} as NotionDatabase;
      }
    });

  return databasesList;
}

async function getDatabaseProperties(
  databaseId: string,
): Promise<NotionProperty[] | null> {
  checkClient();
  const database = await client?.databases.retrieve({
    database_id: databaseId,
  });
  if (!database) return null;

  if (isFullDatabase(database)) {
    const properties: NotionProperty[] = [];
    for (const [key, value] of Object.entries(database.properties)) {
      let options: NotionProperty["options"] = [];
      if (value.type === "status") {
        options = value.status?.options || [];
      }
      properties.push({
        id: value.id,
        columnName: key,
        type: value.type as NotionProperty["type"],
        options: options,
      });
    }
    return properties;
  }
  return null;
}

const NotionService: NotionServiceInterface = {
  initialize,
  isInitialized,
  reset,
  getDatabase,
  getDatabases,
  getDatabaseProperties,
};

export default NotionService;
