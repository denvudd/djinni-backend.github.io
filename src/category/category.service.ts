import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  findAll() {
    return [
      {
        name: 'Розробка',
        subcategories: [
          { id: 1, name: 'JavaScript / Front-End' },
          { id: 2, name: 'Java' },
          { id: 3, name: 'C# / .NET' },
          { id: 4, name: 'Python' },
          { id: 5, name: 'PHP' },
          { id: 6, name: 'Node.js' },
          { id: 7, name: 'iOS' },
          { id: 8, name: 'Android' },
          { id: 9, name: 'C / C++ / Embedded' },
          { id: 10, name: 'Flutter' },
          { id: 11, name: 'Golang' },
          { id: 12, name: 'Ruby' },
          { id: 13, name: 'Scala' },
          { id: 14, name: 'Salesforce' },
          { id: 15, name: 'Rust' },
        ],
      },
      {
        name: 'Ще технічні',
        subcategories: [
          { id: 16, name: 'QA Manual' },
          { id: 17, name: 'QA Automation' },
          { id: 18, name: 'Design / UI/UX' },
          { id: 19, name: '2D/3D Artist/ Illustrator' },
          { id: 20, name: 'Project Manager' },
          { id: 21, name: 'Product Manager' },
          { id: 22, name: 'Architect / CTO' },
          { id: 23, name: 'DevOps' },
          { id: 24, name: 'Business Analyst' },
          { id: 25, name: 'Data Science' },
          { id: 26, name: 'Data Analyst' },
          { id: 27, name: 'Sysadmin' },
          { id: 28, name: 'Gamedev / Unity' },
          { id: 29, name: 'SQL / DBA' },
          { id: 30, name: 'Security' },
          { id: 31, name: 'Data Engineer' },
          { id: 32, name: 'Scrum Master / Agile Coach' },
        ],
      },
      {
        name: 'Нетехнічні',
        subcategories: [
          { id: 33, name: 'Marketing' },
          { id: 34, name: 'HR' },
          { id: 35, name: 'Recruiter' },
          { id: 36, name: 'Customer / Technical Support' },
          { id: 37, name: 'Sales' },
          { id: 38, name: 'SEO' },
          { id: 39, name: 'Technical Writing' },
          { id: 40, name: 'Lead Generation' },
          { id: 41, name: '(Other)' },
        ],
      },
    ];
  }
}
