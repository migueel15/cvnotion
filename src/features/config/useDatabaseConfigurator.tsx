import NotionService from "@/application/services/NotionService";
import type {
  DatabaseColumns,
  NotionDatabase,
  NotionProperty,
} from "@/types/types";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

type FormSection = "database" | "properties" | "campus";

const useDatabaseConfigurator = () => {
  const [section, setSection] = useState<FormSection>("database");
  const [databases, setDatabases] = useState<NotionDatabase[]>([]);
  const [currentDatabase, setCurrentDatabase] = useState<NotionDatabase | null>(
    null,
  );
  const [attributes, setAttributes] = useState<DatabaseColumns | null>(null);
  const [properties, setProperties] = useState<NotionProperty[]>([]);
  const [campusCalendarUrl, setCampusCalendarUrl] = useState("");

  const notionService = NotionService;
  const auth = useAuth();

  const initializeDatabaseConfigProcces = async () => {
    const databases = await notionService.getDatabases();
    if (!databases) {
      console.error("Error retrieving databases from user");
      return;
    }
    setDatabases(databases);
  };

  const setDatabaseProperties = async () => {
    if (!currentDatabase) {
      return;
    }
    const properties = await notionService.getDatabaseProperties(
      currentDatabase.id,
    );
    if (!properties) {
      console.error("No properties found for database id");
      return;
    }
    setProperties(properties);
  };

  const selectDatabase = (database: NotionDatabase) => {
    if (currentDatabase?.id === database.id) {
      setCurrentDatabase(null);
    } else {
      setCurrentDatabase(database);
    }
  };

  const changeSection = (sec?: FormSection) => {
    if (!sec) {
      if (section === "database") {
        setSection("properties");
        return;
      }
      if (section === "properties") {
        setSection("campus");
        return;
      }
      return;
    }
    setSection(sec);
  };

  const changeAttributes = (att: DatabaseColumns) => {
    setAttributes(att);
  };

  return {
    section,
    databases,
    attributes,
    currentDatabase,
    properties,
    initializeDatabaseConfigProcces,
    setDatabaseProperties,
    selectDatabase,
    changeSection,
    changeAttributes,
  };
};

export default useDatabaseConfigurator;
