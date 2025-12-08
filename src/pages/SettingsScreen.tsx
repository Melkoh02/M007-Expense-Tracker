import {StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {useTheme} from '../lib/hooks/useAppTheme';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings'>;

const SettingsScreen = ({}: Props) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <BaseLayout>
      <Text style={[styles.title, {color: theme.colors.primary}]}>
        {t('settings.title')}
      </Text>
    </BaseLayout>
  );
};

export default observer(SettingsScreen);

const styles = StyleSheet.create({
  title: {padding: 10},
});
