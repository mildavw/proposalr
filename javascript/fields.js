fields = {};

fields.Contact = {
  'Bride First':  {},
  'Bride Last':   {},
  'Groom First':  {},
  'Groom Last':   {},
  'Salutation':   {},
  'Address':      {},
  'City':         {},
  'State':        {},
  'Zip':          {},
  'Phone':        {},
  'Email':        {}
};

fields.Wedding = { 
  'Date':             {type:'date', rename:'wedding_date'},
  'Location':         {},
  'Number Guests':    {attributes: {pattern:'[0-9]*'}},
  'Number Locations': {attributes: {pattern:'[0-9]*'}}
};

fields.Services = {
  '# of Consultations': {rename:'num_consultations'},
  '# of Sites':         {rename:'num_sites'},
  '# of Assistants':    {rename:'num_assistants'},
  'Vendor Suggestions': {type:'checkbox_group', group: {
    'Photographer': {},
    'Videographer': {},
    'Hair Stylist': {},
    'Makeup Artist': {},
    'Caterer': {},
    'Cake Baker': {},
    'Rentals': {},
    'Florist': {},
    'Ceremony Music': {},
    'Reception Music': {},
    'Rehearsal Dinner Site': {},
    'Attire': {},
    'Invitations': {},
    'Getting Ready Site': {},
    'Lodging': {},
    'Transportation': {}
    }
  },
  'Elements': {type:'textarea', text:'Work with vendors and oversee the production of design elements, such as printed materials, attire elements, and décor details.'},
  'Avenues/Methods': {type:'textarea', text:"Suggest avenues and methods that will  create/emphasize/ensure INSERT CLIENT’S GOTTA-HAVES HERE."},
  'Will Oversee': {type:'checkbox_group', group: { 
      'Tents': {},
      'Lighting': {},
      'Infrastructure': {},
      'Arches or Canopies': {},
      'Aisle And Altar Décor': {},
      'Floral Arrangements': {},
      'Tablescape': {},
      'Other custom-built items': {}
    }
  }
};

fields.Fees = {
  'Option Date':      {type: 'date'},
  'Flat Fee':         {attributes: {pattern:'[0-9]*'}},
  'Due Upon Signing': {attributes: {pattern:'[0-9]*'}},
  'Payment Amount': {},
  'Payment Date 1': {},
  'Payment Date 2': {},
  'Payment Date 3': {}
};
