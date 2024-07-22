const axios = require("axios");
const MatchList = require("./Match.model");

const fetchMatch = async () => {
  let data = [];
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

    // Use Promise.all to handle asynchronous operations within map
    const matchDataPromises = competitionData.map(async (item) => {
      const matchConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://142.93.36.1/api/v2/fetch_data?Action=listEvents&EventTypeID=4&CompetitionID=${item.competition.id}`,
        headers: {},
      };
      const matchResponse = await axios(matchConfig);
      console.log("Match Data", JSON.stringify("match data",matchResponse.data, null, 2));
      return matchResponse.data;
    });

    // Wait for all match data to be fetched
    data = await Promise.all(matchDataPromises);

    return data;

  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

exports.MatchListData = async (req, res) => {
  try {
    const result = await fetchMatch();

    const data = await MatchList.find();
    res.status(200).json({
      code: 200,
      message: "Successfully fetched match list",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};
