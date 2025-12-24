import React, {useCallback, useMemo} from 'react';

import {StyleSheet, View, ViewStyle} from 'react-native';

import {Chip} from 'react-native-paper';

import {Tag} from '../../lib/types/transaction.ts';

type Props = {
  tagsData: Tag[];
  selectedTagIds: string[];
  onChange?: (selectedIds: string[]) => void;
  readonly?: boolean;
  showUnselected?: boolean;
  style?: ViewStyle;
};

const TagsGrid: React.FC<Props> = ({
  tagsData,
  selectedTagIds,
  onChange,
  readonly = false,
  showUnselected = true,
  style,
}) => {
  const selectedSet = useMemo(() => new Set(selectedTagIds), [selectedTagIds]);

  const visibleTags = useMemo(() => {
    if (showUnselected) {
      return tagsData;
    }
    return tagsData.filter(tag => selectedSet.has(tag.id));
  }, [showUnselected, tagsData, selectedSet]);

  const toggleTag = useCallback(
    (tagId: string) => {
      if (readonly || !onChange) {
        return;
      }
      const next = new Set(selectedSet);
      next.has(tagId) ? next.delete(tagId) : next.add(tagId);
      onChange(Array.from(next));
    },
    [readonly, onChange, selectedSet],
  );

  return (
    <View style={[styles.container, style]}>
      {visibleTags.map(tag => {
        const isSelected = selectedSet.has(tag.id);

        return (
          <Chip
            key={tag.id}
            selected={isSelected}
            showSelectedOverlay
            disabled={readonly || !onChange}
            onPress={() => toggleTag(tag.id)}>
            {tag.name}
          </Chip>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

export default TagsGrid;
