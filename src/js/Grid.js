import {Spot} from './Spot'
import {ConfigurationSingleton} from './ConfigurationSingleton'
import {SPOT_TYPE} from './static';

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

  constructor() {
    this.#configuration = new ConfigurationSingleton()
    this.#createGrid(this.#configuration.cols, this.#configuration.rows)
    this.setStartSpot(this.#grid[0][0])
    this.setEndSpot(this.#grid[this.#configuration.cols - 1][this.#configuration.rows - 1])
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
   * @param {Spot} node
   */
  setStartSpot(node) {
    if (this.#start) {
      this.#start.type = SPOT_TYPE.DEFAULT
    }

    this.#configuration.removeFromOpenSet(this.#start)
    this.#start = node

    // start node always must be obtainable
    this.#start.type = SPOT_TYPE.START_NODE

    this.#configuration.appendSpotToOpenSet(this.#start)
  }

  /**
   * @param {Spot} node
   */
  setEndSpot(node) {
    if (this.#end) {
      this.#end.type = SPOT_TYPE.DEFAULT
    }

    this.#end = node

    // start node always must be obtainable
    this.#end.type = SPOT_TYPE.END_NODE
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
  get start() {
    return this.#start
  }

  /**
   * @returns {Spot}
   */
  get end() {
    return this.#end
  }
}
