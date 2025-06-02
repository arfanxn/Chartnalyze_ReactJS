import { UIMatch } from "react-router";

// Extend the UIMatch type with our custom handle properties
export interface Match extends UIMatch {
	handle: {
		title?: string;
		// Add other handle properties here if needed
	};
}
