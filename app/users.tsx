import { useNotion } from "@/features/notion/hooks/useNotion";
import { useEffect } from "react";
import { Text, View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NotionEvent } from "@/features/notion/types";

const Users = () => {
  const {events, loading, error, fetchEvents, createEvent, updateEvent, deleteEvent} = useNotion()
  
  useEffect(()=>{
    fetchEvents()
  },[fetchEvents])

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  
  const renderItem = ({ item }: { item: NotionEvent }) => (
    <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{item.title}</Text>
      {item.description && (
        <Text style={styles.eventDescription}>{item.description}</Text>
      )}
      {item.date && (
        <Text style={styles.eventDate}>{item.date}</Text>
      )}
      {item.status && (
        <Text style={styles.eventStatus}>{item.status}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas disponibles</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  eventStatus: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Users;