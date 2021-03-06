export type Player = {
  '3FORs': string,
        '4FORs': number,
        '5FORs': number,
        '6FORs':number,
        '7FORs': number,
        AVG_RUN: number,
        BATING_STYLE: number,
        BATTING: {
          '100s': number,
          '4s': number,
          '50s': number,
          '6s': number,
          AVG: number,
          HIGHEST: number,
          INNINGS: number,
          NO: number,
          RUNS: number,
        },
        BOWLING: {
          MDNS: number,
          OVERS: number,
          WKTS: number,
        },
        BOWLING_STYLE: number,
        CTS: number,
        DATE_JOINED: string,
        DOB: string,
        DP: string,
        ECON: number,
        FIRST_NAME: number,
        FIRST_PLAYED: number,
        GENERAL: {
          MTCHS:number,
        },
        GIVEN: number,
        HONOR: string,
        LAST_NAME: string,
        LAST_PLAYED: string,
        ROLE: string,
        SR_OVER: number,
        ST: number,
        WK_CTS: number,
        id:number,
        avatar: {
			source: string,
			thumbnail: string,
		},
}

export type Players = {
  loading: Boolean,
  error: string,
  items: Array<Player>,
}
