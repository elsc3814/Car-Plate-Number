const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors());
const port = 3000

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const statusCodes = {
  noContent: 204,
  badRequest: 400,
  notFound: 404,
}

class CarPlateNumber extends Model { }
CarPlateNumber.init({
  carNumber: DataTypes.STRING,
  owner: DataTypes.STRING
}, {
  sequelize,
  modelName: 'carPlate',
  createdAt: false,
  updatedAt: false,
  indexes: [{
    unique: true,
    fields: ['carNumber']
  }]
});

function isValidCarNumber(carNumber) {
  const regex = new RegExp('^[A-Z]{3}[0-9]{3}$');
  return regex.test(carNumber);
}

(async () => {
  await sequelize.sync();
})();

app.get('', async (req, res) => {
  const cars = await CarPlateNumber.findAll({
    order: [
      ['carNumber', 'ASC'], 
    ],
  });
  res.send(cars.map(x => x.toJSON()))
})

app.get('/availability/:carNumber', async (req, res) => {
  const carPlateNumber = await CarPlateNumber.findOne({
    where: {
      carNumber: req.params.carNumber
    }
  })
  res.send(!carPlateNumber);
})

app.get('/:id', async (req, res) => {
  const car = await CarPlateNumber.findOne({
    where: {
      id: req.params.id
    }
  })

  if (car) {
    res.send(car.toJSON())
  } else {
    res.status(statusCodes.notFound).send();
  }
})

app.patch('/:id', async (req, res) => {
  if (!isValidCarNumber(req.body.carNumber)) {
    res.status(statusCodes.badRequest).send({ carNumber: "Invalid car plate number" });
    return;
  }

  let car = await CarPlateNumber.findOne({
    where: {
      id: req.params.id
    }
  })

  if (car) {
    await car.update({
      carNumber: req.body.carNumber,
      owner: req.body.owner
    })

    res.send(car.toJSON());
  } else {
    res.status(statusCodes.notFound).send();
  }
})

app.post('', async (req, res) => {
  if (!isValidCarNumber(req.body.carNumber)) {
    res.status(statusCodes.badRequest).send({ carNumber: "Invalid car plate number" });
    return;
  }

  const car = await CarPlateNumber.create({
    carNumber: req.body.carNumber,
    owner: req.body.owner
  })
  res.send(car.toJSON());
})

app.delete('/:id', async (req, res) => {
  const amountOfDeletedCars = await CarPlateNumber.destroy({
    where: {
      id: req.params.id
    }
  });

  if (amountOfDeletedCars === 1) {
    res.status(statusCodes.noContent).send();
  } else {
    res.status(statusCodes.notFound).send();
  }
})

app.listen(port, () => {
  console.log(`Example app listening at httplocalhost${port}`)
})