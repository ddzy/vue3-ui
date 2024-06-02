import { ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue';

type IUsePermission = (
	/** 权限名称 */
	name: MaybeRefOrGetter<IUsePermissionName>,
) => IUsePermissionReturn;
type IUsePermissionName =
	| 'accelerometer'
	| 'accessibility-events'
	| 'ambient-light-sensor'
	| 'background-sync'
	| 'camera'
	| 'clipboard-read'
	| 'clipboard-write'
	| 'geolocation'
	| 'gyroscope'
	| 'local-fonts'
	| 'magnetometer'
	| 'microphone'
	| 'midi'
	| 'notifications'
	| 'payment-handler'
	| 'persistent-storage'
	| 'push'
	| 'screen-wake-lock'
	| 'storage-access'
	| 'top-level-storage-access'
	| 'window-management';
type IUsePermissionReturn = Ref<boolean>;

/**
 * 检查浏览器的用户权限（例如：读取/写入剪贴板）
 */
const usePermission: IUsePermission = (name) => {
	const hasPermission = ref(false);

	watch(
		() => toValue(name),
		async (name) => {
			try {
				let _name = name as PermissionName;
				const result = await navigator.permissions.query({ name: _name });
				if (result.state === 'granted') {
					hasPermission.value = true;
				} else {
					hasPermission.value = false;
				}
			} catch (error) {
				hasPermission.value = false;
			}
		},
		{ immediate: true },
	);

	return hasPermission;
};

export default usePermission;
