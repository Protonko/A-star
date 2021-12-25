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

  constructor() {
    this.#configuration = new Configuration()
    this.#grid = new Grid(this.#configuration.cols, this.#configuration.rows)
    new P5(this.#sketch)
  }

  #sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(400, 400)
    }

    p5.draw = () => this.#draw(p5)
  }

  /**
   * @param p5 - p5 instance
   */
  #draw(p5) {
    if (this.#configuration.openSet.size > 0) {
      const arrayFromOpenSet = Array.from(this.#configuration.openSet)
      let lowestIndex = 0

      for (let i = 0; i < arrayFromOpenSet.length; i++) {
        if (arrayFromOpenSet[i].f < arrayFromOpenSet[lowestIndex]) {
          lowestIndex = i
        }
      }

      const currentSpot = arrayFromOpenSet[lowestIndex]

      if (currentSpot === this.#grid.end) {
        console.log('DONE');
      }

      this.#configuration.removeFromOpenSet(currentSpot)
      this.#configuration.appendSpotToClosedSet(currentSpot)
    } else {

    }

    this.#drawGrid(p5)
    this.#drawClosedNodes(p5)
    this.#drawDiscoveredNodes(p5)
  }

  /**
   * @param p5 - p5 instance
   */
  #drawGrid(p5) {
    for (let i = 0; i < this.#configuration.cols; i++) {
      for (let k = 0; k < this.#configuration.rows; k++) {
        this.#grid.grid[i][k].show(p5, p5.color(255))
      }
    }
  }

  /**
   * @param p5 - p5 instance
   */
  #drawClosedNodes(p5) {
    for (let spot of this.#configuration.closedSet.values()) {
      spot.show(p5, p5.color(255, 0, 0))
    }
  }

  /**
   * @param p5 - p5 instance
   */
  #drawDiscoveredNodes(p5) {
    for (let spot of this.#configuration.openSet.values()) {
      spot.show(p5, p5.color(0, 255, 0))
    }
  }
}
