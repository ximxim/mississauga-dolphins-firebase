export default {
    firebase: {
        apiKey: 'AIzaSyCPu1cq_G_tzSvrnmKMV02g8yES4j_5kIg',
        authDomain: 'mississauga-dolphins.firebaseapp.com',
        databaseURL: 'https://mississauga-dolphins-dev.firebaseio.com',
        projectId: 'mississauga-dolphins',
        storageBucket: 'mississauga-dolphins.appspot.com',
        messagingSenderId: '562485347443',
    },
    newGame: {
        home: {
            name: 'Pakistan',
            score: 200,
            wickets: 5,
            overs: 4,
            batting: true,
        },
        visitor: {
            name: 'India',
            score: 100,
            wickets: 8,
            overs: 9,
            batting: false,
        },
        striker: 'John Smith',
        nonStriker: 'Azim Ahmed',
        bowler: 'Adeel Ahmed',
    },
    newGameEvent: {
        cover: {
            source: 'https://firebasestorage.googleapis.com/v0/b/mississauga-dolphins.appspot.com/o/events%2F452x47.jpg?alt=media&token=8fe48f25-c251-417a-96b1-4c44ef86f0e8',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mississauga-dolphins.appspot.com/o/events%2F452x47.jpg_thumbnail?alt=media&token=5eef048f-6819-4177-811b-280b3cd2b45e',
        },
        description: 'Match No: 452\nDivision: 1st Division - CN Pro\nRound type: Preliminary',
        division: '100',
        game: true,
        match_no: '452',
        place: {
            name: 'Hole in the groun',
        },
        players: [2, 3, 75, 47, 161, 153, 33, 167, 149, 140, 114, 1, 8, 7, 61, 99],
        round_type: 'Preliminary',
        start_time: '2018-09-09T19:00:00.000Z',
        title: 'Custom Dev Game',
    },
    login: {
        username: 'azim.ahmed7@gmail.com',
        password: '826474',
    },
};
