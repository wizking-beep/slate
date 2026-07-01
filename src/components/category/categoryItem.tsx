import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition, SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { Circle, Trash2 } from 'lucide-react-native';
import { AppColorTokens } from '@/constants/colors';
import { Category } from '@/types/category';

type CategoryItemProps = {
  item: Category;
  colors: AppColorTokens;
  onDelete: (id: string, label: string) => void;
};

const CategoryItem = ({ item, colors, onDelete }: CategoryItemProps) => {
  return (
    <Animated.View
      entering={SlideInRight.springify().damping(15)}
      exiting={SlideOutLeft.springify().damping(15)}
      layout={LinearTransition.springify().damping(20)}
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.textMuted,
        },
      ]}
    >
      <View style={styles.itemContent}>
        <View
          style={[
            styles.colorBadge,
            {
              backgroundColor: `${item.color}22`,
              borderColor: `${item.color}55`,
            },
          ]}
        >
          <Circle size={14} color={item.color} fill={item.color} />
        </View>
        <Text style={[styles.itemText, { color: colors.text }]}>{item.label}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          { backgroundColor: `${colors.error}14` },
          pressed && styles.buttonPressed,
        ]}
        onPress={() => onDelete(item.id, item.label)}
      >
        <Trash2 size={16} color={colors.error} />
      </Pressable>
    </Animated.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  colorBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});
