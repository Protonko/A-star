import {SPOT_TYPE} from './static';
import {ConfigurationSingleton} from './ConfigurationSingleton';
import {Grid} from './Grid';

export class Pathfinder {
  /**
   * @type {Grid}
   */
  #grid

  /**
   * @type {ConfigurationSingleton}
   */
  #configuration

  /**
   * @type {Spot | null}
   */
  #spotWithLowestIndex

  /**
   * @type {boolean}
   */
  #searchIsOver

  /**
   * @type {boolean}
   */
  #searchIsStarted

  /**
   * @param {Grid} grid
   */
  constructor(grid) {
    this.#grid = grid
    this.#configuration = new ConfigurationSingleton()
    this.#spotWithLowestIndex = null
    this.#searchIsOver = false
    this.#searchIsStarted = false
  }

  /**
   * @param {Spot} neighbor
   */
  #updateNeighboursScore(neighbor) {
    const tentativeGoalScore = this.#spotWithLowestIndex.goalScore + 1

    if (this.#configuration.openSet.has(neighbor)) {
      if (tentativeGoalScore < neighbor.goalScore) {
        neighbor.goalScore = tentativeGoalScore
        this.#recalculatePath(neighbor)
      }
    } else {
      neighbor.goalScore = tentativeGoalScore
      this.#configuration.appendSpotToOpenSet(neighbor)
      this.#recalculatePath(neighbor)
    }
  }

  /**
   * @returns {Spot}
   */
  #findSpotWithLowestIndex() {
    let lowestIndex = 0
    const arrayFromOpenSet = Array.from(this.#configuration.openSet)

    for (let i = 0; i < arrayFromOpenSet.length; i++) {
      if (arrayFromOpenSet[i].fScore < arrayFromOpenSet[lowestIndex].fScore) {
        lowestIndex = i
      }
    }

    return arrayFromOpenSet[lowestIndex]
  }

  /**
   * @param {Spot} neighbor
   */
  #recalculatePath(neighbor) {
    neighbor.heuristic = Pathfinder.#heuristic(neighbor, this.#grid.end)
    neighbor.fScore = neighbor.goalScore + neighbor.heuristic
    neighbor.previous = this.#spotWithLowestIndex
  }

  /**
   * @param {Spot} neighbor
   * @param {Spot} endSpot
   * @returns {number}
   */
  static #heuristic(neighbor, endSpot) {
    return Math.abs(neighbor.x - endSpot.x) + Math.abs(neighbor.y - endSpot.y)
  }

  findShortestPath() {
    this.#searchIsStarted = true
    if (this.#configuration.openSet.size <= 0) {
      this.#searchIsOver = true
      this.#searchIsStarted = false
      alert('End node is not obtainable!')
      return
    }

    this.#spotWithLowestIndex = this.#findSpotWithLowestIndex()

    if (this.#spotWithLowestIndex === this.#grid.end) {
      this.#searchIsOver = true
      this.#searchIsStarted = false
    }

    this.#configuration.removeFromOpenSet(this.#spotWithLowestIndex)
    this.#configuration.appendSpotToClosedSet(this.#spotWithLowestIndex)

    const neighbors = this.#spotWithLowestIndex.neighbors

    for (const neighbor of neighbors) {
      if (!this.#configuration.closedSet.has(neighbor) && neighbor.type !== SPOT_TYPE.WALL) {
        this.#updateNeighboursScore(neighbor)
      }

      neighbor.goalScore = this.#spotWithLowestIndex.goalScore + 1
    }
  }

  /**
   * @return {boolean}
   */
  get searchIsStarted() {
    return this.#searchIsStarted
  }

  /**
   * @return {boolean}
   */
  get searchIsOver() {
    return this.#searchIsOver
  }

  get spotWithLowestIndex() {
    return this.#spotWithLowestIndex
  }
}
