import P5 from 'p5'
import {Configuration} from './Configuration'
import {Grid} from './Grid'

export class Sketch {
  /**
   * @type Configuration
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

  #p5

  constructor() {
    this.#configuration = new Configuration()
    this.#grid = new Grid(this.#configuration.cols, this.#configuration.rows)
    this.#path = []
    this.#currentSpot = null
    new P5(this.#sketch)
  }

  /**
   * @param p5 - p5 instance
   */
  #sketch = (p5) => {
    this.#p5 = p5
    p5.setup = () => {
      p5.createCanvas(400, 400)
      p5.background(0)
    }
    p5.draw = () => this.#draw()
  }

  #draw() {
    if (this.#configuration.openSet.size <= 0) {
      this.#p5.noLoop()
      console.log('End node is not obtainable!');
      return
    }

    this.#currentSpot = this.#findSpotWithLowestIndex()

    if (this.#currentSpot === this.#grid.end) {
      this.#p5.noLoop()
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
        this.#grid.grid[i][k].draw(this.#p5, this.#p5.color(255))
      }
    }
  }

  #drawClosedNodes() {
    for (let spot of this.#configuration.closedSet.values()) {
      spot.draw(this.#p5, this.#p5.color(255, 0, 0))
    }
  }

  #drawDiscoveredNodes() {
    for (let spot of this.#configuration.openSet.values()) {
      spot.draw(this.#p5, this.#p5.color(0, 255, 0))
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
      this.#path[i].draw(this.#p5, this.#p5.color(0, 0, 255))
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
