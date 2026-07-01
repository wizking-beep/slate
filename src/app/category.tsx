import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { ArrowLeft, Plus, Trash2, FolderPlus, Hash } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme';
import CategoryItem from '@/components/category/categoryItem';
import ColorPicker from '@/components/category/colorPicker';
import Placeholder from '@/components/common/placeholder';
import { Category } from '@/types/category';
import { writeTagsArray } from '@/services/tagsOp';
import useStorage from '@/stores/storage';

const CategoriesScreen = () => {
  const { categories, addCategory, removeCategory } = useStorage();
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [newCategoryLabel, setNewCategoryLabel] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const router = useRouter();

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const saveToFile = async (updatedCategories: Category[]) => {
    try {
      await writeTagsArray(updatedCategories);
    } catch (error) {
      console.error('Error saving categories to file:', error);
      setError('Error saving categories to file');
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryLabel.trim()) {
      setError('Please enter a category name');
      return;
    }

    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    // Check for duplicate category names
    const existingCategory = categories.find(
      (cat) => cat.label.toLowerCase() === newCategoryLabel.trim().toLowerCase()
    );

    if (existingCategory) {
      setError('A category with this name already exists');
      return;
    }

    const newCategory: Category = {
      id: Crypto.randomUUID(),
      label: newCategoryLabel.trim(),
      color: selectedColor,
    };

    const newCategories = [...categories, newCategory];
    addCategory(newCategory);
    saveToFile(newCategories);
    
    // Reset form
    setNewCategoryLabel('');
    setSelectedColor(null);
    setError(null);
    setIsAdding(false);
  };

  const handleRemoveCategory = (id: string, label: string) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete the category "${label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeCategory(id);
            const updatedCategories = categories.filter(cat => cat.id !== id);
            saveToFile(updatedCategories);
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[styles.header, { paddingTop: insets.top + 16 }]}
    >
      <View style={styles.headerTop}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <ArrowLeft color={colors.text} size={28} />
        </Pressable>
        <View style={styles.headerCenter} >
        <Hash color={colors.text} size={28} />   
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tags</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Enter tag name..."
            placeholderTextColor={colors.textSecondary || '#999'}
            value={newCategoryLabel}
            onChangeText={(text) => {
              setNewCategoryLabel(text);
              setError(null);
            }}
            onSubmitEditing={handleAddCategory}
            editable={!isAdding}
          />
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              { backgroundColor: colors.primary },
              pressed && styles.buttonPressed,
              (!newCategoryLabel.trim() || !selectedColor) && styles.addButtonDisabled,
            ]}
            onPress={handleAddCategory}
            disabled={!newCategoryLabel.trim() || !selectedColor}
          >
            <Plus size={18} color={colors.onPrimary} />
          </Pressable>
        </View>

        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        {error && (
          <Animated.View
            entering={FadeIn.duration(200)}
            style={[styles.errorContainer, { backgroundColor: `${colors.error}20` }]}
          >
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );

  const renderFooter = () => (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={styles.footer}
    >
      {categories.length > 0 && (
        <Pressable
          style={({ pressed }) => [
            styles.clearButton,
            { borderColor: colors.error },
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            Alert.alert(
              'Remove Last Category',
              `Are you sure you want to remove "${categories[categories.length - 1].label}"?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Remove',
                  style: 'destructive',
                  onPress: () => {
                    const lastCategory = categories[categories.length - 1];
                    removeCategory(lastCategory.id);
                    const updatedCategories = categories.filter(
                      cat => cat.id !== lastCategory.id
                    );
                    saveToFile(updatedCategories);
                  },
                },
              ]
            );
          }}
        >
          <Trash2 size={16} color={colors.error} />
          <Text style={[styles.clearButtonText, { color: colors.error }]}>
            Remove Last
          </Text>
        </Pressable>
      )}
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View entering={FadeIn.duration(500)} style={styles.emptyContainer}>
      <Placeholder
        text="No categories yet"
        subtext="Create your first one and keep your notes beautifully organized."
        Icon={FolderPlus}
      />
    </Animated.View>
  );

  const renderItem = ({ item }: { item: Category }) => (
    <CategoryItem
      item={item}
      colors={colors}
      onDelete={handleRemoveCategory}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={categories}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
  },
  headerSpacer: {
    width: 40,
  },
  buttonPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  inputContainer: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingRight: 12,
    fontWeight: '500',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  addButtonDisabled: {
    opacity: 0.4,
  },
  errorContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  separator: {
    height: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
});