/**
 * Extend data by copy group members under (new) group label
 * and add 'aggregate' member
 *
 * @param {Object} data - collection of pairs (label, values)
 * @param {Array} group - group name followed by list of member labels
 * @returns {Object}
 */

module.exports = (data, group=[]) => {
  let agregate = []
  let len = Object.keys(data).length

  return Object.keys(data).reduce((acc, cur, idx) => {
    acc[cur] = data[cur]

    if (group.length && group.includes(cur)) {
      group.splice(group.indexOf(cur), 1)

      agregate = data[cur].reduce((agr, val, x) => {
        agr.splice(x, 0, val + (agregate[x] || 0))
        return agr
      }, [])

      acc[`${cur}, ${group[0]}`] = data[cur]
    }

    if (idx === len - 1 && agregate.length) {
      acc[group.shift()] = agregate
    }

    return acc
  }, {});
}
