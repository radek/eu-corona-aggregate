const aggregate = require('./aggregate')
const fetch = require("node-fetch")
const AVAILABLE_METRICS = ['confirmed', 'deaths', 'recovered']
const CACHE_TTL = 1 // in hours
const EU_GROUP = ['EU', 'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden']

const cache = {
  data: {},
  ttl: new Date(),
}

const getCovid19 = async (metric) => {
  const resp = await fetch(`https://covid19.cors-everywhere.workers.dev?metric=${metric}`)
  return await resp.json()
}

exports.aggregate = async (req, res) => {

  const { metric } = req.query

  if (!AVAILABLE_METRICS.includes(metric)) {
    return res.sendStatus(400)
  }

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (cache.data[metric] && cache.ttl > new Date()) {
    return res.status(200).send(cache.data[metric])
  }

  try {
    const data = await getCovid19(metric)
    cache.data[metric] = aggregate(data, [...EU_GROUP])
    const futureDate = new Date()
    futureDate.setHours(futureDate.getHours() + CACHE_TTL)
    cache.ttl = futureDate
  } catch (error) {
    return res.status(400).send(error)
  }

  return res.status(200).send(cache.data[metric])
}

