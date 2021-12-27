import {ConfigurationSingleton} from './ConfigurationSingleton';
import {COLORS, SPOT_TYPE} from './static';
import {Utils} from './utils';

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
   * @type {ConfigurationSingleton}
   */
  #configuration

  /**
   * @type {string} - SPOT_TYPE
   */
  #type

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
    this.#type = Math.random() < 0.3 ? SPOT_TYPE.WALL : SPOT_TYPE.DEFAULT
  }

  #drawWall() {
    this.#configuration.context.beginPath();
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
    )
    this.#configuration.context.fill()
    this.#configuration.context.closePath()
  }

  #drawSelectedSpot() {
    this.#configuration.context.strokeStyle = COLORS.black
    this.#configuration.context.strokeRect(
      this.#x * this.#width,
      this.#y * this.#height,
      this.#width,
      this.#height,
    )
  }

  /**
   * @param {string} color
   * @returns {string | undefined}
   */
  #setSpotColor(color) {
    switch (this.#type) {
      case SPOT_TYPE.START_NODE:
        return COLORS.azureRadiance
      case SPOT_TYPE.END_NODE:
        return COLORS.california
      case SPOT_TYPE.DEFAULT:
        return color
      default:
        console.error('Incorrect type!')
        break
    }
  }

  /**
   * @param {string} color
   */
  #drawSpot(color) {
    this.#configuration.context.fillStyle = this.#setSpotColor(color)
    this.#configuration.context.fillRect(
      this.#x * this.#width,
      this.#y * this.#height,
      this.#width,
      this.#height,
    )
  }

  /**
   * @param {string} color
   */
  draw(color) {
    const spotMouse = {
      x: this.#x * this.#width,
      y: this.#y * this.#height,
      width: this.#width - 1,
      height: this.#height - 1,
    }

    if (this.#type === SPOT_TYPE.WALL) {
      this.#drawWall()
    } else if (Utils.collision(spotMouse, this.#configuration.mouse)) {
      this.#drawSelectedSpot()
    } else {
      this.#drawSpot(color)
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
   * @returns {string} SPOT_TYPE
   */
  get type() {
    return this.#type
  }

  /**
   * @returns {number}
   */
  get heuristic() {
    return this.#heuristic
  }

  /**
   * @returns {number}
   */
  get width() {
    return this.#width
  }

  /**
   * @returns {number}
   */
  get height() {
    return this.#height
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
   * @param {string} value - SPOT_TYPE
   */
  set type(value) {
    this.#type = value
}
}
