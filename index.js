const CELL_SIZE = 10;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 300;

class SnakeController extends Component {
    constructor() {
        super();
        this.dir = "right";
        this.next_dir = "right";
        this.axis = "x";
        this.sign = 1;
        this.timer = 0;
    }
    handle_input() {
        if(Input.IsKeyDown("d")) {
            this.next_dir = "right";
        }
        if(Input.IsKeyDown("w")) {
            this.next_dir = "up";
        }
        if (Input.IsKeyDown("s")) {
            this.next_dir = "down";
        }
        if (Input.IsKeyDown("a")) {
            this.next_dir = "left";
        }
    }
    update_direction() {
        if(this.next_dir == "right" && this.dir != "left") {
            this.axis = "x";
            this.sign = 1;
            this.dir = this.next_dir;
        }
        if (this.next_dir == "left" && this.dir != "right") {
            this.axis = "x";
            this.sign = -1;
            this.dir = this.next_dir;
        }
        if (this.next_dir == "up" && this.dir != "down") {
            this.axis = "y";
            this.sign = -1;
            this.dir = this.next_dir;
        }
        if (this.next_dir == "down" && this.dir != "up") {
            this.axis = "y";
            this.sign = 1;
            this.dir = this.next_dir;
        }
    }
    move(gameObject) {
        const first = gameObject.children.shift();
        const last = gameObject.children[gameObject.children.length-1];
        const next_pos = last.transform.translation.copy();
        next_pos[this.axis] += this.sign * CELL_SIZE;
        first.transform.translation = next_pos;
        gameObject.children.push(first);
    }
    update(gameObject, delta_time) {
        this.timer += delta_time;
        this.handle_input();
        if (this.timer > 0.5) {
            this.timer = 0;
            this.update_direction();
            this.move(gameObject);
        }
    }
}

window.onload = function() {
    const background = new GameObject({
        name: "Background",
        transform: new Transform(new Vector2(0, 0), 0, new Vector2(GAME_WIDTH, GAME_HEIGHT)),
        components: [new RectangleSprite("black")],
        tag: "background",
    });
    const snake = new GameObject({
        name: "Snake",
        tag: "snake",
        components: [new SnakeController()],
        children: [
            new GameObject({
                name: "SnakeBody0",
                tag: "body",
                transform: new Transform(new Vector2(180, 150), 0, new Vector2(CELL_SIZE, CELL_SIZE)),
                components: [new RectangleSprite("green")]
            }),
            new GameObject({
                name: "SnakeBody1",
                tag: "body",
                transform: new Transform(new Vector2(190, 150), 0, new Vector2(CELL_SIZE, CELL_SIZE)),
                components: [new RectangleSprite("green")]
            }),
            new GameObject({
                name: "SnakeBody2",
                tag: "body",
                transform: new Transform(new Vector2(200, 150), 0, new Vector2(CELL_SIZE, CELL_SIZE)),
                components: [new RectangleSprite("green")]
            }),
        ]
    });
    const food = new GameObject({
        name: "Food",
        transform: new Transform(new Vector2(200, 150), 0, new Vector2(CELL_SIZE, CELL_SIZE)),
        components: [],
        tag: "food"
    });

    const game = new Game("#game", {
        title: "Simple Snake",
        gameObjects: [
            background,
            snake,
            food
        ]
    });
    game.play_game();
}