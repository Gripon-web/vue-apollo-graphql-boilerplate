import db from './models'
import sequelize, { Op } from 'sequelize'

const database = {
  Op: Op,
  db: db,
  sequelize
}

export default database
