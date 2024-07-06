const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { sequelize, Service, Industry } = require('./models');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Render the main page with the form and saved services
app.get('/', async (req, res) => {
  const industries = await Industry.findAll();
  const services = await Service.findAll({
    include: {
      model: Industry,
      through: { attributes: [] }
    }
  });
  res.render('index', { industries, services });
});

// Handle form submission to create a new service
app.post('/services', async (req, res) => {
  const { service_name, industry_ids } = req.body;
  console.log(req.body)
  const service = await Service.create({ service_name });
  if (industry_ids) {
    const industryIdsArray = Array.isArray(industry_ids) ? industry_ids : [industry_ids];
    console.log("Indust----->",industryIdsArray)
    await service.addIndustries(industryIdsArray);
  }
  res.redirect('/');
});

// Handle delete service request
app.delete('/services/:id', async (req, res) => {
  await Service.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

// Handle edit form submission
app.put('/services/:id', async (req, res) => {
  const { service_name, industry_ids } = req.body;
  const service = await Service.findByPk(req.params.id);
  service.service_name = service_name;
  await service.save();

  if (industry_ids) {
    const industryIdsArray = Array.isArray(industry_ids) ? industry_ids : [industry_ids];
    await service.setIndustries(industryIdsArray);
  } else {
    await service.setIndustries([]);
  }
  res.redirect('/');
});

app.get('/cascading', async (req, res) => {
    const industries = await Industry.findAll();
    res.render('cascading', { industries });
  });
  
app.get('/services/by-industry/:industryId', async (req, res) => {
const industryId = req.params.industryId;
const industry = await Industry.findByPk(industryId, {
    include: {
    model: Service,
    through: { attributes: [] }
    }
});
if (industry) {
    res.json(industry.Services);
} else {
    res.json([]);
}
});


app.listen(3011, () => {
  console.log('Server is running on http://localhost:3011');
});
 