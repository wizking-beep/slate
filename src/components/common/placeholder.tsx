import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/theme';
import { LucideIcon } from 'lucide-react-native';

type PlaceholderProps = {
  text: string;
  Icon: LucideIcon;
  subtext?: string;
};

const Placeholder = ({ text, Icon, subtext }: PlaceholderProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: `${colors.primary}16`,
            borderColor: `${colors.primary}26`,
          },
        ]}
      >
        <Icon size={40} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{text}</Text>
      {subtext ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtext}</Text>
      ) : null}
    </View>
  );
};

export default Placeholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});