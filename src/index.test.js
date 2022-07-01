const App = require('../dist/index');
const checkClass = require('../dist/classUtil/checkClass');
const fs = jest.requireActual('fs');


jest.mock("fs");
describe('index.js', () => {
  it('should be defined', () => {
    expect(App).toBeDefined();
  });
});

test('checkClasss', () => {
  let DateNow = new Date(2022, 7, 1, 8, 20, 0);//
  let data = JSON.parse(
    fs.readFileSync('./data/room.json', { encoding: 'utf8', flag: 'r' })
  );
  console.debug(checkClass(data, DateNow));
  //   expect( checkClass(data, DateNow)).toBe(
  // 'สังคม'
  //   );
})