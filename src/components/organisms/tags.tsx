import React, {useCallback, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {Chip} from 'react-native-paper';

import {Tag} from '../../lib/types/transaction.ts';

type Props = {
  tagsData: Tag[];
};

const TagsGrid: React.FC<Props> = ({tagsData}) => {
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleTag = useCallback((tagId: string) => {
    setSelectedTagIds(prev => {
      const next = new Set(prev);
      next.has(tagId) ? next.delete(tagId) : next.add(tagId);
      return next;
    });
  }, []);

  return (
    <View style={styles.container}>
      {tagsData.map(tag => {
        const isSelected = selectedTagIds.has(tag.id);
        return (
          <Chip
            key={tag.id}
            selected={isSelected}
            showSelectedOverlay
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
