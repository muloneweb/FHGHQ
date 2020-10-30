import React from 'react';
  /* WHEN YOU COMPLETED A REGION, Put your name after it ( ex: Weathered expanse mulo) */


/* {name:'', 
  colonial:'',
  warden:''},*/
  /**/

/* DEADLANDS  mitchel*/
let voiceEvents=[
  {name:'Abandoned Ward', //+
  colonial:'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FAbandoned_Col_1.mp3?1558957684610',
  warden:'https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2FAbandoned_Ward_1.mp3?1558957683568'},
  
  
  {name:'Brine Glen', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBrine_Col_1.mp3?1558980923824',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBrine_Ward_1.mp3?1558980924057'},
  
  
	{name:"Callahan's Belt",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanBelt_Col_1.mp3?1558980924319',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanBelt_Ward_1.mp3?1558980924563'},


	{name:"Callahan's Boot", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanBoot_Col_1.mp3?1558980924817',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanBoot_Ward_1.mp3?1558980925125'},


	{name:"Callahan's Gate",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanGate_Col_1.mp3?1558980925397',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCallahanGate_Ward_1.mp3?1558980921548'},


	{name:"Iron's End",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIron_Col_1.mp3?1558980921628',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIron_Ward_1.mp3?1558980921586'},


	{name:'Liberation Point', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLiberation_Col_1.mp3?1558980921934',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLiberation_Ward_1.mp3?1558980921958'},


	{name:'The Spine', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpine_Col_1.mp3?1558980922206',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpine_Ward_1.mp3?1558980922474'},


	{name:"Sun's Hollow",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSun_Col_1.mp3?1558980922736',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSun_Ward_1.mp3?1558980922983'},
  
  {name:"The Salt Farms", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSalt_Col_1.mp3?v=1559996000524',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSalt_Ward_1.mp3?v=1559996000761'},
  
  /*Viper Pit Mulo*/
  
  {name:"Serenity's Blight", 
  colonial:"https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSerenity's%20Blight_C.mp3?v=1560970776341",
  warden:"https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSerenity's%20Blight_W.mp3?v=1560970776542"},
  
  {name:'Kirknell', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKirknell_C.mp3?v=1560970774181',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKirknell_W.mp3?v=1560970774734'},
    
  {name:'Blackthroat', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlackthroat_C.mp3?v=1560970775592',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlackthroat_W.mp3?v=1560970777004'},
  
  {name:'Moltworth', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMoltworth_C.mp3?v=1560970776172',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMoltworth_W.mp3?v=1560970780754'},
  
  {name:'Earl Crowley', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEarl%20Crowley_C.mp3?v=1560970774401',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEarl%20Crowley_W.mp3?v=1560970774563'},
  
  /*Godcrofts Mulo*/
  
  {name:'Promithiens', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPromithiens_C.mp3?v=1560971093091',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPromithiens_W.mp3?v=1560971091905'},
    
  {name:'Skodio', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSkodio_C.mp3?v=1560971092156',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSkodio_W.mp3?v=1560971092363'},
  
  {name:'Isawa', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIsawa_C.mp3?v=1560971092604',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIsawa_w.mp3?v=1560971093803'},
    
  
  
  
  
  
  /* The Oarbreaker Isles Mulo */
  
  {name:'Alabastor Island', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAlabastor_C.mp3?v=1560862872440',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAlabastor_W.mp3?v=1560862872898'},
  
  {name:'The Conclave', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FConclave_C.mp3?v=1560862873030',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FConclave_w.mp3?v=1560862871362'},
  
  {name:'Integrum', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIntegrum_C.mp3?v=1560862873307',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIntegrum_W.mp3?v=1560862871717'},
  
  {name:'Posterus', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPosterus_C.mp3?v=1560862872609',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPosterus_W.mp3?v=1560862871546'},
  
  {name:'Skelter Course', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSkelter%20course_C.mp3?v=1560862872056',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSkelter%20course_W.mp3?v=1560862872312'},
  
  
  /*Fisherman's Row*/ 
  {name:'Arcadia', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FArcadia_C.mp3?v=1560961549723',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FArcadia_W.mp3?v=1560961548832'},
  
  {name:'Black Well', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlackwell_C.mp3?v=1560961548510',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlackwell_W.mp3?v=1560963109240'},
  
  {name:'Eidolo', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Feidolo_c.mp3?v=1560961542309',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Feidolo_W.mp3?v=1560961545305'},
  
   {name:"Hangmen's Court", 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHangmen_C.mp3?v=1560961542526',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHangmen_W.mp3?v=1560961542917'},
  
   {name:'Partisan Island', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPartisan_C.mp3?v=1560961542736',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FPartistan2_W.mp3?v=1561325594891'},
  
  {name:'The Three Sisters', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fsisters_C.mp3?v=1560961547214',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fsisters_W.mp3?v=1560961549095'},
  

  /*Shackled chasm mulo*/ 
  {name:'The Grave of Rastus', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGrave_C.mp3?v=1560863346911',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGrave_w.mp3?v=1560863347063'},
  
  {name:'Reflection', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FRefelection_C.mp3?v=1560863347375',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FReflection_w.mp3?v=1560863345470'},
  
  {name:'Savages', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSavages_C.mp3?v=1560863345941',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSavages_w.mp3?v=1560863345820'},
  
    {name:'Silk Farms', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSilk_C.mp3?v=1560863346063',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSilk_W.mp3?v=1560863346204'},
  
  {name:'The Vanguard', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FVanguard_C.mp3?v=1560863346417',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FVanguard_W.mp3?v=1560863346663'},
  
  
   /*Stonecradle  mulo*/
  {name:'Buckler Sound', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBuckler_C.mp3?v=1560863571894',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBuckler_w.mp3?v=1560863572018'},
  
  {name:'Fading Lights', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFading_C.mp3?v=1560863571778',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFading_W.mp3?v=1560863572153'},
 
   /*MarbanHollow mulo */ 
  {name:'Lockheed', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLockheed_C.mp3?v=1560863927790',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLockheed_W.mp3?v=1560863927355'},
  
  {name:'The Veil', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FVale_C.mp3?v=1560863927489',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fvale_W.mp3?v=1560863927620'},
  
 
   /*Allod mulo*/ 
  {name:'Scurvyshire', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FScurvy_C.mp3?v=1560949765523',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FScurvy_W.mp3?v=1560949766364'},
  
  {name:"Mercy's Wail", 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fwail_C.mp3?v=1560949765739',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWail_w.mp3?v=1560949765927'},
 
  
  
   /*Drowned vale Mulo*/ 
    {name:'Bootnap', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBootnap_C.mp3?v=1560440380126',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBootnap_W.mp3?v=1560440378359'},
  
  {name:'Loggerhead', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLoggerhead_C.mp3?v=1560440378608',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLoggerhead_W.mp3?v=1560440378721'},
  
    {name:'The Saltcaps', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSaltcaps_C.mp3?v=1560440378978',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSaltcaps_W.mp3?v=1560440379209'},
  
  {name:'The Baths', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FThe%20Baths_C.mp3?v=1560440379526',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FThe%20Baths_W.mp3?v=1560440379795'},
  


  
   /*Loch Mor Mulo*/ 
  {name:'Feirmor', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFerimore_col.mp3?v=1560440329657',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFerimore_ward.mp3?v=1560440329844'},
  
  {name:"Mercy's Wish", 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fmercy_col.mp3?v=1560440329495',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMercy_ward.mp3?v=1560440329970'},
  

  
  
  
   /*Linn of mercy mulo*/ 
  {name:'The Prairie Bazaar', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fbazaar_C.mp3?v=1560948481658',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fbazaar_W.mp3?v=1560948482235'},
  
  {name:'The First Coin', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCoin_C.mp3?v=1560948483235',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCoin_W.mp3?v=1560948482371'},
  
  {name:'The Crimson Gardens', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrimson_C.mp3?v=1560948479125',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrimson_W.mp3?v=1560948480089'},
  
  {name:'Outwich Ranch', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Foutiwchranch_C.mp3?v=1560948479255',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Foutiwchranch_W.mp3?v=1560948479419'},
  
  {name:'Rotdust', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FROT_C.mp3?v=1560948480824',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FROT_W.mp3?v=1560948480939'},
  
  {name:'Ulster Falls', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FUlster_C.mp3?v=1560948481362',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FUlster_W.mp3?v=1560948481533'},
  
  {name:'The Long Whine', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWhine_C.mp3?v=1560948481071',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWhine_W.mp3?v=1560948481199'},
  
  
  
   /*Tempest mulo*/ 
  {name:'Alchimio Estate', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Falchimio_C.mp3?v=1560949051936',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Falchimio_W.mp3?v=1560949052727'},
  
  {name:"Liar's Haven", 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fliar_C.mp3?v=1560949050324',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fliar_w.mp3?v=1560949051046'},
  
  {name:'Isle of Psyche', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fpsyche_C.mp3?v=1560949050687',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fpsyche_w.mp3?v=1560949051526'},
  
  {name:'The Iris', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Firis_C.mp3?v=1560949053203',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIris_W.mp3?v=1560949053926'},
  
  {name:'The Rush', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Frush_C.mp3?v=1560949051192',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Frush_W.mp3?v=1560949051336'},
  
  {name:'Surge Gate', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fsurge_c.mp3?v=1560949052873',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fsurge_w.mp3?v=1560949053033'},
  
   /*Fisherman's Row*/ 
  /*
  {name:'Alchimio Estate', 
  colonial:'',
  warden:''},
  
  {name:'', 
  colonial:'',
  warden:''},
  
  {name:'', 
  colonial:'',
  warden:''},
  */
  
  
  
  
/* ENDLESS mulo*/
  
  
 
  
  {name:'Iron Junction',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Firon_C.mp3?v=1560867097795',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIron_W.mp3?v=1560867098306'},
  
  {name:'Enduring Wake',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEND_C.mp3?v=1560867098024',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEND_W.mp3?v=1560867098177'},
    
  {name:'Saltbrook Channel', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Saltbrook%20Channel%201.mp3?1558959291757',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Saltbrook%20Channel%201.mp3?1558959293654'},
      
  {name:'Brackish Point', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Brackish%20Point%201.mp3?1558959291237',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Brackish%20Point%201.mp3?1558959292965'},
    
  {name:'Wellchurch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Wellchurch%201.mp3?1558959292493',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Wellchurch%201.mp3?1558959294480'},
      
  {name:'Woodbind', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Woodbind%201.mp3?1558959294731',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Woodbind%201.mp3?1558959294731'},
    
  {name:'Vulpine Watch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Vulpine%20Watch%201.mp3?1558959292122',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Vulpine%20Watch%201.mp3?1558959294197'},
  
  {name:'Tuatha Watchpost', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Tuatha%20Post%201.mp3?1558959291873',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Tuatha%20Post%201.mp3?1558959293935'},
  
 /*  {name:"Light's End",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCollies%20Lights%20End%201.mp3?1558959291471',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWarden%20Lights%20End%201.mp3?1558959293407'},*/
  
  
/* FARRANAC - Mitchel*/
  
  {name:'Huskhollow', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHusk_Col_1.mp3?1558979964759',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHusk_Ward_1.mp3?1558979964996'},
  
  
	{name:'Iuxta Homestead', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIuxta_Col_1.mp3?1558979965330',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIuxta_Ward_1.mp3?1558979965656'},

  
	{name:"Macha's Keening", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMacha_Col_1.mp3?1558979962456',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMacha_Ward_1.mp3?1558979962660'},
  
  
	{name:'Mara', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMara_Col_1.mp3?1558979962756',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMara_Ward_1.mp3?1558979963001'},
  
  
	/*{name:'Terra',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FTerra_Col_1.mp3?1558979963764',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FTerra_Ward_1.mp3?1558979964019'},*/
  
  
	{name:'The Jade Cove', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FJade_Col_1.mp3?1558979962482',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FJade_Ward_1.mp3?1558979962537'},
  
  
	{name:'The Spearhead', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpear_Col_1.mp3?1558979963248',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpear_Ward_1.mp3?1558979963520'},
  
  
	{name:'Victa', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FVicta_Col_1.mp3?1558979964253',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FVicta_Ward_1.mp3?1558979964499'},
  
  
  /* Heartlands - mulo & Carefulrogue */
  
  {name:'Great Barrony Ranch',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBarrony_Col_1.mp3?1559003286646',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBarrony_Ward_1.mp3?1559003286902'},
  
  {name:'LoftMire',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLoftMire_Col_1.mp3?1559003284178',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLoftMire_Ward_1.mp3?1559003284550'},
  
  {name:'Foundation Lane',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoundation_Col_1.mp3?1559003283557',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoundation_Ward_1.mp3?1559003283522'},
  //Excess space in https://war-service-live.foxholeservices.com/api/worldconquest/maps/UpperHeartlands/static for "Barronstown"
  {name:'Barronstown ', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBarronstown_Col_1.mp3?1559003286154',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBarronstown_Ward_1.mp3?1559003286400'},
  
  {name:'Deeplaw Post', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDeeplaw_Col_1.mp3?1559003287689',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDeeplaw_Ward_1.mp3?1559003283283'},
  
  {name:'Greenfield Orchard', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGreenfield_Col_1.mp3?1559003283674',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGreenfield_Ward_1.mp3?1559003283940'},
  
  {name:'The Blemish', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlemish_Col_1.mp3?1559003287381',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBlemish_Ward_1.mp3?1559003287444'},
  
  {name:'Oleander Homestead', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOleander_Col_1.mp3?1559003284819',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOleander_Ward_1.mp3?1559003285063'},
  
  {name:'Proexí', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FProexi_Col_1.mp3?1559003285627',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FProexi_Ward_1.mp3?1559003285879'},
  
  /* Umbral - Carefulrogue*/
  
  {name:'GoldenRoot Ranch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGoldenRoot_Col_1.mp3?1559000732940',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGoldenRoot_Ward_1.mp3?1559000733034'},
  
  {name:'The Foundry', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoundry_Col_1.mp3?1559000732715',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoundry_Ward_1.mp3?1559000732650'},
  
  {name:'Thunderfoot',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FThunderfoot_Col_1.mp3?1559002157811',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FThunderfoot_Ward_1.mp3?1559002158317'},
  
  {name:'Borderwatch',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBorderwatch_Col_1.mp3?1559002159366',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBorderwatch_Ward_1.mp3?1559002155517'},
  
  {name:'Amethyst', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAmethyst_Col_1.mp3?1559002159290',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAmethyst_Ward_1.mp3?1559002159323'},
  
  {name:"Hermit's Rest", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHermit_Col_1.mp3?1559002156512',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHermit_Ward_1.mp3?1559002157176'},
  
  {name:'Stray', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FStray_Col_1.mp3?1559002157389',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FStray_Ward_1.mp3?1559002157564'},
  
  {name:'Sentry', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSentry_Col_1.mp3?1559002157320',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSentry_Ward_1.mp3?1559002157291'},
  
  
  /* Great march mulo */
  
  {name:'Violethome', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FViolethome_Col_1.mp3?1559043419310',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FViolethome_Ward_1.mp3?1559043419568'},
  
  {name:'Leto', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLeto_Col_1.mp3?1559043419807',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLeto_Ward_1.mp3?1559043420117'},
  
  {name:"Myrmidon's Stay", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMyrmidon_Col_1.mp3?1559043417213',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMyrmidon_Ward_1.mp3?1559043417132'},
  
  {name:'Remnant Villa', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCol_RemnantV.mp3?v=1563805644114',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FRemnantV_Warden.mp3?v=1563805424490'},
  
  {name:'Schala Estate',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSchala_Col_1.mp3?1559043417728',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSchala_Ward_1.mp3?1559043417969'},
  
  {name:'Sitaria', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSitaria_Col_1.mp3?1559043418209',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSitaria_Ward_1.mp3?1559043418532'},
  
  {name:'Milowood',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMilowood_Col_1.mp3?1559043420416',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMilowood_Ward_1.mp3?1559043417072'},
  
  {name:'The Swan', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSwan_Col_1.mp3?1559043418758',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSwan_Ward_1.mp3?1559043419019'},
  
  /* Reaching trails mulo */
  
  {name:'Dwyerstown', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDwyers_Col_1.mp3?1559043816432',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDwyers_Ward_1.mp3?1559043816668'},
  
  {name:'Elksford', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FElksford_Col_1.mp3?1559050330431',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FElksford_Ward_1.mp3?1559050339655'},
  
  {name:'Ice Ranch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIce_Col_1.mp3?1559043813785',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FIce_Ward_1.mp3?1559043813966'},
  
  {name:'Brodytown', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBrody_Col_1.mp3?1559043815450',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBrody_Ward_1.mp3?1559043815695'},
  
  {name:'Mousetrap', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMouse_Col_1.mp3?1559043814045',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FMouse_Ward_1.mp3?1559043814260'},
  
  {name:'Nightchurch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FNight_Col_1.mp3?1559043814460',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FNight_Ward_1.mp3?1559043814673'},
  
  {name:'Reprieve', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FReprieve_Col_1.mp3?1559043814928',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FReprieve_Ward_1.mp3?1559043815205'},
  
  {name:'Camp Eos',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCampEos_Col_1.mp3?1559043815943',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCampEos_Ward_1.mp3?1559043816169'},
  
  /* westgate mulo*/
  
  {name:'The Gallows', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGallows_Col_1.mp3?1559043521644',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGallows_Ward_1.mp3?1559043521863'},
  
  {name:'Killian Quarter',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKillian_Col_1.mp3?1559043522105',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKillian_Ward_1.mp3?1559043522353'},
  
  {name:'Kingstone', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKingstone_Col_1.mp3?1559043519500',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKingstone_Ward_1.mp3?1559043519731'},
  
  {name:"Lord's Mouth", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLord_Col_1.mp3?1559043520210',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLord_Ward_1.mp3?1559043520349'},
  
  {name:'Longstone', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLongstone_Col_1.mp3?1559043519781',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLongstone_Ward_1.mp3?1559043519911'},
  
  {name:'Sanctuary', 
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSanctuary_C.mp3?v=1560963576165',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSanctuary_W.mp3?v=1560963577113'},
  
  {name:'Ferrum Cross',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFerrum_Col_1.mp3?1559043521131',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFerrum_Ward_1.mp3?1559043521370'},
  
  
  
  /* mooring/moors mulo*/
  
 /* {name:"Aillen's Burrow",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAilen_Col_1.mp3?1559043594325',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FAilen_Ward_1.mp3?1559043594572'},*/
  
  {name:'Ogmaran', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOgmaran_C.mp3?v=1560952093839',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOgmaran_W.mp3?v=1560952095008'},
  
  {name:"Luch's Workshop", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fworkshop_C.mp3?v=1560952094490',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fworkshop_W.mp3?v=1560952094306'},
  
  /*{name:'Spade',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpade_Col_1.mp3?1559043593836',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpade_Ward_1.mp3?1559043594123'},*/
  
  {name:'Headstone', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHeadstone_C.mp3?v=1560952093668',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FHeadstone_W.mp3?v=1560952093503'},
  
  {name:"Morrighan's Grave", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGrave_C.mp3?v=1560952096082',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FGrave_W.mp3?v=1560952093313'},
  
  {name:'The Cut', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fcut_C.mp3?v=1560952096241',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fcut_W.mp3?v=1560952095585'},
  
  //unknown reason of inclusion of \t in MacConmara Barrows
  {name:'MacConmara Barrows\t', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fbarrows_C.mp3?v=1560952095738',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBarrows_W.mp3?v=1560952095939'},
  
  /* .26 Weathered expanse mulo */
  
  {name:'The Weathering Halls', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWeathering_Col_1.mp3?1559043670199',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWeathering_Ward_1.mp3?1559043670457'},
  
  {name:"Crow's Nest", //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrows_Col_1.mp3?1559043671785',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrows_Ward_1.mp3?1559043668456'},
  
  {name:'Rest', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWightwalk_Col_1.mp3?1559043670741',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWightwalk_Ward_1.mp3?1559043670958'},
  
  {name:'Wightwalk', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWightwalk_Col_1.mp3?1559043670741',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWightwalk_Ward_1.mp3?1559043670958'},
  
  
   {name:'Foxcatcher', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoxcatcher_Col_1.mp3?1559043669222',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FFoxcatcher_Ward_1.mp3?1559043669539'},
  
  /*{name:'Spire',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpire_Col_1.mp3?1559043669739',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSpire_Ward_1.mp3?1559043669958'},
  
  {name:'Eldergate',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEldergate_Col_1.mp3?1559043668882',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FEldergate_Ward_1.mp3?1559043668975'},
  
  {name:"Dullahan's Crest",
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDullahan_Col_1.mp3?1559043668635',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FDullahan_Ward_1.mp3?1559043668820'},
  
  {name:'Bannerwatch',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBannerwatch_Col_1.mp3?1559043671288',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FBannerwatch_Ward_1.mp3?1559043671583'},*/
  
  /* .26 missing Cragstown Callahans Passage  mulo*/
  
  {name:'Solas Gorge', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSolas_Col_1.mp3?1559043729583',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FSolas_Ward_1.mp3?1559043729838'},
  
  {name:'White Chapel', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWhite_Col_1.mp3?1559043730125',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FWhite_Ward_1.mp3?1559043730346'},
  
  {name:'Lochan Berth', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLochan_Col_1.mp3?1559043728618',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLochan_Ward_1.mp3?1559043728817'},
  
  {name:'Overlook Hill', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOverlook_Col_1.mp3?1559043729136',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FOverlook_Ward_1.mp3?1559043729326'},
  
  {name:'The Latch', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLatch_Col_1.mp3?1559043728295',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FLatch_Ward_1.mp3?1559043728394'},
  
  {name:'Crumbling Post', //+
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrumbling_Col_1.mp3?1559043730715',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrumbling_Ward_1.mp3?1559043730959'},
  
 {name:'Cragstown',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FCrag_col.mp3?v=1560865587459',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2Fcrag_ward.mp3?v=1560865587304'},
  
 /* {name:'The Key',
  colonial:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKey_Col_1.mp3?1559043728021',
  warden:'https://cdn.glitch.com/5ecd33f4-21db-4927-be16-205712d7dbc5%2FKey_Ward_1.mp3?1559043728191'},*/
  
  /* Reaching trails */
  
  /* Weathered expanse */
  
/*  {name:'',
  colonial:'',
  warden:''},*/
]

export default voiceEvents