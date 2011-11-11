fields = [];

fields.push({label:'Contact',  inputs:[
  {label: 'Bride First'},
  {label: 'Bride Last'},
  {label: 'Groom First'},
  {label: 'Groom Last'},
  {label: 'Salutation'},
  {label: 'Address'},
  {label: 'City'},
  {label: 'State'},
  {label: 'Zip'},
  {label: 'Phone'},
  {label: 'Email'}
]});

fields.push({label:'Wedding',  inputs:[
  {label: 'Date', type:'date', rename:'wedding_date'},
  {label: 'Location'},
  {label: 'Number Guests', attributes: {pattern:'[0-9]*'}},
  {label: 'Number Locations', attributes: {pattern:'[0-9]*'}}
]});

fields.push({label:'Services',  inputs:[
  {label: 'Date of Contract', type:'date', rename:'contract_date'},
  {label: '# of Consultations', rename:'num_consultations', attributes: {pattern:'[0-9]*'}},
  {label: '# of Sites', rename:'num_sites', attributes: {pattern:'[0-9]*'}},
  {label: '# of Assistants', rename:'num_assistants', attributes: {pattern:'[0-9]*'}},
  {label: 'Vendor Suggestions', type:'checkbox_group', group: [
    {label: 'Photographer'},
    {label: 'Videographer'},
    {label: 'Hair Stylist'},
    {label: 'Makeup Artist'},
    {label: 'Caterer'},
    {label: 'Cake Baker'},
    {label: 'Rentals'},
    {label: 'Florist'},
    {label: 'Ceremony Music'},
    {label: 'Reception Music'},
    {label: 'Rehearsal Dinner Site'},
    {label: 'Attire'},
    {label: 'Invitations'},
    {label: 'Getting Ready Site'},
    {label: 'Lodging'},
    {label: 'Transportation'}
    ]
  },
  {label: 'Elements', type:'textarea', text:'Work with vendors and oversee the production of design elements, such as printed materials, attire elements, and décor details.'},
  {label: 'Avenues/Methods', type:'textarea', text:"Suggest avenues and methods that will  create/emphasize/ensure INSERT CLIENT’S GOTTA-HAVES HERE."},
  {label: 'Will Oversee', type:'checkbox_group', group: [
      {label: 'Tents'},
      {label: 'Lighting'},
      {label: 'Infrastructure'},
      {label: 'Arches or Canopies'},
      {label: 'Aisle And Altar Décor'},
      {label: 'Floral Arrangements'},
      {label: 'Tablescape'},
      {label: 'Other custom-built items'}
    ]
  }
]});

fields.push({label:'Fees',  inputs:[
  {label: 'Flat Fee', attributes: {pattern:'[0-9]*'}},
  {label: 'Option Date', type: 'date'},
  {label: 'Payment Amount'},
  {label: 'Payment Date 1', attributes: {readonly:'readonly', value:'Due upon signing'}},
  {label: 'Payment Date 2'},
  {label: 'Payment Date 3'},
  {label: 'Payment Date 4'}
]});
