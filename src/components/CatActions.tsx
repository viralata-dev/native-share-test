import { Button, Group, Tooltip } from "@mantine/core";
import { useLayoutEffect, useState } from "react";

const CAT_IMAGE_URL =
	"https://placeholdr.ai/2e17c53f-b4d5-4af5-a772-6b3c6cfab942/256/256";

export function CatActions() {
	const [disabled, setDisabled] = useState(false);

	const handleDownload = () => {
		fetch(CAT_IMAGE_URL)
			.then((res) => res.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = "cat.jpg";
				a.click();
			});
	};

	const handleShare = () => {
		fetch(CAT_IMAGE_URL)
			.then((res) => res.blob())
			.then((blob) => {
				const imageFile = new File([blob], "cat.jpg", {
					type: "image/jpeg",
				});

				navigator.share({
					title: "Cat image",
					text: "Check out this cat image",
					files: [imageFile],
				});
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
