import React from "react";
import { Card, Image, Text, UnstyledButton } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";

const Home = () => {
  const openModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <div>
      <UnstyledButton onClick={openModal}>
        <Card
          shadow="sm"
          p="xl"
          style={{ maxWidth: "400px" }}
        >
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
              height={160}
              alt="No way!"
            />
          </Card.Section>

          <Text weight={500} size="lg" mt="md">
            You&apos;ve won a million dollars in cash!
          </Text>

          <Text mt="xs" color="dimmed" size="sm">
            Please click anywhere on this card to claim your reward, this is not
            a fraud, trust us
          </Text>
        </Card>
      </UnstyledButton>
    </div>
  );
};

export default Home;
