import React, { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { Box, Button, color, Icon, Icons, Spinner, Text, toRem } from 'folds';
import FileSaver from 'file-saver';
import { SequenceCard } from '../../../components/sequence-card';
import { SettingTile } from '../../../components/setting-tile';
import { SequenceCardStyle } from '../styles.css';
import { PasswordInput } from '../../../components/password-input';
import { ConfirmPasswordMatch } from '../../../components/ConfirmPasswordMatch';
import { useMatrixClient } from '../../../hooks/useMatrixClient';
import { AsyncStatus, useAsyncCallback } from '../../../hooks/useAsyncCallback';
import { decryptMegolmKeyFile, encryptMegolmKeyFile } from '../../../../util/cryptE2ERoomKeys';
import { useAlive } from '../../../hooks/useAlive';
import { useFilePicker } from '../../../hooks/useFilePicker';

function ExportKeys() {
  const mx = useMatrixClient();
  const alive = useAlive();

  const [exportState, exportKeys] = useAsyncCallback<void, Error, [string]>(
    useCallback(
      async (password) => {
        const crypto = mx.getCrypto();
        if (!crypto) throw new Error('Unexpected Error! Crypto module not found!');
        const keysJSON = await crypto.exportRoomKeysAsJson();

        const encKeys = await encryptMegolmKeyFile(keysJSON, password);

        const blob = new Blob([encKeys], {
          type: 'text/plain;charset=us-ascii',
        });
        FileSaver.saveAs(blob, 'cinny-keys.txt');
      },
      [mx]
    )
  );

  const exporting = exportState.status === AsyncStatus.Loading;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (exporting) return;

    const { passwordInput, confirmPasswordInput } = evt.target as HTMLFormElement & {
      passwordInput: HTMLInputElement;
      confirmPasswordInput: HTMLInputElement;
    };

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) return;

    exportKeys(password).then(() => {
      if (alive()) {
        passwordInput.value = '';
        confirmPasswordInput.value = '';
      }
    });
  };

  return (
    <SettingTile>
      <Box as="form" onSubmit={handleSubmit} direction="Column" gap="100">
        <Box gap="200" alignItems="End">
          <ConfirmPasswordMatch initialValue>
            {(match, doMatch, passRef, confPassRef) => (
              <>
                <Box grow="Yes" direction="Column" gap="100">
                  <Text size="L400">新密码</Text>
                  <PasswordInput
                    ref={passRef}
                    name="passwordInput"
                    size="400"
                    variant="Secondary"
                    radii="300"
                    required
                    onChange={doMatch}
                    readOnly={exporting}
                    autoFocus
                  />
                </Box>
                <Box grow="Yes" direction="Column" gap="100">
                  <Text size="L400">确认密码</Text>
                  <PasswordInput
                    ref={confPassRef}
                    style={{ color: match ? undefined : color.Critical.Main }}
                    name="confirmPasswordInput"
                    size="400"
                    variant="Secondary"
                    radii="300"
                    required
                    onChange={doMatch}
                    readOnly={exporting}
                  />
                </Box>
              </>
            )}
          </ConfirmPasswordMatch>
          <Button
            type="submit"
            size="400"
            variant="Secondary"
            fill="Soft"
            outlined
            radii="300"
            disabled={exporting}
            before={exporting ? <Spinner size="200" variant="Secondary" fill="Soft" /> : undefined}
          >
            <Text as="span" size="B400">
              导出
            </Text>
          </Button>
        </Box>
        {exportState.status === AsyncStatus.Error && (
          <Text size="T200" style={{ color: color.Critical.Main }}>
            <b>{exportState.error.message}</b>
          </Text>
        )}
      </Box>
    </SettingTile>
  );
}

function ExportKeysTile() {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <SettingTile
        title="导出聊天数据"
        description="在你的设备上保存受密码保护的加密数据副本，以便之后解密消息。"
        after={
          <Box>
            <Button
              type="button"
              onClick={() => setExpand(!expand)}
              size="300"
              variant="Secondary"
              fill="Soft"
              outlined
              radii="300"
              before={
                <Icon size="100" src={expand ? Icons.ChevronTop : Icons.ChevronBottom} filled />
              }
            >
              <Text as="span" size="B300" truncate>
                {expand ? '折叠' : '展开'}
              </Text>
            </Button>
          </Box>
        }
      />
      {expand && <ExportKeys />}
    </>
  );
}

type ImportKeysProps = {
  file: File;
  onDone?: () => void;
};
function ImportKeys({ file, onDone }: ImportKeysProps) {
  const mx = useMatrixClient();
  const alive = useAlive();

  const [decryptState, decryptFile] = useAsyncCallback<void, Error, [string]>(
    useCallback(
      async (password) => {
        const crypto = mx.getCrypto();
        if (!crypto) throw new Error('Unexpected Error! Crypto module not found!');

        const arrayBuffer = await file.arrayBuffer();
        const keys = await decryptMegolmKeyFile(arrayBuffer, password);

        await crypto.importRoomKeysAsJson(keys);
      },
      [file, mx]
    )
  );

  const decrypting = decryptState.status === AsyncStatus.Loading;

  useEffect(() => {
    if (decryptState.status === AsyncStatus.Success) {
      onDone?.();
    }
  }, [onDone, decryptState]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (decrypting) return;

    const { passwordInput } = evt.target as HTMLFormElement & {
      passwordInput: HTMLInputElement;
    };

    const password = passwordInput.value;

    if (!password) return;
    decryptFile(password).then(() => {
      if (alive()) {
        passwordInput.value = '';
      }
    });
  };

  return (
    <SettingTile>
      <Box as="form" onSubmit={handleSubmit} direction="Column" gap="100">
        <Box gap="200" alignItems="End">
          <Box grow="Yes" direction="Column" gap="100">
            <Text size="L400">Password</Text>
            <PasswordInput
              name="passwordInput"
              size="400"
              variant="Secondary"
              radii="300"
              required
              autoFocus
              readOnly={decrypting}
            />
          </Box>
          <Button
            type="submit"
            size="400"
            variant="Secondary"
            fill="Soft"
            outlined
            radii="300"
            disabled={decrypting}
            before={decrypting ? <Spinner size="200" variant="Secondary" fill="Soft" /> : undefined}
          >
            <Text as="span" size="B400">
              Decrypt
            </Text>
          </Button>
        </Box>
        {decryptState.status === AsyncStatus.Error && (
          <Text size="T200" style={{ color: color.Critical.Main }}>
            <b>{decryptState.error.message}</b>
          </Text>
        )}
      </Box>
    </SettingTile>
  );
}

function ImportKeysTile() {
  const [file, setFile] = useState<File>();
  const pickFile = useFilePicker(setFile);

  const handleDone = useCallback(() => {
    setFile(undefined);
  }, []);

  return (
    <>
      <SettingTile
        title="导入聊天数据"
        description="从设备加载受密码保护的加密数据副本并解密你的消息。"
        after={
          <Box>
            {file ? (
              <Button
                style={{ maxWidth: toRem(200) }}
                type="button"
                onClick={() => setFile(undefined)}
                size="300"
                variant="Warning"
                fill="Solid"
                radii="300"
                before={<Icon size="100" src={Icons.File} filled />}
                after={<Icon size="100" src={Icons.Cross} />}
              >
                <Text as="span" size="B300" truncate>
                  {file.name}
                </Text>
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => pickFile('text/plain')}
                size="300"
                variant="Secondary"
                fill="Soft"
                outlined
                radii="300"
                before={<Icon size="100" src={Icons.ArrowRight} />}
              >
                <Text as="span" size="B300">
                  导入
                </Text>
              </Button>
            )}
          </Box>
        }
      />
      {file && <ImportKeys file={file} onDone={handleDone} />}
    </>
  );
}

export function LocalBackup() {
  return (
    <Box direction="Column" gap="100">
      <Text size="L400">本地备份</Text>
      <SequenceCard
        className={SequenceCardStyle}
        variant="SurfaceVariant"
        direction="Column"
        gap="400"
      >
        <ExportKeysTile />
      </SequenceCard>
      <SequenceCard
        className={SequenceCardStyle}
        variant="SurfaceVariant"
        direction="Column"
        gap="400"
      >
        <ImportKeysTile />
      </SequenceCard>
    </Box>
  );
}
