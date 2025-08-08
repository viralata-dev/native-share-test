import {
	Button,
	Group,
	type MantineColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { useEffect } from "react";

export function ColorSchemeToggle() {
	const { setColorScheme } = useMantineColorScheme();

	useEffect(() => {
		const localColorScheme = localStorage.getItem("colorScheme");
		if (localColorScheme) {
			setColorScheme(localColorScheme as MantineColorScheme);
			return;
		}
		setColorScheme("auto");
	}, [setColorScheme]);

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
