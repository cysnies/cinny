import { useMemo } from 'react';
import { EmojiGroupId } from '../../plugins/emoji';

export type IEmojiGroupLabels = Record<EmojiGroupId, string>;

export const useEmojiGroupLabels = (): IEmojiGroupLabels =>
  useMemo(
    () => ({
      [EmojiGroupId.People]: '表情符号与人',
      [EmojiGroupId.Nature]: '动物与自然',
      [EmojiGroupId.Food]: '食物与饮料',
      [EmojiGroupId.Activity]: '活动',
      [EmojiGroupId.Travel]: '旅行与地点',
      [EmojiGroupId.Object]: '物品',
      [EmojiGroupId.Symbol]: '符号',
      [EmojiGroupId.Flag]: '旗帜',
    }),
    []
  );
