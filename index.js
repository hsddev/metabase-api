// Dependencies
const getMetaData = require("./getMetaData");
const getMetaSession = require("./getMetaSession");
const ObjectsToCsv = require("objects-to-csv");
const queries = require("./queries");
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

    // An object to save the number of gameAttempts of each user
    var counter = {};

    // Calculate the gameAttempts of each user and add it to the toad list
    toadChangedList = toadChangedList.map((x) => {
        counter[x.login] = (counter[x.login] || 0) + 1;

        return {
            login: x.login,
            createdAt: x.createdAt,
            updatedAt: x.updatedAt,
            email: x.email,
            lastName: x.lastName,
            firstName: x.firstName,
            gamesScore: x.gamesScore,
            gamesAttempts: counter[x.login],
            memory: x.memory,
            zzle: x.zzle,
            stepStatus: x.stepStatus,
        };
    });

    // remove duplicates and keep the candidates which is the latest attempts and score
    const arrayFiltered = [];

    toadChangedList.forEach((obj) => {
        const item = arrayFiltered.find(
            (thisItem) => thisItem.login === obj.login
        );
        if (item) {
            if (item.gamesAttempts < obj.gamesAttempts) {
                item.gamesAttempts = obj.gamesAttempts;
            }

            return;
        }

        arrayFiltered.push(obj);
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
        let csv = new ObjectsToCsv(arrayFiltered);

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

    //Run the server
    const server = app.listen(process.env.PORT || 5000, () => {
        const port = server.address().port;
        console.log(`Express is working on port ${port}`);
    });
})();
