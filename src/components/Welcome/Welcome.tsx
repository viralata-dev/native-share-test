import { Text, Title } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
	return (
		<Title className={classes.title} ta="center" mt={100}>
			Testing{" "}
			<Text
				inherit
				variant="gradient"
				component="span"
				gradient={{ from: "pink", to: "yellow" }}
			>
				Native Share
			</Text>
		</Title>
	);
}
