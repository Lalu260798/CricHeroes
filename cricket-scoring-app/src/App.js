import React, { useState } from "react";
import "./App.css";

function App() {
  // Teams' information and settings
  const [team1, setTeam1] = useState({
    name: "Team A",
    captain: "",
    players: Array(3).fill(""), // Only 3 players per team
    selectedBatsmen: [],
    selectedBowlers: [],
  });

  const [team2, setTeam2] = useState({
    name: "Team B",
    captain: "",
    players: Array(3).fill(""), // Only 3 players per team
    selectedBatsmen: [],
    selectedBowlers: [],
  });

  const [matchInfo, setMatchInfo] = useState({
    groundName: "",
    matchDate: "",
    matchTime: "",
    tossWinner: "",
    tossChoice: "",
    battingTeam: "",
    bowlingTeam: "",
    striker: "",
    nonStriker: "",
    bowler: "",
    wicketKeeper: "",
    score: 0,
  });

  // Handle input for team and match info
  const handleTeamInput = (team, playerIndex, playerName) => {
    const updatedTeam = team === "Team A" ? { ...team1 } : { ...team2 };
    updatedTeam.players[playerIndex] = playerName;
    if (team === "Team A") setTeam1(updatedTeam);
    else setTeam2(updatedTeam);
  };

  const handleMatchInfoChange = (key, value) => {
    setMatchInfo({ ...matchInfo, [key]: value });
  };

  // Select team captain
  const selectCaptain = (team, captainName) => {
    if (team === "Team A") setTeam1({ ...team1, captain: captainName });
    else setTeam2({ ...team2, captain: captainName });
  };

  // Toss Winner and Decision
  const handleTossDecision = (tossWinner, tossChoice) => {
    setMatchInfo({
      ...matchInfo,
      tossWinner: tossWinner,
      tossChoice: tossChoice,
      battingTeam: tossChoice === "Bat" ? tossWinner : tossWinner === team1.name ? team2.name : team1.name,
      bowlingTeam: tossChoice === "Bat" ? (tossWinner === team1.name ? team2.name : team1.name) : tossWinner,
    });
  };

  // Handle batsman selection for the team
  const selectBatsman = (team, playerName) => {
    const updatedTeam = team === "Team A" ? { ...team1 } : { ...team2 };
    if (!updatedTeam.selectedBatsmen.includes(playerName)) {
      updatedTeam.selectedBatsmen.push(playerName);
      if (team === "Team A") setTeam1(updatedTeam);
      else setTeam2(updatedTeam);
    }
  };

  // Handle bowler selection for the team
  const selectBowler = (team, playerName) => {
    const updatedTeam = team === "Team A" ? { ...team1 } : { ...team2 };
    if (!updatedTeam.selectedBowlers.includes(playerName)) {
      updatedTeam.selectedBowlers.push(playerName);
      if (team === "Team A") setTeam1(updatedTeam);
      else setTeam2(updatedTeam);
    }
  };

  const handleScoreUpdate = (runs) => {
    setMatchInfo({ ...matchInfo, score: matchInfo.score + runs });
  };

  return (
    <div className="App">
      <h1>Cricket Match Scorer</h1>
      
      {/* Match Info Inputs */}
      <div>
        <h3>Match Info</h3>
        <label>
          Ground Name:
          <input
            type="text"
            value={matchInfo.groundName}
            onChange={(e) => handleMatchInfoChange("groundName", e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={matchInfo.matchDate}
            onChange={(e) => handleMatchInfoChange("matchDate", e.target.value)}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            value={matchInfo.matchTime}
            onChange={(e) => handleMatchInfoChange("matchTime", e.target.value)}
          />
        </label>
      </div>

      {/* Toss Winner & Decision */}
      <div>
        <h3>Toss Info</h3>
        <label>
          Toss Winner:
          <select onChange={(e) => handleTossDecision(e.target.value, matchInfo.tossChoice)}>
            <option value="">{matchInfo.tossWinner || "Select Winner"}</option>
            <option value={team1.name}>{team1.name}</option>
            <option value={team2.name}>{team2.name}</option>
          </select>
        </label>
        <br />
        <label>
          Toss Choice:
          <select onChange={(e) => handleTossDecision(matchInfo.tossWinner, e.target.value)}>
            <option value="">{matchInfo.tossChoice || "Select Choice"}</option>
            <option value="Bat">Bat</option>
            <option value="Bowl">Bowl</option>
          </select>
        </label>
      </div>

      {/* Team Selection */}
      <div>
        <h3>{team1.name} Players</h3>
        {team1.players.map((player, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Player ${index + 1}`}
              value={player}
              onChange={(e) => handleTeamInput("Team A", index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => selectCaptain("Team A", team1.players[0])}>Set Captain</button>
      </div>
      <div>
        <h3>{team2.name} Players</h3>
        {team2.players.map((player, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Player ${index + 1}`}
              value={player}
              onChange={(e) => handleTeamInput("Team B", index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => selectCaptain("Team B", team2.players[0])}>Set Captain</button>
      </div>

      {/* Match Stats */}
      <div>
        <h3>Current Match Info</h3>
        <p>Batting Team: {matchInfo.battingTeam}</p>
        <p>Bowling Team: {matchInfo.bowlingTeam}</p>
        <p>Striker: {matchInfo.striker}</p>
        <p>Non-Striker: {matchInfo.nonStriker}</p>
        <p>Bowler: {matchInfo.bowler}</p>
        <p>Wicket Keeper: {matchInfo.wicketKeeper}</p>
        <p>Score: {matchInfo.score}</p>
      </div>

      {/* Player Selection */}
      <div>
        <h3>Select Batsman from {matchInfo.battingTeam}</h3>
        <button onClick={() => selectBatsman(matchInfo.battingTeam, team1.players[0])}>Player 1</button>
        <button onClick={() => selectBatsman(matchInfo.battingTeam, team1.players[1])}>Player 2</button>
        <button onClick={() => selectBatsman(matchInfo.battingTeam, team1.players[2])}>Player 3</button>
      </div>

      <div>
        <h3>Select Bowler from {matchInfo.bowlingTeam}</h3>
        <button onClick={() => selectBowler(matchInfo.bowlingTeam, team2.players[0])}>Player 1</button>
        <button onClick={() => selectBowler(matchInfo.bowlingTeam, team2.players[1])}>Player 2</button>
        <button onClick={() => selectBowler(matchInfo.bowlingTeam, team2.players[2])}>Player 3</button>
      </div>

      {/* Add Runs */}
      <div>
        <button onClick={() => handleScoreUpdate(1)}>Add 1 Run</button>
        <button onClick={() => handleScoreUpdate(2)}>Add 2 Runs</button>
        <button onClick={() => handleScoreUpdate(4)}>Add 4 Runs</button>
        <button onClick={() => handleScoreUpdate(6)}>Add 6 Runs</button>
      </div>
    </div>
  );
}

export default App;