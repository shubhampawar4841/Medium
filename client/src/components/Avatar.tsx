export default function Avatar({
	name,
	size = "small",
}: {
	name: string;
	size?: "big" | "small";
}) {
	return (
		<div
			className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-300 rounded-full
				${
					size == "big"
						? "h-10 w-10 text-xl font-bold"
						: "h-8 w-8 text-base font-medium"
				}
				`}>
			<span className="">{name[0].toUpperCase()}</span>
		</div>
	);
}