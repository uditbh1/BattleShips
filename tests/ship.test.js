import Ship from "../src/ship";
describe('Ship',()=>{
    test('Should create a ship with correct length and 0 hits',()=>{
        const ship=new Ship(3)
        expect(ship.length).toBe(3)
        expect(ship.hits).toBe(0)
    })

    test('Should increment hits when called ',()=>{
        const ship=new Ship(3)
        expect(ship.hits).toBe(0)
        ship.hit()
        expect(ship.hits).toBe(1)
        ship.hit()
        expect(ship.hits).toBe(2)
    })

    test('Should show right sunk status',()=>{
        const ship=new Ship(3)
        expect(ship.isSunk()).toBe(false)
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true)

    })
    test('Should change direction when called',()=>{
        const ship=new Ship(3,'horizontal')
        ship.changeDirection()
        expect(ship.direction).toBe('vertical')
    })
})