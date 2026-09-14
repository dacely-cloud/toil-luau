# Progress feedback — September 11, 2026

Synced to Studio and staging; not published.

- Level-ups restore up to 10 energy and 5 stamina per newly reached level,
  bounded by resource capacity. One message groups skipped levels and names
  the newest shop item unlocked. No cookies or XP are minted by this gift.
- A saved rewardedLevel prevents repeat gifts after reconnecting or rebirthing.
  Older saves begin at their current level without a retroactive reward backlog.
- Building and upgrade purchases report actual CPS/tap gains, with compact
  numbers and the configured artwork. Collection-tier purchases receive the
  achievement celebration treatment.
- Notifications show official item/building art, a spring pop and the existing
  achievement sound. They keep the existing short lifetimes and replacement
  behavior, with no queue, extra per-frame loops or automatic-cursor popups.
- Preserved Studio's newer entitlement lookup retry/background recovery code.

All 34 native suites pass, including gift replay/cap/save/rebirth tests, exact
purchase feedback and notification icon/replacement checks. Updated App, server
and Economy compile. Studio verified the isolated level reward and illustrated
notification, without editing player progress or reporting console errors.

The progression simulator now claims level gifts. Its heavily boosted five-minute
profile still owns six of twelve item types, at level six; the early reward
does not bypass shop level requirements. Earlier pacing tables describe the
economy before these small resource gifts.
