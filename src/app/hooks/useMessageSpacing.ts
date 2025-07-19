import { useMemo } from 'react';
import { MessageSpacing } from '../state/settings';

export type MessageSpacingItem = {
  name: string;
  spacing: MessageSpacing;
};

export const useMessageSpacingItems = (): MessageSpacingItem[] =>
  useMemo(
    () => [
      {
        spacing: '0',
        name: '无',
      },
      {
        spacing: '100',
        name: '非常小',
      },
      {
        spacing: '200',
        name: '很小',
      },
      {
        spacing: '300',
        name: '小',
      },
      {
        spacing: '400',
        name: '常规',
      },
      {
        spacing: '500',
        name: '大',
      },
    ],
    []
  );
