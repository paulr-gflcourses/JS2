import { Injectable } from '@angular/core';

interface Post {
  id: number,
  title: string,
  description: string,
  details: string
}

@Injectable()
export class PostsService {
  
  public list: Post[]=[];
  constructor() { 
    this.list= [{
      id: 1,
      title: 'The first news',
      description: 'Some desciption about the first news',
      details: `Donec ultricies quam nec consequat pellentesque.
      Nulla in mi tempor, congue dolor ac, cursus ligula.
      Nullam maximus lectus at velit rhoncus, a pulvinar ante scelerisque.
      Aliquam imperdiet diam et commodo convallis.
`
    },
    {
      id: 2,
      title: 'The second news',
      description: 'Another description of the news',
      details: `Nulla et dolor at felis bibendum mollis et non ex.
      Suspendisse a nulla a diam accumsan fermentum.
      Mauris fermentum lacus a sapien pulvinar dictum.
      Fusce quis nibh ultricies odio condimentum imperdiet sed vitae massa.
      Donec in turpis quis eros tempor blandit sit amet vitae lorem.
      Maecenas ut sem nec ligula pharetra semper nec sed est.
      Nulla blandit massa et diam suscipit, id dictum mauris congue.`
    },
    {
      id: 3,
      title: 'The third news',
      description: 'The description of the third',
      details: `Donec sollicitudin enim non venenatis euismod.
      Cras in sem pretium mi dictum laoreet.
      Morbi et nibh eget odio eleifend pharetra.
      Donec molestie lacus sit amet ante elementum suscipit et quis augue.
      In egestas felis quis ligula placerat luctus.
      Vivamus non justo a risus blandit ultrices.
      Ut pharetra lacus eu gravida auctor.`
    },
    {
      id: 4,
      title: 'Some other news',
      description: 'Quite necessary news!',
      details: `Donec euismod nulla at accumsan dapibus.
      Integer vel enim molestie, vulputate magna in, rhoncus ex.`
    }

    ];
  }

  getPostById(id){
    return this.list.find(item => item.id === id);
  }
}
