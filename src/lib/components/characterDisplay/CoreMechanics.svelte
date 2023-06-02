<script lang="ts">
  import { selectedCharacter } from "../../stores/selectedCharacter"
  import { i18n } from "../../stores/i18n"

  $: mechanics = $selectedCharacter.mechanics
</script>

<div>
  <div>
    {i18n.t("display.coreMechanics.hitPoints")}
  </div>
  <div>
    {i18n.t("display.coreMechanics.hitPoints.total")}
    {mechanics.hitPoints.total}
  </div>
  <div>
    {i18n.t("display.coreMechanics.hitPoints.current")}
    {mechanics.hitPoints.current}
  </div>
  <div>
    {i18n.t("display.coreMechanics.hitPoints.temporary")}
    {mechanics.hitPoints.temporary}
  </div>
  <div>
    {i18n.t("display.coreMechanics.hitPoints.debuff")}
    {mechanics.hitPoints.debuff}
  </div>
  <div>
    {i18n.t("display.coreMechanics.initiative")}
    {mechanics.initiative}
  </div>
  <div>
    {i18n.t("display.coreMechanics.defense")}
    {mechanics.defense}
  </div>
  <div>
    {i18n.t("display.coreMechanics.walkSpeed")}
    {mechanics.walkSpeed}
  </div>
  <div>
    {i18n.t("display.coreMechanics.flySpeed")}
    {mechanics.flySpeed}
  </div>
  <div>
    {i18n.t("display.coreMechanics.swimSpeed")}
    {mechanics.swimSpeed}
  </div>
  <div>
    {i18n.t("display.coreMechanics.darkVision")}
    {mechanics.darkVision}
  </div>
</div>
