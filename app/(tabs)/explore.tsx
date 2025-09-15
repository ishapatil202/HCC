import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

const SPOONACULAR_API_KEY = 'd2efffac1178446ebe72e8612849d70d';
const SPOONACULAR_ENDPOINT = 'https://api.spoonacular.com/recipes/complexSearch';

export default function RecipesScreen() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async (query: string) => {
    if (!query.trim() && query !== '') return; // skip empty search
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(SPOONACULAR_ENDPOINT, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query,
          number: 20,
        },
      });

      setRecipes(response.data.results || []);
    } catch (err: any) {
      console.error('Error fetching recipes:', err.response || err.message);
      setError('Failed to load recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch some initial recipes
  useEffect(() => {
    fetchRecipes('pasta'); // initial example search
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <ThemedText type="subtitle" style={{ marginTop: 8 }}>
        {item.title}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchBox}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1D3D47" style={{ marginTop: 20 }} />
      ) : error ? (
        <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>{error}</ThemedText>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={renderRecipe}
          ListEmptyComponent={
            <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>
              No recipes found.
            </ThemedText>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  recipeCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
});
