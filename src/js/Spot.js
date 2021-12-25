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
  #f

  /**
   * @type {number}
   */
  #g

  /**
   * @type {number}
   */
  #h

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
    this.#f = 0
    this.#g = 0
    this.#h = 0

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

  f() {
    return this.#f
  }
}
