import React, {useCallback} from 'react';

import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import {useTheme} from '../../lib/hooks/useAppTheme';

type BaseLayoutProps = {
  extraStyles?: ViewStyle;
  children: React.ReactNode;
  disableKeyboardDismiss?: boolean;
  scrollable?: boolean;
  showsVerticalScrollIndicator?: boolean;
};

const insetsEdges: Edge[] = ['top', 'bottom'];

const BaseLayout = ({
  disableKeyboardDismiss = false,
  extraStyles,
  children,
  scrollable = false,
  showsVerticalScrollIndicator = false,
}: BaseLayoutProps) => {
  const theme = useTheme();

  const handleBackgroundPress = useCallback(() => {
    if (disableKeyboardDismiss) return;
    Keyboard.dismiss();
  }, [disableKeyboardDismiss]);

  return (
    <SafeAreaView
      edges={insetsEdges}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        barStyle={theme.scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <TouchableWithoutFeedback
        onPress={handleBackgroundPress}
        accessible={false}>
        {!scrollable ? (
          <View style={[Styles.childContainers, extraStyles]}>{children}</View>
        ) : (
          <ScrollView
            style={[Styles.childContainers, extraStyles]}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
            {children}
          </ScrollView>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BaseLayout;

const Styles = StyleSheet.create({
  childContainers: {
    flex: 1,
    paddingHorizontal: 18,
  },
});
