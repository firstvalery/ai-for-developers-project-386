import { useState } from 'react';
import {
  AppShell,
  Button,
  Container,
  Group,
  Paper,
  Text,
  Title,
  Badge,
} from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

export default function App() {
  const [hello, setHello] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchHello() {
    setLoading(true);
    try {
      const res = await fetch('/api/hello');
      setHello(await res.json());
    } catch (e) {
      setHello({ message: 'Backend is not reachable' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container h="100%" display="flex" align="center" justify="space-between">
          <Group gap="xs">
            <IconSparkles size={24} color="var(--mantine-color-blue-5)" />
            <Title order={4}>Frontend</Title>
          </Group>
          <Badge variant="light">Vite + React + Mantine</Badge>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="sm">
          <Paper withBorder p="xl" radius="md">
            <Title order={2} mb="xs">
              Welcome
            </Title>
            <Text c="dimmed" mb="lg">
              Minimal React + Vite application powered by Mantine.
            </Text>
            <Group>
              <Button onClick={fetchHello} loading={loading}>
                Call backend
              </Button>
            </Group>
            {hello && (
              <Paper withBorder p="md" mt="lg" bg="var(--mantine-color-gray-0)">
                <Text size="sm">
                  <b>message:</b> {hello.message}
                </Text>
                {hello.timestamp && (
                  <Text size="sm">
                    <b>timestamp:</b> {hello.timestamp}
                  </Text>
                )}
              </Paper>
            )}
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
