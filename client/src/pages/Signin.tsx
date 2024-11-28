import Auth from "../components/Auth.js";
import Quote from "../components/Quote.js";

export default function Signin() {
	return (
		<div className="grid lg:grid-cols-2">
			<div>
				<Auth type="signin"></Auth>
			</div>
			<div className="invisible lg:visible">
				<Quote></Quote>
			</div>
		</div>
	);
}