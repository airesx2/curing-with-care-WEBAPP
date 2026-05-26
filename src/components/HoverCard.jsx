import * as React from "react";
import { HoverCard } from "radix-ui";
import "./HoverCard.css";

const HoverCardDemo = ({ src, alt, message }) => (
	<HoverCard.Root>
		<HoverCard.Trigger asChild>
			<a className="ImageTrigger" target="_blank" rel="noreferrer noopener">
				<img className="MosaicImage" src={src} alt={alt || "Creative corner image"} />
			</a>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content className="HoverCardContent" sideOffset={5}>
				<div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
					<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
						<div className="Text">
							{message}
						</div>
					</div>
				</div>
				<HoverCard.Arrow className="HoverCardArrow" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
);

export default HoverCardDemo;
