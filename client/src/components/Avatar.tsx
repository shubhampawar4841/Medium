interface AvatarProps {
	name: string;
	size: "small" | "big";
  }
  
  export function Avatar({ name, size = "small" }: AvatarProps) {
	return (
	  <div
		className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full ${
		  size === "small" ? "w-6 h-6" : "w-10 h-10"
		}`}
	  >
		<span
		  className={`${
			size === "small" ? "text-xs" : "text-md"
		  } font-medium text-gray-900 dark:text-gray-300`}
		>
		  {name[0]}
		</span>
	  </div>
	);
  }
  
  export default Avatar;
  