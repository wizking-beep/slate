import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';
import { AppColorTokens } from '@/constants/colors';

type ColorPickerProps = {
  colors: AppColorTokens;
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
};

const categoryColors = [
  '#FFB3BA',
  '#FFDFBA',
  '#FFFFBA',
  '#BAFFC9',
  '#BAE1FF',
  '#D4BAFF',
  '#FFB3E6',
  '#B3E5FC',
  '#C8E6C9',
  '#FFE0B2',
  '#F8BBD0',
  '#D1C4E9',
  '#A5D6A7',
  '#90CAF9',
];

const ColorPicker = ({ colors, selectedColor, onSelectColor }: ColorPickerProps) => {
  return (
    <View style={styles.colorSection}>
      <Text style={[styles.colorLabel, { color: colors.textSecondary || '#666' }]}>Select Color</Text>
      <View style={styles.colorGrid}>
        {categoryColors.map((color, index) => (
          <Pressable
            key={`${color}-${index}`}
            style={({ pressed }) => [
              styles.colorOption,
              { backgroundColor: color },
              pressed && styles.colorOptionPressed,
            ]}
            onPress={() => onSelectColor(color)}
          >
            {selectedColor === color && (
              <Animated.View entering={FadeIn.duration(200)} style={styles.colorSelected}>
                <Check size={18} color="#1C1A22" strokeWidth={3} />
              </Animated.View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  colorSection: {
    marginTop: 16,
  },
  colorLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  colorOptionPressed: {
    transform: [{ scale: 0.94 }],
  },
  colorSelected: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
});
