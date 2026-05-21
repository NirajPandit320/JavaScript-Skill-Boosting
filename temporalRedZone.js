// Temporal "red zone" example: detecting skipped (gap) and repeated local times
// during DST transitions using Temporal.TimeZone.getPossibleInstantsFor().
// Run with: `node temporalRedZone.js` (install @js-temporal/polyfill if needed).

const Temporal = globalThis.Temporal ?? (() => {
	try {
		return require('@js-temporal/polyfill');
	} catch (e) {
		throw new Error('Temporal not available. Install @js-temporal/polyfill or use a runtime with Temporal.');
	}
})
();

function showTemporalRedZoneExamples() {
	const tz = new Temporal.TimeZone('America/New_York');

	// 2021-03-14 02:00 - 02:59 does NOT exist in America/New_York (spring forward)
	const gap = Temporal.PlainDateTime.from('2021-03-14T02:30');

	// 2021-03-14 01:30 exists (before the jump)
	const beforeGap = Temporal.PlainDateTime.from('2021-03-14T01:30');

	// 2021-11-07 01:30 is ambiguous in America/New_York (fall back) — it occurs twice
	const repeated = Temporal.PlainDateTime.from('2021-11-07T01:30');

	function inspect(plainDT, label) {
		const possibles = tz.getPossibleInstantsFor(plainDT);
		if (possibles.length === 0) {
			console.log(`${label}: ${plainDT.toString()} — RED ZONE (no matching instant)`);
		} else if (possibles.length === 1) {
			console.log(`${label}: ${plainDT.toString()} — unique instant: ${possibles[0].toString()}`);
		} else {
			console.log(`${label}: ${plainDT.toString()} — AMBIGUOUS (possible instants: ${possibles.length})`);
			possibles.forEach((inst, i) => console.log(`  [${i}] ${inst.toString()}`));
		}
	}

	inspect(beforeGap, 'Before gap');
	inspect(gap, 'Gap time');
	inspect(repeated, 'Repeated (ambiguous) time');

	// Example strategy to resolve a gap: move forward to the next valid local time
	if (tz.getPossibleInstantsFor(gap).length === 0) {
		const shifted = gap.add({ hours: 1 }); // 03:30 local time — valid
		const inst = tz.getPossibleInstantsFor(shifted)[0];
		console.log(`Resolved gap by shifting forward: ${shifted.toString()} -> ${inst.toString()}`);
	}
}

if (typeof module !== 'undefined' && require.main === module) {
	showTemporalRedZoneExamples();
}

module.exports = { showTemporalRedZoneExamples };

