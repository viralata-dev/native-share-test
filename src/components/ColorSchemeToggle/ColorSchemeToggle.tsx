import {
	Button,
	Group,
	type MantineColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { useEffect, useLayoutEffect } from "react";

export function ColorSchemeToggle() {
	const { setColorScheme, colorScheme } = useMantineColorScheme();

	useLayoutEffect(() => {
		// get from local storage
		const savedColorScheme = localStorage.getItem("colorScheme");
		if (savedColorScheme) {
			setColorScheme(savedColorScheme as MantineColorScheme);
			return;
		}
		setColorScheme("auto");
	}, [setColorScheme]);

	useEffect(() => {
		// save to local storage
		localStorage.setItem("colorScheme", colorScheme);
	}, [colorScheme]);

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
