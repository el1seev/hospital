const Service = require('../models/service');

// Добавить новую услугу
createService = async (req, res) => {
  try {
  const { name, image, description } = req.body;
  const service = new Service({ name, image, description });

  const savedService = await service.save();

  return res.status(201).json({ service: savedService });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось добавить услугу', error });
  }
};

addServiceDescription = async (req, res) => {
  try {
  const { type, price } = req.body;
  const { id } = req.params;
  console.log(req.body)
  if( price <= 0){
    return res.status(400).json({ message: 'Цена не может равнятся или быть меньше ноля' });
  }
  const newDescription = {type: type, price: Number(price)};
  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).json({ message: 'Услуга не найдена' });
  }

  service.description.push(newDescription);
  
  const savedService = await service.save();

  return res.status(201).json({ service: savedService });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось добавить услугу', error });
  }
};

// Получить все услуги
getAllServices = async (req, res) => {
  try {
  const services = await Service.find();
  return res.status(200).json({ services });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось получить список услуг', error });
  }
};

// Получить услугу по ID
getServiceById = async (req, res) => {
  try {
  const { id } = req.params;

  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).json({ message: 'Услуга не найдена' });
  }

  return res.status(200).json({ service });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось получить услугу', error });
  }
};

// Редактировать услугу
updateService = async (req, res) => {
  try {
  const { id } = req.params;
  const { name, image, description } = req.body;

  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).json({ message: 'Услуга не найдена' });
  }

  service.name = name;
  service.image = image;
  service.description = description;

  const savedService = await service.save();

  return res.status(200).json({ service: savedService });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось обновить услугу', error });
  }
};

// Удалить услугу
deleteService = async (req, res) => {
  try {
  const { id } = req.params;

  const service = await Service.findById(id);

  if (!service) {
    return res.status(404).json({ message: 'Услуга не найдена' });
  }

  await service.remove();

  return res.status(200).json({ message: 'Услуга удалена' });
  } catch (error) {
  return res.status(500).json({ message: 'Не удалось удалить услугу', error });
  }
};

module.exports = {getAllServices, deleteService, getServiceById, updateService, createService, addServiceDescription};