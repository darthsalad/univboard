import { notifications } from "@mantine/notifications";
import { IconCircleCheck, IconAlertCircle } from "@tabler/icons-react";

type TNotifications = {
	title: string;
	message: string;
	color: string;
};

const useNotifications = ({ title, message, color }: TNotifications) => {
	notifications.show({
		title: title,
		message: message,
		color: color,
		icon:
			color === "red" ? (
				<IconCircleCheck size="1.2rem" />
			) : (
				<IconAlertCircle size="1.2rem" />
			),
		withCloseButton: true,
		autoClose: 4000,
		loading: false,
	});
};

export default useNotifications;
