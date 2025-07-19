import { useMemo } from 'react';
import { StateEvent } from '../../../../types/matrix/room';
import { PermissionGroup } from '../../common-settings/permissions';

export const usePermissionGroups = (): PermissionGroup[] => {
  const groups: PermissionGroup[] = useMemo(() => {
    const messagesGroup: PermissionGroup = {
      name: '管理',
      items: [
        {
          location: {
            state: true,
            key: StateEvent.SpaceChild,
          },
          name: '管理频道中的房间',
        },
        {
          location: {},
          name: '消息事件',
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
      ],
    };

    const roomOverviewGroup: PermissionGroup = {
      name: '频道概况',
      items: [
        {
          location: {
            state: true,
            key: StateEvent.RoomAvatar,
          },
          name: '频道头像',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomName,
          },
          name: '频道名称',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomTopic,
          },
          name: '频道话题',
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
          name: '修改频道访问性',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomCanonicalAlias,
          },
          name: '发布地址',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomPowerLevels,
          },
          name: '修改所有的权限',
        },
        {
          location: {
            state: true,
            key: StateEvent.PowerLevelTags,
          },
          name: '编辑权限等级',
        },
        {
          location: {
            state: true,
            key: StateEvent.RoomTombstone,
          },
          name: '升级频道',
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
          name: '修改服务器的访问控制列表',
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
