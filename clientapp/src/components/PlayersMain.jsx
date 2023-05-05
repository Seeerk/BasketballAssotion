import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { playersApi } from "../api/playersApi";
import { Button, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { teamApi } from "../api/teamApi";
import uuid from 'react-uuid'

const columns = [
    { field: 'photo', headerName: 'Photo', width: 200 },
    { field: 'shirtnumber', headerName: 'No', width: 90 },
    { field: 'playerName', headerName: 'Name', width: 200 },
    { field: 'teamName', headerName: 'Team', width: 200 },
    { field: 'position', headerName: 'Position', width: 140 },
    { field: 'weight', headerName: 'Weight', width: 140 },
    { field: 'height', headerName: 'Height', width: 140 },
    { field: 'experience', headerName: 'Expirience', width: 140 },
    { field: 'country', headerName: 'Country', width: 200 }
];

const PlayesMain = () => {
    const [rows, setRows] = useState([])
    const [season, setSeason] = useState(3)
    const [team, setTeam] = useState(null)
    const [player, setPlayer] = useState(null)
    const [teams, setTeams] = useState([])
    const [players, setPlayers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [startLetter, setStartLetter] = useState(null)
    const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const addId = (arr) => {
        return arr.map(el => Object.assign({}, el, { id: el.playerId }));
    }

    const getNames = (arr) => {
        return arr.map(el => ({ playerName: el.playerName, playerId: el.playerId }))
    }


    useEffect(() => {
        playersApi.getPlayersByFilter(season, page, team, player, startLetter)
            .then(response => {
                setTotalPages(response.headers.get('totalpages'))
                return response.data
            })
            .then(data => {
                console.log(data)
                setPlayers(getNames(data))
                setRows(addId(data))
            })


        teamApi.getTeamNames()
            .then(response => setTeams(response.data))
    }, [season, page, team, player, startLetter])


    return (
        <>
            <div className="sort">
                <div className="flex justify-start flex-wrap mt-[15px]">
                    {ABC.map(el => <Button
                        key={uuid()}
                        onClick={() => setStartLetter(el)}>{el}</Button>)}
                </div>
                <div className="flex justify-start flex-wrap items-center mt-[15px]">
                    <Typography sx={{
                        mr: '10px'
                    }}>
                        Season
                    </Typography>

                    <Select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        sx={{
                            width: '140px',
                            mr: '20px'
                        }}>
                        <MenuItem value={1}>2014-2015</MenuItem>
                        <MenuItem value={2}>2015-2016</MenuItem>
                        <MenuItem value={3}>2016-2017</MenuItem>
                    </Select>

                    <Typography sx={{
                        mr: '10px'
                    }}>
                        Team
                    </Typography>

                    <Select
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        sx={{
                            width: '240px',
                            mr: '20px'
                        }}>
                        {teams.map(el => (
                            <MenuItem
                                key={uuid()}
                                value={el.teamId}>{el.teamName}</MenuItem>
                        ))}
                    </Select>

                    <Typography sx={{
                        mr: '10px'
                    }}>
                        Playername
                    </Typography>

                    <Select
                        onChange={(e) => setPlayer(e.target.value)}
                        value={player}
                        sx={{
                            width: '240px',
                            mr: '20px'
                        }}>
                        {players.map(el => (
                            <MenuItem
                                key={uuid()}
                                value={el.playerId}>
                                {el.playerName}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            {rows.length > 0 ?
                <div>
                    <DataGrid
                        className="mt-[15px]"
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}

                    />
                    <Pagination
                        sx={{ mt: '20px' }}
                        variant="outlined"
                        shape="rounded"
                        count={Number(totalPages)}
                        page={Number(page)}
                        onChange={(e) => setPage(Number(e.target.innerText))}
                    />
                </div>
                : <div> Ничего не найдено :( </div>}
        </>
    )
}

export default PlayesMain