import React from 'react';
import {FAB} from 'react-native-paper';
import {useNavigation} from '../../lib/hooks/useNavigation.ts';

const MainFab = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigation = useNavigation('AppStack');

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'pencil'}
      variant={'secondary'}
      actions={[
        {
          icon: 'arrow-up',
          label: 'Arrow Up',
          onPress: () => {
            navigation.navigate('TransactionStack', {screen: 'Transaction'});
          },
        },
        {
          icon: 'swap-horizontal',
          label: 'Swap Horizontal',
          onPress: () => {},
        },
        {
          icon: 'arrow-down',
          label: 'Arrow Down',
          onPress: () => {},
        },
      ]}
      onStateChange={({open}: {open: boolean}) => setOpen(open)}
      visible
    />
  );
};

export default MainFab;
