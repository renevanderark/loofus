/* @flow */
export default function() {
	let scale : number;
	let registered : Array<{elem: HTMLElement, eventName: string, fn : (Event) => (Event, number) => any}> = [];

	return {
		onResize(s : number) {
			scale = s;
		},
		add(eventName : string, onEvent : (Event, number) => any, elem : HTMLElement = window) {
			const fn = ev => onEvent(ev, scale);

			registered.push({
				elem: elem,
				eventName: eventName,
				fn: fn
			});

			elem.addEventListener(eventName, fn);
		},
		clear() {
			registered.forEach(({elem, eventName, fn}) =>
				elem.removeEventListener(eventName, fn)
			)
		}
	}
};
