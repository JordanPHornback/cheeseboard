const {TestWatcher} = require('jest');
const {sequelize} = require('./db');
const {User, Board, Cheese} = require('./index');

describe('Cheeseboard models', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true});
    });

    test('Can create a user - name', async () => {
        const testUser = await User.create({name: 'Chuck', email: 'chuck@gmail.com'});
        expect(testUser.name).toBe('Chuck');
    });

    test('Can create a user - email', async () => {
        const testUser = await User.create({name: 'Chuck', email: 'chuck@gmail.com'});
        expect(testUser.email).toBe('chuck@gmail.com');
    });

    test('Can create a board - type', async () => {
        const testBoard = await Board.create({type: 'French', description: 'A board containg our finest soft and hard cheeses from France.', rating: 8});
        expect(testBoard.type).toBe('French');
    });

    test('Can create a board - description', async () => {
        const testBoard = await Board.create({type: 'French', description: 'A board containg our finest soft and hard cheeses from France.', rating: 8});
        expect(testBoard.description).toBe('A board containg our finest soft and hard cheeses from France.');
    });

    test('Can create a board - rating', async () => {
        const testBoard = await Board.create({type: 'French', description: 'A board containg our finest soft and hard cheeses from France.', rating: 8});
        expect(testBoard.rating).toBe(8);
    });

    test('Can create a cheese - title', async () => {
        const testCheese = await Cheese.create({title: 'Raclette du Valais', description: 'Raclette du Valais is a semi-hard cheese from the Valais canton of Switzerland. This is an Alpine cow milk based cheese, most commonly used for a melting dish called raclette, but can also be consumed as is!'});
        expect(testCheese.title).toBe('Raclette du Valais');
    });

    test('Can create a cheese - title', async () => {
        const testCheese = await Cheese.create({title: 'Raclette du Valais', description: 'Raclette du Valais is a semi-hard cheese from the Valais canton of Switzerland. This is an Alpine cow milk based cheese, most commonly used for a melting dish called raclette, but can also be consumed as is!'});
        expect(testCheese.description).toBe('Raclette du Valais is a semi-hard cheese from the Valais canton of Switzerland. This is an Alpine cow milk based cheese, most commonly used for a melting dish called raclette, but can also be consumed as is!');
    });

    test('User/Board association', async () => {
        expect(User.hasMany(Board)).toBeTruthy;
    })

    test('Users can have multiple boards', async () => {
        const testUser = await User.create({name: 'Chuck', email: 'chuck@gmail.com'});

        const board1 = await Board.create({type: 'French', description: 'Francais', rating: 10});
        const board2 = await Board.create({type: 'German', description: 'Deustch', rating: 9});
        const board3 = await Board.create({type: 'Italain', description: 'Italia', rating: 8});

        await testUser.addBoard(board1);
        await testUser.addBoard(board2);
        await testUser.addBoard(board3);

        const boards = await testUser.getBoards();

        expect(boards.length).toBe(3);
        expect(boards[0] instanceof Board).toBeTruthy;
    })

    test('A board can have many cheeses, and a cheese can be on many boards', async () => {
        const board1 = await Board.create({type: 'Italian', description: 'A board of cheese from Italy', rating: 10});

        const board2 = await Board.create({type: 'Alpine', description: 'A board of cheeses from the Alps', rating: 9});

        const cheese1 = await Cheese.create({title: 'Raclette du Valais', description: 'Raclette du Valais is a semi-hard cheese from the Valais canton of Switzerland. This is an Alpine cow milk based cheese, most commonly used for a melting dish called raclette, but can also be consumed as is!'});

        const cheese2 = await Cheese.create({title: 'Asiago', description: 'Asiago is a cows milk cheese, first produced in Italy. In Italy, Asiage has a protected designation of origin, as it was originally produced in the alpine area of the Asiago plateau. Asiago is excellent for many uses, inclduing on sandwiches or paninis, or melted over a variety of dishes (even canteloupe).'});
        
        const cheese3 = await Cheese.create({title: 'Mozzarella', description: 'Mozzarella is a very versatile cheese, best served fresh due to its high moisture content. Mozzarella is most commonly used for pizza and pasta dishes, as well as serverd with slived tomatoes and basil in Caprese salad.'})

        await board1.addCheese(cheese2);
        await board1.addCheese(cheese3);
        await board2.addCheese(cheese1);
        await board2.addCheese(cheese2);

        const board1Cheeses = await board1.getCheeses();
        const board2Cheeses = await board2.getCheeses();

        expect(board1Cheeses.length).toBe(2);
        expect(board2Cheeses.length).toBe(2);

    })

    test('Cheese/Board association', async () => {
        expect(Cheese.belongsToMany(Board, { through: 'Cheeseboard'})).toBeTruthy;
        expect(Board.belongsToMany(Cheese, { through: 'Cheeseboard'})).toBeTruthy
    });

})