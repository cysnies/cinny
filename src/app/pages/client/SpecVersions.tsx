import React, { ReactNode } from 'react';
import { Box, Dialog, config, Text, Button, Spinner } from 'folds';
import { SpecVersionsLoader } from '../../components/SpecVersionsLoader';
import { SpecVersionsProvider } from '../../hooks/useSpecVersions';
import { SplashScreen } from '../../components/splash-screen';

export function SpecVersions({ baseUrl, children }: { baseUrl: string; children: ReactNode }) {
  return (
    <SpecVersionsLoader
      baseUrl={baseUrl}
      fallback={() => (
        <SplashScreen>
          <Box direction="Column" grow="Yes" alignItems="Center" justifyContent="Center" gap="400">
            <Spinner variant="Secondary" size="600" />
            <Text>正在连接到服务器...</Text>
          </Box>
        </SplashScreen>
      )}
      error={(err, retry, ignore) => (
        <SplashScreen>
          <Box direction="Column" grow="Yes" alignItems="Center" justifyContent="Center" gap="400">
            <Dialog>
              <Box direction="Column" gap="400" style={{ padding: config.space.S400 }}>
                <Text>
                  无法连接到主服务器。请检查你的网络连接或主服务器状态。
                </Text>
                <Button variant="Critical" onClick={retry}>
                  <Text as="span" size="B400">
                    重试
                  </Text>
                </Button>
                <Button variant="Critical" onClick={ignore} fill="Soft">
                  <Text as="span" size="B400">
                    Continue
                  </Text>
                </Button>
              </Box>
            </Dialog>
          </Box>
        </SplashScreen>
      )}
    >
      {(versions) => <SpecVersionsProvider value={versions}>{children}</SpecVersionsProvider>}
    </SpecVersionsLoader>
  );
}
