let loadWeapons = await fetch("./data/weapons_stats.json");
export const weapons = await loadWeapons.json();

let loadAttachements = await fetch("./data/attachments_stats.json");
export const attachments = await loadAttachements.json();