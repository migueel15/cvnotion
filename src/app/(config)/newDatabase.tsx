import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Linking, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "@/features/shared/components/DropDown";
import { Button } from "@expo/ui/jetpack-compose";
import colors from "@/colors";
import { DatabaseColumns } from "@/types/types";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/features/auth/useAuth";
import { storeUserData } from "@/application/services/AsyncStorageService";
import useDatabaseConfigurator from "@/features/config/useDatabaseConfigurator";

type FormSection = "database" | "properties" | "campus";

export default function NewDatabase() {
  const router = useRouter();
  const {
    section,
    databases,
    currentDatabase,
    properties,
    attributes,
    initializeDatabaseConfigProcces,
    setDatabaseProperties,
    selectDatabase,
    changeSection,
    changeAttributes,
  } = useDatabaseConfigurator();
  const auth = useAuth();

  const sectionLabel = {
    database: "Vincula una base de datos",
    properties: "Configura la base de datos",
    campus: "Vincula tu calendario del campus virtual",
  };

  const [campusCalendarUrl, setCampusCalendarUrl] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    const defaultFilter = "preset_what=all&preset_time=recentupcoming";
    const formatedString = text.substring(text.indexOf("https://"));
    const url = formatedString.substring(
      0,
      formatedString.indexOf("&preset_what"),
    );
    const campusCalendarUrl = `${url}&${defaultFilter}`;
    setCampusCalendarUrl(campusCalendarUrl);
    return campusCalendarUrl;
  };

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
    initializeDatabaseConfigProcces();
  }, []);

  useEffect(() => {
    setDatabaseProperties();
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
                className={"flex items-center"}
                onTouchEnd={() => {
                  selectDatabase(item);
                }}
              >
                <Text
                  className={`w-[80%] py-3 my-1 rounded-xl text-center  ${currentDatabase?.id === item.id
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
                      databaseColumns[key as keyof DatabaseColumns].type,
                    )}
                    onChange={(option) => {
                      databaseColumns[key as keyof DatabaseColumns].columnName =
                        option.label;
                      databaseColumns[key as keyof DatabaseColumns].id =
                        option.value;
                    }}
                    placeholder=" "
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {section === "campus" && (
          <View className="flex-1 w-full justify-center items-center">
            <Text className="text-center text-white text-xl">
              Accede al{" "}
              <Text
                className="text-primary cursor-pointer"
                onPress={() => {
                  Linking.openURL(
                    "https://informatica.cv.uma.es/calendar/export.php",
                  );
                }}
              >
                campus
              </Text>
            </Text>
            <Text className="text-center text-white text-xl">
              Inicia sesión con tu cuenta
            </Text>
            <Text className="text-center text-white text-xl">
              Accede al calendario
            </Text>
            <Text className="text-center text-white text-xl">
              Selecciona el filtro que quieras compartir
            </Text>
            <Text className="text-center text-white text-xl">Obten URL</Text>
            <Button
              style={{
                marginTop: "auto",
                marginBottom: 20,
                width: "80%",
              }}
              onPress={fetchCopiedText}
              elementColors={{
                containerColor: colors.gray,
                contentColor: colors.white,
              }}
            >
              Obtener URL
            </Button>
          </View>
        )}
      </View>

      <Button
        style={{
          marginTop: "auto",
          marginBottom: 20,
          width: "80%",
        }}
        onPress={async () => {
          if (section === "database" && currentDatabase) {
            changeSection("properties");
            return;
          }

          if (
            section === "properties" &&
            Object.values(databaseColumns).every((column) => column.id !== "")
          ) {
            changeAttributes(databaseColumns);
            changeSection();
          }

          if (section === "campus") {
            auth.setIsReady(false);
            await fetchCopiedText();

            // create user new data and redirect to home
            if (currentDatabase && attributes) {
              currentDatabase.columns = attributes;
              currentDatabase.calendar_url = campusCalendarUrl;
              if (!auth.user) return;
              const payload = {
                databases: [currentDatabase],
              };
              await storeUserData(auth.user.id, payload);
              await auth.updateUserContext();
              auth.setIsReady(true);
              router.replace("/");
            }
          }
        }}
        elementColors={{
          containerColor: colors.gray,
          contentColor: colors.white,
        }}
      >
        {section === "campus" ? "Pegar y continuar" : "Continuar"}
      </Button>
      <Button
        onPress={() => {
          router.navigate("/(auth)/login");
        }}
      >
        Replace
      </Button>
    </SafeAreaView>
  );
}
