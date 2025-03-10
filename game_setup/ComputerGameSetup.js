export default function ComputerGameSetup(computer) {
    return new Promise((resolve) => {
        const ships = [
            { name: 'carrier', length: 5, placeFunction: computer.placeCarrier.bind(computer) },
            { name: 'battleship', length: 4, placeFunction: computer.placeBattleship.bind(computer) },
            { name: 'cruiser', length: 3, placeFunction: computer.placeCruiser.bind(computer) },
            { name: 'submarine', length: 3, placeFunction: computer.placeSubmarine.bind(computer) },
            { name: 'destroyer', length: 2, placeFunction: computer.placeDestroyer.bind(computer) }
        ];

        function getRandomCoordinate(max) {
            return Math.floor(Math.random() * (max + 1));
        }

        function getRandomDirection() {
            return Math.random() > 0.5 ? 'horizontal' : 'vertical';
        }

        // Function to place a single ship, retrying on overlap
        function placeShip(ship) {
            let placed = false;

            while (!placed) {
                const direction = getRandomDirection();

                let x, y;

                if (direction === 'horizontal') {
                    x = getRandomCoordinate(9); // Row can be 0-9
                    y = getRandomCoordinate(9 - ship.length + 1); // Ensure ship fits horizontally
                } else {
                    x = getRandomCoordinate(9 - ship.length + 1); // Ensure ship fits vertically
                    y = getRandomCoordinate(9); // Column can be 0-9
                }

                try {
                    ship.placeFunction(x, y, direction);
                    placed = true; // If no error, ship was placed successfully
                } catch (error) {
                    console.warn(`Retrying placement for ${ship.name} due to overlap.`);
                }
            }
        }

        // Place all ships
        for (const ship of ships) {
            placeShip(ship);
        }

        console.log('Computer setup complete');
        console.log(computer);
        resolve();
    });
}
