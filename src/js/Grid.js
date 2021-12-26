import {Spot} from './Spot'
import {ConfigurationSingleton} from './ConfigurationSingleton'

export class Grid {
  /**
   * @type {ConfigurationSingleton}
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
    this.#configuration = new ConfigurationSingleton()
    this.#createGrid(cols,rows)
    this.#start = this.#grid[0][0]
    this.#end = this.#grid[cols - 1][rows - 1]

    // start and end nodes always must be obtainable
    this.#start.wall = false
    this.#end.wall = false
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
        this.#grid[i][k].appendNeighbors(this.#grid, cols, rows)
      }
    }
  }

  /**
   * @returns {Array<Array<Spot>>}
   */
  get grid() {
    return this.#grid
  }

  /**
   * @returns {Spot}
   */
  get end() {
    return this.#end
  }
}
