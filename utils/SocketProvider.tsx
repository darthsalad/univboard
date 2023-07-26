import React from "react";
import useNotifications from "./useNotifications";

type TChildren = {
	children: React.ReactNode;
};

const SocketProvider = ({ children }: TChildren) => {
	const socketInit = () => {
		if (!window.WebSocket) {
			useNotifications({
				title: "WebSocket Error",
				message: "Your browser does not support WebSockets.",
				color: "red",
			});
		}
		const conn = new WebSocket("ws://localhost:8080/listen");
		conn.onopen = () => {
			console.log("connected");
		};
		conn.onclose = () => {
			console.log("disconnected");
		};
		conn.onmessage = (e) => {
			const data = JSON.parse(e.data);
			new Notification("Updated Content", {
				body: data.text,
				vibrate: [200, 100, 200],
			}).onclick = (ev) => {
				const notif = ev.target as Notification;
				const data = [
					new ClipboardItem({
						["text/plain"]: new Blob([notif.body], { type: "text/plain" }),
					}),
				];
				navigator.clipboard
					.write(data)
					.then(() => {
						useNotifications({
							title: "Clipboard Updated",
							message: "Updated content copied to clipboard.",
							color: "green",
						});
					})
					.catch((err) => {
						useNotifications({
							title: "Clipboard Error",
							message: "Failed to update clipboard: " + JSON.stringify(err),
							color: "red",
						});
					});
			};
		};
	};

	React.useEffect(() => {
		socketInit();
	}, []);

	return <div>{children}</div>;
};

export default SocketProvider;
