import { useMemo } from 'react';
import { MessageEvent, StateEvent } from '../../../../types/matrix/room';
import { PermissionGroup } from '../../common-settings/permissions';

export const usePermissionGroups = (): PermissionGroup[] => {
  const groups: PermissionGroup[] = useMemo(() => {
    const messagesGroup: PermissionGroup = {
      name: '消息',
      items: [
        {
          location: {
            key: MessageEvent.RoomMessage,
          },
          name: '发送消息',
        },
        {
          location: {
            key: MessageEvent.Sticker,
          },
          name: '发送贴纸',
        },
        {
          location: {
            key: MessageEvent.Reaction,
          },
          name: '发送反应',
        },
        {
          location: {
            notification: true,
            key: 'room',
          },
          name: 'Ping @room',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomPinnedEvents,
          },
          name: '置顶消息',
        },
        {
          location: {},
          name: '其他消息事件',
        },
      ],
    };

    const moderationGroup: PermissionGroup = {
      name: '审核',
      items: [
        {
          location: {
            action: true,
            key: 'invite',
          },
          name: '邀请',
        },
        {
          location: {
            action: true,
            key: 'kick',
          },
          name: '踢出',
        },
        {
          location: {
            action: true,
            key: 'ban',
          },
          name: '封禁',
        },
        {
          location: {
            action: true,
            key: 'redact',
          },
          name: '删除其他消息',
        },
        {
          location: {
            key: MessageEvent.RoomRedaction,
          },
          name: '删除自己的消息',
        },
      ],
    };

    const roomOverviewGroup: PermissionGroup = {
      name: '房间概况',
      items: [
        {
          location: {
            state: true,
            key: StateEvent.RoomAvatar,
          },
          name: '房间头像',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomName,
          },
          name: '房间名称',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomTopic,
          },
          name: '房间话题',
        },
      ],
    };

    const roomSettingsGroup: PermissionGroup = {
      name: '设置',
      items: [
        {
          location: {
            state: true,
            key: StateEvent.RoomJoinRules,
          },
          name: '修改房间的访问方式',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomCanonicalAlias,
          },
          name: '公开地址',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomPowerLevels,
          },
          name: '修改全部权限',
        },
        {
          location: {
            state: true,
            key: StateEvent.PowerLevelTags,
          },
          name: '修改权限等级',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomEncryption,
          },
          name: '启用端到端加密',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomHistoryVisibility,
          },
          name: '历史记录可见性',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomTombstone,
          },
          name: '升级房间',
        },
        {
          location: {
            state: true,
          },
          name: '其他设置',
        },
      ],
    };

    const otherSettingsGroup: PermissionGroup = {
      name: '其他',
      items: [
        {
          location: {
            state: true,
            key: StateEvent.RoomServerAcl,
          },
          name: '更改服务器访问控制列表',
        },
        {
          location: {
            state: true,
            key: 'im.vector.modular.widgets',
          },
          name: '修改小部件',
        },
      ],
    };

    return [
      messagesGroup,
      moderationGroup,
      roomOverviewGroup,
      roomSettingsGroup,
      otherSettingsGroup,
    ];
  }, []);

  return groups;
};
