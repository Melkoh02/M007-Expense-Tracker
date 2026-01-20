import React, {useEffect, useMemo, useState} from 'react';

import {StyleSheet} from 'react-native';

import {useTranslation} from 'react-i18next';

import {SUPPORTED_LANGUAGES} from '../../lib/constants/languages';
import {getSelectOptions} from '../../lib/helpers/formik.tsx';
import {useStore} from '../../lib/hooks/useStore';
import BaseModal from '../molecules/modal';
import SelectInput from '../molecules/selectInput';

type Props = {
  isVisible: boolean;
  onDismiss: () => void;
};

export default function SelectLanguageModal({isVisible, onDismiss}: Props) {
  const {t} = useTranslation();
  const {languageStore} = useStore();

  // Local state to stage the choice before confirmation:
  const [selectedLang, setSelectedLang] = useState(languageStore.language);

  const languageOptions = useMemo(
    () => getSelectOptions(t, SUPPORTED_LANGUAGES),
    [t],
  );

  useEffect(() => {
    if (isVisible) {
      setSelectedLang(languageStore.language);
    }
  }, [isVisible, languageStore.language]);

  return (
    <BaseModal
      title={t('modals.selectLanguageModal.title')}
      content={
        <SelectInput
          value={selectedLang}
          onChange={setSelectedLang}
          placeholder={t('modals.selectLanguageModal.placeholder')}
          options={languageOptions}
          showSearch={false}
          style={styles.select}
        />
      }
      isVisible={isVisible}
      onDismiss={onDismiss}
      actions={[
        {
          text: t('common.cancel'),
          onPress: onDismiss,
        },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await languageStore.setLanguage(selectedLang);
            onDismiss();
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  select: {
    marginTop: 16,
    backgroundColor: 'transparent',
  },
});
