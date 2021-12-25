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
  }

  /**
   * @param p5 - p5 instance
   * @param {p5.Color} color
   */
  show(p5, color) {
    p5.fill(color)
    p5.stroke(0)
    p5.rect(
      this.#x * this.#width,
      this.#y * this.#height,
      this.#width,
      this.#height,
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

  get fScore() {
    return this.#fScore
  }

  get goalScore() {
    return this.#goalScore
  }

  /**
   * @param {number} value
   */
  set goalScore(value) {
    return this.#goalScore = value
  }

  get neighbors() {
    return this.#neighbors
  }
}
