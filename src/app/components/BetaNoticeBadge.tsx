import React from 'react';
import { TooltipProvider, Tooltip, Box, Text, Badge, toRem } from 'folds';

export function BetaNoticeBadge() {
  return (
    <TooltipProvider
      position="Right"
      align="Center"
      tooltip={
        <Tooltip style={{ maxWidth: toRem(200) }}>
          <Box direction="Column">
            <Text size="L400">注意</Text>
            <Text size="T200">此功能正在测试中，可能会随时变化。</Text>
          </Box>
        </Tooltip>
      }
    >
      {(triggerRef) => (
        <Badge size="500" tabIndex={0} ref={triggerRef} variant="Primary" fill="Solid">
          <Text size="L400">测试</Text>
        </Badge>
      )}
    </TooltipProvider>
  );
}
