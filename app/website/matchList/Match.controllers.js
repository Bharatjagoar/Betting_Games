const axios = require("axios");
const MatchList = require("./Match.model");
const CompetitionList = require("./CompetitionsList.model");

const fetchMatch = async () => {
  try {
    const competitionConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://142.93.36.1/api/v2/fetch_data?Action=listCompetitions&EventTypeID=4",
      headers: {},
    };

    const competitionResponse = await axios(competitionConfig);
    console.log("Competition Data", JSON.stringify(competitionResponse.data, null, 2));
    const competitionData = competitionResponse.data;

    // Store competition data if not exists
    for (let i = 0; i < competitionData.length; i++) {
      const competitionItem = competitionData[i];
      const existingCompetition = await CompetitionList.findOne({ 'competition.id': competitionItem.competition.id });

      if (!existingCompetition) {
        const newCompetition = new CompetitionList(competitionItem);
        await newCompetition.save();
        console.log(`Competition ${competitionItem.competition.name} saved.`);
      } else {
        console.log(`Competition ${competitionItem.competition.name} already exists.`);
      }
    }

    // Use Promise.all to handle asynchronous operations within map
    const matchDataPromises = competitionData.map(async (item) => {
      const matchConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://142.93.36.1/api/v2/fetch_data?Action=listEvents&EventTypeID=4&CompetitionID=${item.competition.id}`,
        headers: {},
      };
      const matchResponse = await axios(matchConfig);
      console.log("Match Data", JSON.stringify(matchResponse.data, null, 2));
      const matches = matchResponse.data;

      // Store match data if not exists
      for (let j = 0; j < matches.length; j++) {
        const matchItem = matches[j];
        const existingMatch = await MatchList.findOne({ 'event.id': matchItem.event.id });

        if (!existingMatch) {
          const newMatch = new MatchList(matchItem);
          await newMatch.save();
          console.log(`Match ${matchItem.event.name} saved.`);
        } else {
          console.log(`Match ${matchItem.event.name} already exists.`);
        }
      }

      return matches;
    });

    // Wait for all match data to be fetched and stored
    const matchData = await Promise.all(matchDataPromises);

    return { competitionData, matchData };

  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

exports.MatchListData = async (req, res) => {
  try {
    const { competitionData, matchData } = await fetchMatch();

    res.status(200).json({
      code: 200,
      message: "Successfully fetched match list",
      data: { competitionData, matchData },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};
