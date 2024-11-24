export default function Avatar({
	name,
	size = "small",
}: {
	name: string;
	size?: "big" | "small";
}) {
	// Handle cases where `name` is empty or undefined
	const displayName = name && name.length > 0 ? name[0].toUpperCase() : "?";

	return (
		<div
			className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full
				${
					size === "big"
						? "h-10 w-10 text-xl font-bold"
						: "h-8 w-8 text-base font-medium"
				}`}>
			<span>{displayName}</span>
		</div>
	);
}
