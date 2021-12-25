import {Spot} from './Spot'
import {Configuration} from './Configuration'

export class Grid {
  /**
   * @type Configuration
   */
  #configuration

  /**
   * @type {Array<Array<Spot>>}
   */
  #grid

  /**
   * @type {Spot}
   */
  #start

  /**
   * @type {Spot}
   */
  #end

  /**
   * @param {number} cols
   * @param {number} rows
   */
  constructor(cols, rows) {
    this.#configuration = new Configuration()
    this.#createGrid(cols,rows)
    this.#start = this.#grid[0][0]
    this.#end = this.#grid[cols - 1][rows - 1]
    this.#configuration.appendSpotToOpenSet(this.#start)
  }

  /**
   * @param {number} cols
   * @param {number} rows
   */
  #createGrid(cols, rows) {
    this.#grid = new Array(cols)

    for (let i = 0; i < cols; i++) {
      this.#grid[i] = new Array(rows)
    }

    for (let i = 0; i < cols; i++) {
      for (let k = 0; k < rows; k++) {
        this.#grid[i][k] = new Spot(
          i,
          k,
          this.#configuration.width / cols,
          this.#configuration.height / rows,
        )
      }
    }

    for (let i = 0; i < cols; i++) {
      for (let k = 0; k < rows; k++) {
        this.#grid[i][k].appendNeighbors(this.#grid)
      }
    }
  }

  get grid() {
    return this.#grid
  }

  get end() {
    return this.#end
  }
}
