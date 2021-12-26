import {ConfigurationSingleton} from './ConfigurationSingleton'
import {Grid} from './Grid'

export class Sketch {
  /**
   * @type {ConfigurationSingleton}
   */
  #configuration

  /**
   * @type {Grid}
   */
  #grid

  /**
   * @type {Array<Spot>}
   */
  #path

  /**
   * @type {Spot | null}
   */
  #currentSpot

  /**
   * @type {boolean}
   */
  #searchIsOver

  constructor() {
    this.#configuration = new ConfigurationSingleton()
    this.#grid = new Grid(this.#configuration.cols, this.#configuration.rows)
    this.#path = []
    this.#currentSpot = null
    this.#searchIsOver = false

    this.#animate()
  }

  #draw() {
    if (this.#configuration.openSet.size <= 0) {
      this.#searchIsOver = true
      console.log('End node is not obtainable!');
      return
    }

    this.#currentSpot = this.#findSpotWithLowestIndex()

    if (this.#currentSpot === this.#grid.end) {
      this.#searchIsOver = true
    }

    this.#configuration.removeFromOpenSet(this.#currentSpot)
    this.#configuration.appendSpotToClosedSet(this.#currentSpot)

    const neighbors = this.#currentSpot.neighbors

    for (const neighbor of neighbors) {
      if (!this.#configuration.closedSet.has(neighbor) && !neighbor.wall) {
        this.#updateNeighboursScore(neighbor)
      }

      neighbor.goalScore = this.#currentSpot.goalScore + 1
    }

    this.#drawGrid()
    this.#drawClosedNodes()
    this.#drawDiscoveredNodes()
    this.#drawResultPath()
  }

  /**
   * @param {Spot} neighbor
   */
  #updateNeighboursScore(neighbor) {
    const tentativeGoalScore = this.#currentSpot.goalScore + 1

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
    neighbor.heuristic = Sketch.#heuristic(neighbor, this.#grid.end)
    neighbor.fScore = neighbor.goalScore + neighbor.heuristic
    neighbor.previous = this.#currentSpot
  }

  #drawGrid() {
    for (let i = 0; i < this.#configuration.cols; i++) {
      for (let k = 0; k < this.#configuration.rows; k++) {
        this.#grid.grid[i][k].draw('#FFFFFF')
      }
    }
  }

  #drawClosedNodes() {
    for (let spot of this.#configuration.closedSet.values()) {
      spot.draw('red')
    }
  }

  #drawDiscoveredNodes() {
    for (let spot of this.#configuration.openSet.values()) {
      spot.draw('green')
    }
  }

  #drawResultPath() {
    if (!this.#currentSpot) {
      console.error('currentSpot is undefined!');
      return
    }

    this.#path = []
    let spot = this.#currentSpot
    this.#path.push(spot)

    while (spot.previous) {
      this.#path.push(spot.previous)
      spot = spot.previous
    }


    for (let i = 0; i < this.#path.length; i++) {
      this.#path[i].draw('blue')
    }
  }

  #animate = () => {
    this.#draw()

    if (!this.#searchIsOver) {
      requestAnimationFrame(this.#animate)
    }
  }

  /**
   * @param {Spot} neighbor
   * @param {Spot} endSpot
   * @returns {number}
   */
  static #heuristic(neighbor, endSpot) {
    return Math.abs(neighbor.x - endSpot.x) + Math.abs(neighbor.y - endSpot.y)
  }
}
