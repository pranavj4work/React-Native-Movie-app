import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { Genre, SearchFilters, SortOption } from '@/types/movie';
import { RATING_OPTIONS, YEAR_OPTIONS } from '@/utils/format';

type FilterBarProps = {
  filters: SearchFilters;
  genres: Genre[];
  onChange: (next: SearchFilters) => void;
  showSort?: boolean;
};

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function Chip({ label, selected, onPress }: ChipProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.chipActive : colors.chip,
        },
      ]}
    >
      <Text
        style={[
          styles.chipLabel,
          { color: selected ? colors.chipActiveText : colors.chipText },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Newest', value: 'primary_release_date.desc' },
];

export function FilterBar({ filters, genres, onChange, showSort = true }: FilterBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.section, { color: colors.muted }]}>Genre</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="All"
          selected={filters.genreId == null}
          onPress={() => onChange({ ...filters, genreId: null })}
        />
        {genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            selected={filters.genreId === genre.id}
            onPress={() =>
              onChange({
                ...filters,
                genreId: filters.genreId === genre.id ? null : genre.id,
              })
            }
          />
        ))}
      </ScrollView>

      <Text style={[styles.section, { color: colors.muted }]}>Year</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="All"
          selected={filters.year == null}
          onPress={() => onChange({ ...filters, year: null })}
        />
        {YEAR_OPTIONS.map((year) => (
          <Chip
            key={year}
            label={String(year)}
            selected={filters.year === year}
            onPress={() =>
              onChange({ ...filters, year: filters.year === year ? null : year })
            }
          />
        ))}
      </ScrollView>

      <Text style={[styles.section, { color: colors.muted }]}>Min rating</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="Any"
          selected={filters.minRating == null}
          onPress={() => onChange({ ...filters, minRating: null })}
        />
        {RATING_OPTIONS.map((rating) => (
          <Chip
            key={rating}
            label={`${rating}+`}
            selected={filters.minRating === rating}
            onPress={() =>
              onChange({
                ...filters,
                minRating: filters.minRating === rating ? null : rating,
              })
            }
          />
        ))}
      </ScrollView>

      {showSort ? (
        <>
          <Text style={[styles.section, { color: colors.muted }]}>Sort</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
          >
            {SORT_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={filters.sortBy === option.value}
                onPress={() => onChange({ ...filters, sortBy: option.value })}
              />
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    marginBottom: 12,
  },
  section: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  row: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
});
