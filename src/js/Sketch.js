import P5 from 'p5';
import {Configuration} from './Configuration';
import {Grid} from './Grid';

export class Sketch {
  /**
   * @type Configuration
   */
  #configuration

  /**
   * @type {Array<Array<Spot>>}
   */
  #grid

  constructor() {
    this.#configuration = new Configuration()
    this.#grid = new Grid(this.#configuration.cols, this.#configuration.rows).grid
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
    p5.background(0);

    for (let i = 0; i < this.#configuration.cols; i++) {
      for (let k = 0; k < this.#configuration.rows; k++) {
        this.#grid[i][k].show(p5, p5.color(255))
      }
    }

    for (let spot of this.#configuration.closedSet.values()) {
      spot.show(p5, p5.color(255, 0, 0))
    }

    for (let spot of this.#configuration.openSet.values()) {
      spot.show(p5, p5.color(0, 255, 0))
    }
  }
}
