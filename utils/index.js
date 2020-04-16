const normalizePayload = (payload, attributes) => 
  Object
    .keys(payload)
    .filter(key => attributes.indexOf(key) !== -1)
    .reduce((acc, curr) => {
      acc[curr] = payload[curr]
      return acc
    }, {})

module.exports = {
  normalizePayload
}
