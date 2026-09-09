-- Semantic image names only. Asset IDs live in ReplicatedStorage.ImageConfig.
return {
    buildings={"CursorCookie","Grandma","Farm","Mine","CookieFactory","CookieBank","CookieTemple","CookieWizardTower","CookieShipment","CookieAlchemy","CookiePortal","CookieTimeMachine","CookieAntimatterCondenser","CookiePrism","CookieChangemaker","CookieFractalEngine","CookieConsole","CookieIdleverse","CookieCortexBreaker","CookieYou"},
    jobs={dishes="WashCookieTray",deliver="CookieDelivery",cater="BakeForParty",festival="CookieFestival"},
    properties={stand="CookieStand",store="CookieStore",market="CookieMarket"},
    -- goldenWhisk and starApron borrowed the spatula and apron art while they had
    -- none of their own; they have their own now.
    items={flour="Flour",sugar="Sugar",spatula="Spatula",eggs="Eggs",butter="Butter",milk="Milk",apron="LuckyApron",dough="Dough",chocolate="Chocolate",mixer="SilverMixer",tray="BakingTray",crown="CookieCrown",goldenWhisk="GoldenWhisk",starApron="StarApron"},
    jobBackgrounds={dishes="WashTray",deliver="DeliverCookie",cater="BakreForAParty",festival="CookieFestival"},
    propertyBackgrounds={stand="BakingCookie",store="CookieStore",market="CookieMarket"},
    -- These are ZoneBackground names, a different set from the icons above.
    itemBackgrounds={flour="BakingCookie",sugar="BakingCookie",spatula="WashTray",eggs="BakingCookie",butter="BakingCookie",milk="BakingCookie",apron="Luck",dough="BakingCookie",chocolate="CookieManifacture",mixer="Mixer",tray="WashTray",crown="Crown"},
    buildingBackgrounds={[1]="BakingCookie",[2]="CookieParty",[5]="CookieManifacture",[6]="CookieBank"},
    -- Keep saved badge IDs compatible while using the configured artwork.
    badges={cookie="Cookie",crown="CookieCrown",star="GoldenCookie",heart="CookieJar",shield="CookieEmpire",bakery="CookieStore"},
}
