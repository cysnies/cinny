import React, { ReactNode, useEffect } from 'react';
import { Box, Dialog, Text, config } from 'folds';
import { AsyncStatus, useAsyncCallback } from '../hooks/useAsyncCallback';
import { checkIndexedDBSupport } from '../utils/featureCheck';
import { SplashScreen } from '../components/splash-screen';

export function FeatureCheck({ children }: { children: ReactNode }) {
  const [idbSupportState, checkIDBSupport] = useAsyncCallback(checkIndexedDBSupport);

  useEffect(() => {
    checkIDBSupport();
  }, [checkIDBSupport]);

  if (idbSupportState.status === AsyncStatus.Success && idbSupportState.data === false) {
    return (
      <SplashScreen>
        <Box grow="Yes" alignItems="Center" justifyContent="Center">
          <Dialog>
            <Box style={{ padding: config.space.S400 }} direction="Column" gap="400">
              <Text>Missing Browser Feature</Text>
              <Text size="T300" priority="400">
              未发现 IndexedDB 支持。此应用程序需要 IndexedDB 来本地存储会话数据。请确保您的浏览器支持 IndexedDB 并已启用它。
              </Text>
              <Text size="T200">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  什么是 IndexedDB？
                </a>
              </Text>
            </Box>
          </Dialog>
        </Box>
      </SplashScreen>
    );
  }

  return children;
}
