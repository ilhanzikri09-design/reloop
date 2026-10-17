# ReLoop

Small pickups. Bigger impact. A working SDP Hackathon 2026 prototype for coordinating neighbourhood recycling collections.

## Run locally

Requires Node.js 20 or newer. No package installation, API keys or build step required.

```sh
npm start
# or: node server.mjs
```

Open http://127.0.0.1:4173. Run `node --test tests/*.test.mjs` for the domain tests. The `dist/` directory can also be served by any static web host.

## Five-minute demo

1. Open Overview. The 12 initial requests are synthetic; accepted weight starts at zero.
2. Book a pickup: choose one of three accepted materials, estimate 0.1–30 kg, select a collection point and time window, and confirm preparation. No real personal information is needed.
3. Open Route planner. Compare individual hub-to-household return trips with grouped rounds for the identical requests. Filter by window and switch between map overlays.
4. Assign a round. Open Collections and record actual accepted/rejected weights, or a missed pickup. Rejections and missed pickups require reasons.
5. Open Impact & records. Observe weight-based rejection, completion rates, timestamped outcomes and closed-round accepted kg/km. Export CSV records.
6. Reset demo data to return to the original 12 requests. Reset requires confirmation.

## Scope and honesty

- One **fictional Meranti neighbourhood**, one **fictional GreenLink collector**, three materials: clean paper/cardboard, PET #1 bottles and aluminium beverage cans.
- Fixed demonstration slots on 24–25 October 2026, MYT (UTC+8). These are not real appointment availability.
- All points, requests and weights entered during the demonstration are demo data. User-created bookings have a different source label from seeded requests.
- No authentication, backend, notifications, live map, real collector integration or independent weight verification. The resident, collector and SDP screens are views, not access-controlled roles.
- Browser `localStorage` persists data on the same origin/device. Records do not sync between users, localhost and hosted URLs. Do not use for real household records.
- Accepted collection weight is not proof of downstream recycling. Bookings never count as accepted weight.

## Route comparison

Both alternatives use the same pending, accepted-material requests, hub, pickup windows and synthetic distance model. Baseline: each booking receives its own hub → point → hub trip. Grouped plan: requests share rounds within each collection window, with a 150 kg estimated capacity. Nearest-neighbour ordering followed by 2-opt reduces route distance; it does not guarantee a globally optimal route.

Coordinates are invented kilometre units on a rectilinear grid, using |Δx| + |Δy|. They are not real road-network distances. Traffic, dwell time, actual driven distance and vehicle volume are not modelled. Multiple rounds within a window assume sequential execution; validate time feasibility with a collector. No emissions savings are asserted.

Planning efficiency uses estimated kg / modelled km. Accepted kg/km uses recorded accepted weight / the frozen assigned round distance and is shown only when every request in the round has a recorded outcome. This still uses modelled distance, not GPS evidence.

## Outcome metrics

- **Accepted kg:** sum of recorded accepted weights.
- **Completion:** pickups with some accepted material / all closed pickups (collected + rejected + missed). Partially accepted pickups count as collected.
- **Rejected-material rate:** rejected kg / (accepted + rejected kg). Missed pickups contribute no inspected mass.
- Pending and scheduled bookings are excluded from closed-outcome rates. Undefined rates display a dash.

## Architecture

`dist/core.js`: pure routing, validation, measurement and export functions. `dist/app.js`: browser UI and storage. `dist/style.css`: responsive visual design. `server.mjs`: dependency-free loopback static server. `tests/core.test.mjs`: meaningful domain invariants.

## Validation before a field pilot

Interview a collector to confirm acceptance rules, contamination handling, capacity, timings, weighing process and willingness to participate. Test the booking journey with residents, recording task completion and confusion points. Add authenticated roles, a shared database, consent and retention controls, audit history, collector notifications and a real routing service before operational use.

## Brief alignment

The supplied SDP Hackathon Briefing (slides 15–16) places local recycling guidance and collection booking under the PLANET theme. This prototype addresses that journey and adds same-request route comparison and traceable outcomes. The briefing is reference material, not an instruction to submit or contact anyone. No affiliation with or endorsement by SDP is implied.
