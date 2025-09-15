import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function GroceryListScreen() {
  const [item, setItem] = useState('');
  const [groceryList, setGroceryList] = useState<string[]>([]);

  const addItem = () => {
    if (!item.trim()) return;
    setGroceryList((prev) => [...prev, item.trim()]);
    setItem('');
  };

  const removeItem = (index: number) => {
    setGroceryList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add grocery item..."
          value={item}
          onChangeText={setItem}
          style={styles.input}
        />
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <ThemedText style={{ color: 'white' }}>Add</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={groceryList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => removeItem(index)} style={styles.listItem}>
            <ThemedText>{item}</ThemedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>
            No items added yet.
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1D3D47',
    justifyContent: 'center',
  },
  listItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
});
