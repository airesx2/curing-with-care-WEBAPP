import * as React from "react";
import { HoverCard } from "radix-ui";
import "./HoverCard.css";
import sampleImg from "../images/sample.jpg";

const HoverCardDemo = () => (
	<HoverCard.Root>
		<HoverCard.Trigger asChild>
			<a
				className="ImageTrigger"
				target="_blank"
				rel="noreferrer noopener"
			>
				<img
					className="Image normal"
					src={sampleImg}
					alt="Sample"
				/>
			</a>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content className="HoverCardContent" sideOffset={5}>
				<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
			
					<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
						<div className="Text">
							Helllo! This is a sample hover card!
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="HoverCardArrow" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
);

export default HoverCardDemo;
