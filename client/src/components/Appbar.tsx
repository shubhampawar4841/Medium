import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { useUserDetails } from "../hooks";
import { useState, useRef, useEffect } from "react";
import Logout from "./Logout";

export default function Appbar({ write = true }: { write: boolean }) {
	const userDetails = useUserDetails(localStorage.getItem("token"));
	const [hover, setHover] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setHover(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="h-16 p-2 px-10 border-b"
			title="home">
			<div className="flex justify-between ">
				<Link
					className="flex "
					to={"/blogs"}>
					<Logo />
				</Link>
				<div className="flex items-center gap-10">
					{write ? (
						<Link to={"/write"}>
							<div className="flex items-center gap-1 font-light cursor-pointer">
								<div>Write</div>

								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									aria-label="Write">
									<path
										d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
										fill="currentColor"></path>
									<path
										d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
										stroke="currentColor"></path>
								</svg>
							</div>
						</Link>
					) : (
						""
					)}
					<div style={{ position: "relative" }}>
						{!hover ? (
							<div className="flex items-center gap-3">
								<Avatar
									name={userDetails.name}
									size="big"
								/>
								<div className="flex justify-center gap-1 cursor-pointer ">
									<div
										onClick={() => {
											setHover(!hover);
										}}
										className="border-b-4 first-letter:uppercase">
										{userDetails.name}
										<span className="relative bottom-0 font-bold">
											&#8964;
										</span>
									</div>
								</div>
							</div>
						) : (
							<div
								className="dropdown-content"
								ref={dropdownRef}>
								<div
									onClick={() => {
										setHover(!hover);
									}}
									className="flex items-center gap-3">
									<Avatar
										name={userDetails.name}
										size="big"
									/>
									<div className="flex justify-center gap-1 cursor-pointer">
										<div className="border-b-4 border-blue-950 first-letter:uppercase">
											{userDetails.name}{" "}
											<span className="relative bottom-0 font-bold">
												&#8964;
											</span>
										</div>
										<div className="relative bottom-0 font-bold"></div>
									</div>
								</div>
								<div className="absolute bg-white dropdown-options top-12">
									<div className="flex flex-col gap-3 py-3 pl-3 pr-10 border rounded-md shadow-lg text-nowrap">
										<Link to={"/your-blogs"}>
											<div>Your Blogs</div>
										</Link>
										<div>
											<Link to={"/settings"}>
												<div className="cursor-pointer">
													Settings
												</div>
											</Link>
										</div>
										<div className="pt-1 -mt-1 border-t">
											<Logout></Logout>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>{" "}
				</div>
			</div>
		</div>
	);
}