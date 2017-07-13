class ServicesController < ApplicationController
  def show
    @page_schema = {
      title: 'Register as a childminder in England',
      description: 'You must register with Ofsted or a childminder agency if you want to be paid to look after children under 8 for more than 2 hours a day in England.',
      blue_box_info: [
        {title: "Register as a childminder...", url: '/url/blabla'}
      ],
      steps: [
        {
          title: 'Check if you are eligible',
          description: 'You will need to fit certain criterea to get on the early years register.',
          links: [
            {
              title: 'Check if someone can work in the UK',
              url: '/blah',
              description: 'hello world description'
            },
            {
              title: 'Become a registered early years or childcare provider in England',
              url: '/blah',
              description: 'hello world description'
            },
            {
              title: 'Applying to waive disqualification: early years and childcare providers',
              url: '/blah',
              description: 'hello world description'
            },
          ]
        },
        {
          title: 'Contact your local council',
          description: 'You must contact your local council before you can start applying to be a childminder.',
          links: [
            {
              title: 'Find a registered childminder', url: '/blahblah'
            }
          ]
        }
      ]
    }

  end
end
