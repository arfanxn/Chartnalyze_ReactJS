import { Match } from "@/core/types/routers";
import { UIMatch } from "react-router";

/**
 * Type guard with proper type narrowing
 * Check if a UIMatch has a handle with a title property
 * @param match The UIMatch to check
 * @returns A type predicate indicating whether the match has a title handle
 */
export function hasTitleHandle(
	match: UIMatch
): match is Match & { handle: { title: string } } {
	return !!(match as Match).handle?.title;
}
