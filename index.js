// Dependencies
const getMetaData = require("./getMetaData");
const getMetaSession = require("./getMetaSession");
const ObjectsToCsv = require("objects-to-csv");
const queries = require("./queries");
const getOccurrence = require("./helpers");
const express = require("express");
const app = new express();

// Start function
(async function () {
    // Get metabase session
    const session = await getMetaSession();

    // Get toad data from metabase
    const toadData = await getMetaData(session.id, queries.toad);

    // Return object
    var toadChangedList = toadData.rows.map((x) => {
        const score =
            JSON.parse(x[3]).score != undefined
                ? JSON.parse(x[3]).score
                : "Games sessions not completed";
        return {
            login: x[8],
            createdAt: x[0],
            updatedAt: x[1],
            email: x[19],
            lastName: x[18],
            firstName: x[17],
            gamesScore: score,
            gamesAttempts: getOccurrence(x, x[8]),
            memory: `Level ${
                JSON.parse(x[3]).games != undefined
                    ? JSON.parse(x[3]).games[0].results[
                          JSON.parse(x[3]).games[0].results.length - 1
                      ] != undefined
                        ? JSON.parse(x[3]).games[0].results[
                              JSON.parse(x[3]).games[0].results.length - 1
                          ].level
                        : "Not completed"
                    : "Not completed"
            }`,
            zzle: `Level ${
                JSON.parse(x[3]).games != undefined
                    ? JSON.parse(x[3]).games[1].results[
                          JSON.parse(x[3]).games[1].results.length - 1
                      ] != undefined
                        ? JSON.parse(x[3]).games[1].results[
                              JSON.parse(x[3]).games[1].results.length - 1
                          ].level
                        : "Not completed"
                    : "Not completed"
            }`,
            stepStatus:
                x[2] == 1
                    ? "Accepted"
                    : x[2] == 0 && score < 20
                    ? "Rejected"
                    : "Not completed",
        };
    });

    // Get the admin phase data from metabase
    const adminData = await getMetaData(session.id, queries.admin);

    // return object contain login, email, path & phase
    var adminChangedList = adminData.rows.map((x) => {
        return {
            login: x[17],
            email: x[28],
            path: x[9],
            phase: JSON.parse(x[4]).phase,
        };
    });

    app.get("/toad", async (req, res) => {
        // Covert object to csv
        let csv = new ObjectsToCsv(toadChangedList);

        // Write csv file
        await csv.toDisk("./toad.csv");

        // Download the file
        res.download("./toad.csv", () => {
            //Then delete the csv file in the callback
            console.log("toad.csv downloaded !");
        });
    });

    app.get("/admin", async (req, res) => {
        // Covert object to csv
        csv = new ObjectsToCsv(adminChangedList);

        // Write csv file
        await csv.toDisk("./admin.csv");

        // Download the file
        res.download("./admin.csv", () => {
            //Then delete the csv file in the callback
            console.log("admin.csv downloaded !");
        });
    });

    // Run the server
    const server = app.listen(process.env.PORT || 5000, () => {
        const port = server.address().port;
        console.log(`Express is working on port ${port}`);
    });
})();
