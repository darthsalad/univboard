import React from "react";
import {
  Avatar,
  Navbar,
  TextInput,
  Button,
  Code,
  Container,
  UnstyledButton,
  UnstyledButtonProps,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  AppShell,
  Header,
} from "@mantine/core";

import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
  IconChevronRight,
} from "@tabler/icons";

import { useStyles } from "./Navbar.styles";

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

type Props = {
  children: React.ReactNode;
};

const UserButton = ({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
};

const links = [
  { icon: IconBulb, label: "Activity", notifications: 3 },
  { icon: IconCheckbox, label: "Tasks", notifications: 4 },
  { icon: IconUser, label: "Contacts" },
];

const collections = [
  { label: "Sales" },
  { label: "Deliveries" },
  { label: "Discounts" },
  { label: "Profits" },
  { label: "Reports" },
  { label: "Orders" },
  { label: "Events" },
  { label: "Debts" },
  { label: "Customers" },
];

const NavbarComponent = ({ children }: Props) => {
  const { classes } = useStyles();

  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = collections.map((collection) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      {collection.label}
    </a>
  ));

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section className={classes.section}>
            <UserButton
              image="https://i.imgur.com/fGxgcDF.png"
              name="Bob Rulebreaker"
              email="Product owner"
              icon={<IconSelector size={14} stroke={1.5} />}
            />
          </Navbar.Section>

          <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size={12} stroke={1.5} />}
            rightSectionWidth={70}
            rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
            styles={{ rightSection: { pointerEvents: "none" } }}
            mb="sm"
          />

          <Navbar.Section className={classes.section}>
            <div className={classes.mainLinks}>{mainLinks}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.section}>
            <Group className={classes.collectionsHeader} position="apart">
              <Text size="xs" weight={500} color="dimmed">
                Collections
              </Text>
              <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon variant="default" size={18}>
                  <IconPlus size={12} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <div className={classes.collections}>{collectionLinks}</div>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Container className={classes.inner} fluid>
            <Group>
              <Text
                color="indigo"
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                fz="xl"
                fw={700}
              >
                <a
                  href="/"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  univboard
                </a>
              </Text>
            </Group>
            <Button color="red" radius="xl" sx={{ height: 30 }}>
              Logout
            </Button>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default NavbarComponent;