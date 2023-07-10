import React from "react";
import {
	TextInput,
	Textarea,
	Modal,
	ActionIcon,
	Group,
	Button,
} from "@mantine/core";

import { useStyles } from "./card.styles";
import { IconPinned, IconPinnedFilled } from "@tabler/icons-react";
import IconOptions from "../IconOptions/IconOptions";

type CardModalProps = {
	title: string;
	text: string;
	labels: string[];
	owner: string;
	collaborators: string[];
	id: string;
	pinned: boolean;
	createdOn: string;
  modifiedOn: string;
  close: () => void;
};

const CardModal = ({
	title,
	text,
	labels,
	owner,
	collaborators,
	id,
	pinned,
	createdOn,
  modifiedOn,
  close,
}: CardModalProps) => {
	const { classes } = useStyles();
	const [titleValue, setTitleValue] = React.useState(title);
	const [textValue, setTextValue] = React.useState(text);
	const [pinValue, setPinValue] = React.useState(pinned);

	return (
		<div>
			<Modal.Header>
				<TextInput
					placeholder={title}
					variant="unstyled"
					value={titleValue}
					onChange={(event) => setTitleValue(event.currentTarget.value)}
				/>
				<ActionIcon onClick={() => setPinValue(!pinValue)}>
					{pinValue ? (
						<IconPinnedFilled size={23} className={classes.pinIcon} />
					) : (
						<IconPinned size={23} className={classes.pinIcon} />
					)}
				</ActionIcon>
			</Modal.Header>
			<Modal.Body>
        <Textarea
          data-autofocus
					placeholder={text}
					variant="unstyled"
					autoFocus
					autosize
					value={textValue}
					onChange={(event) => setTextValue(event.currentTarget.value)}
        />
        <IconOptions />
				<Group spacing="md" mt={10} position="right">
					<Button
						variant="subtle"
						onClick={() => {
							close();
						}}
					>
						Save
					</Button>
					<Button
						variant="subtle"
						onClick={() => {
							close();
						}}
					>
						Cancel
					</Button>
				</Group>
			</Modal.Body>
		</div>
	);
};

export default CardModal;
