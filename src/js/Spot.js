import {ConfigurationSingleton} from './ConfigurationSingleton';
import {COLORS} from './static';
import {collision} from './utils';

export class Spot {
  /**
   * @type {number}
   */
  #x

  /**
   * @type {number}
   */
  #y

  /**
   * @type {number}
   */
  #width

  /**
   * @type {number}
   */
  #height

  /**
   * @type {number}
   */
  #fScore

  /**
   * @type {number}
   */
  #goalScore

  /**
   * @type {number}
   */
  #heuristic

  /**
   * @type {Array<Spot>}
   */
  #neighbors

  /**
   * @type {Spot | null}
   */
  #previous

  /**
   * @type boolean
   */
  #wall

  /**
   * @type {ConfigurationSingleton}
   */
  #configuration

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {
    this.#x = x;
    this.#y = y
    this.#width = width
    this.#height = height
    this.#fScore = 0
    this.#goalScore = 0
    this.#heuristic = 0
    this.#neighbors = []
    this.#previous = null
    this.#configuration = new ConfigurationSingleton()
    this.#wall = Math.random() < 0.3;
  }

  /**
   * @param {string} color
   */
  draw(color) {
    this.#configuration.context.beginPath();
    this.#configuration.context.fillStyle = color
    const mouse = this.#configuration.mouse
    const spotMouse = {
      x: this.#x * this.#width,
      y: this.#y * this.#height,
      width: this.#width - 1,
      height: this.#height - 1,
    }

    if (this.#wall) {
      this.#configuration.context.fillStyle = COLORS.white
      this.#configuration.context.fillRect(
        this.#x * this.#width,
        this.#y * this.#height,
        this.#width,
        this.#height,
      )
      this.#configuration.context.fillStyle = COLORS.black
      this.#configuration.context.ellipse(
        this.#x * this.#width + this.#width / 2,
        this.#y * this.#height + this.#height / 2,
        this.#width / 3,
        this.#height / 3,
        0,
        0,
        2 * Math.PI
      );
      this.#configuration.context.fill();
    } else if (collision(spotMouse, mouse)) {
      this.#configuration.context.strokeStyle = COLORS.black
      this.#configuration.context.strokeRect(
        this.#x * this.#width,
        this.#y * this.#height,
        this.#width,
        this.#height,
      )
    } else {
      this.#configuration.context.fillRect(
        this.#x * this.#width,
        this.#y * this.#height,
        this.#width,
        this.#height,
      )
    }
  }

  /**
   * @param {Array<Array<Spot>>} grid
   * @param {number} cols
   * @param {number} rows
   */
  appendNeighbors(grid, cols, rows) {
    if (this.#x < cols - 1) {
      this.#neighbors.push(grid[this.#x + 1][this.#y])
    }
    if (this.#x > 0) {
      this.#neighbors.push(grid[this.#x - 1][this.#y])
    }
    if (this.#y < rows - 1) {
      this.#neighbors.push(grid[this.#x][this.#y + 1])
    }
    if (this.#y > 0) {
      this.#neighbors.push(grid[this.#x][this.#y - 1])
    }
    if (this.#x > 0 && this.#y > 0) {
      this.#neighbors.push(grid[this.#x - 1][this.#y - 1])
    }
    if (this.#x < cols - 1 && this.#y > 0) {
      this.#neighbors.push(grid[this.#x + 1][this.#y - 1])
    }
    if (this.#x > 0 && this.#y < rows - 1) {
      this.#neighbors.push(grid[this.#x - 1][this.#y + 1])
    }
    if (this.#x < cols - 1 && this.#y < rows - 1) {
      this.#neighbors.push(grid[this.#x + 1][this.#y + 1])
    }
  }

  /**
   * @returns {number}
   */
  get x() {
    return this.#x
  }

  /**
   * @returns {number}
   */
  get y() {
    return this.#y
  }

  /**
   * @returns {number}
   */
  get fScore() {
    return this.#fScore
  }

  /**
   * @returns {Array<Spot>}
   */
  get neighbors() {
    return this.#neighbors
  }

  /**
   * @returns {number}
   */
  get goalScore() {
    return this.#goalScore
  }

  /**
   * @returns {Spot|null}
   */
  get previous() {
    return this.#previous
  }

  /**
   * @returns {boolean}
   */
  get wall() {
    return this.#wall
  }

  /**
   * @returns {number}
   */
  get heuristic() {
    return this.#heuristic
  }

  /**
   * @param {number} value
   */
  set goalScore(value) {
    return this.#goalScore = value
  }

  /**
   * @param {number} value
   */
  set fScore(value) {
    return this.#fScore = value
  }

  /**
   * @param {number} value
   */
  set heuristic(value) {
    return this.#heuristic = value
  }

  /**
   * @param {Spot} value
   */
  set previous(value) {
    this.#previous = value
  }

  /**
   * @param {boolean} value
   */
  set wall(value) {
    this.#wall = value
  }

  get width() {
    return this.#width
  }

  get height() {
    return this.#height
  }
}
