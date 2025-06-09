import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "@/features/shared/components/DropDown";
import { Button } from "@expo/ui/jetpack-compose";
import colors from "@/colors";
import {
  DatabaseColumns,
  NotionDatabase,
  NotionProperty,
  UUID,
} from "@/types/types";
import NotionService from "@/application/services/NotionService";
import Animated, {
  SlideInRight,
  SlideOutLeft,
  SlideInLeft,
  SlideOutRight,
  LinearTransition,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type FormSection = "database" | "properties" | "campus";

export default function NewDatabase() {
  const [section, setSection] = useState<FormSection>("database");

  const sectionLabel = {
    database: "Vincula una base de datos",
    properties: "Configura la base de datos",
    campus: "Vincula tu calendario del campus virtual",
  };

  const [databases, setDatabases] = useState<NotionDatabase[]>([]);
  const [currentDatabase, setCurrentDatabase] = useState<NotionDatabase | null>(
    null
  );
  const [properties, setProperties] = useState<NotionProperty[]>([]);
  const [campusCalendarUrl, setCampusCalendarUrl] = useState("");

  const notion = NotionService;

  const databaseColumns: DatabaseColumns = {
    title: {
      id: "",
      columnName: "",
      type: "title",
    },
    cvId: {
      id: "",
      columnName: "",
      type: "rich_text",
    },
    description: {
      id: "",
      columnName: "",
      type: "rich_text",
    },
    subject: {
      id: "",
      columnName: "",
      type: "select",
      options: [],
    },
    status: {
      id: "",
      columnName: "",
      type: "status",
    },
    type: {
      id: "",
      columnName: "",
      type: "select",
    },
    last_modified: {
      id: "",
      columnName: "",
      type: "last_edited_time",
    },
    date: {
      id: "",
      columnName: "",
      type: "date",
    },
  };

  const getPropertiesWithType = (type: string) => {
    return properties
      .filter((property) => property.type === type)
      .map((property) => ({
        value: property.id,
        label: property.columnName,
      }));
  };

  useEffect(() => {
    const getDatabases = async () => {
      const databases = await notion.getDatabases();
      setDatabases(databases);
    };
    getDatabases();
  }, []);

  useEffect(() => {
    // TODO: Get database properties
    if (!currentDatabase) {
      return;
    }
    const getDatabaseProperties = async () => {
      const properties = await notion.getDatabaseProperties(currentDatabase.id);
      if (!properties) {
        return;
      }
      setProperties(properties);
    };
    getDatabaseProperties();
  }, [currentDatabase]);

  return (
    <SafeAreaView className="flex-1 bg-dark items-center">
      <Text className="text-4xl text-white font-bold text-center mt-16">
        Configuración
      </Text>

      <View className="w-[80%] h-[1px] bg-gray my-8 rounded-full" />

      <View className="w-[80%] flex-1 bg-light-dark mb-8 rounded-3xl items-center">
        <Text className="text-center text-xl my-5 text-white w-[80%]">
          {sectionLabel[section]}
        </Text>
        {section === "database" && (
          <FlatList
            className="flex w-full"
            data={databases}
            renderItem={({ item }) => (
              <View
                className={`flex items-center`}
                onTouchEnd={() => {
                  if (currentDatabase?.id === item.id) {
                    setCurrentDatabase(null);
                    return;
                  }
                  setCurrentDatabase(item);
                  console.log(item.id);
                }}
              >
                <Text
                  className={`w-[80%] py-3 my-1 rounded-xl text-center  ${
                    currentDatabase?.id === item.id
                      ? "text-primary bg-gray"
                      : "text-white"
                  }`}
                >{`${item.icon || ""} ${item.name}`}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View className="w-full flex items-center">
                <View className="w-[80%] h-[1px] bg-gray rounded-full" />
              </View>
            )}
          />
        )}
        {section === "properties" && (
          <View className="flex-1 w-full justify-center items-center">
            {Object.keys(databaseColumns).map((key) => (
              <View
                key={key}
                className="flex w-[80%] justify-between items-center flex-row mb-auto"
              >
                <Text className="text-white">{key}</Text>
                <View className="w-[60%] ">
                  <Dropdown
                    data={getPropertiesWithType(
                      databaseColumns[key as keyof DatabaseColumns].type
                    )}
                    onChange={(value) => {}}
                    placeholder="elegir"
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {section === "campus" && <Text>campus</Text>}
      </View>

      <Button
        style={{
          marginTop: "auto",
          marginBottom: 20,
          width: "80%",
        }}
        onPress={() => {
          if (section === "database" && !currentDatabase) {
            return;
          }

          setSection((prev) => (prev === "database" ? "properties" : "campus"));
        }}
        elementColors={{
          containerColor: colors.gray,
          contentColor: colors.white,
        }}
      >
        Continuar
      </Button>
    </SafeAreaView>
  );
}
