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

  #p5

  constructor() {
    this.#configuration = new Configuration()
    this.#grid = new Grid(this.#configuration.cols, this.#configuration.rows)
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
    if (this.#configuration.openSet.size > 0) {
      const arrayFromOpenSet = Array.from(this.#configuration.openSet)
      let lowestIndex = 0

      for (let i = 0; i < arrayFromOpenSet.length; i++) {
        if (arrayFromOpenSet[i].fScore < arrayFromOpenSet[lowestIndex].fScore) {
          lowestIndex = i
        }
      }

      const currentSpot = arrayFromOpenSet[lowestIndex]

      if (currentSpot === this.#grid.end) {
        console.log('DONE');
      }

      this.#configuration.removeFromOpenSet(currentSpot)
      this.#configuration.appendSpotToClosedSet(currentSpot)

      const neighbors = currentSpot.neighbors

      for (const neighbor of neighbors) {
        if (!this.#configuration.closedSet.has(neighbor)) {
          const tentativeGoalScore = currentSpot.goalScore + 1

          if (this.#configuration.openSet.has(neighbor)) {
            if (tentativeGoalScore < neighbor.goalScore) {
              neighbor.goalScore = tentativeGoalScore
            }
          } else {
            neighbor.goalScore = tentativeGoalScore
            this.#configuration.appendSpotToOpenSet(neighbor)
          }

          neighbor.heuristic = this.#heuristic(neighbor, this.#grid.end)
          neighbor.fScore = neighbor.goalScore + neighbor.heuristic
        }

        neighbor.goalScore = currentSpot.goalScore + 1
      }
    } else {

    }

    this.#drawGrid()
    this.#drawClosedNodes()
    this.#drawDiscoveredNodes()
  }

  #drawGrid() {
    for (let i = 0; i < this.#configuration.cols; i++) {
      for (let k = 0; k < this.#configuration.rows; k++) {
        this.#grid.grid[i][k].show(this.#p5, this.#p5.color(255))
      }
    }
  }

  #drawClosedNodes() {
    for (let spot of this.#configuration.closedSet.values()) {
      spot.show(this.#p5, this.#p5.color(255, 0, 0))
    }
  }

  #drawDiscoveredNodes() {
    for (let spot of this.#configuration.openSet.values()) {
      spot.show(this.#p5, this.#p5.color(0, 255, 0))
    }
  }

  /**
   * @param {Spot} neighbor
   * @param {Spot} endSpot
   * @returns {number}
   */
  #heuristic(neighbor, endSpot) {
    return this.#p5.dist(neighbor.x, neighbor.y, endSpot.x, endSpot.y)
  }
}
