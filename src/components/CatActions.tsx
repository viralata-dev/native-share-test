import { Button, Group, Tooltip } from "@mantine/core";
import { useLayoutEffect, useState } from "react";

export function CatActions() {
	const [disabled, setDisabled] = useState(false);
	const handleDownload = () => {
		const imageUrl =
			"https://placeholdr.ai/bc52482f-bb62-489d-b7ff-a9847f8ebe51/256/256";
		const a = document.createElement("a");
		a.href = imageUrl;
		a.download = "cat.jpg";
		a.click();
	};
	const handleShare = async () => {
		const imageUrl =
			"https://placeholdr.ai/bc52482f-bb62-489d-b7ff-a9847f8ebe51/256/256";
		// convert image to blob
		const imageBlob = await fetch(imageUrl).then((res) => res.blob());

		const imageFile = new File([imageBlob], "cat.jpg", {
			type: "image/jpeg",
		});

		navigator.share({
			title: "Cat image",
			text: "Check out this cat image",
			files: [imageFile],
		});
	};

	useLayoutEffect(() => {
		if (!navigator.share) {
			setDisabled(true);
		}
	}, []);

	return (
		<Group justify="center" mt="xl">
			<Button
				type="button"
				onClick={handleDownload}
				size="xl"
				variant="gradient"
				gradient={{ from: "pink", to: "yellow" }}
			>
				Download a cat image
			</Button>
			{disabled ? (
				<Tooltip label="Your browser does not support the Web Share API">
					<Button
						type="button"
						onClick={handleShare}
						disabled={disabled}
						size="xl"
					>
						Share a cat image
					</Button>
				</Tooltip>
			) : (
				<Button
					type="button"
					onClick={handleShare}
					disabled={disabled}
					size="xl"
				>
					Share a cat image
				</Button>
			)}
		</Group>
	);
}
