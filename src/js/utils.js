export class Utils {
  /**
   * @param first
   * @param {number} first.x
   * @param {number} first.y
   * @param {number} first.width
   * @param {number} first.height
   *
   * @param second
   * @param {number} first.x
   * @param {number} first.y
   * @param {number} first.width
   * @param {number} first.height
   *
   * @returns {boolean}
   */
  static collision(first, second) {
    return !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  }
}

