var admin =
    'SELECT "public"."result"."id" AS "id", "public"."result"."createdAt" AS "createdAt", "public"."result"."updatedAt" AS "updatedAt", "public"."result"."grade" AS "grade", "public"."result"."attrs" AS "attrs", "public"."result"."type" AS "type", "public"."result"."userId" AS "userId", "public"."result"."groupId" AS "groupId", "public"."result"."objectId" AS "objectId", "public"."result"."path" AS "path", "public"."result"."version" AS "version", "public"."result"."eventId" AS "eventId", "public"."result"."isLast" AS "isLast", "public"."result"."campus" AS "campus", "public"."result"."output" AS "output", "User - UserId"."id" AS "User - UserId__id", "User - UserId"."githubId" AS "User - UserId__githubId", "User - UserId"."githubLogin" AS "User - UserId__githubLogin", "User - UserId"."discordId" AS "User - UserId__discordId", "User - UserId"."discordLogin" AS "User - UserId__discordLogin", "User - UserId"."profile" AS "User - UserId__profile", "User - UserId"."attrs" AS "User - UserId__attrs", "User - UserId"."createdAt" AS "User - UserId__createdAt", "User - UserId"."updatedAt" AS "User - UserId__updatedAt", "User - UserId"."discordDMChannelId" AS "User - UserId__discordDMChannelId", "User - UserId"."campus" AS "User - UserId__campus", "User - UserId"."firstName" AS "User - UserId__firstName", "User - UserId"."lastName" AS "User - UserId__lastName", "User - UserId"."email" AS "User - UserId__email"\nFROM "public"."result"\nLEFT JOIN "public"."user" "User - UserId" ON "public"."result"."userId" = "User - UserId"."id"\nWHERE ("public"."result"."path" = \'/london/onboarding/administration\'\n   AND "public"."result"."updatedAt" >= CAST((CAST(now() AS timestamp) + (INTERVAL \'-100 day\')) AS date) AND "public"."result"."updatedAt" < CAST((CAST(now() AS timestamp) + (INTERVAL \'1 day\')) AS date))\nORDER BY "public"."result"."updatedAt" DESC\nLIMIT 1048575';
var toad =
    'SELECT "public"."result"."createdAt" AS "createdAt", "public"."result"."updatedAt" AS "updatedAt", "public"."result"."grade" AS "grade", "public"."result"."attrs" AS "attrs", "public"."result"."path" AS "path", "public"."result"."campus" AS "campus", "User - UserId"."id" AS "User - UserId__id", "User - UserId"."githubId" AS "User - UserId__githubId", "User - UserId"."githubLogin" AS "User - UserId__githubLogin", "User - UserId"."discordId" AS "User - UserId__discordId", "User - UserId"."discordLogin" AS "User - UserId__discordLogin", "User - UserId"."profile" AS "User - UserId__profile", "User - UserId"."attrs" AS "User - UserId__attrs", "User - UserId"."createdAt" AS "User - UserId__createdAt", "User - UserId"."updatedAt" AS "User - UserId__updatedAt", "User - UserId"."discordDMChannelId" AS "User - UserId__discordDMChannelId", "User - UserId"."campus" AS "User - UserId__campus", "User - UserId"."firstName" AS "User - UserId__firstName", "User - UserId"."lastName" AS "User - UserId__lastName", "User - UserId"."email" AS "User - UserId__email"\nFROM "public"."result" INNER JOIN "public"."user" "User - UserId" ON "public"."result"."userId" = "User - UserId"."id"\nWHERE ("public"."result"."path" = \'/london/onboarding/games\'\n   AND "public"."result"."createdAt" >= CAST((CAST(now() AS timestamp) + (INTERVAL \'-100 day\')) AS date) AND "public"."result"."createdAt" < CAST((CAST(now() AS timestamp) + (INTERVAL \'1 day\')) AS date))\nORDER BY "public"."result"."updatedAt" DESC\nLIMIT 1048575';

module.exports = { admin, toad };
