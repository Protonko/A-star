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
    this.#wall = false

    if (Math.random() < 0.1) {
      this.#wall = true
    }
  }

  /**
   * @param p5 - p5 instance
   * @param {p5.Color} color
   */
  draw(p5, color) {
    p5.fill(color)

    if (this.#wall) {
      p5.fill(0)
    }

    p5.noStroke()
    p5.rect(
      this.#x * this.#width,
      this.#y * this.#height,
      this.#width - 1,
      this.#height - 1,
    )
  }

  /**
   * @param grid
   * @param cols
   * @param rows
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
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get fScore() {
    return this.#fScore
  }

  get neighbors() {
    return this.#neighbors
  }

  get goalScore() {
    return this.#goalScore
  }

  get previous() {
    return this.#previous
  }

  get wall() {
    return this.#wall
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
}
