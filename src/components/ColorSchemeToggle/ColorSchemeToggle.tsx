import { Button, Group, useMantineColorScheme } from "@mantine/core";

export function ColorSchemeToggle() {
	const { setColorScheme } = useMantineColorScheme();

	return (
		<Group justify="end" mt="xl" w="100%" px="xl">
			<Button
				variant="gradient"
				gradient={{
					from: "gray.7",
					to: "gray.9",
				}}
				onClick={() => setColorScheme("light")}
			>
				Light
			</Button>
			<Button
				variant="gradient"
				gradient={{
					from: "gray.9",
					to: "gray.7",
				}}
				onClick={() => setColorScheme("dark")}
			>
				Dark
			</Button>
			<Button
				variant="outline"
				color="gray"
				onClick={() => setColorScheme("auto")}
			>
				Auto
			</Button>
		</Group>
	);
}
